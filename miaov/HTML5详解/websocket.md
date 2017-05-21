# websocket

## socket.io

### 安装:
```shell
npm install socket.io
```

### 使用: 

服务器端（结合koa）:
```js
var koa = require('koa');
var serve = require('koa-static');

var io = require('socket.io');
var http = require('http');

var app = koa();
app.use( serve('./www_root') );


var server = http.Server( app.callback() );
//io.listen需要传入一个http的server
var socket = io.listen(server);

//监听链接事件，　当客户段有人链接触发
socket.sockets.on('connection', function(socket){
    console.log('有人进来了');
});

server.listen(3000);
```

客户端：

```html
<button>点击连接</button> 
<!-- 在客户端也需要导入socket.io的客户端库 -->
<script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>
<script>
var btn = document.querySelector('button');
btn.onclick = function(){
    //链接服务器端
    socket = io.connect('http://localhost:3000');
}
</script>
```

### 服务器端与客户端通信


服务器端代码
```js
socket.sockets.on('connection', function(socket){
    console.log('有人进来了');
    //使用socket实例的emit方法发送数据，　hello是自定义事件名，　用作客户端监听，　１是发送的数据
    socket.emit('hello', 1);
    socket.on('hellotoo', function(data) {
        console.log(data);
    });
});

```

客户端代码
```js
//监听hello事件，接收数据
socket.on('hello', function(data) {
    alert(data);
    socket.emit('hellotoo', 2);
});
```

### 广播
服务器端代码:
```js
socket.sockets.on('connection', function(socket){
    //广播到除了它自己的其他所有链接
    socket.broadcast.emit('hello', 1);
    
});
```
客户端代码:
```js
socket.on('hello', function(data){
    alert(data);
});
```

打开多个网页，　链接socket，　除了当前网页，　其他已经链接的都会弹出1

例子:  div位置同步

要求多个网页中的div的位置是相同的


服务器端代码:
```js
socket.sockets.on('connection', function(socket){
    socket.on('move', function(data){
        socket.broadcast.emit('move-client', data);
    })
    
});
```

客户端代码:
```html
<style>
*{
    margin: 0;
    padding: 0;
}

div{
    height: 100px;
    width: 100px;
    position: absolute;
    background: red;
}
</style>
<div></div>
<script>
    
var div = document.querySelector('div');
var socket = io.connect('http://localhost:3000');

window.onmousemove = function(ev){
    div.style.top = ev.clientY + 'px';
    div.style.left = ev.clientX + 'px';
    socket.emit('move', {x: ev.clientX, y: ev.clientY});

}
socket.on('move-client', function(data){
    div.style.top = data.y + 'px';
    div.style.left = data.x + 'px';
})
</script>
```