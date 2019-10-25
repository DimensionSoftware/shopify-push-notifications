import * as queryString from 'query-string'
import fetch from 'node-fetch'

function shopifyDomainFrom(domain: string) {
  if (domain.indexOf('myshopify.com') >= 0) {
    return domain
  } else {
    return domain.indexOf('.') === -1 ? `${domain}.myshopify.com` : domain // should be a shopify stores' full domain
  }
}

async function request(
  shop: string,
  endpoint: string,
  sig: string,
  seed: string,
  body: object
) {
  try {
    const res = await fetch(
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
