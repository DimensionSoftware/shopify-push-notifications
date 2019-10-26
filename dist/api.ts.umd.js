(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('./helpers.ts')) :
  typeof define === 'function' && define.amd ? define(['exports', './helpers.ts'], factory) :
  (factory((global.shopifyPushNotifications = {}),global.helpers_ts));
}(this, (function (exports,helpers_ts) {
  var push = function (store, secret) {
    var shop = helpers_ts.shopifyDomainFrom(store);
    return {
      token: function (token, customer) {
        try {
          return Promise.resolve(helpers_ts.request(shop, secret, '/push-token', {
            token: token,
            customer: customer
          }));
        } catch (e) {
          return Promise.reject(e);
        }
      },
      message: function (title, body, data) {
        return helpers_ts.request(shop, secret, '/push-message', {
          title: title,
          body: body,
          data: data
        });
      }
    };
  };

  exports.push = push;

})));
//# sourceMappingURL=api.ts.umd.js.map
