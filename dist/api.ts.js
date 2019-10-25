function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var helpers_js = require('../node_modules/babel-plugin-transform-async-to-promises/helpers.js');
var fetch = _interopDefault(require('../node_modules/node-fetch/lib/index.mjs'));
var queryString = require('../node_modules/query-string/index.js');
var crypto = require('crypto');

var request = function (shop, secret, endpoint, body) {
  try {
    return Promise.resolve(helpers_js._catch(function () {
      var seed = generateSeed(),
            url = "?seed=" + seed,
            sig = signature(secret, seed, url);
      return Promise.resolve(fetch(("http://" + shop + ":3000/api" + endpoint + "?" + (queryString.stringify({
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
