declare function shopifyDomainFrom(domain: string): string;
declare function request(shop: string, secret: string, endpoint: string, body: object): Promise<any>;
export { request, shopifyDomainFrom };
