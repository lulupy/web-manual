## 插入图片

- 等图片加载完， 再执行canvas操作
    + 图片预加载: 在onload中调用方法

- drawImage(oImg, x, y, w, h)
    + w, h 可以不写， 默认是图片的大小， 要设置的话必须都设置

```js
var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');


var img = document.querySelector('img');
img.onload = function(){
    context.drawImage(img, 0, 0);
}
```

## 设置背景

- createPattern(oImg, 平铺方式)
    + 2参: repeat、repeat-x、repeat-y、no-repeat

oImg可以是dom， 也可以是`new Image()`对象

```js
var img = new Image();
img.src = '1.png';
img.onload = function(){
    var bg = context.createPattern(img, 'no-repeat');

    context.moveTo(100, 100);
    context.lineTo(700, 100);
    context.lineTo(700, 700);
    context.lineTo(100, 700);

    //context.fillStyle = 'red';
    context.fillStyle = bg;
    
    context.fill();
    
}
```

## 渐变

### 线性渐变

- createLinearGradient(x1, y1, x2, y2)

提示：请使用该对象作为 strokeStyle 或 fillStyle 属性的值。
提示：请使用 addColorStop() 添加色标

```js
//创建一个渐变， 起始点为(100, 100), 终止点为(100, 200);
var linear = createLinearGradient(100, 100, 100, 200);

//如果起始点终点组成一条斜线， 则是斜向渐变
//var linear = createLinearGradient(100, 100, 200, 200);

linear.addColorStop(0, 'red');//起始点
linear.addColorStop(0.5, 'blue');//中心点
linear.addColorStop(1, 'blue');//终点

//填充使用渐变
context.fillStyle = linear;

//画一个正方形
context.fillRect(100, 100, 100, 100);
```

### 镜像渐变

- createRadialGradient(x1, y1, r1, x2, y2, r2);

x1, y1, r1 第一个圆的，坐标和半径
x2, y2, r2 第2个圆的，坐标和半径

## 文字

- fillText(str, x, y);
    + 文字填充
- strokeText(str, x, y);
    + 文字边框
    
- font
    + 文字大小: '60px impact'

- textAlign
    + 文字左右的位置的方式 默认为: left

- textBaseline
    + 文字上下的位置的方式　设置为: top

- measureText()
    + 获取文字的宽度 measureText(str).width (只有width,没有height) 文字的高度就是font的设置值

文字居中对齐：

```js
var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');//不支持3d



context.textBaseline = 'top';
context.font = '60px impact';

var width = context.measureText('文字abc').width;
context.fillText('文字abc', (canvas.width-width)/2, (canvas.height-60)/2);
```

## 阴影

- shadowOffsetX 
- shadowOffsetY
- shadowColor
    + 阴影颜色
- shadowBlur
    + 高斯模糊值

```js
context.shadowOffsetX = 10;
context.shadowOffsetY = 10;
context.shadowColor = 'red';
context.shadowBlur = 5;
context.fillRect(0, 0, 100, 200);
```
