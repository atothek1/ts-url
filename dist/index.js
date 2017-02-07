(function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.l = true;
        return module.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.i = function(value) {
        return value;
    };
    __webpack_require__.d = function(exports, name, getter) {
        if (!__webpack_require__.o(exports, name)) {
            Object.defineProperty(exports, name, {
                configurable: false,
                enumerable: true,
                get: getter
            });
        }
    };
    __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function getDefault() {
            return module["default"];
        } : function getModuleExports() {
            return module;
        };
        __webpack_require__.d(getter, "a", getter);
        return getter;
    };
    __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };
    __webpack_require__.p = "";
    return __webpack_require__(__webpack_require__.s = 1);
})([ function(module, exports, __webpack_require__) {
    "use strict";
    var Url = function() {
        function Url(inputUrl) {
            this.inputUrl = this.normalizeUrl(inputUrl);
            var queryParts = this.getQueryParts();
            var hostParts = this.getHostParts();
            var hostnameParts = this.getHostnameParts();
            var pathParts = this.getPathParts();
            var userinfo = this.getUserinfo();
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
        Url.fromUrlString = function(inputUrl) {
            return new Url(inputUrl);
        };
        Url.mapPathParameters = function(url, pattern) {
            pattern = pattern.charAt(0) === "/" ? pattern : "/" + pattern;
            pattern = pattern.charAt(pattern.length - 1) !== "/" ? pattern : pattern.substring(0, pattern.length - 1);
            var patternParts = pattern.split("/");
            var pathParts = url.path.split("/");
            var pathParameters;
            patternParts.forEach(function(item, index, arr) {
                if (item !== pathParts[index]) {
                    if (!pathParts[index]) return;
                    if (!pathParameters) pathParameters = {};
                    var name = item.substring(1, item.length - 1);
                    pathParameters[name] = pathParts[index];
                }
            });
            return {
                pathParameters: pathParameters,
                queryParameters: url.queryParameters
            };
        };
        Url.prototype.toString = function() {
            return ("\nUrl: {\n    href: " + this.href + ",\n    scheme: " + this.scheme + ",\n    authority: " + this.authority + ",\n    hostname: " + this.hostname + ",\n    port: " + this.port + ",\n    subdomain: " + this.subdomain + ",\n    domain: " + this.domain + ",\n    tld: " + this.tld + ",\n    resource: " + this.resource + ",\n    directory: " + this.directory + ",\n    path: " + this.path + ",\n    file: " + this.file + ",\n    query: " + this.query + ",\n    fragment: " + this.fragment + ",\n    userinfo: " + this.userinfo + ",\n    username: " + this.username + ",\n    password: " + this.password + "\n}").trim();
        };
        Url.prototype.normalizeUrl = function(inputUrl) {
            var parts = inputUrl.split("://");
            var url = (parts.length === 1 ? parts[0] : parts[1]).replace(/\/\/+/g, "/");
            return (parts.length === 1 ? "" : parts[0] + "://") + url;
        };
        Url.prototype.getScheme = function() {
            var scheme = this.inputUrl.substr(0, this.inputUrl.indexOf("//") - 1);
            return scheme ? scheme : undefined;
        };
        Url.prototype.getFragment = function() {
            var idx = this.inputUrl.lastIndexOf("#");
            if (idx < 0) return;
            return this.inputUrl.substr(idx);
        };
        Url.prototype.getAuthority = function() {
            var parts = this.inputUrl.split("://");
            var url = parts.length === 1 ? parts[0] : parts[1];
            var endIdx = url.indexOf("/");
            if (endIdx < 0) {
                var queryIdx = url.indexOf("?");
                var hashIdx = queryIdx < 0 ? url.indexOf("#") : queryIdx;
                endIdx = hashIdx < 0 ? undefined : hashIdx;
            }
            return url.substring(0, endIdx);
        };
        Url.prototype.getQueryParts = function() {
            var queryIdx = this.inputUrl.indexOf("?");
            if (queryIdx < 0) return {
                query: undefined,
                queryParameters: undefined
            };
            var queryParameters;
            var hashIdx = this.inputUrl.indexOf("#");
            var queryString = this.inputUrl.substring(queryIdx + 1, hashIdx > 0 ? hashIdx : undefined);
            if (queryString) {
                queryParameters = {};
                var pairs = queryString.split("&");
                pairs.forEach(function(item) {
                    var key, value;
                    key = item.substr(0, item.indexOf("="));
                    value = item.substr(item.indexOf("=") + 1);
                    queryParameters[key] = value;
                });
            }
            return {
                query: queryString,
                queryParameters: queryParameters
            };
        };
        Url.prototype.getUserinfo = function() {
            var userinfo, username, password, rest;
            _a = this.getAuthority().split("@"), userinfo = _a[0], rest = _a[1];
            if (rest) {
                var info = userinfo.split(":");
                username = info[0];
                password = info[1];
            } else userinfo = undefined;
            return {
                userinfo: userinfo,
                username: username,
                password: password
            };
            var _a;
        };
        Url.prototype.getHost = function() {
            var _a = this.getAuthority().split("@"), user = _a[0], host = _a[1];
            return host || user;
        };
        Url.prototype.getHostParts = function() {
            var _a = this.getHost().split(":"), hostname = _a[0], port = _a[1];
            return {
                hostname: hostname,
                port: port ? parseInt(port) : undefined
            };
        };
        Url.prototype.getHostnameParts = function() {
            var hostParts = this.getHostParts();
            var parts = hostParts.hostname.split("."), subdomain, domain, tld;
            if (isNaN(parseInt(parts.join("")))) {
                tld = parts.pop();
                domain = parts.pop();
                subdomain = parts.length > 0 ? parts.join(".") : undefined;
            }
            return {
                subdomain: subdomain,
                domain: domain,
                tld: tld
            };
        };
        Url.prototype.getPathParts = function() {
            var resource = this.getResource();
            var path = resource.indexOf("?") > 0 ? resource.substr(0, resource.indexOf("?")) : resource;
            path = path.lastIndexOf("#") < 0 ? path : path.substring(0, path.lastIndexOf("#"));
            var parts = path.length > 1 ? path.split("/") : [];
            var file = parts.length > 0 ? parts.pop() : undefined;
            var directory = parts.length > 0 ? parts.join("/") : "/";
            return {
                path: path,
                directory: directory,
                file: file ? file : undefined
            };
        };
        Url.prototype.getResource = function() {
            var parts = this.inputUrl.split("://");
            var url = parts.length === 1 ? parts[0] : parts[1];
            var splitIdx = url.indexOf("/");
            splitIdx = splitIdx < 0 ? url.indexOf("?") : splitIdx;
            splitIdx = splitIdx < 0 ? url.indexOf("#") : splitIdx;
            var res = splitIdx < 0 ? "/" : url.substr(splitIdx);
            return (res.charAt(0) !== "/" ? "/" : "") + res;
        };
        Url.prototype.getNormalizedUrl = function(inputUrl) {
            var parts = inputUrl.split("://");
            var url = (parts.length === 1 ? parts[0] : parts[1]).replace(/\/\/+/g, "/");
            return (parts.length === 1 ? "" : parts[0] + "://") + url;
        };
        return Url;
    }();
    exports.Url = Url;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(__webpack_require__(0));
} ]);