### 历史管理 history

触发历史管理: 

1. 跳转页面
2. 改变hash
3. pushState

#### onhashchange事件

当hash值发生改变时出发

例子: 彩票选择

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<button>随机选择</button>
<div></div> 
<script>
var oDiv = document.querySelector('div');
var btn = document.querySelector('button');

var json = {};

btn.onclick = function(){
    var hash = Math.random();
    var arr = randomArr(35, 7);
    json[ hash ] = arr;
    oDiv.innerHTML = arr.join(',');
    window.location.hash = hash;
}
window.onhashchange = function(){
    var hash = window.location.hash.slice(1);
    oDiv.innerHTML = json[hash];
}
function randomArr(maxNum , length){
    var arr = [];
    for(var i=0;i<length;i++){
        arr.push( parseInt(Math.random()*maxNum) )
    }
    return arr;
}
</script>
</body>
</html>
```

#### history.pushState 和 onpopstate事件

###### history.pushState

有三个参数:state对象，标题(现在是被忽略，未作处理)，URL(可选)

当history实体被改变时(后退或前进)，popstate事件将会发生

如果history实体是有pushState方法产生的，popstate事件的state属性会包含一份来自history实体的state对象的拷贝


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<button>随机选择</button>
<div></div> 
<script>
var oDiv = document.querySelector('div');
var btn = document.querySelector('button');

var json = {};

btn.onclick = function(){
    var arr = randomArr(35, 7);
    history.pushState(arr, '');
    oDiv.innerHTML = arr.join(',');
}
window.onpopstate = function(ev){
    oDiv.innerHTML = ev.state.join(',');
}
function randomArr(maxNum , length){
    var arr = [];
    for(var i=0;i<length;i++){
        arr.push( parseInt(Math.random()*maxNum) )
    }
    return arr;
}
</script>
</body>
```