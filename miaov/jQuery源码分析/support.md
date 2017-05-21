# support功能检测

```js
jQuery.support = (function(support){
    ...
    return support
})({});
```

可以看到， jQuery.support最终的结果是一个对象，在chrome控制台打印这个对象如下:

```js
$.support = {

    ajax: true,
    boxSizing: true,
    boxSizingReliable: true,
    checkClone: true,
    checkOn: true,
    clearCloneStyle: true,
    cors: true,
    focusinBubbles: false,
    noCloneChecked: true,
    optDisabled: true,
    optSelected: true,
    pixelPosition: true,
    radioValue: true,
    reliableMarginRight: true
}
```

然后我们逐句来分析， 首先是创建了一些dom节点，

```js
var input = document.createElement("input"),
    fragment = document.createDocumentFragment(),
    div = document.createElement("div"),
    select = document.createElement("select"),
    opt = select.appendChild( document.createElement("option") );
```

然后，

```js
if ( !input.type ) {
    return support;
}
```

这句其实没有什么作用， 在新版本中已经移除了， 因为现在所有的input.type会有默认值`text`

## checkOn

```js
input.type = "checkbox";
// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
support.checkOn = input.value !== "";
```

checkbox/radio的默认值，在老的webkit内核浏览器中(包括较早的chrome, safari, andriod)为''(空字符串)， 在其他情况都为'on',

如果为'on' support.checkOn就为true

## optSelected

```js
// Must access the parent to make an option select properly
// Support: IE9, IE10
support.optSelected = opt.selected
```

在chrome下， select的第一个项， 默认是选中的， 在ie8下不是

判断是否select的第一个选项默认为选中状态

## reliableMarginRight等

```js
// Will be defined later
support.reliableMarginRight = true;
support.boxSizingReliable = true;
support.pixelPosition = false;
```

这里只是给了个初始值，在后面的代码再进行判断，  功能检测分为两种， 一种就是像checkOn这些可以直接判断的， 还有一种是必须等待DOM加载完成，需要进行dom操作的

## noCloneChecked

```js
// Make sure checked status is properly cloned
// Support: IE9, IE10
input.checked = true;
support.noCloneChecked = input.cloneNode( true ).checked;
```

cloneNode(true)克隆节点， true代表是否会克隆子节点， 克隆节点时节点上的属性也会一起被克隆，

但是在IE9, IE10中不会

## optDisabled

```js
// Make sure that the options inside disabled selects aren't marked as disabled
// (WebKit marks them as disabled)
select.disabled = true;
support.optDisabled = !opt.disabled;
```

在有些很老的webkit内核浏览器下， select的disabled属性设置为true后， select中的每个option的disabled属性也会被设置为true

## radioValue

```js
// Check if an input maintains its value after becoming a radio
// Support: IE9, IE10
input = document.createElement("input");
input.value = "t";
input.type = "radio";
support.radioValue = input.value === "t";
```

先设置value在改变type为radio, 在ie9, ie10value值会变成on


## focusinBubbles

```js
support.focusinBubbles = "onfocusin" in window;
```

是否支持onfocusin事件， 我们知道onfocus事件， 它和onfocusin区别在于onfocus不支持冒泡， 它支持冒泡


## clearCloneStyle

```js
div.style.backgroundClip = "content-box";
div.cloneNode( true ).style.backgroundClip = "";
support.clearCloneStyle = div.style.backgroundClip === "content-box";
```

在IE中（在ie9,10, 11下有测试）， 如果改变克隆元素跟背景相关样式属性时， 会影响到被克隆元素

##  boxSizing boxSizingReliable pixelPosition reliableMarginRight

这4种兼容性问题，需要将dom节点插入到文档中，才能判断， 所以我们对这4种情况统一讲解

```js
jQuery(function(){
    var container, marginDiv,
        // Support: Firefox, Android 2.3 (Prefixed box-sizing versions).
        divReset = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",
        body = document.getElementsByTagName("body")[ 0 ];
    

    //这句没什么作用
    if ( !body ) {
        // Return for frameset docs that don't have a body
        return;
    }

    container = document.createElement("div");
    container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

    // Check box-sizing and margin behavior.
    body.appendChild( container ).appendChild( div );

    // 这句没什么作用， 是在1.x版本中才有作用
    div.innerHTML = "";

    div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%";
});
```

首先， 是dom加载完成运行这段代码， 不然可能找不到body

然后生成出来的html结构如下

```html
<body>
    <!-- container -->
    <div style="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px">
        <!-- div -->
        <div style="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%"></div>
    </div>
</body>
```

container的样式

```css
{
    border:0;
    width:0;
    height:0;
    position:absolute;
    top:0;
    /*移出可视范围内，为的是不跟页面布局发生冲突*/
    left:-9999px;
    /*在老版本jq中起作用*/
    margin-top:1px   
}
```

div样式:

```css
{
    -webkit-box-sizing:border-box;
    -moz-box-sizing:border-box;
    box-sizing:border-box;
    padding:1px;
    border:1px;
    display:block;
    width:4px;
    margin-top:1%;
    position:absolute;
    top:1%
}
```

### boxSizing

```js
jQuery.swap( body, body.style.zoom != null ? { zoom: 1 } : {}, function() {
    support.boxSizing = div.offsetWidth === 4;
});
```

css中zoom的作用是放大或缩小网页，如果有设置让它重置为1，

![https://bugs.jquery.com/ticket/13543](https://bugs.jquery.com/ticket/13543)


### pixelPosition

```js
if ( window.getComputedStyle ) {
    support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
}
```

我们给div的top设置的为1%, 但是我们在取到的计算值的时候应该是一个像素单位， safari下返回的是百分比

### boxSizingReliable

```js
support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";
```

ie9 10 11下， 怪异模式下， 它的width计算值，是它的设置值减去padding, border
其他浏览器在怪异模式下， 它的计算值， 就是它的设置值


### reliableMarginRight

```js
marginDiv = div.appendChild( document.createElement("div") );
marginDiv.style.cssText = div.style.cssText = divReset;
marginDiv.style.marginRight = marginDiv.style.width = "0";
div.style.width = "1px";

support.reliableMarginRight =
    !parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
```

新的html结构：

```html
<body>
    <!-- container -->
    <div style="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px">
        <!-- div -->
        <div style="padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;width: 1px;">
            <!-- margindiv -->
            <div style="padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box; margin-right: 0;width: 0;"></div>
        </div>
    </div>
</body>
```

这里的margindiv的margin-right按理说应该为0，!parseFloat(0)为true， 
但是在有的老的webkit内核版本浏览器器中， 父容器设置了宽度， 子元素没有占满父元素，
会用margin-right来占满


