import * as queryString from 'query-string'
import * as crypto from 'crypto'
import { Push, PushResponse } from './index'
import { request, shopifyDomainFrom } from './helpers'

// pull implementation-dependent fns in

// implement push interface
export const push = (store: string, secret: string): Push => {
  const shop = shopifyDomainFrom(store),
    seed = generateSeed(),
    url = `?seed=${seed}`,
    sig = signature(secret, seed, url)
  return {
    token: async (token: string, customer?: string) => {
      // securely upsert token & customer
      return request(shop, '/push-token', sig, seed, { token, customer })
    },
    message: (title: string, body: string, data: object) => {
      // push message
      return request(shop, '/push-message', sig, seed, { title, body, data })
    }
  }
}

// helper fns
// --------
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
