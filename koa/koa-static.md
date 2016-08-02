# koa-static
静态文件提供中间件

安装：
```shell
$ npm install koa-static
```

使用:

```js
var serve = require('koa-static');
var koa = require('koa');
var app = new koa();

// $ GET /package.json
app.use(serve('.'));

// $ GET /hello.txt
app.use(serve('test/fixtures'));

// or use absolute paths
app.use(serve(__dirname + '/test/fixtures'));

app.listen(3000);

console.log('listening on port 3000');
```

必须在router.routes()之前
