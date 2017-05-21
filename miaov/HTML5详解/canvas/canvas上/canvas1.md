## canvas

### 基本使用

```html
<!--不要使用css给canvas设置宽高-->
<canvas id="canvas" width="500" height="300">
        你的浏览器不支持canvas
</canvas>
```

### 绘图环境

```js
var canvas = document.querySelector('#canvas');
var context = canvas.getContext('2d');
```
目前只支持2d，不支持3d，如果要使用3d, 可以使用webgl(不过兼容性也不是很好)

### 绘制方块

#### context.fillRect

context.fillRect(left,top, width, height)

```js
context.fillRect(50,50, 100, 200);
```

默认颜色是黑色

#### context.strokRect


strokeRect(left, top, width, height)

```js
context.strokeRect(50,50, 100, 200);
```

默认是1像素黑色边框

但是显示出在ps中测量为2像素的边框，把画布看成一个坐标轴，正方形的顶点坐标为(50px, 50px)

正方形的边框为1像素宽，我们以左边框为例， 它是以50px为中心点，向右延伸0.5像素（49.5px），
向左延伸0.5像素(50.5px);  所以做边框为（49.5px~50.5px）

但是，用canvas绘图跟我们的ps一样, 最小的但是就是1px，没有0.5px, 所以就将出现了2px的边框

我们可以这样写

```js
context.strokeRect(50.5,50.5, 100, 200);
```

这样边框的中心点在1px的一半，刚刚就可以是1px


### 设置绘图

#### fillStyle 填充颜色
#### strokeStyle 边框颜色
#### lineWidth 线宽

```js
context.fillStyle = 'red';
context.strokeStyle = 'blue';
context.lineWidth = 10;


//注意： 顺序不同，效果不同
context.fillRect(50,50,100,50);
context.strokeRect(50,50,100,50);
```

### 边界绘制

#### lineJoin 边界连接点样式

miter(默认)(斜接) round(圆角) bevel(斜角)

#### lineCap  端点样式

butt(默认) round(圆角)  square()





实例: 鼠标画线
```js
var canvas = document.querySelector('#canvas');
var context = canvas.getContext('2d');
canvas.onmousedown = function(ev){
    context.moveTo(ev.clientX - canvas.offsetLeft, ev.clientY-canvas.offsetTop)
    canvas.onmousemove = function(ev){
        context.lineTo(ev.clientX - canvas.offsetLeft, ev.clientY-canvas.offsetTop);
        context.stroke();
    }
    canvas.onmouseup = function(){
        this.onmousemove = null;
        this.onmouseup = null;
    }
}
```
实例: 方块移动

```js
var canvas = document.querySelector('#canvas');
var context = canvas.getContext('2d');
var iNow = 0;
setInterval(function(){
    iNow++;
    context.clearRect(0, 0, 500, 300);
    context.fillRect(iNow, iNow, 100, 100);

}, 50);
```

### 绘制圆


arx(x, y, 半径, 起始弧度, 终止弧度, 旋转方向)

- 弧度与角度的关系: 弧度=角度*Math.PI/180
- 旋转方向: 顺时针false(默认), 逆时针true


实例： 时钟
```js
var canvas = document.querySelector('#canvas');
var context = canvas.getContext('2d');

var r = 100;
var x = 150;
var y = 150;
function drawClock(){
    context.clearRect(0, 0, 500, 300);
    var now = new Date();
    var hour = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();

    console.log(hour, min, sec);

    var hourAngle = hour*30 + min*(30/60) - 90;
    var minAngle = min*6+sec*(6/60) - 90;
    var secAngle = sec*6 -90;

    //分钟刻度
    for(var i=0;i<60;i++){
        context.beginPath();
        context.moveTo(x,y);
        context.arc(x,y,r, 6*i*Math.PI/180, 6*(i+1)*Math.PI/180);
        context.stroke();
        context.closePath();
    }

    context.beginPath();
    context.fillStyle ='white';
    context.arc(x,y,r*(19/20), 0, 360*Math.PI/180);
    context.fill();
    context.closePath();

    // 时钟刻度
    for(var i=0;i<12;i++){
        context.beginPath();
        context.lineWidth = 3;
        context.moveTo(x,y);
        context.arc(x,y,r, 30*i*Math.PI/180, 30*(i+1)*Math.PI/180);
        context.stroke();
        context.closePath();
    }

    context.beginPath();
    context.fillStyle ='white';
    context.arc(x,y,r*(17/20), 0, 360*Math.PI/180);
    context.fill();
    context.closePath();


    // 时钟指针
    context.beginPath();
    context.moveTo(x,y);
    context.arc(x,y,r*(12/20), hourAngle*Math.PI/180, hourAngle*Math.PI/180);
    context.stroke();
    context.closePath();

    // 分钟刻度
    context.beginPath();
    context.moveTo(x,y);
    context.arc(x,y,r*(14/20), minAngle*Math.PI/180, minAngle*Math.PI/180);
    context.lineWidth = 2;
    context.stroke();
    context.closePath(); 

    // 秒钟刻度
    context.beginPath();
    context.moveTo(x,y);
    context.arc(x,y,r*(17/20), secAngle*Math.PI/180, secAngle*Math.PI/180);
    context.lineWidth = 1;
    context.stroke();
    context.closePath();    
}

drawClock();


setInterval(function(){
    drawClock();
}, 1000);
```
