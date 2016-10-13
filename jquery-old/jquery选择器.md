# jquery选择器

### id选择器


页面的任何操作都需要节点的支撑，开发者如何快速高效的找到指定的节点也是前端开发中的一个重点。


id选择器：一个用来查找的ID，即元素的id属性
```js
$( "#id" )
```
id选择器也是基本的选择器，jQuery内部使用JavaScript函数document.getElementById()来处理ID的获取。原生语法的支持总是非常高效的，所以在操作DOM的获取上，如果能采用id的话尽然考虑用这个选择器

###  类选择器
类选择器，相对id选择器来说，效率相对会低一点，但是优势就是可以多选
```js
$(".class")
```
类选择器，相对id选择器来说，效率相对会低一点，但是优势就是可以多选

同样的jQuery在实现上，对于类选择器，如果浏览器支持，jQuery使用JavaScript的原生getElementsByClassName()函数来实现的

jquery与原生javascript对比

原生javascript代码
```js
//通过原生方法处理
//样式是可以多选的，所以得到的是一个合集
//需要通过循环给合集中每一个元素修改样式
var divs = document.getElementsByClassName('class');
for (var i = 0; i < divs.length; i++) {
    divs[i].style.border = "3px solid blue";
}
```

jquery代码
```js
//通过原生方法处理
//样式是可以多选的，所以得到的是一个合集
//需要通过循环给合集中每一个元素修改样式
$('.class').css("border", "3px solid red");
```

### 元素选择器

```js
$( "element" )
```

同样的也有原生方法getElementsByTagName()函数支持


### 全选择器（*选择器）
```js
$( "*" )
```
抛开jQuery，如果要获取文档中所有的元素，通过document.getElementsByTagName()中传递"*"同样可以获取到

不难发现，id、class、tag都可以通过原生的方法获取到对应的节点，但是我们还需要考虑一个兼容性的问题，比如:

- IE会将注释节点实现为元素，所以在IE中调用getElementsByTagName里面会包含注释节点，这个通常是不应该的
- getElementById的参数在IE8及较低的版本不区分大小写
- IE7及较低的版本中，表单元素中，如果表单A的name属性名用了另一个元素B的ID名并且A在B之前，那么getElementById会选中A
- IE8及较低的版本，浏览器不支持getElementsByClassName

### 层级选择器
> 子元素 后代元素 兄弟元素 相邻元素


 仔细观察层级选择器之间还是有很多相似与不同点:
 - 层级选择器都有一个参考节点
 - 后代选择器包含子选择器的选择的内容
 - 一般兄弟选择器包含相邻兄弟选择的内容
 - 相邻兄弟选择器和一般兄弟选择器所选择到的元素，必须在同一个父元素下


### 基本筛选选择器
很多时候我们不能直接通过基本选择器与层级选择器找到我们想要的元素，为此jQuery提供了一系列的筛选选择器用来更快捷的找到所需的DOM元素。筛选选择器很多都不是CSS的规范，而是jQuery自己为了开发者的便利延展出来的选择器

筛选选择器的用法与CSS中的伪元素相似，选择器用冒号“：”开头，通过一个列表，看看基本筛选器的描述：


###### $(":first")

在匹配的集合中的第一个元素


###### $(":last") 

在匹配的集合中的最后一个元素


###### $(":not(selector)")

一个用来过滤的选择器，匹配所有除了满足给定selector的元素

###### $(":eq(index)")

在匹配的集合中选择索引值为index的元素

**注意：索引index都是从0开始，为0代表第一个元素，为1代表第二个元素**


###### $(":lt(index)")
在匹配的集合中选择索引值小于index的元素

###### $(":gt(index)")
在匹配的集合中选择索引值大于index的元素

###### $(":even")
在匹配的集合中选择索引值为偶数的元素

###### $(":odd")
在匹配的集合中选择索引值为奇数的元素

```html
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <title></title>
    <script src="http://libs.baidu.com/jquery/1.9.1/jquery.js"></script>
</head>

<body>
    <h2>基本筛选器</h2>
    <h3>:first/:last/:even/:odd</h3>
    <div>
        <div class="div">
            <p>div:first</p>
            <p>:even</p>
        </div>
        <div class="div">
            <p>:odd</p>
        </div>
        <div class="div">
            <p>:even</p>
        </div>
        <div class="div">
            <p>:odd</p>
        </div>
        <div class="div">
            <p>:even</p>
        </div>
        <div class="div">
            <p>div:last</p>
            <p>:odd</p>
        </div>
    </div>
    <script type="text/javascript">
    //找到第一个.div
    $(".div:first").css("color", "red");
    </script>
    
    <script type="text/javascript">
    //找到最后一个.div
    $(".div:last").css("color", "green");
    </script>
    
    <script type="text/javascript">
    //:even 选择所引值为偶数的元素，从 0 开始计数
    $(".div:even").css("border", "3px groove red");
    </script>
    
    <script type="text/javascript">
    //:odd 选择所引值为奇数的元素，从 0 开始计数
    $(".div:odd").css("border", "3px groove blue");
    </script>
    
    
    <h3>:eq/:gt/:lt</h3>
    <div>
        <div class="div-2">
            <p>:lt(3)</p>
        </div>
        <div class="div-2">
            <p>:lt(3)</p>
        </div>
        <div class="div-2">
            <p>:eq(2)</p>
        </div>
        <div class="div-2">
            none
        </div>
        <div class="div-2">
            <p>:gt(3)</p>
        </div>
        <div class="div-2">
            <p>:gt(3)</p>
        </div>
    </div>
    <script type="text/javascript">
    //:eq
    //选择index为2的.dev-2
    $(".div-2:eq(2)").css("border", "3px groove blue");
    </script>
    
    <script type="text/javascript">
    //:gt 选择匹配集合中所有索引值大于给定index参数的元素
    $(".div-2:gt(3)").css("border", "3px groove red");
    </script>
    
     <script type="text/javascript">
    //:lt 选择匹配集合中所有索引值小于给定index参数的元素
    //与:gt相反
    $(".div-2:lt(3)").css("color", "#CD00CD");
    </script>
    
    <h3>:not</h3>
    <div class="left">
        <div>
            <input type="checkbox" name="a" />
            <p>some</p>
        </div>
        <div>
            <input type="checkbox" name="b" />
            <p>some</p>
        </div>
        <div>
            <input type="checkbox" name="c" checked="checked" />
            <p>其他</p>
        </div>
    </div>
    <script type="text/javascript">
        //:not 选择所有元素去除不匹配给定的选择器的元素
        //选取所有input中,没有checked属性的p元素，赋予颜色
        $("input:not(:checked)+p").css("background-color", "#CD00CD");
    </script>
</body>

</html>
```

### 内容筛选选择器
- :contains(text) 选择包含指定文本的元素
- :parent  选择含有子元素(包括文本节点)的元素
- :empty 选择没有子元素(包括文本节点)的元素
- :has(selector) 选择的元素 至少包含指定的选择器匹配的一个元素

###### 注意
1. :contains与:has都有查找的意思，但是contains查找包含“指定文本”的元素，has查找包含“指定元素”的元素
2. 如果:contains匹配的文本包含在元素的子元素中，同样认为是符合条件的。
3. :parent与:empty是相反的，两者所涉及的子元素，包括文本节点

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
    <h2>内容筛选器</h2>
    <h3>:contains/:has</h3>
    <div class="left">
        <div class="div">
            <p>:contains</p>
        </div>
        <div class="div">
            <p>:contains</p>
        </div>
        <div class="div">
            <p>
                <span>:has</span>
            </p>
        </div>
        <div class="div">
            <p>:contains</p>
        </div>
    </div>

    <script type="text/javascript">
        //查找所有class='div'中DOM元素中包含"contains"的元素节点
        //并且设置颜色
        $(".div:contains(contains)").css("color", "#CD00CD");
    </script>

    <script type="text/javascript">
        //查找所有class='div'中DOM元素中包含"span"的元素节点
        //并且设置颜色
        $(".div:has(span)").css("color", "blue");
    </script>


    <h3>:parent/:empty</h3>
    <div class="left">
        <div>
            <a>:parent</a>
        </div>
        <div>
            <a>:parent</a>
        </div>
        <div>
            <a>:parent</a>
        </div>
        <div>
            <a></a>
        </div>
    </div>
    <script type="text/javascript">
       //选择所有a元素，并且是有子元素的
       //增加一个蓝色的边框
       $("a:parent").css("border", "3px groove blue");
    </script>

    <script type="text/javascript">
       //找到a元素下面的所有空节点(没有子元素)
       //增加一段文本与边框
       $("a:empty").text(":empty").css("border", "3px groove red"); 
    </script>

</body>

</html>
```

###  可见性筛选选择器

###### $(":visible")
选择所有显示的元素

###### $(":hidden")
选择所有隐藏的元素





这2个选择器都是 jQuery 延伸出来的，看起来比较简单，但是元素可见性依赖于适用的样式

```
:hidden选择器，不仅仅包含样式是display="none"的元素，还包括隐藏表单、visibility等等
```

我们有几种方式可以隐藏一个元素:

- CSS display的值是none。
- type="hidden"的表单元素。
- 宽度和高度都显式设置为0。
- 一个祖先元素是隐藏的，该元素是不会在页面上显示
- CSS visibility的值是hidden
- CSS opacity的指是0 

```
如果元素中占据文档中一定的空间,元素被认为是可见的。
可见元素的宽度或高度，是大于零。
元素的visibility: hidden 或 opacity: 0被认为是可见的，因为他们仍然占用空间布局。
```

**不在文档中的元素是被认为是不可见的，如果当他们被插入到文档中，jQuery没有办法知道他们是否是可见的，因为元素可见性依赖于适用的样式**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="http://libs.baidu.com/jquery/1.9.1/jquery.js"></script>
</head>
<body>
    <p style="display:none">something</p>
    <p style="width:0;height:0;">something</p>
    <p style="width:0;height:0;margin:1px;">something</p>
    <p style="width:0;height:0;padding:1px;">something</p>
    <p style="width:0;height:0;border:1px solid #111;">something</p>
    <p style="visibility: hidden">something</p>
    <p style="opacity:0">something</p>
<script>
    var $hiddenP = $("p:hidden");
    //display:none, width:0;height:0;
    console.log($hidden);
</script>
</body>
</html>
```

###### 属性筛选选择器
属性选择器让你可以基于属性来定位一个元素。可以只指定该元素的某个属性，这样所有使用该属性而不管它的值，这个元素都将被定位，也可以更加明确并定位在这些属性上使用特定值的元素。


###### $("[attribute]")


###### $("[attribute='value']")
attribute的值等于value的元素

###### $("[attribute!='value']")
attribute的值不等于value的元素

###### $("[attribute$='value']")
attribute的值以value结尾的元素

###### $("[attribute^='value']")
attribute的值以value开头的元素

###### $("[attribute*='value']")
attribute的值包含value的元素

###### $("[attribute|='value']")
attribute的值是以value为前缀(value + '-')的元素

###### $("[attribute~='value']")
attibute的值以空格符隔开包含value值的元素


###### $("[attribute1][attributeN]")
多个属性选择器同时作用
```html
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <title></title>
    <script src="http://libs.baidu.com/jquery/1.9.1/jquery.js"></script>
</head>

<body>
    <h2>属性筛选选择器</h2>
    <h3>[att=val]、[att]、[att|=val]、[att~=val]</h3>
    <div class="left" testattr="true" >
        <div class="div" testattr="true" name='p1'>
            <a>[att=val]</a>
        </div>
        <div class="div" testattr="true" p2>
            <a>[att]</a>
        </div>
        <div class="div" testattr="true" name="a-b">
            <a>[att|=val]</a>
        </div>
        <div class="div" testattr="true" name="a b">
            <a>[att~=val]</a>
        </div>
    </div>

    <script type="text/javascript">
         //查找所有div中，属性name=p1的div元素
         $("div[name='p1']").css("border", "3px groove red"); 
    </script>

    <script type="text/javascript">
        //查找所有div中，有属性p2的div元素
        $("div[p2]").css("border", "3px groove blue"); 
    </script>

    <script type="text/javascript">
        //查找所有div中，有属性name中的值包含一个连字符“-”的div元素
        $("div[name*='-']").css("border", "3px groove #rgb(0,255,0)"); 
    </script>

    <script type="text/javascript">
        //查找所有div中，有属性name中的值包含一个连字符“空”的div元素
        $("div[name*=' ']").css("border", "3px groove rgb(102,139,139)"); 
    </script>


    <h3>[att^=val]、[att*=val]、[att$=val]、[att!=val]</h3>
    <div class="left" testattr="true" >
        <div class="div" testattr="true"  name='xxxx-yyyy'>
            <a>[att^=val]</a>
        </div>
        <div class="div" testattr="true"  name='yyyy-xxxx'>
            <a>[att$=val]</a>
        </div>
        <div class="div" testattr="true"  name="attr-test-selector">
            <a>[att*=val]</a>
        </div>
        <div class="div">
            <a>[att!=val]</a>
        </div>
        <div class="div" name="a b" testattr="true">
            <a>[att~=val]</a>
        </div>
        <div class="div" name="a-b" testattr="true">
            <a>[att|=val]</a>
        </div>
    </div>


    <script type="text/javascript">
         //查找所有div中，属性name的值是用xxxx开头的
         $("div[name^='xxxx']").css("border", "3px groove red"); 
    </script>

    <script type="text/javascript">
         //查找所有div中，属性name的值是用xxxx结尾的
         $("div[name$='xxxx']").css("border", "3px groove blue"); 
    </script>

    <script type="text/javascript">
        //查找所有div中，有属性name中的值包含一个test字符串的div元素
        $("div[name*='test']").css("border", "3px groove rgb(0,255,0)"); 
    </script>

    <script type="text/javascript">
        //查找所有div中，有属性testattr中的值没有包含"true"的div
        $("div[testattr!='true']").css("border", "3px groove rgb(102,139,139)"); 
    </script>

    <script type="text/javascript">
        //查找所有div中，有属性name中的值包含b
        //
        $("div[name~='b']").css("border", "3px groove #996677"); 
    </script>
    <script type="text/javascript">
        //查找所有div中，有属性name中的值以a为前缀的div
        //
        $("div[name|='a']").css("border", "3px groove #99FF77"); 
    </script>


</body>

</html>
```

### 子元素筛选选择器

- :first-child
- :last-child
- :nth-child
- :only-child
- :nth-child
- :nth-last-child

###### 注意事项

1. :first只匹配一个单独的元素，但是:first-child选择器可以匹配多个：即为每个父级元素匹配第一个子元素。这相当于:nth-child(1)
2. :last 只匹配一个单独的元素， :last-child 选择器可以匹配多个元素：即，为每个父级元素匹配最后一个子元素
3. 如果子元素只有一个的话，:first-child与:last-child是同一个
4. :only-child匹配某个元素是父元素中唯一的子元素，就是说当前子元素是父元素中唯一的元素，则匹配
5. :only-child匹配某个元素是父元素中唯一的子元素，就是说当前子元素是父元素中唯一的元素，则匹配
6. jQuery实现:nth-child(n)是严格来自CSS规范，所以n值是“索引”，也就是说，从1开始计数，:nth-child(index)从1开始的，而eq(index)是从0开始的
7. nth-child(n) 与 :nth-last-child(n) 的区别前者是从前往后计算，后者从后往前计算


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
    <h2>子元素筛选选择器</h2>
    <h3>:first-child、:last-child、:only-child</h3>
    <div class="left first-div">
        <div class="div">
            <a>:first-child</a>
            <a>第二个元素</a>
            <a>:last-child</a>
        </div>
        <div class="div">
            <a>:first-child</a>
        </div>
        <div class="div">
            <a>:first-child</a>
            <a>第二个元素</a>
            <a>:last-child</a>
        </div>
    </div>

    <script type="text/javascript">
        //查找所有class="first-div"下的a元素，只取第一个
        //针对所有父级下的第一个
        $(".first-div a:first-child").css("color", "#CD00CD");
    </script>

    <script type="text/javascript">
        //查找所有class="first-div"下的a元素，只取最后一个
        //针对所有父级下的最后一个
        //如果只有一个元素的话，last也是第一个元素
        $(".first-div a:last-child").css("color", "green");
    </script>

    <script type="text/javascript">
        //查找所有class="first-div"下的a元素，如果只有一个子元素的情况
        $(".first-div a:only-child").css("color", "blue");
    </script>


    <h3>:nth-child、:nth-last-child</h3>
    <div class="left last-div">
        <div class="div">
            <a>:first-child</a>
            <a>第二个元素</a>
            <a>第三个元素</a>
            <a>:last-child</a>
        </div>
        <div class="div">
            <a>:first-child</a>
            <a>第二个元素</a>
        </div>
        <div class="div">
            <a>:first-child</a>
            <a>第二个元素</a>
            <a>第三个元素</a>
            <a>:last-child</a>
        </div>
    </div>

    <script type="text/javascript">
        //查找所有class="last-div"下的a元素,选择第二个
        $('.last-div a:nth-child(2)').css("color", "#CD00CD");
    </script>

    <script type="text/javascript">
        //查找所有class="last-div"下的a元素,选择第倒数第二个
        $('.last-div a:nth-last-child(2)').css("color", "red");
    </script>

</body>

</html>
```


### 表单元素选择器

- :input
- :text
- :password
- :radio
- :checkbox
- :submit
- :image
- :reset
- :button
- :file

除了input筛选选择器，几乎每个表单类别筛选器都对应一个input元素的type值。大部分表单类别筛选器可以使用属性筛选器替换。比如 $(':password') == $('[type=password]')

### 表单对象属性筛选选择器

- :enabled 选取可用的表单元素
- :disabled 选取不可用的表单元素
- :checked 选择被选中的input元素
- :select 选择被选中的option元素

###### 注意
- :checked选择器适用于复选框和单选框，对于下拉框元素, 使用 :selected 选择器
- 在某些浏览器中，选择器:checked可能会错误选取到`<option>`元素，所以保险起见换用选择器input:checked，确保只会选取`<input>`元素

```html
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <title></title>
    <link rel="stylesheet" href="imooc.css" type="text/css">
    <style>
    input {
        display: block;
        margin: 10px;
        padding: 10px;
    }
    </style>
    <script src="http://libs.baidu.com/jquery/1.9.1/jquery.js"></script>
</head>

<body>
    <h2>子元素筛选选择器</h2>
    <h3>enabled、disabled</h3>
    <form>
        <input type="text" value="未设置disabled" />
        <input type="text" value="设置disabled" disabled="disabled" />
        <input type="text" value="未设置disabled" />
    </form>

    <script type="text/javascript">
        //查找所有input所有可用的（未被禁用的元素）input元素。
        $(":enabled").css("border", "2px groove red");
    </script>

    <script type="text/javascript">
        //查找所有input所有不可用的（被禁用的元素）input元素。
        $(":disabled").css("border", "2px groove blue");
    </script>

    <h3>checked、selected</h3>
    <form>
        <input type="checkbox" checked="checked">
        <input type="checkbox">
        <input type="radio" checked>       
        <input type="radio">
        
        <select name="garden" multiple="multiple">
            <option>imooc</option>
            <option selected="selected">慕课网</option>
            <option>aaron</option>
            <option selected="selected">博客园</option>
          </select>

    </form>

    <script type="text/javascript">
         //查找所有input所有勾选的元素(单选框,复选框)
         //删除这个勾选的元素
        $(":checked").removeAttr('checked')
    </script>

    <script type="text/javascript">
         //查找所有option元素中,有selected属性被选中的选项
         //删除这个选中的元素
        $(":selected").removeAttr('selected');
    </script>

</body>

</html>
```


### 综合练习
```html
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>jQuery标签切换效果</title>
    <link rel="stylesheet" href="imooc.css" type="text/css">
    <script src="http://libs.baidu.com/jquery/1.9.1/jquery.js"></script>
</head>

<body>
    <!--代码部分begin-->
    <div id="menu">
        <!--tag标题-->
        <div id="menu_con">
            <div class="tag" style="display:block">
                <dl>
                    <dd>
                        <p>第一类</p>
                        <a>1.衬衫</a>
                        <a>2.T恤</a>
                        <a>3.牛仔裤</a>
                        <a>4.休闲裤</a>
                        <a>5.短裤</a>
                        <a>5.针织衫</a>
                        <a>7.西服</a>
                        <a>8.西裤</a>
                        <a>10.西服套装</a>
                        <a>11.马甲/背心</a>
                        <a name="setColor">12.羽绒服</a>
                        <a>13.棉服</a>
                        <a>14.夹克</a>
                        <a>15.POLO衫</a>
                        <a>16.卫衣</a>
                        <a>17.卫裤/运动裤</a>
                        <a>18.真皮皮衣</a>
                        <a>19.仿皮皮衣</a>
                        <a>20.风衣</a>
                        <a>更多</a>
                    </dd>
                    <dd>
                        <p>第二类</p>
                        <a>1.衬衫</a>
                        <a>2.T恤</a>
                        <a>3.牛仔裤</a>
                        <a>4.休闲裤</a>
                        <a>5.短裤</a>
                        <a>5.针织衫</a>
                        <a>7.西服</a>
                        <a>8.西裤</a>
                        <a>10.西服套装</a>
                        <a>11.马甲/背心</a>
                        <a>12.羽绒服</a>
                        <a>13.棉服</a>
                        <a>14.夹克</a>
                        <a>15.POLO衫</a>
                        <a>更多</a>
                    </dd>
                </dl>
            </div>
        </div>
    </div>

    <script type="text/javascript">
        //找到每一个dd下面的一个p元素，并改变颜色
        //可以通过子类选择器  p:first-child 筛选出每一个dd中的的第一个a元素
        ？.css('color','#9932CC');
    </script>

    <script type="text/javascript">
        //把a元素从顺序1-5加上颜色
        //可以通过基本筛选器lt,选择匹配集合中所有索引值小于给定index参数的元素
        //注意了index是从0开始计算，所以选在1-5,为对应的index就是4
        ？.css('color','red');
    </script>

    <script type="text/javascript">
        //在所有a元素中找到属性名name="setColor"的元素，并设置颜色
        //这里用的属性选择器[attribute='value']选择指定属性是给定值的元素
        ？.css('color','blue');
    </script>

    <script type="text/javascript">
        //选中2个dd列表中第10个元素，并改变颜色
        //这里用了nth-child 选择的他们所有父元素的第n个子元素
        ？.css('color','#66CD00');
    </script>

    <script type="text/javascript">
        //找到把a元素中包含文字"更多"的节点，改变颜色
        ？.css('color','#C71585');
    </script>


    </script>
</body>

</html>
```


