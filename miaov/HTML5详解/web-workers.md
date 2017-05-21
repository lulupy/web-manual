# web-workers

可以让web应用程序具备后台处理能力，对多线程的支持非常好

## 使用

main.js
```js
//把需要后台运行的代码发到一个文件中，需要开服务器，　本地可能有跨域的限制
var w = new Worker('worker.js');
```

worker.js
```js
console.log(1);
```

### 主程序与worker之间的通信

使用postMessage


- worker传递信息到主程序

main.js
```js
var w = new Worker('worker.js');
w.onmessage = function(ev){
    alert(ev.data);
}
```

worker.js
```js
//self代表了worker本身
self.postMessage('1');
```

- 主程序传递信息到worker

main.js
```js
var w = new Worker('worker.js');
w.postMessage('1');
```

worker.js
```js
self.onmessage= function(ev){
    //由于worker的一些限制，　alert以及一些函数不能在worker中使用
    //alert(ev.data);
    console.log(ev.data);
}
```


### importScripts

在worker中导入其他的js文件

worker.js
```js
importScripts('a.js');
```

### Worker运行环境
Worker运行环境中可以使用的：

- navgator  :  appName、appVersion、userAgent、platformlocation  :   所有属性都是只读的
- self  :  指向全局 worker 
- 对象所有的ECMA对象，Object、Array、Date等
- XMLHttpRequest构造器
- setTimeout和setInterval方法
- close()方法，立刻停止worker运行
- importScripts方法


例子： canvas显字 提升性能

老版和新版代码都在 code/下

其中的一个函数getRandomPoins, 其实是很耗性能的，　而且它只是计算没有ｄｏｍ操作，　所以可以放在worker中


改进后代码：


```js
....
    aSpan[i].onclick = function(){
        //要显示的文字
        var s = this.innerHTML;

        console.time(1);
        render(s);
        console.timeEnd(1);//查看运行时间
    }
....

function render(s){
    ......
    var worker = new Worker('main.js');
    worker.postMessage( {iTotal: imgData.data.length/4, iNeed: imgData.data.length/4/2} );
    worker.onmessage = function(ev){
        var points =  ev.data;
        //根据获得的像素点的位置重新画图
    
        var newImgData = context.createImageData(textW, textH);

        for(var i=0; i<points.length;i++){
            var point = points[i];
            var x = point%textW;
            var y = parseInt(point/textW);
            var color = getXY(imgData, x, y);
            setXY(newImgData, x, y, color);
        }

        context.putImageData(newImgData, (w-textW)/2, (h-textH)/2);
    }
}
```

main.js:

```js
function getRandomPoins(iTotal, iNeed){
    var arr = [];
    var newArr = [];
    for(var i=0;i<iTotal;i++){
        arr.push(i);
    }
    for(var i=0;i<iNeed; i++){
        newArr.push( arr.splice( parseInt(Math.random()*arr.length) , 1) );
    }
    return newArr;
}


self.onmessage = function(ev){
    var points = getRandomPoins(ev.data.iTotal, ev.data.iNeed);
    self.postMessage(points);
}
```




