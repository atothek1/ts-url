"use strict";
var Url = (function () {
    function Url(inputUrl) {
        var _this = this;
        this.getScheme = function () {
            var scheme = _this.inputUrl.substr(0, _this.inputUrl.indexOf("//") - 1);
            return scheme ? scheme : undefined;
        };
        this.getFragment = function () {
            var idx = _this.inputUrl.lastIndexOf("#");
            if (idx < 0)
                return;
            return _this.inputUrl.substr(idx);
        };
        this.getQueryParts = function () {
            var queryIdx = _this.inputUrl.indexOf("?");
            if (queryIdx < 0)
                return { query: undefined, queryParameters: undefined };
            var queryParameters;
            var hashIdx = _this.inputUrl.indexOf("#");
            var queryString = _this.inputUrl.substring(queryIdx + 1, hashIdx > 0 ? hashIdx : undefined);
            if (queryString) {
                queryParameters = {};
                var pairs = queryString.split("&");
                pairs.forEach(function (item) {
                    var key, value;
                    key = item.substr(0, item.indexOf("="));
                    value = item.substr(item.indexOf("=") + 1);
                    queryParameters[key] = value;
                });
            }
            return { query: queryString, queryParameters: queryParameters };
        };
        this.getAuthority = function () {
            var parts = _this.inputUrl.split("://");
            var url = parts.length === 1 ? parts[0] : parts[1];
            var endIdx = url.indexOf("/");
            if (endIdx < 0) {
                var queryIdx = url.indexOf("?");
                var hashIdx = queryIdx < 0 ? url.indexOf("#") : queryIdx;
                endIdx = hashIdx < 0 ? undefined : hashIdx;
            }
            return url.substring(0, endIdx);
        };
        this.getUserinfo = function () {
            var userinfo, username, password, rest;
            _a = _this.getAuthority().split("@"), userinfo = _a[0], rest = _a[1];
            if (rest) {
                var info = userinfo.split(":");
                username = info[0];
                password = info[1];
            }
            else
                userinfo = undefined;
            return { userinfo: userinfo, username: username, password: password };
            var _a;
        };
        this.getHost = function () {
            var _a = _this.getAuthority().split("@"), user = _a[0], host = _a[1];
            return host || user;
        };
        this.getHostParts = function () {
            var _a = _this.getHost().split(":"), hostname = _a[0], port = _a[1];
            return { hostname: hostname, port: port ? parseInt(port) : undefined };
        };
        this.getHostnameParts = function () {
            var hostParts = _this.getHostParts();
            var parts = hostParts.hostname.split("."), subdomain, domain, tld;
            if (isNaN(parseInt(parts.join("")))) {
                tld = parts.pop();
                domain = parts.pop();
                subdomain = parts.length > 0 ? parts.join(".") : undefined;
            }
            return { subdomain: subdomain, domain: domain, tld: tld };
        };
        this.getPathParts = function () {
            var resource = _this.getResource();
            var path = resource.indexOf("?") > 0 ? resource.substr(0, resource.indexOf("?")) : resource;
            path = path.lastIndexOf("#") < 0 ? path : path.substring(0, path.lastIndexOf("#"));
            var parts = path.length > 1 ? path.split("/") : [];
            var file = parts.length > 0 ? parts.pop() : undefined;
            var directory = parts.length > 0 ? parts.join("/") : "/";
            return { path: path, directory: directory, file: file ? file : undefined };
        };
        this.getResource = function () {
            var parts = _this.inputUrl.split("://");
            var url = parts.length === 1 ? parts[0] : parts[1];
            var splitIdx = url.indexOf("/");
            splitIdx = splitIdx < 0 ? url.indexOf("?") : splitIdx;
            splitIdx = splitIdx < 0 ? url.indexOf("#") : splitIdx;
            var res = splitIdx < 0 ? "/" : url.substr(splitIdx);
            return (res.charAt(0) !== "/" ? "/" : "") + res;
        };
        this.getNormalizedUrl = function (inputUrl) {
            var parts = inputUrl.split("://");
            var url = (parts.length === 1 ? parts[0] : parts[1]).replace(/\/\/+/g, "/");
            return (parts.length === 1 ? "" : parts[0] + "://") + url;
        };
        this.inputUrl = this.getNormalizedUrl(inputUrl);
    }
    Url.fromUrlString = function (inputUrl) {
        var url = new Url(inputUrl);
        var queryParts = url.getQueryParts();
        var hostParts = url.getHostParts();
        var hostnameParts = url.getHostnameParts();
        var pathParts = url.getPathParts();
        var userinfo = url.getUserinfo();
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
    };
    Url.mapPathParameters = function (url, pattern) {
        pattern = pattern.charAt(pattern.length - 1) === "/" ? pattern.substring(0, pattern.length - 1) : pattern;
        var patternParts = pattern.split("/");
        var pathParts = url.path.split("/");
        var pathParameters;
        patternParts.forEach(function (item, index, arr) {
            if (item !== pathParts[index]) {
                if (!pathParts[index])
                    return;
                if (!pathParameters)
                    pathParameters = {};
                var name_1 = item.substring(1, item.length - 1);
                pathParameters[name_1] = pathParts[index];
            }
        });
        return {
            pathParameters: pathParameters,
            queryParameters: url.queryParameters
        };
    };
    Url.prototype.toString = function () {
        return ("\nUrl: {\n    href: " + this.href + ",\n    scheme: " + this.scheme + ",\n    authority: " + this.authority + ",\n    hostname: " + this.hostname + ",\n    port: " + this.port + ",\n    subdomain: " + this.subdomain + ",\n    domain: " + this.domain + ",\n    tld: " + this.tld + ",\n    resource: " + this.resource + ",\n    directory: " + this.directory + ",\n    path: " + this.path + ",\n    file: " + this.file + ",\n    query: " + this.query + ",\n    fragment: " + this.fragment + ",\n    userinfo: " + this.userinfo + ",\n    username: " + this.username + ",\n    password: " + this.password + "\n}").trim();
    };
    return Url;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Url;
