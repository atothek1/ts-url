export type UrlScheme = "http" | "https" | undefined;
export type KeyValueStore<T> = {[key: string]: T};

export class TypeConverter {

    public static convertType(value: string, converter: string): any {

        if (converter.indexOf("bool") >= 0)
            return TypeConverter.toBool(value.trim());

        if (converter.indexOf("uint") >= 0)
            return TypeConverter.toUint(value.trim());

        if (converter.indexOf("int") >= 0)
            return TypeConverter.toInt(value.trim());

        if (converter.indexOf("number") >= 0)
            return TypeConverter.toNumber(value.trim());

        if (converter.indexOf("array") >= 0)
            return TypeConverter.toArray(value.trim(), converter);

        if (converter.indexOf("map") >= 0)
            return TypeConverter.toMap(value.trim(), converter);

        return value;
    }

    public static toBool(value: string): boolean {
        switch (value) {
            case "0":
            case "1":
                return Boolean(parseInt(value));
            case "true":
                return true;
            case "false":
                return false;
            default:
                return Boolean(value);
        }
    }

    public static toInt(value: string): number {
        return parseInt(value);
    }

    public static toUint(value: string): number {
        return Math.abs(parseInt(value));
    }

    public static toNumber(value: string): number {
        return parseFloat(value);
    }

    public static toArray(value: string, typeConverter: string): any[] {
        let delimiter = typeConverter.length === 5 ? "," : typeConverter.charAt(5);
        return value.split(delimiter);
    }

    public static toMap(value: string, typeConverter: string): {} {
        let delimiter = typeConverter.length === 3 ? "," : typeConverter.charAt(3);
        let keyValueList = value.split(delimiter);
        let res = {};
        for (let i = 0, len = keyValueList.length; i < len;) {
            res[keyValueList[i]] = keyValueList[i+1];
            i += 2;
        }
        return res;
    }
}


export class Url {

    public static fromUrlString(inputUrl: string): Url {

        return new Url(inputUrl);
    }

    // supported type converters: bool, int, uint, number, array, map, uuid
    // {paramName:bool}
    // {paramName:int}
    // {paramName:uint}
    // {paramName:number}
    // {paramName:array} (, is default delimiter), {paramName:array;}, {paramName:array#}
    // {paramName:map} (, is default delimiter), {paramName:map;}, {paramName:map#} is a pair mapping, => key,value,key,value,key,value ...
    // https://api.xzited.de:8088/v1/accounts/e955d970-4f47-46c4-9e38-99fe546dd322/orders/16c1ace4-fe84-4f49-906c-341cf8199643/products/1?highlight=true
    // /v1/accounts/{accountUuid}/orders/{ordersUuuid}/products/{productIndex}
    // /v1/accounts/{accountUuid}/orders/{ordersUuuid}/products/{productIndex}
    public static mapPathParameters(url: Url, pattern: string): {pathParameters: KeyValueStore<any>, queryParameters: KeyValueStore<any>} {

        pattern = pattern.charAt(0) === "/" ? pattern : "/" + pattern;
        pattern = pattern.charAt(pattern.length - 1) !== "/" ? pattern : pattern.substring(0, pattern.length - 1);

        let patternParts = pattern.split("/");
        let pathParts = url.path.split("/");
        let pathParameters;


        patternParts.forEach((item, index, arr) => {
            if (item !== pathParts[index]) {

                if (!pathParts[index])
                    return;

                if (!pathParameters)
                    pathParameters = {};

                // extract name, type converter
                let cleanedPattern, name, converter;
                cleanedPattern = item.trim().substring(1, item.length - 1);
                name = cleanedPattern.substr(0, cleanedPattern.indexOf(":") > -1 ? cleanedPattern.indexOf(":") : cleanedPattern.length);
                converter = cleanedPattern.substr(cleanedPattern.indexOf(":") + 1);

                pathParameters[name.trim()] = converter ? TypeConverter.convertType(decodeURIComponent(pathParts[index]), converter) : pathParts[index];
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

    private readonly inputUrl: string;

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

    //#endregion

    //#region private ctor

    private constructor(inputUrl?: string) {

        this.inputUrl = this.normalizeUrl(inputUrl);

        let queryParts = this.getQueryParts();
        let hostParts = this.getHostParts();
        let hostnameParts = this.getHostnameParts();
        let pathParts = this.getPathParts();
        let userinfo = this.getUserinfo();

        this.href = inputUrl;
        this.scheme = this.getScheme();
        this.authority = this.getAuthority();
        this.host = this.getHost();
        this.hostname = hostParts.hostname;
        this.port = hostParts.port;
        this.domain = hostnameParts.domain;
        this.tld = hostnameParts.tld;
        this.subdomain = hostnameParts.subdomain;
        this.resource = this.getResource();
        this.directory = pathParts.directory;
        this.path = pathParts.path;
        this.file = pathParts.file;
        this.query = queryParts.query;
        this.queryParameters = queryParts.queryParameters;
        this.userinfo = userinfo.userinfo;
        this.username = userinfo.username;
        this.password = userinfo.password;
        this.fragment = this.getFragment();
    }

    //#endregion

    //#region methods

    private normalizeUrl(inputUrl?: string): string {
        let parts = inputUrl.split("://");
        let url = (parts.length === 1 ? parts[0] : parts[1]).replace(/\/\/+/g, "/");
        return (parts.length === 1 ? "" : parts[0] + "://" ) + url;
    }

    private getScheme(): UrlScheme {
        let scheme = this.inputUrl.substr(0, this.inputUrl.indexOf("//") - 1);
        return scheme ? scheme as UrlScheme : undefined;
    }

    private getFragment(): string {
        let idx = this.inputUrl.lastIndexOf("#");
        if (idx < 0)
            return;
        return this.inputUrl.substr(idx);
    }

    private getAuthority(): string {
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

    private getQueryParts(): {readonly query: string, readonly queryParameters: KeyValueStore<string>} {

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

    private getUserinfo(): {userinfo: string, username: string, password: string} {
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

    private getHost(): string {
        let [user, host] = this.getAuthority().split("@");
        return host || user;
    }

    private getHostParts(): {hostname: string, port: number} {
        let [hostname, port] = this.getHost().split(":");
        return {hostname: hostname, port: port ? parseInt(port) : undefined};
    }

    private getHostnameParts(): {readonly subdomain: string, readonly domain: string, readonly tld: string} {
        let hostParts = this.getHostParts();
        let parts = hostParts.hostname.split("."), subdomain: string, domain: string, tld: string;
        if (isNaN(parseInt(parts.join("")))) {
            tld = parts.pop();
            domain = parts.pop();
            subdomain = parts.length > 0 ? parts.join(".") : undefined;
        }
        return {subdomain: subdomain, domain: domain, tld: tld};
    }

    private getPathParts(): {path: string, directory: string, file: string} {
        let resource = this.getResource();

        let path = resource.indexOf("?") > 0 ? resource.substr(0, resource.indexOf("?")) : resource;
        path = path.lastIndexOf("#") < 0 ? path : path.substring(0, path.lastIndexOf("#"));

        let parts = path.length > 1 ? path.split("/") : [];
        let file = parts.length > 0 ? parts.pop() : undefined;
        let directory = parts.length > 0 ? parts.join("/") : "/";

        return {path: path, directory: directory, file: file ? file : undefined};

    }

    private getResource(): string {
        let parts = this.inputUrl.split("://");
        let url = parts.length === 1 ? parts[0] : parts[1];
        let splitIdx = url.indexOf("/");
        splitIdx = splitIdx < 0 ? url.indexOf("?") : splitIdx;
        splitIdx = splitIdx < 0 ? url.indexOf("#") : splitIdx;

        let res = splitIdx < 0 ? "/" : url.substr(splitIdx);
        return ( res.charAt(0) !== "/" ? "/" : "" ) + res;
    }

    private getNormalizedUrl(inputUrl?: string): string {
        let parts = inputUrl.split("://");
        let url = (parts.length === 1 ? parts[0] : parts[1]).replace(/\/\/+/g, "/");
        return (parts.length === 1 ? "" : parts[0] + "://" ) + url;
    }

    //#endregion
}