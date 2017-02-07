export declare type UrlScheme = "http" | "https" | undefined;
export declare type KeyValueStore<T> = {
    [key: string]: T;
};
export declare class Url {
    static fromUrlString(inputUrl: string): Url;
    static mapPathParameters(url: Url, pattern: string): {
        pathParameters: KeyValueStore<any>;
        queryParameters: KeyValueStore<any>;
    };
    toString(): string;
    private readonly inputUrl;
    readonly href: string;
    readonly scheme: UrlScheme;
    readonly authority: string;
    readonly host: string;
    readonly hostname: string;
    readonly port: number;
    readonly subdomain?: string;
    readonly domain: string;
    readonly tld: string;
    readonly resource: string;
    readonly directory: string;
    readonly path: string;
    readonly file?: string;
    readonly query?: string;
    readonly fragment?: string;
    readonly userinfo?: string;
    readonly username?: string;
    readonly password?: string;
    readonly queryParameters?: KeyValueStore<string>;
    private constructor(inputUrl?);
    private normalizeUrl(inputUrl?);
    private getScheme();
    private getFragment();
    private getAuthority();
    private getQueryParts();
    private getUserinfo();
    private getHost();
    private getHostParts();
    private getHostnameParts();
    private getPathParts();
    private getResource();
    private getNormalizedUrl(inputUrl?);
}
