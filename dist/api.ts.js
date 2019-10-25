var queryString = require('query-string');
var crypto = require('crypto');
var helpers_ts = require('./helpers.ts');

var push = function (store, secret) {
  var shop = helpers_ts.shopifyDomainFrom(store),
        seed = generateSeed(),
        url = "?seed=" + seed,
        sig = signature(secret, seed, url);
  return {
    token: function (token, customer) {
      try {
        return Promise.resolve(helpers_ts.request(shop, '/push-token', sig, seed, {
          token: token,
          customer: customer
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    },
    message: function (title, body, data) {
      return helpers_ts.request(shop, '/push-message', sig, seed, {
        title: title,
        body: body,
        data: data
      });
    }
  };
};

function generateSeed() {
  return (crypto.randomFillSync(new Uint32Array(1))[0] / 4294967295 * 100).toString().replace(/[^\d]/, '');
}

function signature(secret, seed, url) {
  var query = queryString.parse(url),
        q = Object.assign({}, query),
        sortedParams = Object.keys(q).sort().reduce(function (m, a) {
    m.push((a + "=" + (q[a])));
    return m;
  }, []).join(''),
        hmac = crypto.createHmac('sha256', secret);
  hmac.update(sortedParams);
  return hmac.digest('hex');
}

exports.push = push;
//# sourceMappingURL=api.ts.js.map
