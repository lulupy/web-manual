# BOM

BOM(Browser Object Model) 是指浏览器对象模型，是用于描述这种对象与对象之间层次关系的模型，浏览器对象模型提供了独立于内容的、可以与浏览器窗口进行互动的对象结构。BOM由多个对象组成，其中代表浏览器窗口的Window对象是BOM的顶层对象，其他对象都是该对象的子对象


## window

BOM 的核心是window对象，它表示浏览器的一个实例。在浏览器中，即是javascript访问浏览器窗口的一个接口，又是ECMAScript规定的Global对象，这就意味着在网页中定义的任意变量、函数、对象都是以window作为Global对象。

所有在全局作用域中声明的变量、函数、对象都会作为window的属性和方法

```js
var age = 24;

function printName(){
    console.log(age);
}


console.log(window.age);
window.printName();

```

## window对象属性

### window.innerHeight属性，window.innerWidth属性

这两个属性返回网页的CSS布局占据的浏览器窗口的高度和宽度，单位为像素。很显然，当用户放大网页的时候（比如将网页从100%的大小放大为200%），这两个属性会变小。

注意，这两个属性值包括滚动条的高度和宽度。

### scrollX、scrollY

- scrollX：滚动条横向偏移
- scrollY：滚动条纵向偏移

这两个值随着滚动位置变化而变化

### scrollTo、scroll　scrollBy、

我们也可以通过方法scrollTo或者scroll方法改变滚动条位置到指定坐标

scrollTo、scroll效果是一样的

```js
window.scrollTo(0, 300); // 滚动条移动到300px处
```

两个参数分别是水平、垂直方向偏移

scrollBy可以相对当前位置移动滚动条，而不是移动到绝对位置

```js
scrollBy(0, 100); // 滚动条下移100px
```

### navigator

Window对象的navigator属性，指向一个包含浏览器相关信息的对象。

navigator.userAgent属性返回浏览器的User-Agent字符串，用来标示浏览器的种类。下面是Chrome浏览器的User-Agent。

```js
navigator.userAgent // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36"
```



### screen

screen对象包含了显示设备的信息

```js
// 显示设备的高度，单位为像素
screen.height
// 1920

// 显示设备的宽度，单位为像素
screen.width
// 1080
```

一般使用以上两个属性，了解设备的分辨率。上面代码显示，某设备的分辨率是1920x1080。除非调整显示器的分辨率，否则这两个值可以看作常量，不会发生变化。显示器的分辨率与浏览器设置无关，缩放网页并不会改变分辨率。

### window.open(url)

打开一个新窗口, 参数是新窗口需要载入的url地址

```js
window.open('http://www.baidu.com')
```

如果不传参数，则打开的是空白窗口

```js
window.open();
```

返回值 返回的新开页面的window对象

```js
var opener = window.open();

opener.document.body.style.background = 'red';
```

并且可以通过它的close方法将它关闭

```js
opner.close()
```


## window 相关的事件

### onscroll onresize

```js
//onscroll : 当滚动条滚动的时候触发
var i = 0;

window.onscroll = function() {
    document.title = i++;
}

//onresize : 当窗口大小发生变化的时候触发
window.onresize = function() {
    document.title = i++;
}
```


练习: 回到顶部




