import fetch from 'node-fetch'

const crypto = require('crypto'),
  querystring = require('querystring'),
  secret = process.env.SECRET // we must securely agree on this

export const push = (store: string, secret: string) => {
  const shop =
    store.indexOf('.myshopify.com') > -1 ? store : `${store}.myshopify.com`
  return {
    token: (token: string) => {
      // TODO use body?
      const seed = (
          (crypto.randomFillSync(new Uint32Array(1))[0] / 4294967295) *
          100
        )
          .toString()
          .replace(/[^\d]/, ''),
        url = `path_prefix=/apps/dimensionauth/api/push-token?token=${token}&shop=${shop}&seed=${seed}`,
        sig = signature(secret, url)
      // TODO make request to push token
      console.log(
        `https://${shop}/apps/dimensionauth/token?token=${token}&seed=${seed}&sig=${sig}`
      )
      return false
    },
    message: (title: string, message: string, payload: object) => {
      // TODO make request to push message
      return false
    }
  }
}

// helper fns
// --------
// generate signature required for request
function signature(secret: string, url: string) {
  const seed = (
      (crypto.randomFillSync(new Uint32Array(1))[0] / 4294967295) *
      100
    )
      .toString()
      .replace(/[^\d]/, ''),
    query = querystring.parse(url),
    q = Object.assign({}, query),
    sortedParams = Object.keys(q)
      .sort()
      .reduce((m, a) => {
        m.push(`${a}=${q[a]}`)
        return m
      }, [])
      .join(''),
    hmac = crypto.createHmac('sha256', secret)
  console.log('sorted params: ', sortedParams)
  hmac.update(sortedParams)
  return hmac.digest('hex')
}
