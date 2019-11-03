import * as queryString from 'query-string'
import fetch from 'node-fetch'

const forge = require('node-forge')

function shopifyDomainFrom(domain: string) {
  if (domain.indexOf('myshopify.com') >= 0) {
    return domain
  } else {
    return domain.indexOf('.') === -1 ? `${domain}.myshopify.com` : domain // should be a shopify stores' full domain
  }
}

function generateSeed() {
  const md = forge.md.sha256.create(),
    rnd = forge.random.getBytesSync(8)
  md.update(rnd)
  return md.digest().toHex()
}

// generate signature required for request
function signature(secret: string, seed: string, url: string) {
  const query = queryString.parse(url),
    q = Object.assign({}, query),
    sortedParams = Object.keys(q)
      .sort()
      .reduce((m, a) => {
        m.push(`${a}=${q[a]}`)
        return m
      }, [])
      .join(''),
    hmac = forge.hmac.create()
  hmac.start('sha256', secret)
  hmac.update(sortedParams)
  return hmac.digest().toHex()
}

async function request(
  shop: string,
  secret: string,
  endpoint: string,
  body: object
) {
  try {
    const seed = generateSeed(),
      url = `?path_prefix=/apps/dimensionauth&seed=${seed}&shop=${shop}`,
      sig = signature(secret, seed, url),
      res = await fetch(
        `https://${shop}/apps/dimensionauth/api${endpoint}?${queryString.stringify(
          {
            seed,
            sig
          }
        )}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        }
      ),
      json = await res.json()
    return json
  } catch (error) {
    return { success: false, error }
  }
}

export { request, shopifyDomainFrom }
