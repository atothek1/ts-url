export type UrlScheme = "http" | "https" | undefined;
export type KeyValueStore<T> = {[key: string]: T};

export class Url {

    public static fromUrlString(inputUrl: string): Url {

        let url = new Url(inputUrl);

        let queryParts = url.getQueryParts();
        let hostParts = url.getHostParts();
        let hostnameParts = url.getHostnameParts();
        let pathParts = url.getPathParts();
        let userinfo = url.getUserinfo();

        return {
            href: inputUrl,
            scheme: url.getScheme(),
            authority: url.getAuthority(),
            host: url.getHost(),
            hostname: hostParts.hostname,
            port: hostParts.port,
            domain: hostnameParts.domain,
            tld: hostnameParts.tld,
            subdomain: hostnameParts.subdomain,
            resource: url.getResource(),
            directory: pathParts.directory,
            path: pathParts.path,
            file: pathParts.file,
            query: queryParts.query,
            queryParameters: queryParts.queryParameters,
            userinfo: userinfo.userinfo,
            username: userinfo.username,
            password: userinfo.password,
            fragment: url.getFragment()
        };
    }

    // https://api.xzited.de:8088/v1/accounts/e955d970-4f47-46c4-9e38-99fe546dd322/orders/16c1ace4-fe84-4f49-906c-341cf8199643/products/1?highlight=true
    // /v1/accounts/{accountUuid}/orders/{ordersUuuid}/products/{productIndex}
    public static mapPathParameters(url: Url, pattern: string): {pathParameters: KeyValueStore<any>, queryParameters: KeyValueStore<any>} {
        pattern = pattern.charAt(pattern.length - 1) === "/" ? pattern.substring(0, pattern.length - 1) : pattern;
        let patternParts = pattern.split("/");
        let pathParts = url.path.split("/");
        let pathParameters;

        patternParts.forEach((item, index, arr) => {
            if (item !== pathParts[index]) {

                if (!pathParts[index])
                    return;

                if (!pathParameters)
                    pathParameters = {};

                let name = item.substring(1, item.length - 1);
                pathParameters[name] = pathParts[index];
            }
        });
        return {
            pathParameters: pathParameters,
            queryParameters: url.queryParameters
        };
    }

    //#region toString()
    public toString(): string {
        return `
Url: {
    href: ${this.href},
    scheme: ${this.scheme},
    authority: ${this.authority},
    hostname: ${this.hostname},
    port: ${this.port},
    subdomain: ${this.subdomain},
    domain: ${this.domain},
    tld: ${this.tld},
    resource: ${this.resource},
    directory: ${this.directory},
    path: ${this.path},
    file: ${this.file},
    query: ${this.query},
    fragment: ${this.fragment},
    userinfo: ${this.userinfo},
    username: ${this.username},
    password: ${this.password}
}`.trim();
    }

    //#endregion

    //#region fields

    public readonly href: string;
    public readonly scheme: UrlScheme;
    public readonly authority: string;
    public readonly host: string;
    public readonly hostname: string;
    public readonly port: number;
    public readonly subdomain?: string;
    public readonly domain: string;
    public readonly tld: string;
    public readonly resource: string;
    public readonly directory: string;
    public readonly path: string;
    public readonly file?: string;
    public readonly query?: string;
    public readonly fragment?: string;
    public readonly userinfo?: string;
    public readonly username?: string;
    public readonly password?: string;
    public readonly queryParameters?: KeyValueStore<string>;

    private readonly inputUrl?: string;

    //#endregion

    //#region methods as fields to make initialization instancing possible

    private readonly getScheme?: Function = (): UrlScheme => {
        let scheme = this.inputUrl.substr(0, this.inputUrl.indexOf("//") - 1);
        return scheme ? scheme as UrlScheme : undefined;
    }

    private readonly getFragment?: Function = (): string => {
        let idx = this.inputUrl.lastIndexOf("#");
        if (idx < 0)
            return;
        return this.inputUrl.substr(idx);
    }

    private readonly getQueryParts?: Function = (): {readonly query: string, readonly queryParameters: KeyValueStore<string>} => {

        let queryIdx = this.inputUrl.indexOf("?");
        if (queryIdx < 0)
            return {query: undefined, queryParameters: undefined};

        let queryParameters;
        let hashIdx = this.inputUrl.indexOf("#");
        let queryString = this.inputUrl.substring(queryIdx + 1, hashIdx > 0 ? hashIdx : undefined);

        if (queryString) {
            queryParameters = {};
            let pairs = queryString.split("&");
            pairs.forEach(item => {
                let key, value;
                key = item.substr(0, item.indexOf("="));
                value = item.substr(item.indexOf("=") + 1);
                queryParameters[key] = value;
            });
        }
        return {query: queryString, queryParameters: queryParameters};
    }

    private readonly getAuthority?: Function = (): string => {
        let parts = this.inputUrl.split("://");
        let url = parts.length === 1 ? parts[0] : parts[1];
        let endIdx = url.indexOf("/");
        if (endIdx < 0) {

            let queryIdx = url.indexOf("?");
            let hashIdx = queryIdx < 0 ? url.indexOf("#") : queryIdx;
            endIdx = hashIdx < 0 ? undefined : hashIdx;
        }
        return url.substring(0, endIdx);
    }

    private readonly getUserinfo?: Function = (): {userinfo: string, username: string, password: string} => {
        let userinfo: string, username: string, password: string, rest: string;
        [userinfo, rest] = this.getAuthority().split("@");
        if (rest) {
            let info = userinfo.split(":");
            username = info[0];
            password = info[1];
        }
        else
            userinfo = undefined;

        return {userinfo: userinfo, username: username, password: password};
    }

    private readonly getHost?: Function = (): string => {
        let [user, host] = this.getAuthority().split("@");
        return host || user;
    }

    private readonly getHostParts?: Function = (): {hostname: string, port: number} => {
        let [hostname, port] = this.getHost().split(":");
        return {hostname: hostname, port: port ? parseInt(port) : undefined};
    }

    private readonly getHostnameParts?: Function = (): {readonly subdomain: string, readonly domain: string, readonly tld: string} => {
        let hostParts = this.getHostParts();
        let parts = hostParts.hostname.split("."), subdomain: string, domain: string, tld: string;
        if (isNaN(parseInt(parts.join("")))) {
            tld = parts.pop();
            domain = parts.pop();
            subdomain = parts.length > 0 ? parts.join(".") : undefined;
        }
        return {subdomain: subdomain, domain: domain, tld: tld};
    }

    private readonly getPathParts?: Function = (): {path: string, directory: string, file: string} => {
        let resource = this.getResource();

        let path = resource.indexOf("?") > 0 ? resource.substr(0, resource.indexOf("?")) : resource;
        path = path.lastIndexOf("#") < 0 ? path : path.substring(0, path.lastIndexOf("#"));

        let parts = path.length > 1 ? path.split("/") : [];
        let file = parts.length > 0 ? parts.pop() : undefined;
        let directory = parts.length > 0 ? parts.join("/") : "/";

        return {path: path, directory: directory, file: file ? file : undefined};

    }

    private readonly getResource?: Function = (): string => {
        let parts = this.inputUrl.split("://");
        let url = parts.length === 1 ? parts[0] : parts[1];
        let splitIdx = url.indexOf("/");
        splitIdx = splitIdx < 0 ? url.indexOf("?") : splitIdx;
        splitIdx = splitIdx < 0 ? url.indexOf("#") : splitIdx;

        let res = splitIdx < 0 ? "/" : url.substr(splitIdx);
        return ( res.charAt(0) !== "/" ? "/" : "" ) + res;
    }

    private readonly getNormalizedUrl?: Function = (inputUrl?: string): string => {
        let parts = inputUrl.split("://");
        let url = (parts.length === 1 ? parts[0] : parts[1]).replace(/\/\/+/g, "/");
        return (parts.length === 1 ? "" : parts[0] + "://" ) + url;
    }

    //#endregion

    //#region private ctor

    private constructor(inputUrl?: string) {
        this.inputUrl = this.getNormalizedUrl(inputUrl);
    }

    //#endregion
}