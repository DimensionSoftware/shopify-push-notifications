declare function shopifyDomainFrom(domain: string): string;
declare function request(shop: string, endpoint: string, sig: string, seed: string, body: object): Promise<any>;
export { request, shopifyDomainFrom };
