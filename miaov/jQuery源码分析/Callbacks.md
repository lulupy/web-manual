# Callbacks

管理回调函数，可以理解为发布订阅模式

## 基本用法

```js
function fn1(){
    alert(1);
}
function fn2(){
    alert(2);
}
var cb = $Callbacks();
cb.add(fn1);
cb.add(fn2);
cb.fire();//同时触发两个函数
```

## 代码结构

```js

/*
options:

once
memory
unique
stopOnFalse
 */
jQuery.Callbacks = function( options ) {
    var // Last fire value (for non-forgettable lists)
        memory,
        // Flag to know if list was already fired
        fired,
        // Flag to know if list is currently firing
        firing,
        // First callback to fire (used internally by add and fireWith)
        firingStart,
        // End of the loop when firing
        firingLength,
        // Index of currently firing callback (modified by remove if needed)
        firingIndex,
        // Actual callback list
        list = [],
        // Stack of fire calls for repeatable lists
        stack = !options.once && [],

    self = {
        add:function(){...},
        remove:function(){...},
        has:function(){...},
        empty:function(){...},
        disable:function(){...},
        disabled:function(){...},
        lock:function(){...},
        locked:function(){...},
        fireWith:function(){...},
        fire:function(){...},
        fired:function(){...}
    }

    return self;
}
```

## 基本原理

add方法将函数添加进list数组中, fire方法触发函数， 调用for循环遍历list数组的中的函数

## fire()

触发回调函数:

fire()-->fireWith()--function fire(){}

fire方法调用的是fireWith方法， fireWth调用的是fire函数， 再fire函数中执行的for循环

## CallBacks参数

### once

只触发一次


```js
function fn1(){
    alert(1);
}
function fn2(){
    alert(2);
}
var cb = $Callbacks();
cb.add(fn1);
cb.add(fn2);

//触发两次就会运行两次
cb.fire();
cb.fire();
```

```js
function fn1(){
    alert(1);
}
function fn2(){
    alert(2);
}
var cb = $Callbacks('once');
cb.add(fn1);
cb.add(fn2);


cb.fire();//触发
cb.fire();//不触发，只触发一次
```

原理： 再function fire(){}中做处理， 触发一次后就不再触发


### memory

```js
function fn1(){
    alert(1);
}
function fn2(){
    alert(2);
}
var cb = $Callbacks();
cb.add(fn1);
cb.fire();//只会触发fn1, 后面加的不会
cb.add(fn2);
```

设置参数memory之后 

```js
function fn1(){
    alert(1);
}
function fn2(){
    alert(2);
}
var cb = $Callbacks('memory');
cb.add(fn1);
cb.fire();//fn1, fn2都会触发
cb.add(fn2);
```

是怎么实现的呢？ 实际上是如果已经触发了，通过调用add方法再去调用fire实现触发

### unique

取出重复的函数

```js
function fn1(){
    alert(1);
}

var cb = $Callbacks();
cb.add(fn1);
cb.add(fn1);
cb.fire();//执行了两次
```

```js
function fn1(){
    alert(1);
}

var cb = $Callbacks('unique');
cb.add(fn1);
cb.add(fn1);
cb.fire();//执行了1次
```

是add方法中做的处理，重复的就不让添加

### stopOnFalse

如何回调函数返回false就不执行后续添加的回调函数了

```js
function fn1(){
    alert(1);
    return false;
}
function fn2(){
    alert(2);
}
var cb = $Callbacks();
cb.add(fn1);
cb.add(fn2);
cb.fire();//fn1返回false没有任何影响，还是会执行fn1,fn2
```

```js
function fn1(){
    alert(1);
    return false;
}
function fn2(){
    alert(2);
}
var cb = $Callbacks('stopOnFalse');
cb.add(fn1);
cb.add(fn2);
cb.fire();//fn1返回false没有任何影响，只执行了fn1， fn2就不会执行了

```

### 可以组合使用

```js
cb = $.Callbacks('once memory');

cb.add( fn1 );

cb.fire();

cb.add( fn2 );

cb.fire();//没有作用
```

fn1, fn2只执行一次

还可以这么调用

```js
cb = $.Callbacks({
    once: true,
    memory: true
});
```

### 参数的处理

源码:

```js
//'once'-->['once']
//'once momery'-->['once', 'momery']
var core_rnotwhite = /\S+/g;//匹配不是空格的
var optionsCache = {};


function createOptions( options ) {
    var object = optionsCache[ options ] = {};
    jQuery.each( options.match( core_rnotwhite ) || [], function( _, flag ) {
        object[ flag ] = true;
    });
    return object;
}

jQuery.Callbacks = function( options ){
    options = typeof options === "string" ?
        ( optionsCache[ options ] || createOptions( options ) ) :
        jQuery.extend( {}, options );
}

```

如果是对象，则直接`jQuery.extend( {}, options )`

```js
var object = optionsCache[ options ] = {};
```

这里为什么要给optionsCache[ options ], 主要是这种情况

```js
$.Callbacks('once memory');
```

运行第一次之后

```js
optionsCache = {
    'once memory': {
        once: true,
        momery: true
    }
}
```

下次再运行:

```js
$.Callbacks('once memory');
```

就可以直接从optionsCache获取，

```js
optionsCache[ options ]
```

提升性能

## add

```js

cb.add(fn1);
// 多个参数
cb.add(fn1, fn2);
// 传入数组
cb.add([fn1, fn2]);
```

源码：

```js
var memory,
    list = [],
self = {
    // Add a callback or a collection of callbacks to the list
    add: function() {
        if ( list ) {
            // First, we save the current length
            var start = list.length;

            // 处理多个参数的情况
            (function add( args ) {
                jQuery.each( args, function( _, arg ) {
                    var type = jQuery.type( arg );
                    if ( type === "function" ) {
                        //如果unique为true
                        if ( !options.unique || !self.has( arg ) ) {
                            list.push( arg );
                        }
                    // 处理参数为数组的情况
                    } else if ( arg && arg.length && type !== "string" ) {
                        // Inspect recursively
                        add( arg );
                    }
                });
            })( arguments );
            if ( firing ) {
                firingLength = list.length;
            // 第一调用add时不管参数设置了memory没有， 这里的memory变量都是undefined
            } else if ( memory ) {
                firingStart = start;
                fire( memory );
            }
        }
        return this;
    }
}
```

## fire


源码：

```js
fire = function( data ) {
    memory = options.memory && data;

    // 只要调用了， 就是触发了标识设置为true
    fired = true;
    firingIndex = firingStart || 0;
    firingStart = 0;
    firingLength = list.length;
    firing = true;
    for ( ; list && firingIndex < firingLength; firingIndex++ ) {
        if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
            memory = false; // To prevent further calls using add
            break;
        }
    }
    firing = false;
    if ( list ) {
        if ( stack ) {
            if ( stack.length ) {
                fire( stack.shift() );
            }
        } else if ( memory ) {
            list = [];
        } else {
            self.disable();
        }
    }
}
stack = !options.once && []
self = {
    fireWith: function( context, args ) {
        if ( list && ( !fired || stack ) ) {
            args = args || [];
            args = [ context, args.slice ? args.slice() : args ];
            if ( firing ) {
                stack.push( args );
            } else {
                fire( args );
            }
        }
        return this;
    },
    // Call all the callbacks with the given arguments
    fire: function() {
        self.fireWith( this, arguments );
        return this;
    }
}
```

fire是可以传参数的：

```js
function fn1(n){
    alert(n);
}
cb.add(fn1);
cb.fire(1);
```

fireWith

```js
args = [ context, args.slice ? args.slice() : args ]
fire( args )
```

args是一个数组， 第一个为context, 第二个就是参数列表

fire函数

```js
fire = function( data ){
    // data=[ contex, [1] ]
    list[ firingIndex ].apply( data[ 0 ], data[ 1 ] )
}
```

### once

```js
stack = !options.once && []
fireWith: function( context, args ) {
        if ( list && ( !fired || stack ) ) {}
}
```
如options.once为true  stack就为false

所以第一次调用fireWidth时， !fired为true是可以通过的， 第二次调用时!fired为false stack也为false, 所以只执行一次

### 特殊的情况

考虑下面这种调用方式：

```js
function fn1(){
    alert(1);
    cb.fire();
}

function fn2(){
    alert(2);
}

var cb = $.Callbacks();
cb.add(fn1,fn2);
cb.fire();
```

结果是1,2,1,2.... 一直循环

但是有个问题， 按照我的理解, alert(1)之后， 执行cb.fire(), cb.fire() 应该又执行fn1, 结果应该是1,1,1,1...

我们再来看段代码：

我们让cb.fire()再fn1中只运行1次

```js
var onOff = true;
function fn1(){
    alert(1);
    if(onOff){
        cb.fire();
        onOff = false;
    }
    
}

function fn2(){
    alert(2);
}

var cb = $.Callbacks();
cb.add(fn1,fn2);
cb.fire();
```

结果是: 1,2,1,2  两次

所以说， 不管你是不是嵌套调用， 你调了几次fire(), 都会依次遍历几次

我们来看下代码：

```js
self= {
    fireWith: function( context, args ) {
            //如果遍历没有完成， 并不会触发， 只是将传入的参数加入堆中
            if ( firing ) {
                stack.push( args );
            } 
    }
}

fire = function(){
    // 如果堆中有数据，再依次触发
    if ( stack ) {
        if ( stack.length ) {
            fire( stack.shift() );
        }

    }
}
```

然后我们看下stack为false的情况

```js
stack = !options.once && []
```

只有当你的once为true时， stack才为false

```js
if ( stack ) {
    if ( stack.length ) {
        fire( stack.shift() );
    }
} else if ( memory ) {
    list = [];
} else {
    self.disable();
}
```

当once为true,memory为true时 list=[];
只当once为true时 self.disable();

分别调用两次

```js
function fn1(){
    alert(1);
    
}

function fn2(){
    alert(2);
}

var cb = $.Callbacks('memory');
cb.add(fn1);
cb.fire();
cb.add(fn2);
cb.fire();
```

只调用一次

```js
function fn1(){
    alert(1);
    
}

function fn2(){
    alert(2);
}

var cb = $.Callbacks('memory once');
cb.add(fn1);
cb.fire();
cb.add(fn2);
cb.fire();
```


















