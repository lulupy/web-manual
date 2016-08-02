# Session是什么
Session一般译作会话，牛津词典对其的解释是进行某活动连续的一段时间。从不同的层面看待session，它有着类似但不全然相同的含义。比如，在web应用的用户看来，他打开浏览器访问一个电子商务网站，登录、并完成购物直到关闭浏览器，这是一个会话。而在web应用的开发者开来，用户登录时我需要创建一个数据结构以存储用户的登录信息，这个结构也叫做session。因此在谈论session的时候要注意上下文环境。

# 为什么需要session
HTTP是一种无状态的协议
用户从A页面跳转到B页面会重新发送一次HTTP请求，而服务端在返回响应的时候是无法获知该用户在请求B页面之前做了什么的。

# Cookie和Session
解决HTTP协议自身无状态的方式有cookie和session。二者都能记录状态，前者是将状态数据保存在客户端，后者则保存在服务端。



cookie：
Cookie是服务器保存在浏览器的一小段文本信息，每个Cookie的大小一般不能超过4KB。浏览器每次向服务器发出请求，就会自动附上这段信息。

无论使用何种服务端技术，只要发送回的HTTP响应中包含如下形式的头，则视为服务器要求设置一个cookie：
```
Set-cookie:name=name;expires=date;path=path;domain=domai
```
支持cookie的浏览器都会对此作出反应，即创建cookie文件并保存（也可能是内存cookie），用户以后在每次发出请求时，浏览器都要判断当前所有的cookie中有没有没失效（根据expires属性判断）并且匹配了path属性的cookie信息，如果有的话，会以下面的形式加入到请求头中发回服务端：
```
Cookie: name="zj"; Path="/linkage"
```


session的原理:
它的基本原理是服务端为每一个session维护一份会话信息数据，而客户端和服务端依靠一个全局唯一的标识来访问会话信息数据。用户访问web应用时，服务端程序决定何时创建session，创建session可以概括为三个步骤：

1. 生成全局唯一标识符（sessionid）；    
2. 开辟数据存储空间。
3. 将session的全局唯一标示符发送给客户端。
问题的关键就在服务端如何发送这个session的唯一标识上。联系到HTTP协议，数据无非可以放到请求行、头域或Body里，基于此，一般来说会有两种常用的方式：cookie和URL重写。





# koa-session

```js
var session = require('koa-session');
var koa = require('koa');
var app = koa();

app.keys = ['some secret hurr'];//必须设置
app.use(session(app));

app.use(function *(){
  // ignore favicon
  if (this.path === '/favicon.ico') return;

  var n = this.session.views || 0;
  this.session.views = ++n;
  this.body = n + ' views';
})

app.listen(3000);
console.log('listening on port 3000');
```
