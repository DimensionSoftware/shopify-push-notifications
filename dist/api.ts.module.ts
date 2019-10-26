import { request, shopifyDomainFrom } from './helpers.ts';

var push = function (store, secret) {
  var shop = shopifyDomainFrom(store);
  return {
    token: function (token, customer) {
      try {
        return Promise.resolve(request(shop, secret, '/push-token', {
          token: token,
          customer: customer
        }));
      } catch (e) {
        return Promise.reject(e);
      }
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

export { push };
//# sourceMappingURL=api.ts.module.ts.map
