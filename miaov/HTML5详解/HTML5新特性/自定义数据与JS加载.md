### data自定义数据

在html元素上以`data-`开头的属性，可以在相应的DOM对象上的dataset属性上得到其属性值

```html
<div data-index="1" data-sub-title="hello"></div>
```

```js
var oDiv = document.querySelector('div');
console.log( oDiv.dataset.index );//1
console.log( oDiv.dataset.subTitle );//hello  sub-title这样的多个-分割的形式，对应的属性为驼峰命名
```

### js加载

#### defer

延迟加载

```html
<script src="a.js"></script>
<script src="b.js"></script>
<script src="c.js"></script>
<img src="" alt="">
```
默认js的加载是顺序执行的，先加载js才会加载图片

```html
<script src="a.js" defer="defer"></script>
<script src="b.js"></script>
<script src="c.js"></script>
<img src="" alt="">
```

如果script标签加上defer属性表示延迟加载(在onload之间加载)，也就是说a.js会在图片加载之后加载

没加defer的js依然顺序加载
```html
<script src="a.js" defer="defer"></script>
<script src="b.js" defer="defer"></script>
<script src="c.js" defer="defer"></script>
<img src="" alt="">
```

等价于

```html
<img src="" alt="">
<script src="a.js"></script>
<script src="b.js"></script>
<script src="c.js"></script>
```

#### async

异步加载

```html
<script src="a.js" async="async"></script>
<script src="b.js" async="async"></script>
<script src="c.js" async="async"></script>
<img src="" alt="">
```

表示几个js文件和图片会同时加载

问题: 不能确定那个js文件先加载完成(适合独立js的加载)