# canvas

### HTML

```html
<canvas id='canvas' width="500" height="300"></canvas>
```
//指定宽高使用属性width和height来指定，不要用css,
css指定的是标签显示的大小而不是画布的大小


### javascript
```js
var canvas = document.getElementById('canvas');
//绘图的上下文环境
var context = canvas.getContext('2d');
```
//使用context来进行绘制

### 画一条直线
```js

//状态设置
context.moveTo(100,100); //想象一支画笔放在(100,100)这个点上
context.lineTo(700, 700); //然后移动到(700, 700)



//绘制
context.stroke() 
```

**canvas中的绘图是一种基于状态的绘图**
一些其他的状态:
- context.lineWidth //线条宽度
- context.strokeStyle //设置图形轮廓的颜色

```js
context.lineWidth = 5;
context.strokeStyle = "#005588"; 
```



### 画一个三角型
```js
context.moveTo(100, 100);
context.lineTo(700, 700);
context.lineTo(100,700);
context.lineTo(100,100);

context.stroke();
```

绘制状态
- context.fillStyle //图形填充颜色

绘制方法
- context.fill() //填充图形

### 绘制两个图形
```js
context.moveTo(100, 100);
context.lineTo(700, 700);
context.lineTo(100,700);
context.lineTo(100,100);


context.lineWidth = 5;
context.strokeStyle = "red"; 
context.stroke();

context.moveTo(200, 100);
context.lineTo(800, 700);


context.strokeStyle = "blue";
context.stroke();
```
上面的代码绘制了一个三角形会一条直线，但是他们的线条颜色都是blue
原因：canvas是基于状态的，第一个context.stroke()绘制后, 第二个到context.stroke()的绘制状态包含从代码定义开始的所有状态，覆盖了第一个context.stroke()绘制的图形



-  context.beginPath()
    生成路径的第一步叫做beginPath()。本质上，路径是由很多子路径构成，这些子路径都是在一个列表中，所有的子路径（线、弧形、等等）构成图形。而每次这个方法调用之后，列表清空重置，然后我们就可以重新绘制新的图形。

    简单来说就是清空之前的状态
-  context.closePath()
    
    就是闭合路径closePath(),不是必需的。这个方法会通过绘制一条从当前点到开始点的直线来闭合图形。如果图形是已经闭合了的，即当前点为开始点，该函数什么也不做。


#### save 保存当前状态
#### restore　恢复保存的状态


```js
context.strokeStyle = 'red';

context.beginPath()
context.moveTo(0,0);
context.lineTo(100, 100);
context.stroke();


context.beginPath();
context.moveTo(0,100);
context.lineTo(100, 200);
context.stroke();
```
两条线都变红，　context.strokeStyle作用到整个环境；

如果只想让context.strokeStyle作用在一条线段上
```js
context.save();
context.strokeStyle = 'red';
context.beginPath()
context.moveTo(0,0);
context.lineTo(100, 100);
context.stroke();
context.restore();


context.beginPath();
context.moveTo(0,100);
context.lineTo(100, 200);
context.stroke();
```

在context.save()　与　context.restore()之间改变的状态，　只在它们之间起作用

### rotate

旋转中心点一直是 canvas 的起始点。 如果想改变中心点，我们可以通过 translate() 方法移动 canvas 。


旋转是累加的：
```js
setInterval(function(){
    context.rotate(2*Math.PI/180);
})
```

### 画圆
context.arc(x, y, r, startAngle, endAngle, anticlockwise)

x
圆弧中心（圆心）的 x 轴坐标。
y
圆弧中心（圆心）的 y 轴坐标。
r
圆弧的半径。
startAngle
圆弧的起始点， x轴方向开始计算，单位以弧度表示。
endAngle
圆弧的终点， 单位以弧度表示。

anticlockwise 方向 默认为顺时针

### 清除画布
ctx.clearRect(x, y, width, height);

x
矩形起点的 x 轴坐标。
y
矩形起点的 y 轴坐标。
width
矩形的宽度。
height
矩形的高度。


### 倒计时

- animation
```
setInterval(function(){
    render() //绘制画面
    update() //调整数据结构
})
```


