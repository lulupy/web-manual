## 像素

- getImageData(x, y, w, h)
    + 获取画布上某一区域的图像数据

- 获取的图像数据的属性
    + width: 1行的像素个数
    + height: 1列的像素个数
    + data: 一个一维数组，每4个值代表一个像素，包含每个像素的rgba四个值，每个值都在0-255之间

```js
var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');//不支持3d

context.fillRect(0, 0, 100, 100);
var imgData = context.getImageData(0, 0, 100, 100);
console.log(imgData.width);//100
console.log(imgData.height);//100
console.log(imgData.data.length);//40000 有10000个像素点，但一个像素需要4位表示 ，所以是40000

//第一个像素rgba(0,0,0, 255)
console.log(imgData.data[0]);//0   范围0-255  黑色到白色
console.log(imgData.data[1]);//0   范围0-255  黑色到白色
console.log(imgData.data[2]);//0   范围0-255  黑色到白色
console.log(imgData.data[3]);//255  范围0-255  透明到不透明
```

- putImageData(图像数据, x, y)
    - 设置画布上某一区域的图像数据

```js
var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');//不支持3d

context.fillRect(0, 0, 100, 100);
var imgData = context.getImageData(0, 0, 100, 100);
context.putImageData(imgData, 100, 100);
```

改变像素中的值, 变成半透明的红色

```js
var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');//不支持3d

context.fillRect(0, 0, 100, 100);
var imgData = context.getImageData(0, 0, 100, 100);
for(var i=0;i<imgData.width*imgData.height;i++){
    imgData.data[i*4] = 255;
    imgData.data[i*4+1] = 0;
    imgData.data[i*4+2] = 0;
    imgData.data[i*4+3] = 100;
}
context.putImageData(imgData, 100, 100);
```

- createImageData(w, h)
    + 创建图像数据，初始值全是是透明黑色，即(0,0,0,0)

```js
var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');//不支持3d

var imgData = context.createImageData(100, 100);

for(var i=0;i<imgData.width*imgData.height;i++){
    imgData.data[i*4] = 255;
    imgData.data[i*4+1] = 0;
    imgData.data[i*4+2] = 0;
    imgData.data[i*4+3] = 100;
}
context.putImageData(imgData, 100, 100);

```

例子：像素显字

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
<style>
#canvas{
    /*border: 1px solid #111;*/
    background: yellowgreen;
}
</style>
</head>
<body>
    <canvas id="canvas" width="500" height="300">
        你的浏览器不支持canvas
    </canvas>
<script>
var canvas = document.querySelector('#canvas');
var context = canvas.getContext('2d');



var textH = 60;
var textW;

context.font = textH + 'px impact';
context.textBaseline = 'top';

textW = context.measureText('文').width;


var textX = (canvas.width-textW)/2;
var textY = (canvas.height-textH)/2;
context.fillText('文', textX, textY, textW, textH);

var imgData = context.getImageData(textX, textY, textW, textH);
context.clearRect(0,0,canvas.width,canvas.height);

var arr = [];
for(var i=0;i<textW*textH;i++){
    arr.push(i);
}

var newArr =[];
for(var i=0;i<textW*textH/2;i++){
    newArr.push( arr.splice(parseInt(Math.random()*arr.length), 1) )
}

var newImgData = context.createImageData(textW, textH);

for(var i=0;i<newArr.length;i++){
    var pos = newArr[i];
    newImgData.data[pos*4] = imgData.data[pos*4];
    newImgData.data[pos*4+1] = imgData.data[pos*4+1];
    newImgData.data[pos*4+2] = imgData.data[pos*4+2];
    newImgData.data[pos*4+3] = imgData.data[pos*4+3];
}

context.putImageData(newImgData, textX, textY);
</script>
</body>
</html>
```

- 根据坐标获取和设置颜色值

- getXY(imgData, x, y); 
返回一个4位数组，代表一个颜色

- setXY(imgData, x, y, color);

color是一个数组， 代表一个颜色

```js
var canvas = document.querySelector('#canvas');
var context = canvas.getContext('2d');

function getXY(imgData, x, y){
    var width = imgData.width;
    var color = [];
    color[0] = imgData.data[(x+y*width)*4];
    color[1] = imgData.data[(x+y*width)*4+1];
    color[2] = imgData.data[(x+y*width)*4+2];
    color[3] = imgData.data[(x+y*width)*4+3];
    return color;
}
function setXY(imgData, x, y, color){
    var width = imgData.width;
    imgData.data[(x+y*width)*4] = color[0]; 
    imgData.data[(x+y*width)*4+1] = color[1]; 
    imgData.data[(x+y*width)*4+2] = color[2]; 
    imgData.data[(x+y*width)*4+3] = color[3]; 
}

context.fillRect(0, 0, 100, 100);
var imgData = context.getImageData(0, 0, 100, 100);

for(var i=0;i<100;i++){
    for(var j=0;j<100;j++){
        setXY(imgData, i, j, [255, 0, 0, 255]);
    }
    
}
context.putImageData(imgData, 100, 100);
```

- 图片的像素操作
    + 必须是同源下
    + 例子： 反色， 倒影， 透明渐变
    + 例子： 马赛克效果


反色： 用255分别减去rgb的每个值



```js
for(var i=0;i<imgW;i++){
    for(var j=0;j<imgH;j++){
        var color = getXY(imgData, i, j);
        color[0] = 255 - color[0];
        color[1] = 255 - color[1];
        color[2] = 255 - color[2];
        setXY(imgData, i, j, color);
    }
}
```


倒影: 
```js
//必须新建图像数据， 如果还是用imgData, 只有一半的倒影
//当j为一半的时候， 又会把之前的倒影倒回来
var newImgData = context.createImageData(imgW, imgH);
for(var i=0;i<imgW;i++){
    for(var j=0;j<imgH;j++){
        var color = getXY(imgData, i, j);
        setXY(newImgData, i, imgH-j, color);
    }
}
```


透明渐变： 透明度由255变到0
```js
var newImgData = context.createImageData(imgW, imgH);
for(var i=0;i<imgW;i++){
    for(var j=0;j<imgH;j++){
        var color = getXY(imgData, i, j);
        color[3] = 255*(j/imgH);
        setXY(newImgData, i, j, color);
    }
}
```

以上三个效果组合的完整例子：

```js
var src = '2.png';

var canvas = document.querySelector('#canvas');
var context = canvas.getContext('2d');

var width = canvas.width;
var height = canvas.height;


function getXY(imgData, x, y){
    var width = imgData.width;
    var color = [];
    color[0] = imgData.data[(x+y*width)*4];
    color[1] = imgData.data[(x+y*width)*4+1];
    color[2] = imgData.data[(x+y*width)*4+2];
    color[3] = imgData.data[(x+y*width)*4+3];
    return color;
}
function setXY(imgData, x, y, color){
    var width = imgData.width;
    imgData.data[(x+y*width)*4] = color[0]; 
    imgData.data[(x+y*width)*4+1] = color[1]; 
    imgData.data[(x+y*width)*4+2] = color[2]; 
    imgData.data[(x+y*width)*4+3] = color[3]; 
}


var img = new Image();
img.onload = function(){
    var imgW = img.width;
    var imgH = img.height;

    context.drawImage(img, 0, 0);

    var imgData = context.getImageData(0, 0, imgW, imgH);
    context.clearRect(0, 0, width, height);
    var newImgData = context.createImageData(imgW, imgH);
    for(var i=0;i<imgW;i++){
        for(var j=0;j<imgH;j++){

            var color = getXY(imgData, i, j);

            color[3] = 255*(j/imgH);
            setXY(newImgData, i, imgH-j, color);
        }
    }
    context.clearRect(0, 0, width, height);
    context.putImageData(newImgData, 0, 0);
}

img.src = src;
```

马赛克：把图片划成10*10的区块， 每个区块随机取其中某一个像素点的值， 让整个区块都显示为这个颜色

```js
var src = '2.png';

var canvas = document.querySelector('#canvas');
var context = canvas.getContext('2d');

var width = canvas.width;
var height = canvas.height;


function getXY(imgData, x, y){
    var width = imgData.width;
    var color = [];
    color[0] = imgData.data[(x+y*width)*4];
    color[1] = imgData.data[(x+y*width)*4+1];
    color[2] = imgData.data[(x+y*width)*4+2];
    color[3] = imgData.data[(x+y*width)*4+3];
    return color;
}
function setXY(imgData, x, y, color){
    var width = imgData.width;
    imgData.data[(x+y*width)*4] = color[0]; 
    imgData.data[(x+y*width)*4+1] = color[1]; 
    imgData.data[(x+y*width)*4+2] = color[2]; 
    imgData.data[(x+y*width)*4+3] = color[3]; 
}

var gridW = 10;
var img = new Image();
img.onload = function(){
    var imgW = img.width;
    var imgH = img.height;

    context.drawImage(img, 0, 0);

    var imgData = context.getImageData(0, 0, imgW, imgH);
    for(var i=0;i<imgW/gridW;i++){
        for(var j=0;j<imgH/gridW;j++){
            var color = getXY(imgData, i*gridW+parseInt(Math.random()*gridW), j*gridW+parseInt(Math.random()*gridW));
            for(var ii=i*gridW;ii<(i+1)*gridW;ii++){
                for(var jj=j*gridW;jj<(j+1)*gridW;jj++){
                    setXY(imgData, ii, jj, color);
                }
            }
        }
    }
    context.clearRect(0, 0, width, height);
    context.putImageData(imgData, 0, 0);
}

img.src = src;
```

### jCanvaScript canvas库


