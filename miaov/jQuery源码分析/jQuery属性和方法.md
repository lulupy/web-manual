# jQuery属性和方法

```js
jQuery.fn = jQuery.prototype = {  //添加实例属性和方法
    
    jquery : 版本
    
    constructor : 修正指向问题
    
    init() : 初始化和参数管理
    
    selector : 存储选择字符串
    
    length : this对象的长度
    
    toArray() :  转数组
    
    get() :  转原生集合
    
    pushStack() :  JQ对象的入栈
    
    each() :  遍历集合
    
    ready() :  DOM加载的接口
    
    slice() :  集合的截取
    
    first() :  集合的第一项
    
    last() :   集合的最后一项
    
    eq() :   集合的指定项
    
    map() :   返回新集合
    
    end() :   返回集合前一个状态
    
    push() :    (内部使用)
    
    sort() :    (内部使用)
    
    splice() :  (内部使用)
    
};
```

## jquery属性

保存jquery版本号，可以用这个属性判断一个对象是否为jquery对象.

```js
if($div.jquery){
    alert('$div为jquery对象');
}
```

## init()

```js
init: function( selector, context, rootjQuery ) {
    var match, elem;

    // HANDLE: $(""), $(null), $(undefined), $(false)
    if ( !selector ) {
        return this;
    }

    // Handle HTML strings
    if ( typeof selector === "string" ) {
        if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
            // Assume that strings that start and end with <> are HTML and skip the regex check
            match = [ null, selector, null ];

        } else {
            match = rquickExpr.exec( selector );
        }

        // Match html or make sure no context is specified for #id
        if ( match && (match[1] || !context) ) {

            // HANDLE: $(html) -> $(array)
            if ( match[1] ) {
                context = context instanceof jQuery ? context[0] : context;

                // scripts is true for back-compat
                jQuery.merge( this, jQuery.parseHTML(
                    match[1],
                    context && context.nodeType ? context.ownerDocument || context : document,
                    true
                ) );

                // HANDLE: $(html, props)
                if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
                    for ( match in context ) {
                        // Properties of context are called as methods if possible
                        if ( jQuery.isFunction( this[ match ] ) ) {
                            this[ match ]( context[ match ] );

                        // ...and otherwise set as attributes
                        } else {
                            this.attr( match, context[ match ] );
                        }
                    }
                }

                return this;

            // HANDLE: $(#id)
            } else {
                elem = document.getElementById( match[2] );

                // Check parentNode to catch when Blackberry 4.6 returns
                // nodes that are no longer in the document #6963
                if ( elem && elem.parentNode ) {
                    // Inject the element directly into the jQuery object
                    this.length = 1;
                    this[0] = elem;
                }

                this.context = document;
                this.selector = selector;
                return this;
            }

        // HANDLE: $(expr, $(...))
        } else if ( !context || context.jquery ) {
            return ( context || rootjQuery ).find( selector );

        // HANDLE: $(expr, context)
        // (which is just equivalent to: $(context).find(expr)
        } else {
            return this.constructor( context ).find( selector );
        }

    // HANDLE: $(DOMElement)
    } else if ( selector.nodeType ) {
        this.context = this[0] = selector;
        this.length = 1;
        return this;

    // HANDLE: $(function)
    // Shortcut for document ready
    } else if ( jQuery.isFunction( selector ) ) {
        return rootjQuery.ready( selector );
    }

    if ( selector.selector !== undefined ) {
        this.selector = selector.selector;
        this.context = selector.context;
    }

    return jQuery.makeArray( selector, this );
}
```

selecor参数的几种取值:

1. "", null, undefined, false
2. string
3. DOMnode
4. function
5. array

传入string几种情况细分:

1. `selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3`  

`<....>` 这种形式跳过正则检查

2. `match && (match[1] || !context)`

match是`rquickExpr.exec( selector )`匹配的结果, 可能的取值:

- null  不匹配

- `["<li>", "<li>", undefined]` 单个标签

- `["<li>aaa", "<li>", undefined]` 单个标签

- `["<li>1</li><li>2</li>", "<li>1</li><li>2</li>", undefined]` 多个标签

- `["<ul><li>1</li></ul>", "<ul><li>1</li></ul>", undefined]` 嵌套标签

- `["#div1", undefined, "div1"]`  id


`match[1] || !context` 表示匹配到标签或者没有提供上下文(context)

这里有点隐晦， 能够匹配就两种情况， 标签和id， `match && (match[1] || !context)`, 

首先是match， 表示是匹配的， match[1]如果为真， 则进入， 如果match[1]为假， 肯定就匹配到了id, 并且没有提供context, 才满足条件.

所以`match && (match[1] || !context)`可以解读为:

- 匹配到标签满足条件
- 匹配到ID， 并且没有提供context满足条件

3. 处理传入标签的情况

```js
if ( match && (match[1] || !context) ) {
    if(match[1]){
        ...
    }
}
```

`context = context instanceof jQuery ? context[0] : context`

context是我们传入的$的第二个参数， 代表了我们操作的上下文， 它的取值可能是

```js
$('<div>');//undefined
$('<div>', document);//DOMNode
$('<div>', $(document));//jq对象
```

传入jq对象没有什么作用， 只是这里这么是为了防止报错

```js
jQuery.merge( this, jQuery.parseHTML(
    match[1],
    context && context.nodeType ? context.ownerDocument || context : document,
    true
) )
```

这里是用来根据传入标签， 生成DOM节点的代码, 我们先来看下$.parseHTML跟$.merge的用法

- jQuery.parseHTML

生成dom节点, 返回一个数组

```js
var str = '<li>1</li>'
jQuery.parseHTML(str, document);//[li]
```

多个标签

```js
var str = '<li>1</li><li>2</li>'
var arr = jQuery.parseHTML(str, document);//[li, li]
```

第三个参数，表示是否解析`<script>`标签，true表示解析

```html
<script>
var str = '<script>alert(1)<\/script>';// `/`需要转义， 不然会跟包裹代码的script匹配
var arr = jQuery.parseHTML(str, document, true);   
</script>
```

- jQuery.merge

本身的作用时合并数组

```js
var arr1 = [1,2];
var arr2 = [3,4];
jQuery.merge(arr1, arr2);//[1, 2, 3, 4]
```

放在内部使用， 功能不同， 可以用来合并类数组(具有下标和length的对象)和数组

```js
var obj = {1: 'a', 2: 'b', length:2};
var arr = ['c', 'b'];
jQuery.merge(obj, arr);//Object {1: "a", 2: "c", 3: "b", length: 4}
```

必须是类数组

```js
var obj = {length:0};
var arr = ['c', 'b'];
jQuery.merge(obj, arr);
```

4. 处理单个标签加属性的处理方法 $(html, props)

像这样的调用:

```js
$('<a>', {title: 'aaa', html:'bbb'})
```

```js
rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

...
if ( match && (match[1] || !context) ) {
    if(match[1]){
        ...
        if(rsingleTag.test( match[1] ) && jQuery.isPlainObject( context )){
            //循环context, 这里是{title: 'aaa', html:'bbb'}
            for ( match in context ) 
                //如果jq对象上有这个方法， 则调用, 比如: $().html是一个函数, 则之间调用this.html('bbb');
                if ( jQuery.isFunction( this[ match ] ) ) {
                    this[ match ]( context[ match ] );
                } else {
                    //不是在jquery对象上的方法则，变成html属性
                    this.attr( match, context[ match ] );
                }
            }
        }
    }
}
```

条件: `rsingleTag.test( match[1] ) && jQuery.isPlainObject( context )`

是单个标签， 并且第二个参数为原始对象


5. 处理id


```js
if ( match && (match[1] || !context) ) {
    if(match[1]){

    }else{
        elem = document.getElementById( match[2] );

        // Check parentNode to catch when Blackberry 4.6 returns
        // nodes that are no longer in the document #6963
        if ( elem && elem.parentNode ) {
            // Inject the element directly into the jQuery object
            this.length = 1;
            this[0] = elem;
        }

        this.context = document;
        this.selector = selector;
        return this;
    }
}
```
match[2]就是匹配的id名， 

`elem && elem.parentNode`
本来判断elem就可以了， 但是在Blackberry 4.6中不在文档中的节点也会被找到, 所以在进一步判断`elem.parentNode`



查看[更多信息](https://bugs.jquery.com/ticket/6963)

6. 处理复杂选择器

```js
if ( match && (match[1] || !context) ){


// 如果没有提供上下文或上下文是jq对象 $(expr) 或者 $(expr, $(document))
} else if ( !context || context.jquery ) {
    return ( context || rootjQuery ).find( selector );
//提供了上下文: $(expr, document);
} else {
    return this.constructor( context ).find( selector );
}
```

find调用sizzle来查找.


### 传入array或jq对象的情况

```js
$([div,div, div]);
$($('#div1'));
```

```js
return jQuery.makeArray( selector, this );
```



### jQuery.makeArrary

将类数组转成数组

```js
var obj = {0:'a', 1:'b', length: 2};
jQuery.makeArray(obj).push(3);//['a', 'b', 3];
```

内部使用时， 传入两个参数, 两个参数可以是数组或类数组， 将第一个参数合并到第二个参数中

```js
var obj1 = {0:'a', 1:'b', length: 2};
var obj2 = {0:'1', 1:'2', length: 2};
jQuery.makeArray(obj1, obj2);
obj2;//{0: "1", 1: "2", 2: "a", 3: "b", length: 4}

var arr1 = ['a', 'b'];
var arr2 = ['1', '2'];
jQuery.makeArray(arr1, arr2);
arr2;//["1", "2", "a", "b"]
```


## toArray()

转化成纯数组

```js
$('div').toArray();//[div, div, div]
```

源码:

```js
toArray: function() {
    return core_slice.call( this );
}
```

core_slice时数组的slice方法`core_slice=[].slice`

```js
var a = [1,2,3];
a.slice();//[1,2,3];数组截取，返回一个新数组
```

```js
core_slice.call( this ) this是jquery对象， 是个类数组， 就可以使用`[].slice`方法
```


## pushStack()

这个方法, 在jq内部用的很多

### stack(栈)

stack是一种数据结构， 先进后出，可以理解为坐电梯， 先进去的人， 出来的时候往往后出来， 与它对应的还有一种数据结构堆(heap), 先进先出， 可以理解为排队买票， 先排队的人先买

```js
pushStack: function( elems ) {

    //返回包含elems的新的jq对象
    var ret = jQuery.merge( this.constructor(), elems );

    //将老的jquery对象保存在新对象的prevObject属性中
    ret.prevObject = this;
    ret.context = this.context;

    // Return the newly-formed element set
    return ret;
}
```

对应的出栈的方法: end()

```js
end: function() {
    //prevObject属性有值直接返回， 没有返回空的jq对象
    return this.prevObject || this.constructor(null);
}
```

pushStack入栈， end出栈， 先进的后出， 这个栈保存的是jq对象

使用:



```js
// 只有span变红
$('div').pushStack( $('span') ).css('background', 'red');
```

```js
//span变红，div变黄， end方法相当于回溯操作
$('div').pushStack( $('span') ).css('background','red').end().css('background','yellow');
```

jq中很多方法中都用到了pushStack方法, 都可以进行回溯操作


### slice()


```js
slice: function() {
    return this.pushStack( core_slice.apply( this, arguments ) );
}
```

使用:


```js
//第2，3个div变红， 所有div文字变蓝
$('div')
    .slice(1,3)
    .css('background','red')
    .end()
    .css('color','blue');
```

## eq(i)

```js
eq: function( i ) {
    var len = this.length,
        j = +i + ( i < 0 ? len : 0 );
    return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
}
```

eq参数可以正数也可以是负数

```js
j = +i + ( i < 0 ? len : 0 )
```
`+i`表示转换为数字
这里如i为正数， j==i
i为负数, j==i+length

```js
//超出索引范围，返回[]
j >= 0 && j < len ? [ this[j] ] : []
```
































