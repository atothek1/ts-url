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
    private readonly inputUrl?;
    private readonly getScheme?;
    private readonly getFragment?;
    private readonly getQueryParts?;
    private readonly getAuthority?;
    private readonly getUserinfo?;
    private readonly getHost?;
    private readonly getHostParts?;
    private readonly getHostnameParts?;
    private readonly getPathParts?;
    private readonly getResource?;
    private readonly getNormalizedUrl?;
    private constructor(inputUrl?);
}
