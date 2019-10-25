import { stringify } from 'query-string';
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

function shopifyDomainFrom(domain) {
  if (domain.indexOf('myshopify.com') >= 0) {
    return domain;
  } else {
    return domain.indexOf('.') === -1 ? (domain + ".myshopify.com") : domain;
  }
}

var request = function (shop, endpoint, sig, seed, body) {
  try {
    return Promise.resolve(_catch(function () {
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

export { request, shopifyDomainFrom };
//# sourceMappingURL=helpers.ts.module.ts.map
