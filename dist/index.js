!function(t) {
    function r(i) {
        if (e[i]) return e[i].exports;
        var n = e[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return t[i].call(n.exports, n, n.exports, r), n.l = !0, n.exports;
    }
    var e = {};
    return r.m = t, r.c = e, r.i = function(t) {
        return t;
    }, r.d = function(t, e, i) {
        r.o(t, e) || Object.defineProperty(t, e, {
            configurable: !1,
            enumerable: !0,
            get: i
        });
    }, r.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return r.d(e, "a", e), e;
    }, r.o = function(t, r) {
        return Object.prototype.hasOwnProperty.call(t, r);
    }, r.p = "", r(r.s = 1);
}([ function(t, r, e) {
    "use strict";
    var i = function() {
        function t(t) {
            this.inputUrl = this.normalizeUrl(t);
            var r = this.getQueryParts(), e = this.getHostParts(), i = this.getHostnameParts(), n = this.getPathParts(), s = this.getUserinfo();
            this.href = t, this.scheme = this.getScheme(), this.authority = this.getAuthority(), 
            this.host = this.getHost(), this.hostname = e.hostname, this.port = e.port, this.domain = i.domain, 
            this.tld = i.tld, this.subdomain = i.subdomain, this.resource = this.getResource(), 
            this.directory = n.directory, this.path = n.path, this.file = n.file, this.query = r.query, 
            this.queryParameters = r.queryParameters, this.userinfo = s.userinfo, this.username = s.username, 
            this.password = s.password, this.fragment = this.getFragment();
        }
        return t.fromUrlString = function(r) {
            return new t(r);
        }, t.mapPathParameters = function(t, r) {
            r = "/" === r.charAt(0) ? r : "/" + r, r = "/" !== r.charAt(r.length - 1) ? r : r.substring(0, r.length - 1);
            var e, i = r.split("/"), n = t.path.split("/");
            return i.forEach(function(t, r, i) {
                if (t !== n[r]) {
                    if (!n[r]) return;
                    e || (e = {});
                    var s = t.substring(1, t.length - 1);
                    e[s] = n[r];
                }
            }), {
                pathParameters: e,
                queryParameters: t.queryParameters
            };
        }, t.prototype.toString = function() {
            return ("\nUrl: {\n    href: " + this.href + ",\n    scheme: " + this.scheme + ",\n    authority: " + this.authority + ",\n    hostname: " + this.hostname + ",\n    port: " + this.port + ",\n    subdomain: " + this.subdomain + ",\n    domain: " + this.domain + ",\n    tld: " + this.tld + ",\n    resource: " + this.resource + ",\n    directory: " + this.directory + ",\n    path: " + this.path + ",\n    file: " + this.file + ",\n    query: " + this.query + ",\n    fragment: " + this.fragment + ",\n    userinfo: " + this.userinfo + ",\n    username: " + this.username + ",\n    password: " + this.password + "\n}").trim();
        }, t.prototype.normalizeUrl = function(t) {
            var r = t.split("://"), e = (1 === r.length ? r[0] : r[1]).replace(/\/\/+/g, "/");
            return (1 === r.length ? "" : r[0] + "://") + e;
        }, t.prototype.getScheme = function() {
            var t = this.inputUrl.substr(0, this.inputUrl.indexOf("//") - 1);
            return t ? t : void 0;
        }, t.prototype.getFragment = function() {
            var t = this.inputUrl.lastIndexOf("#");
            if (!(t < 0)) return this.inputUrl.substr(t);
        }, t.prototype.getAuthority = function() {
            var t = this.inputUrl.split("://"), r = 1 === t.length ? t[0] : t[1], e = r.indexOf("/");
            if (e < 0) {
                var i = r.indexOf("?"), n = i < 0 ? r.indexOf("#") : i;
                e = n < 0 ? void 0 : n;
            }
            return r.substring(0, e);
        }, t.prototype.getQueryParts = function() {
            var t = this.inputUrl.indexOf("?");
            if (t < 0) return {
                query: void 0,
                queryParameters: void 0
            };
            var r, e = this.inputUrl.indexOf("#"), i = this.inputUrl.substring(t + 1, e > 0 ? e : void 0);
            if (i) {
                r = {};
                var n = i.split("&");
                n.forEach(function(t) {
                    var e, i;
                    e = t.substr(0, t.indexOf("=")), i = t.substr(t.indexOf("=") + 1), r[e] = i;
                });
            }
            return {
                query: i,
                queryParameters: r
            };
        }, t.prototype.getUserinfo = function() {
            var t, r, e, i;
            if (s = this.getAuthority().split("@"), t = s[0], i = s[1], i) {
                var n = t.split(":");
                r = n[0], e = n[1];
            } else t = void 0;
            return {
                userinfo: t,
                username: r,
                password: e
            };
            var s;
        }, t.prototype.getHost = function() {
            var t = this.getAuthority().split("@"), r = t[0], e = t[1];
            return e || r;
        }, t.prototype.getHostParts = function() {
            var t = this.getHost().split(":"), r = t[0], e = t[1];
            return {
                hostname: r,
                port: e ? parseInt(e) : void 0
            };
        }, t.prototype.getHostnameParts = function() {
            var t, r, e, i = this.getHostParts(), n = i.hostname.split(".");
            return isNaN(parseInt(n.join(""))) && (e = n.pop(), r = n.pop(), t = n.length > 0 ? n.join(".") : void 0), 
            {
                subdomain: t,
                domain: r,
                tld: e
            };
        }, t.prototype.getPathParts = function() {
            var t = this.getResource(), r = t.indexOf("?") > 0 ? t.substr(0, t.indexOf("?")) : t;
            r = r.lastIndexOf("#") < 0 ? r : r.substring(0, r.lastIndexOf("#"));
            var e = r.length > 1 ? r.split("/") : [], i = e.length > 0 ? e.pop() : void 0, n = e.length > 0 ? e.join("/") : "/";
            return {
                path: r,
                directory: n,
                file: i ? i : void 0
            };
        }, t.prototype.getResource = function() {
            var t = this.inputUrl.split("://"), r = 1 === t.length ? t[0] : t[1], e = r.indexOf("/");
            e = e < 0 ? r.indexOf("?") : e, e = e < 0 ? r.indexOf("#") : e;
            var i = e < 0 ? "/" : r.substr(e);
            return ("/" !== i.charAt(0) ? "/" : "") + i;
        }, t.prototype.getNormalizedUrl = function(t) {
            var r = t.split("://"), e = (1 === r.length ? r[0] : r[1]).replace(/\/\/+/g, "/");
            return (1 === r.length ? "" : r[0] + "://") + e;
        }, t;
    }();
    r.Url = i;
}, function(t, r, e) {
    "use strict";
    function i(t) {
        for (var e in t) r.hasOwnProperty(e) || (r[e] = t[e]);
    }
    i(e(0));
} ]);