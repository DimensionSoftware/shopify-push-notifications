import { Push, PushResponse } from './index'
import { request, shopifyDomainFrom } from './helpers'

// implement push interface
export const push = (store: string, secret: string): Push => {
  const shop = shopifyDomainFrom(store)
  return {
    token: async (token: string, customer?: string) => {
      // securely upsert token & customer
      return request(shop, secret, '/push-token', { token, customer })
    },
    message: (title: string, body: string, data: object) => {
      // push message
      return request(shop, secret, '/push-message', { title, body, data })
    }
  }
}
