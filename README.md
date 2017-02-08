[![Build Status](https://travis-ci.org/atothek1/ts-url.svg?branch=master)](https://travis-ci.org/atothek1/ts-url)
# ts-url
This is a very simple Url object for TypeScript.
Its orienting to the Url spec proposal.
## Usage
simple creation from a string to access the parts of an url.

```javascript
let href = "https://api.example.com/v1/accounts/8d82bb29-fde3-4271-a57a-f4b702f3b734";
let url = Url.fromUrlString( href );
```
getting mapped values by apttern
```javascript
let href = "https://api.example.com/v1/accounts/8d82bb29-fde3-4271-a57a-f4b702f3b734?orders=true";
let url = Url.fromUrlString( href );
let pattern = "/v1/accounts/{accountId}";
// will get a object with mapped pathParameters and queryParameters seperated
let url = Url.mapPathParameters( url, pattern );
```