# jquery选择器

### jquery的版本
jQuery 分 2 个系列版本 1.x 与 2.x，主要的区别 在于 2.x 不再兼容 IE6、7、8 为移动端而优化，由于减少了一些代码，使得该版本比 jQuery 1.x 更小且更快。


压缩版(compressed) 与 开发版(development)，我们在开发过程中使用开发版（开发版本便于代码修改及调试），项目上线发布使用压缩版（因为压缩版本体积更小，效率更快）。


### 第一个jquery程序---hello world
```js

            $(document).ready(function() {
                    $("div").html("hello world");
            });

```

###  jQuery对象与DOM对象
对于才开始接触jQuery库的初学者，我们需要清楚认识一点：
> jQuery对象与DOM对象是不一样的

```html
<p id="p"></p>
```

```js
var p = document.getElementById('p');
p.innerHTML = 'hello world';
p.style.color = 'red';
```
这里通过原生DOM模型提供的document.getElementById(“p”) 方法获取的DOM元素就是DOM对象，通过DOM方法将自己的innerHTML与style属性处理文本与颜色。

```js
var $p = $('#p');
$p.html('您好！').css('color','red');
```
通过$('#p')方法会得到一个$p的jQuery对象，$p是一个类数组的对象这个对象里面其实是包含了DOM对象的信息的然后封装了很多操作方法，调用自己的方法html与css处理，得到的效果与标准的JavaScript处理结果是一致的。

- 通过jQuery方法包装后的对象，是jQuery对象，它是一个新的对象
- jQuery与DOM对象完全不是同一个东西，但是又似曾相似，因为他们都能处理DOM
- 通过jQuery处理DOM的操作，可以让开发者更专注业务逻辑的开发，而不需要我们具体知道哪个DOM节点有那些方法，也不需要关心不同浏览器的兼容问题，我们可以通过jQuery更友好的API进行开发，同时代码也会更加精短

### jQuery对象转化成DOM对象


html代码
```html
<div>元素一</div>
<div>元素二</div>
<div>元素三</div>
```

js代码
```js
var $div = $('div') //jQuery对象
var div = $div[0] //转化成DOM对象
div.style.color = 'red' //操作dom对象的属性
```



通过jQuery自带的get()方法
```js
var $div = $('div') //jQuery对象
var div = $div.get(0) //通过get方法，转化成DOM对象
div.style.color = 'red' //操作dom对象的属性
```

### DOM对象转化成jQuery对象
如果传递给$(DOM)函数的参数是一个DOM对象，jQuery方法会把这个DOM对象给包装成一个新的jQuery对象



