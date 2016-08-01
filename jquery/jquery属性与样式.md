# jquery属性与样式

### .attr()与.removeAttr()

```html
<img src="" alt="">
```

`src`, `alt`..这些就是标签的属性(attribute)

操作特性的DOM方法主要有3个，getAttribute方法、setAttribute方法和removeAttribute方法，就算如此在实际操作中还是会存在很多问题。而在jQuery中用一个attr()与removeAttr()就可以全部搞定了，包括兼容问题


###### .attr()有4个表达式
1. attr(传入属性名)：获取属性的值
2. attr(属性名, 属性值)：设置属性的值
3. attr(属性名,函数值)：设置属性的函数值
4. attr(attributes)：给指定元素设置多个属性值，即：{属性名一: “属性值一” , 属性名二: “属性值二” , … … }

###### removeAttr()删除方法
.removeAttr( attributeName ) : 为匹配的元素集合中的每个元素中移除一个属性（attribute）


**注意的问题：**
dom中有个概念的区分：Attribute和Property翻译出来都是“属性

1. Attribute就是dom节点自带的属性,例如：html中常用的id、class、title、align等
2. 而Property是这个DOM元素作为对象，其附加的内容，例如,tagName, nodeName, nodeType,, defaultChecked, 和 defaultSelected 使用.prop()方法进行取值或赋值等
3. 获取Attribute就需要用attr，获取Property就需要用prop


```html
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <title></title>
    <style>
    input {
        display    : block;
        margin     : 10px;
        padding    : 10px;
        background : #bbffaa;
        border     : 1px solid #ccc;
    }
    </style>
    <script src="http://libs.baidu.com/jquery/1.9.1/jquery.js"></script>
</head>

<body>
    <h2>.attr()与.removeAttr()</h2>
    <h3>.attr</h3>
    <form>
        <input type="text" value="设置value" />
        <input type="text" value="获取value"/>
        <input type="text" value="回调拼接value" />
        <input type="text" value="删除value" />
    </form>

    <script type="text/javascript">
        //找到第一个input，通过attr设置属性value的值
        $("input:first").attr('value','.attr( attributeName, value )')
    </script>

    <script type="text/javascript">
        //找到第二个input，通过attr获取属性value的值
        var value = $("input:eq(1)").attr('value');
        console.log(value);
    </script>

    <script type="text/javascript">
        //找到第三个input，通过使用一个函数来设置属性
        //可以根据该元素上的其它属性值返回最终所需的属性值
        //例如，我们可以把新的值与现有的值联系在一起：
        $("input:eq(2)").attr('value',function(i, val){
            return '通过function设置' + val
        })
    </script>

    <script type="text/javascript">
        //找到第四个input，通过使用removeAttr删除属性
        $("input:eq(3)").removeAttr('value')
    </script>


</body>

</html>
```


### html()及.text()

读取、修改元素的html结构或者元素的文本内容

###### .html()方法 

- .html() 不传入值，就是获取集合中 <font color="red">第一个匹配元素</font> 第一个匹配元素的HTML内容
- .html( htmlString )  设置每一个匹配元素的html内容
- .html( function(index, oldhtml) ) 用来返回设置HTML内容的一个函数

###### 注意事项：
- .htm()方法内部使用的是DOM的innerHTML属性来处理的，所以在设置与获取上需要注意的一个最重要的问题，这个操作是针对整个HTML内容（不仅仅只是文本内容）

### text()

得到匹配元素集合中每个元素的文本内容结合，包括他们的后代，或设置匹配元素集合中每个元素的文本内容为指定的文本内容。，具体有3种用法：

- .text() 得到匹配元素集合中每个元素的合并文本，包括他们的后代
- .text( textString ) 用于设置匹配元素内容的文本
- .text( function(index, text) ) 用来返回设置文本内容的一个函数

###### 注意事项： 
.text()结果返回一个字符串，包含所有匹配元素的合并文本

###### .html与.text的异同:
1. .html与.text的方法操作是一样，只是在具体针对处理对象不同
2. .html处理的是元素内容，.text处理的是文本内容
3. 如果处理的对象只有一个子文本节点，那么html处理的结果与text是一样的
4. 火狐不支持innerText属性，用了类似的textContent属性，.text()方法综合了2个属性的支持，所以可以兼容所有浏览器

```html
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <title></title>
    <link rel="stylesheet" href="imooc.css" type="text/css">
    <script src="http://libs.baidu.com/jquery/1.9.1/jquery.js"></script>
</head>

<body>
    <h3>.html()与.text()</h3>
    <div class="left first-div">
        <div class="div">
            <a>:first-child</a>
            <a>第二个元素</a>
            <a>:last-child</a>
        </div>  
        <div class="div">
            <a>:first-child</a>
            <a>第二个元素</a>
            <a>:last-child</a>
        </div>
    </div>
    
    <h4>显示通过html方法获取到的内容</h4>
    <p></p>

    <h4>显示通过text方法获取到的内容</h4>
    <p></p>


    <script type="text/javascript">
        //显示出html方法获取到的内容
        //.html()是整个html文档结构
        $('p:first').html( $(".first-div").html() ) 
    </script>


    <script type="text/javascript">
        //显示出text方法获取到的内容
        //.text()是文本内容的合集
        $('p:last').text( $(".first-div").text() ) 
    </script>


    <script type="text/javascript">
        //通过.text()方法替换文本内容
        $(".left a:first").text('替换第一个a元素的内容')
    </script>


    <script type="text/javascript">
        //通过.html()方法替换html结构
        $(".left div:first").html('整个div的子节点都被替换了')
    </script>


    <script type="text/javascript">
        //通过.text()的回调，获取原本的内容，修改，在重新赋值
        $(".left a:first").text(function(idnex,text){
            return '增加新的文本内容' + text
        })
    </script>
</body>

</html>
```

### .val()
jQuery中有一个.val()方法主要是用于处理表单元素的值，比如 input, select 和 textarea。

.val()方法

- .val()无参数，获取匹配的元素集合中第一个元素的当前值
- .val( value )，设置匹配的元素集合中每个元素的值
- .val( function ) ，一个用来返回设置值的函数

###### 注意事项：
- 通过.val()处理select元素， 当没有选择项被选中，它返回null
- .val()方法多用来设置表单的字段的值
- 如果select元素有multiple（多选）属性，并且至少一个选择项被选中， .val()方法返回一个数组，这个数组包含每个选中选择项的值

```html
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <title></title>
    <style>
    p {
        color: red;
        margin: 4px;
    }
    
    b {
        color: blue;
    }
    </style>
    <script src="http://libs.baidu.com/jquery/1.9.1/jquery.js"></script>
</head>

<body>
    <h3>.val()</h3>
    
    <select id="single">
        <option>value1</option>
        <option>value2</option>
    </select>
    <select id="multiple" multiple="multiple">
        <option selected="selected">value1</option>
        <option>value1</option>
        <option selected="selected">value2</option>
    </select>
    <input type="text" value="click a button" />
    <p></p>

    <script type="text/javascript">
        //单个select，返回第一个
        $("p").text( $("#single").val() )
    </script>

    <script type="text/javascript">
        //多个select被选择，返回["value1", "value2"]
        $("p").text( $("#multiple").val() ) 
    </script>


    <script type="text/javascript">
        //选择一个表单，修改value的值
        $("input[type='text']").val('修改表单的字段') 
    </script>


</body>

</html>
```

### 增加样式.addClass()
通过动态改变类名（class），可以让其修改元素呈现出不同的效果。在HTML结构中里，多个class以空格分隔，当一个节点（或称为一个标签）含有多个class时，DOM元素响应的className属性获取的不是class名称的数组，而是一个含有空格的字符串，这就使得多class操作变得很麻烦。同样的jQuery开发者也考虑到这种情况，增加了一个.addClass()方法，用于动态增加class类名


###### .addClass( className )方法

- .addClass( className ) : 为每个匹配元素所要增加的一个或多个样式名
- .addClass( function(index, currentClass) ) : 这个函数返回一个或更多用空格隔开的要增加的样式名

###### 注意事项：
.addClass()方法不会替换一个样式类名。它只是简单的添加一个样式类名到元素上

### 删除样式.removeClass()

jQuery通过.addClass()方法可以很便捷的增加样式。如果需要样式之间的切换，同样jQuery提供了一个很方便的.removeClass()，它的作用是从匹配的元素中删除全部或者指定的class

###### .removeClass( )方法
- .removeClass( [className ] )：每个匹配元素移除的一个或多个用空格隔开的样式名
- .removeClass( function(index, class) ) ： 一个函数，返回一个或多个将要被移除的样式名

###### 注意事项:
如果一个样式类名作为一个参数,只有这样式类会被从匹配的元素集合中删除 。 如果没有样式名作为参数，那么所有的样式类将被移除


### 切换样式.toggleClass()
在做某些效果的时候，可能会针对同一节点的某一个样式不断的切换，也就是addClass与removeClass的互斥切换，比如隔行换色效果

jQuery提供一个toggleClass方法用于简化这种互斥的逻辑，通过toggleClass方法动态添加删除Class，一次执行相当于addClass，再次执行相当于removeClass


.toggleClass( )方法：在匹配的元素集合中的每个元素上添加或删除一个或多个样式类,取决于这个样式类是否存在或值切换属性。即：如果存在（不存在）就删除（添加）一个类

### 样式操作.css()

```js
//获取css值
$("p").css("background-color");
//设置ccs值
$("p").css("background-color","yellow");
//设置多个css值
$("p").css({"background-color":"yellow","font-size":"200%"});
```


### .css()与.addClass()设置样式的区别
对于样式的设置，我们学了addClass与css方法，那么两者之间有什么区别？

###### 可维护性：
.addClass()的本质是通过定义个class类的样式规则，给元素添加一个或多个类。css方法是通过JavaScript大量代码进行改变元素的样式

通过.addClass()我们可以批量的给相同的元素设置统一规则，变动起来比较方便，可以统一修改删除。如果通过.css()方法就需要指定每一个元素是一一的修改，日后维护也要一一的修改，比较麻烦

###### 灵活性：
通过.css()方式可以很容易动态的去改变一个样式的属性，不需要在去繁琐的定义个class类的规则。一般来说在不确定开始布局规则，通过动态生成的HTML代码结构中，都是通过.css()方法处理的


###### 样式值：
.addClass()本质只是针对class的类的增加删除，不能获取到指定样式的属性的值，.css()可以获取到指定的样式值。

######  样式的优先级：
通过.css()方法处理的是内联样式，直接通过元素的style属性附加到元素上的
通过.css方法设置的样式属性优先级要高于.addClass方法

###### 总结：
.addClass与.css方法各有利弊，一般是静态的结构，都确定了布局的规则，可以用addClass的方法，增加统一的类规则
如果是动态的HTML结构，在不确定规则，或者经常变化的情况下，一般多考虑.css()方式




