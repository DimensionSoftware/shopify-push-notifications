import{request as e,shopifyDomainFrom as r}from"./helpers.ts";var t=function(t,o){var n=r(t);return{token:function(r,t){try{return Promise.resolve(e(n,o,"/push-token",{token:r,customer:t}))}catch(e){return Promise.reject(e)}},message:function(r,t,s){return e(n,o,"/push-message",{title:r,body:t,data:s})}}};export{t as push};
//# sourceMappingURL=api.ts.module.ts.map
