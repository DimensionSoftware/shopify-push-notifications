import { stringify, parse } from 'query-string';
import fetch from 'node-fetch';

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

var request = function (shop, secret, endpoint, body) {
  try {
    return Promise.resolve(_catch(function () {
      var seed = generateSeed(),
            url = "?seed=" + seed,
            sig = signature(secret, seed, url);
      return Promise.resolve(fetch(("https://" + shop + "/apps/dimensionauth/api" + endpoint + "?" + (stringify({
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

var forge = require('node-forge');

function shopifyDomainFrom(domain) {
  if (domain.indexOf('myshopify.com') >= 0) {
    return domain;
  } else {
    return domain.indexOf('.') === -1 ? (domain + ".myshopify.com") : domain;
  }
}

function generateSeed() {
  var md = forge.md.sha256.create(),
        rnd = forge.random.getBytesSync(8);
  md.update(rnd);
  return md.digest().toHex();
}

function signature(secret, seed, url) {
  var query = parse(url),
        q = Object.assign({}, query),
        sortedParams = Object.keys(q).sort().reduce(function (m, a) {
    m.push((a + "=" + (q[a])));
    return m;
  }, []).join(''),
        hmac = forge.hmac.create();
  hmac.start('sha256', secret);
  hmac.update(sortedParams);
  return hmac.digest().toHex();
}

export { request, shopifyDomainFrom };
//# sourceMappingURL=helpers.ts.module.ts.map
