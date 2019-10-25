import fetch from 'node-fetch'
import * as queryString from 'query-string'
import * as crypto from 'crypto'
import { Push, PushResponse } from './index'

export const push = (store: string, secret: string): Push => {
  const shop = shopifyDomainFrom(store)
  return {
    // insert token
    token: async (token: string, customer?: string) => {
      // make secure request with token in body
      return request(shop, secret, '/push-token', { token, customer })
    },
    message: (title: string, body: string, data: object) => {
      // push message
      return request(shop, secret, '/push-message', { title, body, data })
    }
  }
}

// helper fns
// --------
function shopifyDomainFrom(domain: string) {
  if (domain.indexOf('myshopify.com') >= 0) {
    return domain
  } else {
    return domain.indexOf('.') === -1 ? `${domain}.myshopify.com` : domain // should be a shopify stores' full domain
  }
}

function generateSeed(): string {
  return ((crypto.randomFillSync(new Uint32Array(1))[0] / 4294967295) * 100)
    .toString()
    .replace(/[^\d]/, '')
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
    hmac = crypto.createHmac('sha256', secret)
  hmac.update(sortedParams)
  return hmac.digest('hex')
}

async function request(
  shop: string,
  secret: string,
  endpoint: string,
  body: object
) {
  try {
    const seed = generateSeed(),
      url = `?seed=${seed}`,
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
