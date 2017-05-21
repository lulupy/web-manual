# jQuery工具方法

```js
 jQuery.extend({
    
    expando  :  生成唯一JQ字符串(内部)
    noConflict()  :  防止冲突
    isReady  :  DOM是否加载完(内部)
    readyWait  :  等待多少文件的计数器(内部)
    holdReady()  :  推迟DOM触发
    ready()  :  准备DOM触发
    isFunction()  :  是否为函数
    isArray()  :  是否为数组
    isWindow()  :  是否为window
    isNumeric()  :  是否为数字 
    type()  :  判断数据类型
    isPlainObject()  :  是否为对象自变量
    isEmptyObject()  :  是否为空的对象
    error()  :  抛出异常
    parseHTML()  :  解析节点
    parseJSON()  :  解析JSON
    parseXML()  :  解析XML
    noop()  :  空函数
    globalEval()  :  全局解析JS
    camelCase()  :  转驼峰(内部)
    nodeName()  :  是否为指定节点名(内部)
    each()  :  遍历集合
    trim()  :  去前后空格
    makeArray()  :  类数组转真数组
    inArray()  :  数组版indexOf
    merge()  :  合并数组
    grep()  :  过滤新数组
    map()  :  映射新数组
    guid  :  唯一标识符(内部)
    proxy()  :  改this指向
    access()  :  多功能值操作(内部)
    now()  :  当前时间
    swap()  :  CSS交换(内部)
    
});

jQuery.ready.promise = function(){};  监测DOM的异步操作(内部)

function isArraylike(){}  类似数组的判断(内部)
```

## expando

生成唯一JQ字符串(内部)

```js
expando: "jQuery" + ( core_version + Math.random() ).replace( /\D/g, "" )
```
版本号加随机小数，然后去掉非数字(包括版本中的小数点和随机数中的小数点)

```js
$.expando;
// jQuery110207567774036545911
```

## noConflict()
防止冲突

用法:

1. 需要修改$变量

```js
var jq = $.noConflict();
$=123;
jq(function(){
    alert($);//123
});
```

2. 变量$之前就存在

```html
<script>
var $=123;
</script>
<script src="jquery.js"></script>
<script>
var jq = $.noConflict();
jq(function(){
    alert($);//123
});
</script>
```

3. 修改变量jQuery

```js
var jq = $.noConflict(true);
jQuery=123;
jq(function(){
    alert(jQuery);//123
});
```

源码:

```js

_jQuery = window.jQuery,
_$ = window.$,

noConflict: function( deep ) {
    //处理变量$之前就存在就存在的情况
    if ( window.$ === jQuery ) {
        window.$ = _$;
    }

    //deep为true, 处理变量jQuery之前就存在就存在的情况
    if ( deep && window.jQuery === jQuery ) {
        window.jQuery = _jQuery;
    }

    return jQuery;
}
```

## jQuery.ready

这个方法是跟dom加载完成事件相关， 我们把相关的几个方法放在一起讨论

源码：

```js
jQuery.prototype ={
    ready: function( fn ) {
    }
}

jQuery.extend({
    // Is the DOM ready to be used? Set to true once it occurs.
    isReady: false,

    // A counter to track how many items to wait for before
    // the ready event fires. See #6781
    readyWait: 1,

    // Hold (or release) the ready event
    holdReady: function( hold ) {
    
    },

    // Handle when the DOM is ready
    ready: function( wait ) {

    }

})


jQuery.ready.promise = function( obj ) {
   
};
```

### window.onload 和 $(document).ready的区别

- window.onload

所有资源加载完触发， 包括图片等等

- $(document).ready

dom结构加载完成触发

$(document).ready内部实际上就是监听的`DOMContentLoaded`

```js
document.addEventListener('DOMContentLoaded', function(){}, false);
```

### $(document).ready(function())的执行步骤

```js
jQuery.ready.promise().done( fn );
```

通过jQuery.ready.promise方法生产一个promise, 然后通过promise对象上的done方法添加完成回调函数

注意: ready是jQuery函数对象上的一个方法, promise时jQuery.ready函数对象的一个方法， 因为取名为promise， 我开始的时候以为是promise函数新用法， 其实只是一个新函数名字为promise, 只是该函数返回了一个promise对象


```js
jQuery.ready.promise = function( obj ) {
    //readyList 是一个defer对象 是一个全局对象
    if ( !readyList ) {

        readyList = jQuery.Deferred();

       
        if ( document.readyState === "complete" ) {
            // Handle it asynchronously to allow scripts the opportunity to delay ready
            setTimeout( jQuery.ready );

        } else {

            // Use the handy event callback
            document.addEventListener( "DOMContentLoaded", completed, false );

            // A fallback to window.onload, that will always work
            window.addEventListener( "load", completed, false );
        }
    }
    return readyList.promise( obj );
};
```


```js
if ( document.readyState === "complete" ) {
    setTimeout( jQuery.ready );
}
```

document.readyState

- uninitialized - 还未开始载入
- loading - 载入中
- interactive - 已加载，文档与用户可以开始交互
- complete - 载入完成


这里处理的是这种情况:  当你的文档已经加载完成， 你才调用`$(document).ready(function(){})`, 就是直接运行jQuery.ready, jQuery.ready负责处理readyList的完成

```js
setTimeout( jQuery.ready );
```

这里为什么需要加上一个setTimeout?

这里是处理ie的， ie在dom还没加载完成的的时候会提前一点点将document.readyState变为complete,
所以加上点延时
[更详细的讨论在]( http://bugs.jquery.com/ticket/12282#comment:15)


```js
// Use the handy event callback
document.addEventListener( "DOMContentLoaded", completed, false );

// A fallback to window.onload, that will always work
window.addEventListener( "load", completed, false );
```

这个地方为什么要监听两个事件, `DOMContentLoaded`是比`load`事件先触发， 但是在有的的浏览器中， 会缓存`load`事件， 就会导致`load`比`DOMContentLoaded`先触发，

注： 会缓存`load`事件具体的意思还不太清楚，下来弄清楚

然后都会触发completed函数

```js
var completed = function() {
    document.removeEventListener( "DOMContentLoaded", completed, false );
    window.removeEventListener( "load", completed, false );
    jQuery.ready();
}
```

completed触发一次就好， 不管是通过`DOMContentLoaded`还是`load`触发的completed， 都要取消掉事件监听， 最后调用`jQuery.ready`触发真正的回调函数（你希望执行的函数）

然后我们来看下jQuery.ready函数：

```js
ready: function( wait ) {

    // Abort if there are pending holds or we're already ready
    if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
        return;
    }

    // Remember that the DOM is ready
    jQuery.isReady = true;

    // If a normal DOM Ready event fired, decrement, and wait if need be
    if ( wait !== true && --jQuery.readyWait > 0 ) {
        return;
    }

    // If there are functions bound, to execute
    readyList.resolveWith( document, [ jQuery ] );

    // Trigger any bound ready events
    if ( jQuery.fn.trigger ) {
        jQuery( document ).trigger("ready").off("ready");
    }
}
```

我们先看这句:

```js
readyList.resolveWith( document, [ jQuery ] );
```

这里是使readyList对象的状态为resolve从而触发完成回调函数,

直接掉用readyList.resolve也可以，
readyList.resolveWith跟它的区别是可以传参, 第一个参数是this指向， 第二参数就是回调函数参数列表数组

```js
$(document).ready(function(jq){
    console.log(this);//document
});
```

我们接着来看:

```js
if ( jQuery.fn.trigger ) {
    jQuery( document ).trigger("ready").off("ready");
}
```

这里是处理我们以jquery方式绑定事件的情况

```js
$(document).on('ready', function(){

})
```

### holdReady

推迟DOM触发

用法：

```js
$.holdReady(true);
$(function(){
    alert(2);
});
```

不会触发函数

怎么解除推迟了， 

```js
$.holdReady(true);
$(function(){
    alert(2);
});
$.holdReady(false);
```

使用场景:

a.js

```js
var b=2;
```

```js
$.getScript('a.js',function(){

});

$(function(){
    alert(window.b);//undefined
});
```

$.getScript是异步执行， 这里我们需要a.js中的变量b, 比如说a.js是一个库, 但是现在$(function(){})先执行

所以这里我们就可以使用holdReady来延迟ready的执行

```js
$.holdReady(true);
$.getScript('a.js',function(){
    $.holdReady(false);
});

$(function(){
    alert(window.b);//undefined
});
```

还有一种情况是， 需要导入多个外部文件， 需等到所有文件都加载完成之后再执行ready

```js
$.holdReady(true);

$.getScript('a.js',function(){
    $.holdReady(false);
});


$.holdReady(true);

$.getScript('b.js',function(){
    $.holdReady(false);
});

$.holdReady(true);

$.getScript('c.js',function(){
    $.holdReady(false);
});


$(function(){
    alert(2);
});
```

$.holdReady(true) 和 $.holdReady(false)的出现的次数应该一致


holdReady源码：

```js
holdReady: function( hold ) {
    if ( hold ) {
        jQuery.readyWait++;
    } else {
        jQuery.ready( true );
    }
}

ready: function( wait ) {

    // Abort if there are pending holds or we're already ready
    if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
        return;
    }

    // Remember that the DOM is ready
    jQuery.isReady = true;

    // If a normal DOM Ready event fired, decrement, and wait if need be
    if ( wait !== true && --jQuery.readyWait > 0 ) {
        return;
    }
}
```

步骤：

1. $.holdReady(true);

jQuery.readyWait : 2


2. $(function(){alert(1)}) dom已经加载完成，触发$.ready();

这时: wait: undefined readyWait : 2

```js
jQuery.isReady = true;


// 满足条件: return
if ( wait !== true && --jQuery.readyWait > 0 ) {
    return;
}
```

运行之后： jQuery.readyWait： 1

3. $.holdReady(false);

jQuery.readyWait： 1  jQuery.isReady: true


都不满足, 所以可以直接触发函数

```js
if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
    return;
}

if ( wait !== true && --jQuery.readyWait > 0 ) {
    return;
}
```



##  isWindow()

```js
isWindow: function( obj ) {
    return obj != null && obj === obj.window;
}
```

obj不能为null和undefined

```js
null==undefined;
null==null;
```

null只有跟null和undefined相等， 跟其他所有的都不相等

obj===obj.window

判断方法只要一个对象上有一个window属性等于它自身， 当然这不是很严格， 但是一般情况下，如果不刻意构造一个这个的对象都是可以判断的

```js
window.window = window;
```

## isNumeric()

```js
isNumeric: function( obj ) {
    return !isNaN( parseFloat(obj) ) && isFinite( obj );
}
```

我们先来看看为什么不要typeof

```js
typeof 123;//number
typeof NaN;//number  NaN不是一个数字，但是typeof也会当成数字
```

parseFloat能转成数字的都会转成数字，不能转的就返回NaN

```js
parseFloat(function(){});//NaN
parseFloat({});//NaN
parseFloat([]);//NaN
parseFloat('');//NaN
```

isFinite判断一个数字是否是有限的， 再程序中，对数字的大小是有一定的限制的， 超出了范围就不能处理了


```js
isFinite(1);//true
//Number.MAX_VALUE是js能处理的最大的数
isFinite(Number.MAX_VALUE+Number.MAX_VALUE)//false
```

## type()

### typeof

```js
typeof 123;//number
typeof '';//string
typeof function(){};//function
typeof {};//object
typeof [];//object
typeof new Date();//object
typeof null;//object
typeof undefined;//undefined
```

可以判断基本类型

源码：

```js
type: function( obj ) {
    if ( obj == null ) {
        return String( obj );
    }
    // Support: Safari <= 5.1 (functionish RegExp)
    return typeof obj === "object" || typeof obj === "function" ?
        class2type[ core_toString.call(obj) ] || "object" :
        typeof obj;
}
```

```js
String(null)
"null"
String(undefined)
"undefined"
```

如果：

```js
typeof obj === "object" || typeof obj === "function"
```

返回：

```js
class2type[ core_toString.call(obj) ] || "object"
```

否则直接返回:

```js
typeof obj
```



```js
typeof function(){};//function 
```
函数是可以判断的，那为什么`typeof obj === "function"`
这里也是处理兼容性问题, Safari <= 5.1或者chrome的低版本`typeof 正则表达式`的值为`function`, 高版本都是`object`


class2type的生成:

```js
// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
    class2type[ "[object " + name + "]" ] = name.toLowerCase();
});
```

## isPlainObject

判断是否为对象字面量

```js
// 只有这两种方式生成的对象满足条件
$.isPlainObject({});//true
$.isPlainObject(new Object());//true


$.isPlainObject([]);//false
```

```js
isPlainObject: function( obj ) {
    // 先排除这三种情况
    // 1. $.type(obj) 不是object
    // 2. DOMNode 
    // 3. window
    if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
        return false;
    }

   
    // https://bugzilla.mozilla.org/show_bug.cgi?id=814622
    try {
        if ( obj.constructor &&
                !core_hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
            return false;
        }
    } catch ( e ) {
        return false;
    }


    return true;
}
```

```js
obj.constructor &&
!core_hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) 
```

core_hasOwn是{}.hasOwnProperty

上面相当于:

```js
obj.constructor.prototype.hasOwnProperty("isPrototypeOf")
```

这是一个数组的对象的原型链：

arr           |---->Array.prototype      |---->Object.prototype
|             |                   |      |  
`__proto__` --|            `__proto__`---|


isPrototypeOf是在Object.prototype上的特有的属性

所以可以通过这种方式判断


- 为什么要加错误捕获

```js
try{

}catch(){

}
```


[https://bugzilla.mozilla.org/show_bug.cgi?id=814622](https://bugzilla.mozilla.org/show_bug.cgi?id=814622)

在火狐<20中有一个bug: 频繁的的访问certain host object(比如说window.location)的constructor属性会产生内存泄漏问题


## isEmptyObject


```js
$.isEmptyObject({})//true
$.isEmptyObject([])//true
```

```js
isEmptyObject: function( obj ) {
    var name;
    for ( name in obj ) {
        return false;
    }
    return true;
}
```

### for in

for in  可枚举属性

1. 一般自带的属性都是不可枚举的属性
2. 自己创建的属性都是可枚举属性

```js
function Aaa(){}
console.log( Aaa.prototype.constructor);//function Aaa(){}

var obj = new Aaa();
for(var key in obj){
    console.log(key);
}
//没有打印
```

Aaa.prototype.constructor是js自己创建的， 所以for in 不出来

```js
function Aaa(){}
Aaa.prototype = {
    constructor: function(){},
    show: function(){}
}

var obj = new Aaa();
for(var key in obj){
    console.log(key);
}
//constructor, show
```

constructor和show都是自己创建的，所以可以for in 

## parseJSON()

其实使用的就是原生JSON.parse方法， 兼容性ie8+

## parseXML()

使用的是`DOMParser`， 兼容性ie9+

```js
tmp = new DOMParser();
xml = tmp.parseFromString( data , "text/xml" );
```

如果要兼容ie6,7,8使用`ActiveObject`

```js
// Support: IE9
try {
    tmp = new DOMParser();
    xml = tmp.parseFromString( data , "text/xml" );
} catch ( e ) {
    xml = undefined;
}
if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
    jQuery.error( "Invalid XML: " + data );
}
```

如果不支持`DOMParser`会报错， 然后异常捕获， xml=undefined
如果xml格式不正确， 解析出的dom会包含一个parsererror标签

xml和html都可以解析成dom

##  globalEval()

全局解析JS

用法：

```js
function test(){
    var a = 1;
}
alert(a);
```

这是找不到的， 因为a是test局部变量

```js
function test(){
    $.globalEval('var a = 1;')
    
}
alert(a);
```
设置可以找到的， $.globalEval将a解析为全局作用域下的变量

源码:

```js
globalEval: function( code ) {
    var script,
            indirect = eval;

    code = jQuery.trim( code );

    if ( code ) {
        // If the code includes a valid, prologue position
        // strict mode pragma, execute code by injecting a
        // script tag into the document.
        if ( code.indexOf("use strict") === 1 ) {
            script = document.createElement("script");
            script.text = code;
            document.head.appendChild( script ).parentNode.removeChild( script );
        } else {
        // Otherwise, avoid the DOM node creation, insertion
        // and removal by using an indirect global eval
            indirect( code );
        }
    }
}
```

```js
if ( code.indexOf("use strict") === 1 )
```

判断是否使用严格模式， 严格模式下`eval`是不能使用的， 用的是新建script标签，运行传入代码后再移除 


如果不是严格模式则调用eval解析代码`indirect(code)`, 这里有个小细节， 就是它是将`eval`存成一个变量再调用， 而不是直接调用

我们先来看下面的几段代码:

```js
function test(){
    eval('var a=1;')
    alert(a);//1
}
alert(a);//报错: 不能找到
```

```js
function test(){
    window.eval('var a=1;')
}
alert(a);//1
```

```js
function test(){
    var evalVar = eval;
    evalVar('var a=1;')
}
alert(a);//1
```

eval它既是关键字， 也是window上的一个属性， 可以这么简单的理解， 
作为关键字调用的时候，所生产的变量就在当前的作用域中， 作为window的属性调用是，所生产的变量在全局作用域中， 
将eval赋值给一个变量，相当于将window下的属性赋值给一个变量， 所以也是在全局作用域下

## camelCase()

我们知道，css属性通常都是以`-`连接的， 但是，使用js来访问操作css又是使用的驼峰命名，所以很多时候需要做转换

```css
div{
    margin-left: 16px; 
}
```
```js
div.currentStyle.marginLeft;
```

源码：

```js
rmsPrefix = /^-ms-/,
rdashAlpha = /-([\da-z])/gi,
camelCase: function( string ) {
    return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
fcamelCase = function( all, letter ) {
    return letter.toUpperCase();
}
```

这里有一种特殊的情况，是关于前缀的

其他的： 首字母大写

-webkit-transition   WebkitTransition
-moz-transition      MozTransition

ie:  首字母小写
-ms-transition       msTransition


所以先把`-ms-` 替换成`ms-`
```js
string.replace( rmsPrefix, "ms-" )
```

- replace第二个参数不仅可以传字符串，也可以传回调函数，回调函数的第一个参数是匹配的整体，第二个参数是匹配的第一个子项，就是`-`后面的字符，转成大写后返回

```js
replace( rdashAlpha, fcamelCase )
```

## nodeName(elem, name)

判断传入的节点是否为指定的标签名

```js
$.nodeName(document.documentElement, 'html');//true
$.nodeName(document.body, 'html');//false
```

源码:

```js
nodeName: function( elem, name ) {
    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
}
```

先转小写在判断，因为有的浏览器的elem.nodeName为大写

```js
elem.nodeName.toLowerCase() === name.toLowerCase()
```

## each()

可以循环的包括: 数组，类数组（jq对象， dom集合等）， 对象字面量

数组，类数组用`for(var i=0;)`的方式， 对象字面量用`for in`的方式


源码:

```js
each: function( obj, callback, args ) {
    var value,
        i = 0,
        length = obj.length,
        //isArraylike jq提供的判断是否为类数组方法
        isArray = isArraylike( obj );

    if ( args ) {
        if ( isArray ) {
            for ( ; i < length; i++ ) {
                value = callback.apply( obj[ i ], args );

                if ( value === false ) {
                    break;
                }
            }
        } else {
            for ( i in obj ) {
                value = callback.apply( obj[ i ], args );

                if ( value === false ) {
                    break;
                }
            }
        }

    // A special, fast, case for the most common use of each
    } else {
        if ( isArray ) {
            for ( ; i < length; i++ ) {
                //回调函数的this为obj[i], 参数为i, obj[i]
                value = callback.call( obj[ i ], i, obj[ i ] );
                //如果回调函数的返回值为false，则跳出整个循环
                if ( value === false ) {
                    break;
                }
            }
        } else {
            for ( i in obj ) {
                value = callback.call( obj[ i ], i, obj[ i ] );

                if ( value === false ) {
                    break;
                }
            }
        }
    }

    return obj;
}
```

## trim

```js
trim: function( text ) {
    //先判断一下是否为null或undefined
    return text == null ? "" : core_trim.call( text );
}
```

## merge()

合并数组或类数组，将第二个参数合并到第一个参数中

```js
//两个都为数组
$.merge([1], [2]);//[1, 2]
//第一个参数为数组， 第二个为类数组
$.merge([1], {0:2, length:1});//[1, 2]
//两个都为类数组
$.merge({0:1, length:1}, [2]);//{0: 1, 1: 2, length: 2}
//第一个参数为类数组， 第二个为数组
$.merge({0:1, length:1}, {0:2, length:1});//{0: 1, 1: 2, length: 2}


//第二参数没有length属性
$.merge({0:1, length:1}, {0:2})//$.merge({0:1, length:1}, {0:2})
```

源码:

```js
merge: function( first, second ) {
    var l = second.length,
        i = first.length,
        j = 0;

    if ( typeof l === "number" ) {
        for ( ; j < l; j++ ) {
            first[ i++ ] = second[ j ];
        }
    //针对second没有length属性的情况
    } else {
        while ( second[j] !== undefined ) {
            first[ i++ ] = second[ j++ ];
        }
    }

    first.length = i;

    return first;
}
```


## makeArray()

外部使用，只传一个参数, 转换为数组

```js
//string
$.makeArray('abc');//["abc"]
//number
$.makeArray(123);//[123]
//object
$.makeArray({});//[Object]
//arrayLike
$.makeArray({0:1, length:1});//[1]
```

内部使用，传入两个参数, 将第一个参数合并到第二个参数， 第二个参数为数组或类数组 

```js
$.makeArray(123, [2]);//[2, 123]
$.makeArray(123, {length:0});//{0: 123, length: 1}
```

源码:

```js
makeArray: function( arr, results ) {
    var ret = results || [];

    if ( arr != null ) {
        if ( isArraylike( Object(arr) ) ) {
            jQuery.merge( ret,
                typeof arr === "string" ?
                [ arr ] : arr
            );
        } else {
            core_push.call( ret, arr );
        }
    }

    return ret;
}
```

```js
if ( isArraylike( Object(arr) ) )
```

首先:

```js
Object(123);//Number {[[PrimitiveValue]]: 123}
Object('abc');//{0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"}
Object({});//{length: 0}
Object({length:0});//{length: 0}
```

那么isArraylike( Object(arr) )为true的情况就只有字符串， 数组，和类数组这三种情况了

所以需要对字符串做点处理

```js
typeof arr === "string" ?[ arr ] : arr
```

如果是字符串就转成数组

其他情况就直接调用数组的push方法了`core_push.call( ret, arr )`

## inArray
 
相当于字符串的indexOf方法:

源码:

```js
inArray: function( elem, arr, i ) {
    return arr == null ? -1 : core_indexOf.call( arr, elem, i );
}
```

## grep

过滤得到新数组


```js
var arr=[1,2,3,4];
$.grep(arr, function(n, i){
    return n>2;
});//[3,4]

//第三个参数表示条件取反
$.grep(arr, function(n, i){
    return n>2;
}, true);//[1,2]
```

源码:

```js
grep: function( elems, callback, inv ) {
    var retVal,
        ret = [],
        i = 0,
        length = elems.length;
    inv = !!inv;

    // Go through the array, only saving the items
    // that pass the validator function
    for ( ; i < length; i++ ) {
        retVal = !!callback( elems[ i ], i );
        if ( inv !== retVal ) {
            ret.push( elems[ i ] );
        }
    }

    return ret;
}
```

## map()

源码:

```js
map: function( elems, callback, arg ) {
    var value,
        i = 0,
        length = elems.length,
        isArray = isArraylike( elems ),
        ret = [];

    
    if ( isArray ) {
        for ( ; i < length; i++ ) {
            value = callback( elems[ i ], i, arg );

            if ( value != null ) {
                //ret.length开始为0， 然后累加
                ret[ ret.length ] = value;
            }
        }

    } else {
        for ( i in elems ) {
            value = callback( elems[ i ], i, arg );

            if ( value != null ) {
                ret[ ret.length ] = value;
            }
        }
    }

    return core_concat.apply( [], ret );
}
```


```js
core_concat.apply( [], ret )
```

这句话的作用是， ret是一个嵌套数组， 返回一个扁平化的数组，也就是没有嵌套的数组

```js
// concat可以合并多个数组
var arr = [].concat([1], [2], [3]);//[1, 2, 3]
```

所以， 如果你是这么调用的

```js
var arr= [1,2,3];
$.map(arr, function(n,i){
    return [n];
});

//本来应该返回[ [1], [2], [3] ]
//core_concat.apply( [],  [ [1], [2], [3] ])处理之后， 就返回了[1,2,3]
```



## proxy()

改变this指向，及预传参

使用

```js
function test(){
    alert(this.a);
}

var obj = {a:1};

$.proxy(test, obj)();//1
```

预传参：

```js
function test(a,b){
    console.log(a,b);
}
var obj = {a:1};
// 下面三种方式都可以
$.proxy(test, obj)(1,2);
$.proxy(test, obj, 1,2)();
$.proxy(test, obj, 1)(2);

```

源码:

```js
proxy: function( fn, context ) {
    var tmp, args, proxy;

    if ( typeof context === "string" ) {
        tmp = fn[ context ];
        context = fn;
        fn = tmp;
    }

    // 如果fn不是函数，返回undefined
    if ( !jQuery.isFunction( fn ) ) {
        return undefined;
    }

    // 截取除了前两个参数的后面的参数
    args = core_slice.call( arguments, 2 );
    proxy = function() {
        return fn.apply( context || this, args.concat( core_slice.call( arguments ) ) );
    };

    // 给函数设置唯一标识， 在删除事件函数中有用
    proxy.guid = fn.guid = fn.guid || jQuery.guid++;

    return proxy;
}
```


- $.proxy还有一种减写的方法

```js
var obj = {
    a: 1,
    fn: function(){
        alert(this.a)
    }
}

$.proxy(obj, 'fn')();
```
第一个参数是一个对象，第二个参数为对象上的一个方法名

下面这段代码就是处理这种情况的

```js
if ( typeof context === "string" ) {
    tmp = fn[ context ];
    context = fn;
    fn = tmp;
}
```



## access()

在jq中， 像`$().css() $().attr()`等很多的方法都是取值和赋值使用的是同一个函数，

access就是来完成这个事情的

我们直接来看css()的几种用法

```js
$().css('height');
$().css('height', 100);
$().css({
    height: 100,
    width: 100
});

$( "div.example" ).css( "width", function( index,value ) {
  //value为当前值
  return parseFloat( value ) * 1.2
});
```

源码:

```js
css: function( name, value ) {
        return jQuery.access( this, function( elem, name, value ) {...}, name, value, arguments.length > 1 );
    }
access: function( elems, fn, key, value, chainable, emptyGet, raw ){...}
```



我们这里看下jQuery.access的参数:

this -> elems  要操作的元素集合
fn -> function(elem,name, value)  回调函数， 用来进行具体的取值，赋值操作
key -> height
value -> 100
arguments.length > 1 -> chainable true表示赋值， false表示取值

access源码:

```js
access: function( elems, fn, key, value, chainable, emptyGet, raw ) {
    var i = 0,
        length = elems.length,
        bulk = key == null;

    // Sets many values
    if ( jQuery.type( key ) === "object" ) {
        chainable = true;
        for ( i in key ) {
            jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
        }

    // Sets one value
    } else if ( value !== undefined ) {
        chainable = true;

        if ( !jQuery.isFunction( value ) ) {
            raw = true;
        }

        if ( bulk ) {
            // Bulk operations run against the entire set
            if ( raw ) {
                fn.call( elems, value );
                fn = null;

            // ...except when executing function values
            } else {
                bulk = fn;
                fn = function( elem, key, value ) {
                    return bulk.call( jQuery( elem ), value );
                };
            }
        }

        if ( fn ) {
            for ( ; i < length; i++ ) {
                fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
            }
        }
    }

    return chainable ?
        elems :

        // Gets
        bulk ?
            fn.call( elems ) :
            length ? fn( elems[0], key ) : emptyGet;
}
```

- key为null或undefined的情况，没有遇到过，分析时暂时不考虑

```js
bulk = key == null;
```

- 设置多组值

```js
$().css({
    height: 100,
    width: 100
});
```

```js
if ( jQuery.type( key ) === "object" ) {
    chainable = true;
    for ( i in key ) {
        jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
    }
}
```

- 设置一组值

```js
else if ( value !== undefined ) {
    chainable = true;

    if ( !jQuery.isFunction( value ) ) {
        raw = true;
    }

    if ( fn ) {
        for ( ; i < length; i++ ) {
            //把设置多组的值，分解为设置一组值
            fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
        }
    }
}
```

```js
raw ? value : value.call( elems[i], i, fn( elems[i], key ) )
```
如果value为函数, 则调用函数求值， 回调函数传入i, fn(elmes[i], key)取值

```js
$( "div.example" ).css( "width", function( index,value ) {
  //value为当前值
  return parseFloat( value ) * 1.2
});
```

- 取值

```js
return chainable ?
        elems :

        // Gets

        length ? fn( elems[0], key ) : emptyGet;
```

看length是否为0， 如果不为0取，第一个的值fn( elems[0], key )



## swap()

它有什么作用？，先来看一个问题

```html
<div style="width: 100px;height: 100px;display: none;"></div>
```

对于`display:none`的元素，jq可以获取到宽高， 原生的不能

```js
$('div').width();//100
$('div').get(0).offsetWidth;//0
```

jq是怎么做到的呢?

- 首先，肯定要把display变成block;

```html
<div style="width: 100px;height: 100px;display: block;"></div>
```

- 但是，现在用户能看到这个元素，所以我们使用`visibility:hidden`将元素隐藏

```html
<div style="width: 100px;height: 100px;display: block;visibility: hidden;"></div>
```

- 但是， 通过`visibility:hidden`隐藏的元素在文档仍然占据空间， 怎么能让它不占据空间呢， 我们再加上`position: absolute`

```html
<div style="width: 100px;height: 100px;display: block;visibility: hidden;position: absolute;"></div>
```

- 这样我们就可以取到元素的宽高， 并且不影响页面布局，取完之后，再将样式恢复

```html
<div style="width: 100px;height: 100px;display: none;"></div>
```


swap()做的就是这个事情

源码:

```js
swap: function( elem, options, callback, args ) {
    var ret, name,
        old = {};

    // Remember the old values, and insert the new ones
    for ( name in options ) {
        old[ name ] = elem.style[ name ];
        elem.style[ name ] = options[ name ];
    }

    ret = callback.apply( elem, args || [] );

    // Revert the old values
    for ( name in options ) {
        elem.style[ name ] = old[ name ];
    }

    return ret;
}
```

## isArraylike

判断是否是数据或类数组

源码：

```js
function isArraylike( obj ) {
    var length = obj.length,
        type = jQuery.type( obj );

    //window上有length这些属性的概率很大，需要单独判断
    if ( jQuery.isWindow( obj ) ) {
        return false;
    }

    
    if ( obj.nodeType === 1 && length ) {
        return true;
    }

    return type === "array" || type !== "function" &&
        ( length === 0 ||
        typeof length === "number" && length > 0 && ( length - 1 ) in obj );
}
```

问题：

```js
if ( obj.nodeType === 1 && length ) {
    return true;
}
```
这里obj.nodeType === 1的话，就是一个节点元素，并没有length属性


```js
length === 0 ||
        typeof length === "number" && length > 0 && ( length - 1 ) in obj
```

这里分开判断的原因是:

```js
{length:0}
```
length-1就为-1,  是不满足条件的






































