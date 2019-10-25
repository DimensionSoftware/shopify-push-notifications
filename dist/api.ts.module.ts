import { _catch } from '../node_modules/babel-plugin-transform-async-to-promises/helpers.js';
import fetch from '../node_modules/node-fetch/lib/index.mjs';
import { stringify, parse } from '../node_modules/query-string/index.js';
import { randomFillSync, createHmac } from 'crypto';

var request = function (shop, secret, endpoint, body) {
  try {
    return Promise.resolve(_catch(function () {
      var seed = generateSeed(),
            url = "?seed=" + seed,
            sig = signature(secret, seed, url);
      return Promise.resolve(fetch(("http://" + shop + ":3000/api" + endpoint + "?" + (stringify({
        seed: seed,
        sig: sig
      }))), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })).then(function (res) {
        return Promise.resolve(res.json());
      });
    }, function (error) {
      return {
        success: false,
        error: error
      };
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};

var push = function (store, secret) {
  var shop = 'localhost';
  return {
    token: function (token, customer) {
      return request(shop, secret, '/push-token', {
        token: token,
        customer: customer
      });
    },
    message: function (title, body, data) {
      return request(shop, secret, '/push-message', {
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
