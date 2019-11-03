var e=require("./helpers.ts");exports.push=function(r,t){var s=e.shopifyDomainFrom(r);return{token:function(r,o){try{return Promise.resolve(e.request(s,t,"/push-token",{token:r,customer:o}))}catch(e){return Promise.reject(e)}},message:function(r,o,n){return e.request(s,t,"/push-message",{title:r,body:o,data:n})}}};
//# sourceMappingURL=api.ts.js.map
