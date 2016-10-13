# jqueryDOM操作

```js
//创建2个div元素
            var rightdiv = document.createElement('div')
            var rightaaron = document.createElement("div");

            //给2个div设置不同的属性
            rightdiv.setAttribute('class', 'right')
            rightaaron.className = 'aaron'
            rightaaron.innerHTML = "动态创建DIV元素节点";

            //2个div合并成包含关系
            rightdiv.appendChild(rightaaron)
            
            //绘制到页面body
            body.appendChild(rightdiv)
```

我们写了一个简单的元素创建,我们会发现几个问题：
- 每一个元素节点都必须单独创建
- 节点是属性需要单独设置，而且设置的接口不是很统一
- 添加到指定的元素位置不灵活
- 最后还有一个最重要的：浏览器兼容问题处理

针对这一系列的DOM操作的问题，jQuery给出了一套非常完美的接口方法

## jQuery节点创建与属性的处理

####  创建元素节点：
```js
$("<div></div>")
```

#### 创建为本节点：
```js
$("<div>我是文本节点</div>")
```

#### 创建为属性节点：
```js
$("<div id='test' class='aaron'>我是文本节点</div>")
```

我们通过传入一段完整的html字符串给$函数来创建DOM元素

## DOM节点的插入

#### 内部插入append()与appendTo()
动态创建的元素是不够的，它只是临时存放在内存中，最终我们需要放到页面文档并呈现出来。

- append: 向匹配的元素内部追加内容,也就是在元素的最后添加子元素,这个操作与对指定的元素执行原生的appendChild方法
- appendTo: 使用这个方法是颠倒了常规的$(A).append(B)的操作，即不是把B追加到A中，而是把A追加到B中。



.append()和.appendTo()两种方法功能相同，主要的不同是语法——内容和目标的位置不同
- append()前面是要选择的对象，后面是要在对象内插入的元素内容
- appendTo()前面是要插入的元素内容，而后面是要选择的对象


```html
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <title></title>
    <script src="http://lib.sinaapp.com/js/jquery/1.9.1/jquery-1.9.1.min.js"></script>
    <style>
    .content {
        width: 300px;
    }
    .append{
        background-color: blue;
    }
    .appendTo{
        background-color: red;
    }
    </style>
</head>

<body>
    <h2>通过append与appendTo添加元素</h2>
    <button id="bt1">点击通过jQuery的append添加元素</button>
    <button id="bt2">点击通过jQuery的appendTo添加元素</button>

    <div class="content"></div>

    <script type="text/javascript">

        $("#bt1").on('click', function() {
            //.append(), 选择表达式在函数的前面，
            //参数是将要插入的内容。
            $(".content").append('<div class="append">通过append方法添加的元素</div>')
        })

    </script>

    <script type="text/javascript">

        $("#bt2").on('click', function() {
            //.appendTo()刚好相反，内容在方法前面，
            //无论是一个选择器表达式 或创建作为标记上的标记
            //它都将被插入到目标容器的末尾。
            $('<div class="appendTo">通过appendTo方法添加的元素</div>').appendTo($(".content"))
        })

    </script>

</body>

</html>
```

#### 兄弟元素插入after()与before()

- .after( content ) 在匹配的元素之后插入content
- .before( content ) 在匹配的元素之前插入content

###### 注意:
content的值可以是HTML字符串，DOM 元素，元素数组，或者jQuery对象

```html
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <title></title>
    <script src="http://lib.sinaapp.com/js/jquery/1.9.1/jquery-1.9.1.min.js"></script>
    <style>
    .aaron{
        border: 1px solid red;
    }
    </style>
</head>

<body>
    <h2>通过before与after添加元素</h2>
    <button id="bt1">点击通过jQuery的before添加元素</button>
    <button id="bt2">点击通过jQuery的after添加元素</button>
    <div class="aaron">
        <p class="test1">测试before</p>
    </div>
    <div class="aaron">
        <p class="test2">测试after</p>
    </div>
    <script type="text/javascript">
    $("#bt1").on('click', function() {
        //在匹配test1元素集合中的每个元素前面插入p元素
        $(".test1").before('<p style="color:red">before,在匹配元素之前增加</p>', '<p style="color:red">多参数</p>')
    })
    </script>
    <script type="text/javascript">
    $("#bt2").on('click', function() {
        //在匹配test1元素集合中的每个元素后面插入p元素
        $(".test2").after('<p style="color:blue">after,在匹配元素之后增加</p>', '<p style="color:blue">多参数</p>')

    })
    </script>
</body>
<html>
```


#### 内部插入prepend()与prependTo()
- prepend 向每个匹配的元素内部前置内容
- prependTo 把所有匹配的元素前置到另一个指定的元素集合中

###### append, appendTo, prepend, prependTo比较
- append()向每个匹配的元素内部追加内容
- prepend()向每个匹配的元素内部前置内容
- appendTo()把所有匹配的元素追加到另一个指定元素的集合中
- prependTo()把所有匹配的元素前置到另一个指定的元素集合中

#### 兄弟元素插入insertAfter()与insertBefore()
- .before()和.insertBefore()实现同样的功能,主要的区别是语法——内容和目标的位置。 对于before()选择表达式在函数前面，内容作为参数，而.insertBefore()刚好相反，内容在方法前面，它将被放在参数里元素的前面
- .after()和.insertAfter()也是一样

## DOM节点的删除

#### empty()

移除指定元素中的所有子节点

#### remove()
remove与empty一样，都是移除元素的方法，但是remove会将元素自身移除，同时也会移除元素内部的一切，包括绑定的事件及与该元素相关的jQuery数据。


<font color="red">如果不通过remove方法删除这个节点其实也很简单，但是同时需要把事件给销毁掉，这里是为了防止"内存泄漏"，所以前端开发者一定要注意，绑了多少事件，不用的时候一定要记得销毁</font>

```html
<div class="hello"><p></p></div>
<script>
$('.hello').on("click",fn)

//通过remove处理
$('.hello').remove()
//结果：<div class="hello"><p></p></div> 全部被移除
//节点不存在了,同事事件也会被销毁
</script>
```


###### remove表达式参数
remove比empty好用的地方就是可以传递一个选择器表达式用来过滤将被移除的匹配元素集合，可以选择性的删除指定的节点

```js
//下面两个语句等价
$("p").filter(":contains('3')").remove();
$("p").remove(":contains('3')");
```


#### detach
未完成

## DOM节点的复制与替换

#### DOM拷贝clone()
克隆节点是DOM的常见操作，jQuery提供一个clone方法，专门用于处理dom的克隆

> .clone()方法深度 复制所有匹配的元素集合，包括所有匹配元素、匹配元素的下级元素、文字节点。


> clone方法比较简单就是克隆节点，但是需要注意，如果节点有事件或者数据之类的其他处理，我们需要通过clone(ture)传递一个布尔值ture用来指定，这样不仅仅只是克隆单纯的节点结构，还要把附带的事件与数据给一并克隆了


```
HTML部分
<div></div>

JavaScript部分
$("div").on('click', function() {//执行操作})

//clone处理一
$("div").clone()   //只克隆了结构，事件丢失

//clone处理二
$("div").clone(true) //结构、事件与数据都克隆
```

使用上就是这样简单，使用克隆的我们需要额外知道的细节：
- clone()方法时，在将它插入到文档之前，我们可以修改克隆后的元素或者元素内容，如右边代码我 $(this).clone().css('color','red') 增加了一个颜色
- 通过传递true，将所有绑定在原始元素上的事件处理函数复制到克隆元素上
- clone()方法是jQuery扩展的，只能处理通过jQuery绑定的事件与数据
- 元素数据（data）内对象和数组不会被复制，将继续被克隆元素和原始元素共享。深复制的所有数据，需要手动复制每一个

```html
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <title></title>
    <script src="http://lib.sinaapp.com/js/jquery/1.9.1/jquery-1.9.1.min.js"></script>
    <style>
    .left,
    .right {
        width: 300px;
        height: 120px;
    }
    
    .left div,
    .right div {
        width: 100px;
        height: 90px;
        padding: 5px;
        margin: 5px;
        float: left;
        border: 1px solid #ccc;
        background: #bbffaa;
    }
    </style>
</head>

<body>
    <h2>通过clone克隆元素</h2>
    <div class="left">
        <div class="aaron1">点击,clone浅拷贝</div>
        <div class="aaron2">点击,clone深拷贝,可以继续触发创建</div>
    </div>
    <script type="text/javascript">
        //只克隆节点
        //不克隆事件
        $(".aaron1").on('click', function() {
            $(".left").append( $(this).clone().css('color','red') )
        })
    </script>

    <script type="text/javascript">
        //克隆节点
        //克隆事件
        $(".aaron2").on('click', function() {
            console.log(1)
            $(".left").append( $(this).clone(true).css('color','blue') )
        })
    </script>
</body>

</html>
```


#### DOM替换replaceWith()和replaceAll()
######  .replaceWith( newContent )
：用提供的内容替换集合中所有匹配的元素并且返回被删除元素的集

看个简单的例子：一段HTML代码
```html
<div>
    <p>第一段</p>
    <p>第二段</p>
    <p>第三段</p>
</div>
```

替换第二段的节点与内容
```js
$("p:eq(1)").replaceWith('<a style="color:red">替换第二段的内容</a>')
```

通过jQuery筛选出第二个p元素，调用replaceWith进行替换，结果如下
```html
<div>
    <p>第一段</p>
    <a style="color:red">替换第二段的内容</a>'
    <p>第三段</p>
</div>
```

###### .replaceAll( target ) 

跟replaceWith正好相反,用集合的匹配元素替换每个目标元素
.replaceAll()和.replaceWith()功能类似，但是目标和源相反

###### 注意事项:
- .replaceWith()与.replaceAll() 方法会删除与节点相关联的所有数据和事件处理程序
- .replaceWith()方法，和大部分其他jQuery方法一样，返回jQuery对象，所以可以和其他方法链接使用
- 返回的jQuery对象引用的是被删除的节点，而不是通过replaceWith/replaceAll方法替换的节点


#### DOM包裹wrap()方法
将元素用其他元素包裹起来，也就是给它增加一个父元素


简单的看一段代码：

```html
<p>p元素</p>
```
给p元素增加一个div包裹

```js
$('p').wrap('<div></div>')
```
最后的结构，p元素增加了一个父div的结构
```html
<div>
    <p>p元素</p>
</div>
```



######  .wrap( function )
一个回调函数，返回用于包裹匹配元素的 HTML 内容或 jQuery 对象

```js
$('p').wrap(function() {
    return '<div><div/>';   //与第一种类似，只是写法不一样
})
```

```html
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <title></title>
    <script src="http://lib.sinaapp.com/js/jquery/1.9.1/jquery-1.9.1.min.js"></script>
    <style>
    .left div,
    .right div {
        width: 100px;
        padding: 5px;
        margin: 5px;
        float: left;
        border: 1px solid #ccc;
        background: #bbffaa;
    }
    
    .right div {
        background: yellow;
    }
    
    p {
        border: 1px solid red;
    }
    
    a {
        border: 1px solid blue;
    }
    </style>
</head>

<body>
    <h2>DOM包裹wrap()方法</h2>
    <div class="left">
        <button class="aaron1">点击,通过wrap方法给p元素增加父容器div</button>
        <button class="aaron2">点击,通过wrap的回调方法给a元素增加父容器div</div>
    </div>
    <div class="right">
        <p>p元素</p>
        <p>p元素</p>
    </div>
    <div class="left">
        <a>a元素</a>
        <a>a元素</a>
    </div>
    <script type="text/javascript">
    $(".aaron1").on('click', function() {
        //给所有p元素，增加父容器div
        $('p').wrap('<div></div>')
    })
    </script>
    <script type="text/javascript">
    $(".aaron2").on('click', function() {
        $('a').wrap(function() {
            return '<div class="' + $(this).text() + '" />';
        })
    })
    </script>
</body>

</html>
```

#### DOM包裹unwrap()方法

作用与wrap方法是相反的。将匹配元素集合的父级元素删除，保留自身（和兄弟元素，如果存在）在原来的位置。

看一段简单案例：
```html
<div>
    <p>p元素</p>
</div>
```

```js
$('p').unwarp();
```

结果：
```html
<p>p元素</p>
```


```html
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <title></title>
    <script src="http://libs.baidu.com/jquery/1.9.1/jquery.js"></script>
    <style>
    .left,
    .right {
        width: 250px;
        height: 120px;
    }
    
    .left div,
    .right div {
        width: 100px;
        height: 120px;
        padding: 5px;
        margin: 5px;
        float: left;
        border: 1px solid #ccc;
        background: #bbffaa;
    }
    
    .right div {
        background: yellow;
    }
    p {
        border: 1px solid red;
    }
    
    a {
        border: 1px solid blue;
    }
    </style>
</head>


<body>
    <h2>DOM包裹unwrap()方法</h2>
    <div class="left">
        <div class="aaron1">点击,通过unwrap方法给p元素删除父容器div</div>
        <div class="aaron2">点击,通过unwrap的回调方法给a元素删除父容器div</div>
    </div>
    <div class="right">
        <div>
            <p>p元素</p>
        </div>
        <div>
            <p>p元素</p>
        </div>
    </div>
    <div class="left">
        <div>
            <a>a元素</a>
        </div>
        <div>
            <a>a元素</a>
        </div>
    </div>
    <script type="text/javascript">
    $(".aaron1").on('click', function() {
        //找到所有p元素，删除父容器div
        $('p').unwrap('<div></div>')
    })
    </script>
    <script type="text/javascript">
    $(".aaron2").on('click', function() {
        //找到所有p元素，删除父容器div
        $('a').unwrap(function() {
            return '<div></div>';
        })
    })
    </script>
</body>

</html>
```

####  DOM包裹wrapAll()方法

#### DOM包裹wrapInner()方法


##  jQuery遍历

#### children()方法
jQuery是一个合集对象，如果想快速查找合集里面的第一级子元素，此时可以用children()方法。这里需要注意：.children(selector) 方法是返回匹配元素集合中每个元素的所有子元素（仅儿子辈，这里可以理解为就是父亲-儿子的关系）

###### children(selector)

可能需要对这个合集对象进行一定的筛选，找出目标元素，所以允许传一个选择器的表达式

#### find()方法
这里要注意 children与find方法的区别，children是父子关系查找，find是后代关系（包含父子关系）

#### parent()

快速查找合集里面的每一个元素的父元素

因为是父元素，这个方法只会向上查找一级


###### parent(selector)

#### parents()方法
其实也类似find与children的区别，parent只会查找一级，parents则会往上一直查到查找到祖先节点

#### closest()方法

这个方法类似parents但是又有一些细微的区别
- 起始位置不同：.closest开始于当前元素 .parents开始于父元素
- 遍历的目标不同：.closest要找到指定的目标，.parents遍历到文档根元素，closest向上查找，知道找到一个匹配就停止查找，parents一直查找到根元素，并将匹配的元素加入集合
- 结果不同：.closest返回的是包含零个或一个元素的jquery对象，parents返回的是包含零个或一个或多个元素的jquery对象

####  next()方法
查找指定元素集合中每一个元素紧邻的<font color="red">后面同辈元素</font> 的元素集合


#### prev()方法
查找指定元素集合中每一个元素紧邻的<font color="red">前面同辈元素</font> 的元素集合


如下的class="item-2"的li元素，class="item-1"就是它的prev兄弟节点
```html
<ul class="level-3">
    <li class="item-1">1</li>
    <li class="item-2">2</li>
    <li class="item-3">3</li>
</ul>
```

#### siblings()
查找指定元集合中每一个元素紧邻的前面后面同辈元素
>注意：jQuery是一个合集对象，所以通过siblings是匹配合集中每一个元素的前后兄弟元素

> 同样的也是因为jQuery是合集对象，可能需要对这个合集对象进行一定的筛选，找出目标元素，所以允许传一个选择器的表达式


#### add()方法

给匹配的集合增加对象



简单的看一个案例：

操作：选择所有的li元素，之后需要把p元素也加入到li的合集中
```html
<ul>
    <li>list item 1</li>
    <li>list item 3</li>
</ul>
<p>新的p元素</p>
```

```js
$('li').add('p')
```

```html
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <title></title>
    <style>
    .left {
        width: auto;
        height: 150px;
    }
    
    .left div {
        width: 150px;
        height: 120px;
        padding: 5px;
        margin: 5px;
        float: left;
        background: #bbffaa;
        border: 1px solid #ccc;
    }
    </style>
    <script src="http://libs.baidu.com/jquery/1.9.1/jquery.js"></script>
</head>

<body>
    <h2>add方法()</h2>
    <div class="left first-div">
        <div class="div">
            <ul>
                <li>list item 1</li>
                <li>list item 2</li>
                <li>list item 3</li>
            </ul>
            <p>新的p元素</p>
        </div>
    </div>
    <div class="right"></div>
    <br/>
    <button>点击：add传递元素标签</button>
    <script type="text/javascript">
    $("button:first").click(function() {
         //把p元素加到li合集中
         $('li').add('p').css('background', 'red')
    })
    </script>
</body>

</html>

```

#### each()

.each() 方法就是一个for循环的迭代器，它会迭代jQuery对象合集中的每一个DOM元素

```js
$("li").each(function(index, element) {
     index 索引 0,1
     element是对应的li节点 li,li
     this 指向的是li
})
```
<font color="red">这样可以在循环体会做一些逻辑操作了，如果需要提前退出，可以以通过返回 false以便在回调函数内中止循</font>

```html
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <title></title>
    <style>
    .left {
        width: auto;
        height: 150px;
    }
    
    .left div {
        width: 150px;
        height: 120px;
        padding: 5px;
        margin: 5px;
        float: left;
        background: #bbffaa;
        border: 1px solid #ccc;
    }
    </style>
    <script src="http://libs.baidu.com/jquery/1.9.1/jquery.js"></script>
</head>

<body>
    <h2>each方法</h2>
    <div class="left first-div">
        <div class="div">
            <ul>
                <li>list item 1</li>
                <li>list item 2</li>
                <li>list item 3</li>
            </ul>
        </div>
        <div class="div">
            <ul>
                <li>list item 4</li>
                <li>list item 5</li>
                <li>list item 6</li>
            </ul>
        </div>
    </div>

    <br/>
    <button>点击：each方法遍历元素</button>
    <button>点击：each方法回调判断</button>
    <script type="text/javascript">
    $("button:first").click(function() {
        //遍历所有的li
        //修改每个li内的字体颜色
        $("li").each(function(index, element) {
            $(this).css('color','red')
        })

    })
    </script>
    <script type="text/javascript">
    $("button:last").click(function() {
        //遍历所有的li
        //修改偶数li内的字体颜色
        $("li").each(function(index, element) {
            if (index % 2) {
                $(this).css('color','blue')
            }
        })
    })
    </script>
</body>

</html>
```