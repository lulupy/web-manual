
# koa-logger

日记中间件

```
<-- GET /
--> GET / 200 835ms 746b
<-- GET /
--> GET / 200 960ms 1.9kb
<-- GET /users
--> GET /users 200 357ms 922b
<-- GET /users?page=2
--> GET /users?page=2 200 466ms 4.66kb
```

## Installation

```js
$ npm install koa-logger
```

## Example

```js
var logger = require('koa-logger')
var koa = require('koa')

var app = koa()
app.use(logger())
```


