#  jquery事件

## 常见的事件

###### 鼠标事件
1. click
2. dblclick 
3. mouseenter
4. mouseleave
5. mousemove

######  键盘事件
1. keypress
2. keydwon
3. keyup

###### 表单事件
1. submit
2. change
3. focus
4.  blur



###### 文档/窗口事件
1. load
2. resize
3. scroll
4. unload


## jQuery 事件方法语法


**在 jQuery 中，大多数 DOM 事件都有一个等效的 jQuery 方法**

注册一个事件监听函数
```js
$("p").click(function(event){
    // do something
});
```

触发一个事件
```js
$("p").click();
```

## 常用的 jQuery 事件方法
#### $(document).ready()
在文档完全加载完后执行函数


#### mouseover与mouseout事件和mouseenter与mouseleave事件
他们都是鼠标在元素上的移入移除
<font color="red">他们的区别是: 关键点就是：冒泡的方式处理问题</font>

我们以mouseover和mouseenter为例:

```html
<div>
    <p>鼠标离开此区域触发mouseleave事件</p>
</div>
```

如果在p元素与div元素都绑定mouseover事件，鼠标在离开p元素，但是没有离开div元素的时候，触发的结果:
- p元素响应事件
- div元素响应事件

这里的问题是div为什么会被触发？ 原因就是事件冒泡的问题，p元素触发了mouseover，他会一直往上找父元素上的mouseover事件，如果有全触发了

所以在这种情况下面，jQuery推荐我们使用 mouseenter事件
> mouseenter事件只会在绑定它的元素上被调用，而不会在后代节点上被触发


```html
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <title></title>
    <style>
    .left div,
    .right div {
        width: 350px;
        height: 150px;
        padding: 5px;
        margin: 5px;
        border: 1px solid #ccc;
    }
    p{
        height: 50px;
        border: 1px solid red;
        margin: 30px;
    }
    .left div {
        background: #bbffaa;
    }
    .right div {
        background: yellow;
    }
    </style>
    <script src="http://libs.baidu.com/jquery/1.9.1/jquery.js"></script>
</head>

<body>
    <h2>.mouseover()方法</h2>
    <div class="left">
        <div class="div1">
            <p>鼠标离开此区域触发mouseover事件</p>
            <a>mouseover事件触发次数：</a><br/>
            <a>mouseover冒泡事件触发次数：</a>
        </div>
    </div>

    <h2>.mouseenter()方法</h2>
    <div class="right">
        <div class="div2">
            <p>鼠标离开此区域触发mouseenter事件</p>
            <a>mouseenter事件触发次数：</a><br/>
            <a>mouseenter冒泡事件触发次数：</a>
        </div>
    </div>
    <br/>
   
    
    <script type="text/javascript">

        var i = 0;
        $(".div1 p").mouseover(function(e) {
            $(".div1 a:first").html('mouseover事件触发次数：' + (++i))
        })

        var n = 0;
        $(".div1").mouseover(function() {
            $(".div1 a:last").html('mouseover冒泡事件触发次数：' + (++n))
        })


    </script>


    <script type="text/javascript">

        var i = 0;
        $(".div2 p").mouseenter(function(e) {
            $(".div2 a:first").html('mouseenter事件触发次数：' + (++i))
        })

        var n = 0;
        $(".div2").mouseenter(function() {
            $(".div2 a:last").html('mouseenter冒泡事件触发次数：' + (++n))
        })

    </script>


</body>

</html>
```


#### blur,focus和focusin,focusout
也是冒泡处理的方式不同

####  change事件
`<input>`元素，`<textarea>`和`<select>`元素都是可以选择值一些改变，开发者可以通过change事件去监听这些改变的动作

###### input元素

监听value值的变化，当有改变时，失去焦点后触发change事件

###### select元素
对于下拉选择框，复选框和单选按钮，当用户用鼠标作出选择，该事件立即触发

```html
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <title></title>
    <style>
    .left div,
    .right div {
        width: 100%;
        padding: 5px;
        margin: 5px;
        float: left;
        border: 1px solid #ccc;
    }
    
    .left div {
        background: #bbffaa;
    }
    
    .right div {
        background: yellow;
    }
    </style>
    <script src="http://libs.baidu.com/jquery/1.9.1/jquery.js"></script>
</head>

<body>
    <h2>input、textarea与select</h2>
    <div class="left">
        <div>input：
            <input class="target1" type="text" value="监听input的改变" />
        </div>
        <div>select：
            <select class="target2">
                <option value="option1" selected="selected">Option 1</option>
                <option value="option2">Option 2</option>
            </select>
        </div>
    </div>
    输出结果：
    <div id="result"></div>
    <script type="text/javascript">
    
    //监听input值的改变
    $('.target1').change(function(e) {
        $("#result").html(e.target.value)
    });

    //监听select：
    $(".target2").change(function(e) {
        $("#result").html(e.target.value)
    })

    </script>
</body>

</html>

```

#### submit事件
提交表单是一个最常见的业务需求，比如用户注册，一些信息的输入都是需要表单的提交。同样的有时候开发者需要在表单提交的时候过滤一些的数据、做一些必要的操作（例如：验证表单输入的正确性，如果错误就阻止提交，从新输入）此时可以通过submit事件，监听下提交表单的这个动作

这里需要特别注意：
> form元素是有默认提交表单的行为，如果通过submit处理的话，需要禁止浏览器的这个默认行为
传统的方式是调用事件对象  e.preventDefault() 来处理， jQuery中可以直接在函数中最后结尾return false即可

```js
$("#target").submit(function(data) { 
   return false; //阻止默认行为，提交表单
});
```


#### keydown()与keyup()事件

注意：
- keydown是在键盘按下就会触发
- keyup是在键盘松手就会触发
- 理论上它可以绑定到任何元素，但keydown/keyup事件只是发送到具有焦点的元素上，不同的浏览器中，可获得焦点的元素略有不同，但是表单元素总是能获取焦点，所以对于此事件类型表单元素是最合适的。

```html
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <title></title>
    <style>
    .left div,
    .right div {
        width: 500px;
        height: 50px;
        padding: 5px;
        margin: 5px;
        float: left;
        border: 1px solid #ccc;
    }
    
    .left div {
        background: #bbffaa;
    }
    em{
        font-weight: 900;
        color: red;
    }
    </style>
   <script src="http://lib.sinaapp.com/js/jquery/1.9.1/jquery-1.9.1.min.js"></script>
</head>

<body>
    <h2>keydown()与keyup()事件</h2>
    <div class="left">
        <h4>测试一</h4>
        <div class="aaron">监听keydown输入:
            <input class="target1" type="text" value="" /><br />
            按下显示输入的值:<em></em>
        </div>
        <h4>测试二</h4>
        <div class="aaron">监听keyup输入:
            <input class="target2" type="text" value="" /><br />
            松手显示输入的值:<em></em>
        </div>
    </div>

    <script type="text/javascript">
    //监听键盘按键
    //获取输入的值
    $('.target1').keydown(function(e) {
        $("em:first").text(e.target.value)
    });

    //监听键盘按键
    //获取输入的值
    $('.target2').keyup(function(e) {
        $("em:last").text(e.target.value)
    });

    </script>

</body>

</html>
```

## 事件的绑定和解绑


#### .on()
之前学的鼠标事件，表单事件与键盘事件都有个特点，就是直接给元素绑定一个处理函数，所有这类事件都是属于快捷处理。翻开源码其实可以看到，所有的快捷事件在底层的处理都是通过一个"on"方法来实现的。jQuery on()方法是官方推荐的绑定事件的一个方法。

```js
$("#elem").click(function(){})  //快捷方式
$("#elem").on('click',function(){}) //on方式
```

多个事件绑定同一个函数
```js
 $("#elem").on("mouseover mouseout",function(){ });
```

多个事件绑定不同函数
```js
$("#elem").on({
    mouseover:function(){},  
    mouseout:function(){},
});
```

将数据传递到处理程序
```js
function foo(event){
    console.log(event.data.name); //someone
}

$( "button" ).on("click", {name: "someone"}, foo);
```
可以通过第二参数（对象），当一个事件被触发时，要传递给事件处理函数的, 通过event.data来引用



#### 事件委托

一个例子:
html代码
```html
<ul id="data-list">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    …
    <li>100</li>
</ul>
<div id="data-show"></div>
```
js代码
```js
$('#data-list li').on('click', function() {
    $('#data-show').html($(this).html());
});
```
其实是给列表的每一项（100个）分别绑定了点击事件。这样做的弊端在于，增加了内存，因为$(’#data-list li’)里有100个li对象。同时降低了代码性能，因为$(’#data-list li’)会搜索ul#data-list下所有的li元素。

###### 什么是事件委托
jquery中提供的事件委托的用法
```js
$("#datalist").on('click', 'li', function() {
    $('#data-show').html($(this).html());
})
```
将li元素的点击事件委托给其父元素ul。这么做之所以行得通，是因为事件具有冒泡的特点，当内层元素的某个事件被触发，事件会一级一级冒泡到更外层元素。当外层元素被绑定事件且被触发时，判断事件的来源即event.target是否是目标元素li，如果是就执行回调。上面的代码等价于：

```js
function showText(text) {
    $('#data-show').html(text);
}

$('#data-list').on('click', function(event) {
    var $target = $(event.target);
    if ($target.is('li')) {
        showText($target.html());
    }
});
```


<font color="red">好处：提高性能，新添加的元素还会有之前的事件。</font>

#### 卸载事件off()方法
- 通过.on()绑定的事件处理程序
- 通过off() 方法移除该绑定

一个例子

绑定2个事件
```js
$("elem").on("mousedown mouseup",fn)
```
删除一个事件
```js
$("elem").off("mousedown")
```

删除多个事件
```js
$("elem").off("mousedown mouseup")
```
删除所有事件
```js
$("elem").off()
```


## 事件对象的使用

```js
$(elem).on("click",function(event){
   event //事件对象
})
```

事件对象是用来记录一些事件发生时的相关信息的对象。事件对象只有事件发生时才会产生，并且只能是事件处理函数内部访问，在所有事件处理函数运行结束后，事件对象就被销毁


## jQuery事件对象的属性和方法
事件对象的属于与方法有很多，但是我们经常用的只有那么几个

#### event.target
返回哪个 DOM 元素触发了事件

一个例子:
```html
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <title></title>
    <style>
    .left div,
    .right div {
        width: 500px;
        height: 100px;
        padding: 5px;
        margin: 5px;
        float: left;
        border: 1px solid #ccc;
    }
    
    .left div {
        background: #bbffaa;
    }
    
    .right div {
        background: yellow;
    }
    </style>
    <script src="http://libs.baidu.com/jquery/1.9.1/jquery.js"></script>
</head>

<body>
    <h3>事件委托，通过事件对象区别触发元素</h3>
    <div class="left">
        <div>
            <ul>
                <li>点击：触发一</li>
                <li>点击：触发二</li>
                <li>点击：触发三</li>
                <li>点击：触发四</li>
            </ul>
        </div>
    </div>

    <script type="text/javascript">

        //多事件绑定一
        $("ul").on('click', 'li',function(e){
            $target = $(e.target);
           alert('触发的元素是内容是: ' + $target.text())
        })



    </script>

</body>


</html>
```

####  event.type：获取事件的类型
```js
$("a").click(function(event) {
  alert(event.type); // "click"事件
});
```

#### event.pageX 和 event.pageY：获取鼠标当前相对于页面的坐标
通过这2个属性，可以确定元素在当前页面的坐标值，鼠标相对于文档的左边缘的位置（左边）与 （顶边）的距离，简单来说是从页面左上角开始,即是以页面为参考点,不随滑动条移动而变化

#### event.preventDefault() 方法：阻止默认行为
这个用的特别多，在执行这个方法后，如果点击一个链接（a标签），浏览器不会跳转到新的 URL 去了。我们可以用 event.isDefaultPrevented() 来确定这个方法是否(在那个事件对象上)被调用过了

####  event.stopPropagation() 方法：阻止事件冒泡

事件是可以冒泡的，为防止事件冒泡到DOM树上，也就是不触发的任何前辈元素上的事件处理函数

#### event.which：获取在鼠标单击时，单击的是鼠标的哪个键

event.which 属性返回指定事件上哪个键盘键或鼠标按钮被按下。

#### event.currentTarget : 在事件冒泡过程中的当前DOM元素
冒泡前的当前触发事件的DOM对象, 等同于this.

#### this和event.target的区别：
js中事件是会冒泡的，所以this是可以变化的，但event.target不会变化，它永远是直接接受事件的目标DOM元素；

#### .this和event.target都是dom对象
如果要使用jquey中的方法可以将他们转换，为jquery对象：$(this)和$(event.target);比如：event.target和$(event.target)的使用：





