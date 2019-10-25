import { parse } from 'query-string';
import { randomFillSync, createHmac } from 'crypto';
import { request, shopifyDomainFrom } from './helpers.ts';

var push = function (store, secret) {
  var shop = shopifyDomainFrom(store),
        seed = generateSeed(),
        url = "?seed=" + seed,
        sig = signature(secret, seed, url);
  return {
    token: function (token, customer) {
      try {
        return Promise.resolve(request(shop, '/push-token', sig, seed, {
          token: token,
          customer: customer
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    },
    message: function (title, body, data) {
      return request(shop, '/push-message', sig, seed, {
        title: title,
        body: body,
        data: data
      });
    }
  };
};

function generateSeed() {
  return (randomFillSync(new Uint32Array(1))[0] / 4294967295 * 100).toString().replace(/[^\d]/, '');
}

function signature(secret, seed, url) {
  var query = parse(url),
        q = Object.assign({}, query),
        sortedParams = Object.keys(q).sort().reduce(function (m, a) {
    m.push((a + "=" + (q[a])));
    return m;
  }, []).join(''),
        hmac = createHmac('sha256', secret);
  hmac.update(sortedParams);
  return hmac.digest('hex');
}

export { push };
//# sourceMappingURL=api.ts.module.ts.map
