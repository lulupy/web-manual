# 简介
由 Express 原班人马打造的 koa，致力于成为一个更小、更健壮、更富有表现力的 Web 框架。使用 koa 编写 web 应用，通过组合不同的 generator，可以免除重复繁琐的回调函数嵌套，并极大地提升常用错误处理效率。Koa 不在内核方法中绑定任何中间件，它仅仅提供了一个轻量优雅的函数库，使得编写 Web 应用变得得心应手。

# 安装
Koa 当前需要 node > 0.11.x
因为它依赖于 ES6 的 generator 特性
```shell
$ npm install koa
```

# hello world
```js
var koa = require('koa');
var app = koa();

app.use(function *(){
  this.body = 'Hello World';
});

app.listen(3000);
```
上面代码中，变量app就是一个Koa应用。它监听3000端口，返回一个内容为Hello World的网页。
app.use方法用于向middleware数组添加Generator函数。
listen方法指定监听端口，并启动当前应用。它实际上等同于下面的代码。

[Generator 函数的含义与用法](http://www.ruanyifeng.com/blog/2015/04/generator.html)

[Thunk 函数的含义和用法](http://www.ruanyifeng.com/blog/2015/05/thunk.html)

[co 函数库的含义和用法](http://www.ruanyifeng.com/blog/2015/05/co.html)

