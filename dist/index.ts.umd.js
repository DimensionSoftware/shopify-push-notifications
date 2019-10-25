(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('./api.ts')) :
  typeof define === 'function' && define.amd ? define(['exports', './api.ts'], factory) :
  (factory((global.shopifyPushNotifications = {}),global.api_ts));
}(this, (function (exports,api_ts) {
  exports.push = api_ts.push;

})));
//# sourceMappingURL=index.ts.umd.js.map
