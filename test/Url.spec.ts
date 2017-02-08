import {test, suite} from "mocha-typescript";
import {expect} from "chai";
import {Url} from "../src/Url";

@suite
export class UrlParserTest {

    @test("http://xzited.de/")
    public parseUrl(): any {

        let url: string = "http://xzited.de/";
        let expected = {
            href: url,
            scheme: "http",
            authority: "xzited.de",
            host: "xzited.de",
            hostname: "xzited.de",
            port: undefined,
            domain: "xzited",
            tld: "de",
            subdomain: undefined,
            resource: "/",
            directory: "/",
            path: "/",
            file: undefined,
            query: undefined,
            queryParameters: undefined,
            userinfo: undefined,
            username: undefined,
            password: undefined,
            fragment: undefined
        };
        let actual = Url.fromUrlString(url);

        this.test(expected, actual);
    }

    @test("xzited.de/")
    public parseUrlWithoutScheme(): any {

        let url: string = "xzited.de/";
        let expected = {
            href: url,
            scheme: undefined,
            authority: "xzited.de",
            host: "xzited.de",
            hostname: "xzited.de",
            port: undefined,
            domain: "xzited",
            tld: "de",
            subdomain: undefined,
            resource: "/",
            directory: "/",
            path: "/",
            file: undefined,
            query: undefined,
            queryParameters: undefined,
            userinfo: undefined,
            username: undefined,
            password: undefined,
            fragment: undefined
        };
        let actual = Url.fromUrlString(url);

        this.test(expected, actual);
    }

    @test("xzited.de")
    public parseUrlWithoutSchemeAndSlash(): any {

        let url: string = "xzited.de";
        let expected = {
            href: url,
            scheme: undefined,
            authority: "xzited.de",
            host: "xzited.de",
            hostname: "xzited.de",
            port: undefined,
            domain: "xzited",
            tld: "de",
            subdomain: undefined,
            resource: "/",
            directory: "/",
            path: "/",
            file: undefined,
            query: undefined,
            queryParameters: undefined,
            userinfo: undefined,
            username: undefined,
            password: undefined,
            fragment: undefined
        };
        let actual = Url.fromUrlString(url);

        this.test(expected, actual);
    }

    @test("http://192.168.0.100/")
    public parseIpAsUrl(): any {

        let url: string = "http://192.168.0.100/";
        let expected = {
            href: url,
            scheme: "http",
            authority: "192.168.0.100",
            host: "192.168.0.100",
            hostname: "192.168.0.100",
            port: undefined,
            domain: undefined,
            tld: undefined,
            subdomain: undefined,
            resource: "/",
            directory: "/",
            path: "/",
            file: undefined,
            query: undefined,
            queryParameters: undefined,
            userinfo: undefined,
            username: undefined,
            password: undefined,
            fragment: undefined
        };
        let actual = Url.fromUrlString(url);

        this.test(expected, actual);
    }

    @test("192.168.0.100/")
    public parseIpAsUrlWithoutScheme(): any {

        let url: string = "192.168.0.100/";
        let expected = {
            href: url,
            scheme: undefined,
            authority: "192.168.0.100",
            host: "192.168.0.100",
            hostname: "192.168.0.100",
            port: undefined,
            domain: undefined,
            tld: undefined,
            subdomain: undefined,
            resource: "/",
            directory: "/",
            path: "/",
            file: undefined,
            query: undefined,
            queryParameters: undefined,
            userinfo: undefined,
            username: undefined,
            password: undefined,
            fragment: undefined
        };
        let actual = Url.fromUrlString(url);

        this.test(expected, actual);
    }

    @test("http://192.168.0.100:64332/")
    public parseIpAsUrlWithPort(): any {

        let url: string = "http://192.168.0.100:64332/";
        let expected = {
            href: url,
            scheme: "http",
            authority: "192.168.0.100:64332",
            host: "192.168.0.100:64332",
            hostname: "192.168.0.100",
            port: 64332,
            domain: undefined,
            tld: undefined,
            subdomain: undefined,
            resource: "/",
            directory: "/",
            path: "/",
            file: undefined,
            query: undefined,
            queryParameters: undefined,
            userinfo: undefined,
            username: undefined,
            password: undefined,
            fragment: undefined
        };
        let actual = Url.fromUrlString(url);

        this.test(expected, actual);
    }

    @test("http://testname@192.168.0.100:64332/")
    public parseIpAsUrlWithUsernameAndPort(): any {

        let url: string = "http://testname@192.168.0.100:64332/";
        let expected = {
            href: url,
            scheme: "http",
            authority: "testname@192.168.0.100:64332",
            host: "192.168.0.100:64332",
            hostname: "192.168.0.100",
            port: 64332,
            domain: undefined,
            tld: undefined,
            subdomain: undefined,
            resource: "/",
            directory: "/",
            path: "/",
            file: undefined,
            query: undefined,
            queryParameters: undefined,
            userinfo: "testname",
            username: "testname",
            password: undefined,
            fragment: undefined
        };
        let actual = Url.fromUrlString(url);

        this.test(expected, actual);
    }

    @test("http://testname@192.168.0.100:64332/#test-info")
    public parseIpAsUrlWithUsernameAndPortAndFragment(): any {

        let url: string = "http://testname@192.168.0.100:64332/#test-info";
        let expected = {
            href: url,
            scheme: "http",
            authority: "testname@192.168.0.100:64332",
            host: "192.168.0.100:64332",
            hostname: "192.168.0.100",
            port: 64332,
            domain: undefined,
            tld: undefined,
            subdomain: undefined,
            resource: "/#test-info",
            directory: "/",
            path: "/",
            file: undefined,
            query: undefined,
            queryParameters: undefined,
            userinfo: "testname",
            username: "testname",
            password: undefined,
            fragment: "#test-info"
        };
        let actual = Url.fromUrlString(url);

        this.test(expected, actual);
    }

    @test("http://testname:testpass@192.168.0.100:64332#test-info")
    public parseIpAsUrlWithUserinfoAndPortAndFragment(): any {

        let url: string = "http://testname:testpass@192.168.0.100:64332#test-info";
        let expected = {
            href: url,
            scheme: "http",
            authority: "testname:testpass@192.168.0.100:64332",
            host: "192.168.0.100:64332",
            hostname: "192.168.0.100",
            port: 64332,
            domain: undefined,
            tld: undefined,
            subdomain: undefined,
            resource: "/#test-info",
            directory: "/",
            path: "/",
            file: undefined,
            query: undefined,
            queryParameters: undefined,
            userinfo: "testname:testpass",
            username: "testname",
            password: "testpass",
            fragment: "#test-info"
        };
        let actual = Url.fromUrlString(url);

        this.test(expected, actual);
    }

    @test("http://www.xzited.de/")
    public parseUrlWithSubdomain(): any {

        let url: string = "http://www.xzited.de/";
        let expected = {
            href: url,
            scheme: "http",
            authority: "www.xzited.de",
            host: "www.xzited.de",
            hostname: "www.xzited.de",
            port: undefined,
            domain: "xzited",
            tld: "de",
            subdomain: "www",
            resource: "/",
            directory: "/",
            path: "/",
            file: undefined,
            query: undefined,
            queryParameters: undefined,
            userinfo: undefined,
            username: undefined,
            password: undefined,
            fragment: undefined
        };
        let actual = Url.fromUrlString(url);

        this.test(expected, actual);
    }

    @test("www.xzited.de/")
    public parseUrlWithoutSchemeWithSubdomain(): any {

        let url: string = "www.xzited.de/";
        let expected = {
            href: url,
            scheme: undefined,
            authority: "www.xzited.de",
            host: "www.xzited.de",
            hostname: "www.xzited.de",
            port: undefined,
            domain: "xzited",
            tld: "de",
            subdomain: "www",
            resource: "/",
            directory: "/",
            path: "/",
            file: undefined,
            query: undefined,
            queryParameters: undefined,
            userinfo: undefined,
            username: undefined,
            password: undefined,
            fragment: undefined
        };
        let actual = Url.fromUrlString(url);

        this.test(expected, actual);
    }

    @test("www.api.xzited.de")
    public parseUrlWithoutSchemeAndSlashWithSubdomain(): any {

        let url: string = "www.api.xzited.de";
        let expected = {
            href: url,
            scheme: undefined,
            authority: "www.api.xzited.de",
            host: "www.api.xzited.de",
            hostname: "www.api.xzited.de",
            port: undefined,
            domain: "xzited",
            tld: "de",
            subdomain: "www.api",
            resource: "/",
            directory: "/",
            path: "/",
            file: undefined,
            query: undefined,
            queryParameters: undefined,
            userinfo: undefined,
            username: undefined,
            password: undefined,
            fragment: undefined
        };
        let actual = Url.fromUrlString(url);

        this.test(expected, actual);
    }

    @test("https://www.xzited.de:8088/")
    public parseUrlWithSubdomainAndPort(): any {

        let url: string = "https://www.xzited.de:8088/";
        let expected = {
            href: url,
            scheme: "https",
            authority: "www.xzited.de:8088",
            host: "www.xzited.de:8088",
            hostname: "www.xzited.de",
            port: 8088,
            domain: "xzited",
            tld: "de",
            subdomain: "www",
            resource: "/",
            directory: "/",
            path: "/",
            file: undefined,
            query: undefined,
            queryParameters: undefined,
            userinfo: undefined,
            username: undefined,
            password: undefined,
            fragment: undefined
        };
        let actual = Url.fromUrlString(url);

        this.test(expected, actual);
    }

    @test("http://testname:testpass@xzited.de/")
    public parseUrlWithAuth(): any {

        let url: string = "http://testname:testpass@xzited.de/";
        let expected = {
            href: url,
            scheme: "http",
            authority: "testname:testpass@xzited.de",
            host: "xzited.de",
            hostname: "xzited.de",
            port: undefined,
            domain: "xzited",
            tld: "de",
            subdomain: undefined,
            resource: "/",
            directory: "/",
            path: "/",
            file: undefined,
            query: undefined,
            queryParameters: undefined,
            userinfo: "testname:testpass",
            username: "testname",
            password: "testpass",
            fragment: undefined
        };
        let actual = Url.fromUrlString(url);

        this.test(expected, actual);
    }

    @test("http://testname@xzited.de/")
    public parseUrlWithUserName(): any {

        let url: string = "http://testname@xzited.de/";
        let expected = {
            href: url,
            scheme: "http",
            authority: "testname@xzited.de",
            host: "xzited.de",
            hostname: "xzited.de",
            port: undefined,
            domain: "xzited",
            tld: "de",
            subdomain: undefined,
            resource: "/",
            directory: "/",
            path: "/",
            file: undefined,
            query: undefined,
            queryParameters: undefined,
            userinfo: "testname",
            username: "testname",
            password: undefined,
            fragment: undefined
        };
        let actual = Url.fromUrlString(url);

        this.test(expected, actual);
    }

    @test("http://testname:testpass@www.xzited.de/")
    public parseUrlWithAuthAndSubdomain(): any {

        let url: string = "http://testname:testpass@www.xzited.de/";
        let expected = {
            href: url,
            scheme: "http",
            authority: "testname:testpass@www.xzited.de",
            host: "www.xzited.de",
            hostname: "www.xzited.de",
            port: undefined,
            domain: "xzited",
            tld: "de",
            subdomain: "www",
            resource: "/",
            directory: "/",
            path: "/",
            file: undefined,
            query: undefined,
            queryParameters: undefined,
            userinfo: "testname:testpass",
            username: "testname",
            password: "testpass",
            fragment: undefined
        };
        let actual = Url.fromUrlString(url);

        this.test(expected, actual);
    }

    @test("http://testname:testpass@www.xzited.de:8088/")
    public parseUrlWithAuthAndSubdomainAndPort(): any {

        let url: string = "http://testname:testpass@www.xzited.de:8088/";
        let expected = {
            href: url,
            scheme: "http",
            authority: "testname:testpass@www.xzited.de:8088",
            host: "www.xzited.de:8088",
            hostname: "www.xzited.de",
            port: 8088,
            domain: "xzited",
            tld: "de",
            subdomain: "www",
            resource: "/",
            directory: "/",
            path: "/",
            file: undefined,
            query: undefined,
            queryParameters: undefined,
            userinfo: "testname:testpass",
            username: "testname",
            password: "testpass",
            fragment: undefined
        };
        let actual = Url.fromUrlString(url);

        this.test(expected, actual);
    }

    @test("http://testname:testpass@www.xzited.de:8088/path/to/something")
    public parseUrlWithAuthAndSubdomainAndPortAndPath(): any {

        let url: string = "http://testname:testpass@www.xzited.de:8088/path/to/something";
        let expected = {
            href: url,
            scheme: "http",
            authority: "testname:testpass@www.xzited.de:8088",
            host: "www.xzited.de:8088",
            hostname: "www.xzited.de",
            port: 8088,
            domain: "xzited",
            tld: "de",
            subdomain: "www",
            resource: "/path/to/something",
            directory: "/path/to",
            path: "/path/to/something",
            file: "something",
            query: undefined,
            queryParameters: undefined,
            userinfo: "testname:testpass",
            username: "testname",
            password: "testpass",
            fragment: undefined
        };
        let actual = Url.fromUrlString(url);

        this.test(expected, actual);
    }

    @test("http://testname:testpass@www.xzited.de:8088/path/to/something/index.html")
    public parseUrlWithAuthAndSubdomainAndPortAndPathAndFile(): any {

        let url: string = "http://testname:testpass@www.xzited.de:8088/path/to/something/index.html";
        let expected = {
            href: url,
            scheme: "http",
            authority: "testname:testpass@www.xzited.de:8088",
            host: "www.xzited.de:8088",
            hostname: "www.xzited.de",
            port: 8088,
            domain: "xzited",
            tld: "de",
            subdomain: "www",
            resource: "/path/to/something/index.html",
            directory: "/path/to/something",
            path: "/path/to/something/index.html",
            file: "index.html",
            query: undefined,
            queryParameters: undefined,
            userinfo: "testname:testpass",
            username: "testname",
            password: "testpass",
            fragment: undefined
        };
        let actual = Url.fromUrlString(url);

        this.test(expected, actual);
    }

    @test("http://testname:testpass@www.xzited.de:8088/path/to/something/index.html#info")
    public parseUrlWithAuthAndSubdomainAndPortAndPathAndFileAndHash(): any {

        let url: string = "http://testname:testpass@www.xzited.de:8088/path/to/something/index.html#info";
        let expected = {
            href: url,
            scheme: "http",
            authority: "testname:testpass@www.xzited.de:8088",
            host: "www.xzited.de:8088",
            hostname: "www.xzited.de",
            port: 8088,
            domain: "xzited",
            tld: "de",
            subdomain: "www",
            resource: "/path/to/something/index.html#info",
            directory: "/path/to/something",
            path: "/path/to/something/index.html",
            file: "index.html",
            query: undefined,
            queryParameters: undefined,
            userinfo: "testname:testpass",
            username: "testname",
            password: "testpass",
            fragment: "#info"
        };
        let actual = Url.fromUrlString(url);

        this.test(expected, actual);
    }

    @test("http://testname:testpass@www.xzited.de:8088#info")
    public parseUrlWithAuthAndSubdomainAndPortAndHash(): any {

        let url: string = "http://testname:testpass@www.xzited.de:8088#info";
        let expected = {
            href: url,
            scheme: "http",
            authority: "testname:testpass@www.xzited.de:8088",
            host: "www.xzited.de:8088",
            hostname: "www.xzited.de",
            port: 8088,
            domain: "xzited",
            tld: "de",
            subdomain: "www",
            resource: "/#info",
            directory: "/",
            path: "/",
            file: undefined,
            query: undefined,
            queryParameters: undefined,
            userinfo: "testname:testpass",
            username: "testname",
            password: "testpass",
            fragment: "#info"
        };
        let actual = Url.fromUrlString(url);

        this.test(expected, actual);
    }

    @test("http://testname:testpass@www.xzited.de:8088/?filter=available&order=asc&orderBy=price#info")
    public parseUrlWithAuthAndSubdomainAndPortAndQueryHash(): any {

        let url: string = "http://testname:testpass@www.xzited.de:8088/?filter=available&order=asc&orderBy=price#info";
        let expected = {
            href: url,
            scheme: "http",
            authority: "testname:testpass@www.xzited.de:8088",
            host: "www.xzited.de:8088",
            hostname: "www.xzited.de",
            port: 8088,
            domain: "xzited",
            tld: "de",
            subdomain: "www",
            resource: "/?filter=available&order=asc&orderBy=price#info",
            directory: "/",
            path: "/",
            file: undefined,
            query: "filter=available&order=asc&orderBy=price",
            queryParameters: {
                filter: "available",
                order: "asc",
                orderBy: "price"
            },
            userinfo: "testname:testpass",
            username: "testname",
            password: "testpass",
            fragment: "#info"
        };
        let actual = Url.fromUrlString(url);

        this.test(expected, actual);

        expect(actual.queryParameters["filter"]).to.be.equal(expected.queryParameters["filter"]);
        expect(actual.queryParameters["order"]).to.be.equal(expected.queryParameters["order"]);
        expect(actual.queryParameters["orderBy"]).to.be.equal(expected.queryParameters["orderBy"]);
    }

    @test("http://testname:testpass@www.xzited.de:8088/path/to/something/index.html?filter=available&order=asc&orderBy=price#info")
    public parseUrlWithAuthAndSubdomainAndPortAndPathAndFileAndQueryAndHash(): any {

        let url: string = "http://testname:testpass@www.xzited.de:8088/path/to/something/index.html?filter=available&order=asc&orderBy=price#info";
        let expected = {
            href: url,
            scheme: "http",
            authority: "testname:testpass@www.xzited.de:8088",
            host: "www.xzited.de:8088",
            hostname: "www.xzited.de",
            port: 8088,
            domain: "xzited",
            tld: "de",
            subdomain: "www",
            resource: "/path/to/something/index.html?filter=available&order=asc&orderBy=price#info",
            directory: "/path/to/something",
            path: "/path/to/something/index.html",
            file: "index.html",
            query: "filter=available&order=asc&orderBy=price",
            queryParameters: {
                filter: "available",
                order: "asc",
                orderBy: "price"
            },
            userinfo: "testname:testpass",
            username: "testname",
            password: "testpass",
            fragment: "#info"
        };
        let actual = Url.fromUrlString(url);

        this.test(expected, actual);

        expect(actual.queryParameters["filter"]).to.be.equal(expected.queryParameters["filter"]);
        expect(actual.queryParameters["order"]).to.be.equal(expected.queryParameters["order"]);
        expect(actual.queryParameters["orderBy"]).to.be.equal(expected.queryParameters["orderBy"]);
    }

    @test("http://testname@www.xzited.de:8088/path/to/something/index.html?filter=available&order=asc&orderBy=price#info")
    public parseUrlWithUserNameAndSubdomainAndPortAndPathAndFileAndQueryAndHash(): any {

        let url: string = "http://testname@www.xzited.de:8088/path/to/something/index.html?filter=available&order=asc&orderBy=price#info";
        let expected = {
            href: url,
            scheme: "http",
            authority: "testname@www.xzited.de:8088",
            host: "www.xzited.de:8088",
            hostname: "www.xzited.de",
            port: 8088,
            domain: "xzited",
            tld: "de",
            subdomain: "www",
            resource: "/path/to/something/index.html?filter=available&order=asc&orderBy=price#info",
            directory: "/path/to/something",
            path: "/path/to/something/index.html",
            file: "index.html",
            query: "filter=available&order=asc&orderBy=price",
            queryParameters: {
                filter: "available",
                order: "asc",
                orderBy: "price"
            },
            userinfo: "testname",
            username: "testname",
            password: undefined,
            fragment: "#info"
        };
        let actual = Url.fromUrlString(url);

        this.test(expected, actual);

        expect(actual.queryParameters["filter"]).to.be.equal(expected.queryParameters["filter"]);
        expect(actual.queryParameters["order"]).to.be.equal(expected.queryParameters["order"]);
        expect(actual.queryParameters["orderBy"]).to.be.equal(expected.queryParameters["orderBy"]);
    }

    @test("http://testname:testpass@xzited.de:8088/path/to/something/?filter=available,black,new&order=asc&orderBy=price#info")
    public parseUrlWithAuthAndPortAndPathAndQueryAndHash(): any {

        let url: string = "http://testname:testpass@xzited.de:8088/path/to/something/?filter=available,black,new&order=asc&orderBy=price#info";
        let expected = {
            href: url,
            scheme: "http",
            authority: "testname:testpass@xzited.de:8088",
            host: "xzited.de:8088",
            hostname: "xzited.de",
            port: 8088,
            domain: "xzited",
            tld: "de",
            subdomain: undefined,
            resource: "/path/to/something/?filter=available,black,new&order=asc&orderBy=price#info",
            directory: "/path/to/something",
            path: "/path/to/something/",
            file: undefined,
            query: "filter=available,black,new&order=asc&orderBy=price",
            queryParameters: {
                filter: "available,black,new",
                order: "asc",
                orderBy: "price"
            },
            userinfo: "testname:testpass",
            username: "testname",
            password: "testpass",
            fragment: "#info"
        };
        let actual = Url.fromUrlString(url);

        this.test(expected, actual);

        expect(actual.queryParameters["filter"]).to.be.equal(expected.queryParameters["filter"]);
        expect(actual.queryParameters["order"]).to.be.equal(expected.queryParameters["order"]);
        expect(actual.queryParameters["orderBy"]).to.be.equal(expected.queryParameters["orderBy"]);
    }

    @test("testname:testpass@xzited.de:8088/path/to/something/?filter=available,black,new&order=asc&orderBy=price#info")
    public parseUrlWithoutSchemeWithAuthAndPortAndPathAndQueryAndHash(): any {

        let url: string = "testname:testpass@xzited.de:8088/path/to/something/?filter=available,black,new&order=asc&orderBy=price#info";
        let expected = {
            href: url,
            scheme: undefined,
            authority: "testname:testpass@xzited.de:8088",
            host: "xzited.de:8088",
            hostname: "xzited.de",
            port: 8088,
            domain: "xzited",
            tld: "de",
            subdomain: undefined,
            resource: "/path/to/something/?filter=available,black,new&order=asc&orderBy=price#info",
            directory: "/path/to/something",
            path: "/path/to/something/",
            file: undefined,
            query: "filter=available,black,new&order=asc&orderBy=price",
            queryParameters: {
                filter: "available,black,new",
                order: "asc",
                orderBy: "price"
            },
            userinfo: "testname:testpass",
            username: "testname",
            password: "testpass",
            fragment: "#info"
        };
        let actual = Url.fromUrlString(url);

        this.test(expected, actual);

        expect(actual.queryParameters["filter"]).to.be.equal(expected.queryParameters["filter"]);
        expect(actual.queryParameters["order"]).to.be.equal(expected.queryParameters["order"]);
        expect(actual.queryParameters["orderBy"]).to.be.equal(expected.queryParameters["orderBy"]);
    }

    @test("http://testname:testpass@www.xzited.de?filter=available&order=asc&orderBy=price#info")
    public parseUrlWithAuthAndSubdomainAndQueryAndHash(): any {

        let url: string = "http://testname:testpass@www.xzited.de?filter=available&order=asc&orderBy=price#info";
        let expected = {
            href: url,
            scheme: "http",
            authority: "testname:testpass@www.xzited.de",
            host: "www.xzited.de",
            hostname: "www.xzited.de",
            port: undefined,
            domain: "xzited",
            tld: "de",
            subdomain: "www",
            resource: "/?filter=available&order=asc&orderBy=price#info",
            directory: "/",
            path: "/",
            file: undefined,
            query: "filter=available&order=asc&orderBy=price",
            queryParameters: {
                filter: "available",
                order: "asc",
                orderBy: "price"
            },
            userinfo: "testname:testpass",
            username: "testname",
            password: "testpass",
            fragment: "#info"
        };
        let actual = Url.fromUrlString(url);

        this.test(expected, actual);

        expect(actual.queryParameters["filter"]).to.be.equal(expected.queryParameters["filter"]);
        expect(actual.queryParameters["order"]).to.be.equal(expected.queryParameters["order"]);
        expect(actual.queryParameters["orderBy"]).to.be.equal(expected.queryParameters["orderBy"]);
    }

    @test("http://testname:testpass@www.xzited.de?filter=available&order=asc&orderBy=price")
    public parseUrlWithAuthAndSubdomainAndQuery(): any {

        let url: string = "http://testname:testpass@www.xzited.de?filter=available&order=asc&orderBy=price";
        let expected = {
            href: url,
            scheme: "http",
            authority: "testname:testpass@www.xzited.de",
            host: "www.xzited.de",
            hostname: "www.xzited.de",
            port: undefined,
            domain: "xzited",
            tld: "de",
            subdomain: "www",
            resource: "/?filter=available&order=asc&orderBy=price",
            directory: "/",
            path: "/",
            file: undefined,
            query: "filter=available&order=asc&orderBy=price",
            queryParameters: {
                filter: "available",
                order: "asc",
                orderBy: "price"
            },
            userinfo: "testname:testpass",
            username: "testname",
            password: "testpass",
            fragment: undefined
        };
        let actual = Url.fromUrlString(url);

        this.test(expected, actual);

        expect(actual.queryParameters["filter"]).to.be.equal(expected.queryParameters["filter"]);
        expect(actual.queryParameters["order"]).to.be.equal(expected.queryParameters["order"]);
        expect(actual.queryParameters["orderBy"]).to.be.equal(expected.queryParameters["orderBy"]);
    }

    @test("http://testname:testpass@www.xzited.de:8088/path/to/something/?filter=available&order=asc&orderBy=price#info")
    public parseUrlWithAuthAndSubdomainAndPortAndPathAndQueryAndHash(): any {

        let url: string = "http://testname:testpass@www.xzited.de:8088/path/to/something/?filter=available&order=asc&orderBy=price#info";
        let expected = {
            href: url,
            scheme: "http",
            authority: "testname:testpass@www.xzited.de:8088",
            host: "www.xzited.de:8088",
            hostname: "www.xzited.de",
            port: 8088,
            domain: "xzited",
            tld: "de",
            subdomain: "www",
            resource: "/path/to/something/?filter=available&order=asc&orderBy=price#info",
            directory: "/path/to/something",
            path: "/path/to/something/",
            file: undefined,
            query: "filter=available&order=asc&orderBy=price",
            queryParameters: {
                filter: "available",
                order: "asc",
                orderBy: "price"
            },
            userinfo: "testname:testpass",
            username: "testname",
            password: "testpass",
            fragment: "#info"
        };
        let actual = Url.fromUrlString(url);

        this.test(expected, actual);

        expect(actual.queryParameters["filter"]).to.be.equal(expected.queryParameters["filter"]);
        expect(actual.queryParameters["order"]).to.be.equal(expected.queryParameters["order"]);
        expect(actual.queryParameters["orderBy"]).to.be.equal(expected.queryParameters["orderBy"]);
    }

    @test("http://www.xzited.de:8088/path/to/something/index.html?filter=available&order=asc&orderBy=price#info")
    public parseUrlWithSubdomainAndPortAndPathAndFileAndQueryAndHash(): any {

        let url: string = "http://www.xzited.de:8088/path/to/something/index.html?filter=available&order=asc&orderBy=price#info";
        let expected = {
            href: url,
            scheme: "http",
            authority: "www.xzited.de:8088",
            host: "www.xzited.de:8088",
            hostname: "www.xzited.de",
            port: 8088,
            domain: "xzited",
            tld: "de",
            subdomain: "www",
            resource: "/path/to/something/index.html?filter=available&order=asc&orderBy=price#info",
            directory: "/path/to/something",
            path: "/path/to/something/index.html",
            file: "index.html",
            query: "filter=available&order=asc&orderBy=price",
            queryParameters: {
                filter: "available",
                order: "asc",
                orderBy: "price"
            },
            userinfo: undefined,
            username: undefined,
            password: undefined,
            fragment: "#info"
        };
        let actual = Url.fromUrlString(url);

        this.test(expected, actual);

        expect(actual.queryParameters["filter"]).to.be.equal(expected.queryParameters["filter"]);
        expect(actual.queryParameters["order"]).to.be.equal(expected.queryParameters["order"]);
        expect(actual.queryParameters["orderBy"]).to.be.equal(expected.queryParameters["orderBy"]);
    }

    @test("http://www.xzited.de/path/to/something/index.html?filter=available&order=asc&orderBy=price#info")
    public parseUrlWithSubdomainAndPathAndFileAndQueryAndHash(): any {

        let url: string = "http://www.xzited.de////path//to/something///index.html?filter=available&order=asc&orderBy=price#info";
        let expected = {
            href: url,
            scheme: "http",
            authority: "www.xzited.de",
            host: "www.xzited.de",
            hostname: "www.xzited.de",
            port: undefined,
            domain: "xzited",
            tld: "de",
            subdomain: "www",
            resource: "/path/to/something/index.html?filter=available&order=asc&orderBy=price#info",
            directory: "/path/to/something",
            path: "/path/to/something/index.html",
            file: "index.html",
            query: "filter=available&order=asc&orderBy=price",
            queryParameters: {
                filter: "available",
                order: "asc",
                orderBy: "price"
            },
            userinfo: undefined,
            username: undefined,
            password: undefined,
            fragment: "#info"
        };
        let actual = Url.fromUrlString(url);

        this.test(expected, actual);

        expect(actual.queryParameters["filter"]).to.be.equal(expected.queryParameters["filter"]);
        expect(actual.queryParameters["order"]).to.be.equal(expected.queryParameters["order"]);
        expect(actual.queryParameters["orderBy"]).to.be.equal(expected.queryParameters["orderBy"]);
    }

    @test
    public testMappingWithoutAny() {

        let href = `https://api.xzited.de:8088/v1/accounts/`;
        let pattern = "/v1/accounts/{accountUuid}/orders/{ordersUuuid}/products/{productIndex}";
        let url = Url.fromUrlString(href);
        let mappings = Url.mapPathParameters(url, pattern);

        expect(mappings).not.to.undefined;
        expect(mappings).to.have.deep.property("pathParameters");
        expect(mappings).to.have.deep.property("queryParameters");

        expect(mappings.pathParameters).to.be.undefined;
        expect(mappings.queryParameters).to.be.undefined;
    }

    @test
    public testMappingWithOne() {

        let accountUuid = "e955d970-4f47-46c4-9e38-99fe546dd322";

        let href = `https://api.xzited.de:8088/v1/accounts/${accountUuid}/`;
        let pattern = "/v1/accounts/{accountUuid}/orders/{ordersUuuid}/products/{productIndex}";
        let url = Url.fromUrlString(href);
        let mappings = Url.mapPathParameters(url, pattern);

        expect(mappings).not.to.undefined;
        expect(mappings).to.have.deep.property("pathParameters");
        expect(mappings).to.have.deep.property("queryParameters");

        expect(mappings.pathParameters).not.to.be.undefined;
        expect(mappings.queryParameters).to.be.undefined;

        let pathParams = mappings.pathParameters as any;
        expect(pathParams.accountUuid).to.be.equal(accountUuid);
    }

    @test
    public testMappingWithoutAnyGivenOne() {

        let accountUuid = "e955d970-4f47-46c4-9e38-99fe546dd322";

        let href = `https://api.xzited.de:8088/v1/accounts/${accountUuid}/`;
        let pattern = "/v1/accounts/";
        let url = Url.fromUrlString(href);
        let mappings = Url.mapPathParameters(url, pattern);

        expect(mappings).not.to.undefined;
        expect(mappings).to.have.deep.property("pathParameters");
        expect(mappings).to.have.deep.property("queryParameters");

        expect(mappings.pathParameters).to.be.undefined;
        expect(mappings.queryParameters).to.be.undefined;
    }

    @test
    public testMappingWithThreeAndQuery() {

        let accountUuid = "e955d970-4f47-46c4-9e38-99fe546dd322";
        let ordersUuid = "16c1ace4-fe84-4f49-906c-341cf8199643";
        let productIndex = "123";
        let highlighted = "true";

        let href = `https://api.xzited.de:8088/v1/accounts/${accountUuid}/orders/${ordersUuid}/products/${productIndex}/?highlighted=${highlighted}`;
        let pattern = "/v1/accounts/{accountUuid}/orders/{ordersUuuid}/products/{productIndex}";
        let url = Url.fromUrlString(href);
        let mappings = Url.mapPathParameters(url, pattern);

        expect(mappings).not.to.undefined;
        expect(mappings).to.have.deep.property("pathParameters");
        expect(mappings).to.have.deep.property("queryParameters");

        expect(mappings.pathParameters).to.have.deep.property("accountUuid");
        expect(mappings.pathParameters).to.have.deep.property("ordersUuuid");
        expect(mappings.pathParameters).to.have.deep.property("productIndex");

        let pathParams = mappings.pathParameters as any;
        expect(pathParams.accountUuid).to.be.equal(accountUuid);
        expect(pathParams.ordersUuuid).to.be.equal(ordersUuid);
        expect(pathParams.productIndex).to.be.equal(productIndex);

        let queryParams = mappings.queryParameters as any;
        expect(queryParams.highlighted).to.be.equal(highlighted);
    }

    @test
    public testMappingWithoutLeadingSlashWithThreeAndQuery() {

        let accountUuid = "e955d970-4f47-46c4-9e38-99fe546dd322";
        let ordersUuid = "16c1ace4-fe84-4f49-906c-341cf8199643";
        let productIndex = "123";
        let highlighted = "true";

        let href = `https://api.xzited.de:8088/v1/accounts/${accountUuid}/orders/${ordersUuid}/products/${productIndex}/?highlighted=${highlighted}`;
        let pattern = "v1/accounts/{accountUuid}/orders/{ordersUuuid}/products/{productIndex}";
        let url = Url.fromUrlString(href);
        let mappings = Url.mapPathParameters(url, pattern);

        expect(mappings).not.to.undefined;
        expect(mappings).to.have.deep.property("pathParameters");
        expect(mappings).to.have.deep.property("queryParameters");

        expect(mappings.pathParameters).to.have.deep.property("accountUuid");
        expect(mappings.pathParameters).to.have.deep.property("ordersUuuid");
        expect(mappings.pathParameters).to.have.deep.property("productIndex");

        let pathParams = mappings.pathParameters as any;
        expect(pathParams.accountUuid).to.be.equal(accountUuid);
        expect(pathParams.ordersUuuid).to.be.equal(ordersUuid);
        expect(pathParams.productIndex).to.be.equal(productIndex);

        let queryParams = mappings.queryParameters as any;
        expect(queryParams.highlighted).to.be.equal(highlighted);
    }

    @test
    public testReadmeExample() {

        let href = "https://api.example.com/v1/accounts/8d82bb29-fde3-4271-a57a-f4b702f3b734?orders=true";

        let expected = {
            href: href,
            scheme: "https",
            authority: "api.example.com",
            host: "api.example.com",
            hostname: "api.example.com",
            port: undefined,
            domain: "example",
            tld: "com",
            subdomain: "api",
            resource: "/v1/accounts/8d82bb29-fde3-4271-a57a-f4b702f3b734?orders=true",
            directory: "/v1/accounts",
            path: "/v1/accounts/8d82bb29-fde3-4271-a57a-f4b702f3b734",
            file: "8d82bb29-fde3-4271-a57a-f4b702f3b734",
            query: "orders=true",
            queryParameters: {
                orders: "true"
            },
            userinfo: undefined,
            username: undefined,
            password: undefined,
            fragment: undefined
        };
        let actual = Url.fromUrlString(href);

        this.test(expected, actual);

        expect(actual.queryParameters["orders"]).to.be.equal(expected.queryParameters["orders"]);

        let pattern = "/v1/accounts/{accountId}";
        let params = Url.mapPathParameters(actual, pattern);


        expect(params).not.to.undefined;
        expect(params).to.have.deep.property("pathParameters");
        expect(params).to.have.deep.property("queryParameters");

        expect(params.pathParameters).to.have.deep.property("accountId");
        expect(params.queryParameters).to.have.deep.property("orders");

        let pathParams = params.pathParameters as any;
        expect(pathParams.accountId).to.be.equal("8d82bb29-fde3-4271-a57a-f4b702f3b734");

        let queryParams = params.queryParameters as any;
        expect(queryParams.orders).to.be.equal("true");
    }

    private test(expected, actual: Url) {

        expect(actual.href, "href").to.be.equal(expected.href);
        expect(actual.scheme, "scheme").to.be.equal(expected.scheme);
        expect(actual.authority, "authority").to.be.equal(expected.authority);
        expect(actual.host, "host").to.be.equal(expected.host);
        expect(actual.hostname, "hostName").to.be.equal(expected.hostname);
        expect(actual.port, "port").to.be.equal(expected.port);
        expect(actual.domain, "domain").to.be.equal(expected.domain);
        expect(actual.tld, "tld").to.be.equal(expected.tld);
        expect(actual.subdomain, "subDomain").to.be.equal(expected.subdomain);
        expect(actual.resource, "resource").to.be.equal(expected.resource);
        expect(actual.directory, "directory").to.be.equal(expected.directory);
        expect(actual.path, "path").to.be.equal(expected.path);
        expect(actual.file, "fileName").to.be.equal(expected.file);
        expect(actual.query, "queryString").to.be.equal(expected.query);
        expect(actual.fragment, "hash").to.be.equal(expected.fragment);

        expect(actual.queryParameters, "queryParameters").to.be.eql(expected.queryParameters);

        expect(actual.userinfo, "userinfo").to.be.equal(expected.userinfo);
        expect(actual.username, "username").to.be.equal(expected.username);
        expect(actual.password, "password").to.be.equal(expected.password);
    }
}