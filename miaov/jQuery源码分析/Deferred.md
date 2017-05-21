# Deferred

代码结构:

```js
jQuery.extend({

    Deferred: function(func){},
    when: function(){}
})
```

其实Deferred内部时调用的$.Callbacks函数实现的


用法:

```js
var dfd = $.Deferred();

setTimeout(function(){
    
    alert(111);
    dfd.resolve();
    
},1000);

dfd.done(function(){
    alert(222);
});
```

$.Callbacks：

```js
var cb = $.Callbacks();

setTimeout(function(){
    
    alert(111);
    cb.fire();
    
},1000);

cb.add(function(){
    alert(222);
});
```

两种方式其实很像

- notify

```js
var dfd = $.Deferred();

setTimeout(function(){
    
    alert(111);
    dfd.notify();
    
},1000);

dfd.progress(function(){
    alert(222);
});
```

- resolve reject

```js
var dfd = $.Deferred();

setTimeout(function(){
    
    
    //dfd.resolve();
    dfd.reject();
    
},1000);

dfd.done(function(){
    alert('成功');
}).fail(function(){
    alert('失败');
});
```


源码：

```js
Deferred: function( func ) {
    var tuples = [
            // action, add listener, listener list, final state
            [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
            [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
            [ "notify", "progress", jQuery.Callbacks("memory") ]
        ],
        state = "pending",
        promise = {
            state: function() {
                return state;
            },
            always: function() {
                deferred.done( arguments ).fail( arguments );
                return this;
            },
            then: function( /* fnDone, fnFail, fnProgress */ ) {
                var fns = arguments;
                return jQuery.Deferred(function( newDefer ) {
                    jQuery.each( tuples, function( i, tuple ) {
                        var action = tuple[ 0 ],
                            fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
                        // deferred[ done | fail | progress ] for forwarding actions to newDefer
                        deferred[ tuple[1] ](function() {
                            var returned = fn && fn.apply( this, arguments );
                            if ( returned && jQuery.isFunction( returned.promise ) ) {
                                returned.promise()
                                    .done( newDefer.resolve )
                                    .fail( newDefer.reject )
                                    .progress( newDefer.notify );
                            } else {
                                newDefer[ action + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
                            }
                        });
                    });
                    fns = null;
                }).promise();
            },
            // Get a promise for this deferred
            // If obj is provided, the promise aspect is added to the object
            promise: function( obj ) {
                return obj != null ? jQuery.extend( obj, promise ) : promise;
            }
        },
        deferred = {};

    // Keep pipe for back-compat
    promise.pipe = promise.then;

    
    jQuery.each( tuples, function( i, tuple ) {
        //tuple: [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ]
        //tuple[ 2 ]: jQuery.Callbacks("once memory")
        //tuple[ 3 ]: resolved
        var list = tuple[ 2 ],
            stateString = tuple[ 3 ];

        // promise[ done | fail | progress ] = list.add
        promise[ tuple[1] ] = list.add;

        // 改变状态
        if ( stateString ) {
            list.add(function() {
                // state = [ resolved | rejected ]
                state = stateString;

            // [ reject_list | resolve_list ].disable; progress_list.lock
            }, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
        }

        // deferred[ resolve | reject | notify ]
        deferred[ tuple[0] ] = function() {

            deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
            return this;
        };
        deferred[ tuple[0] + "With" ] = list.fireWith;
    });

    // Make the deferred a promise
    promise.promise( deferred );

    // Call given func if any
    if ( func ) {
        func.call( deferred, deferred );
    }

    // All done!
    return deferred;
}
```

实际上是Deferred函数可以提供两个对象deferred或promise

```js
var deferred = $.Deferred();//返回deferred对象
var promise = $.deferred.promise();//返回promise对象
```

我们来分别看看这两个对象上都有什么属性

deferred:

```js
deferred={
    resolve,
    reject,
    notify
}
```

promise:

```js
promise = {
    state,
    always,
    then,
    promise,
    pipe,
    done,
    fail,
    progress
}
```

然后通过这句`promise.promise( deferred )`

```js
promise: function( obj ) {
    return obj != null ? jQuery.extend( obj, promise ) : promise;
}
```

将promise对象中的属性都拷贝到deferred对象中：

```js
deferred = {
    resolve,
    reject,
    notify,

    //从promise对象中拷贝过来的
    state,
    always,
    then,
    promise,
    pipe,
    done,
    fail,
    progress

}
```

所以deferred对象比promise对象多三个属性resolve, reject, notify,

这有什么作用：

我们来看下面的代码

```js
function fn(){
    var deferred = $.Deferred();
    setTimeout(function(){
        deferred.resolve();
    },1000);

    return deferred;    
}

var deferred = fn();

deferred.done(function(){
    alert('success');
}).fail(function(){
    alert('fail');
});

deferred.reject();
```

这段代码会弹出'fail', 应为函数返回了deferred， 再函数外部调用了`deferred.reject()`

```js
function fn(){
    var deferred = $.Deferred();
    setTimeout(function(){
        deferred.resolve();
    },1000);

    return deferred.promise();    
}

var promise = fn();

promise.done(function(){
    alert('success');
}).fail(function(){
    alert('fail');
});

promise.reject();
```

这段代码会报错， 因为promise对象没有reject方法, 这种情况就是为防止在函数外部改变deferred的状态


- 状态的控制

当调用了deferred.reject()之后, 在调用deferred,resolve()就没有什么作用了

这是怎么做到的呢， 我们来看这段代码:

```js
list.add(function() {
    // state = [ resolved | rejected ]
    state = stateString;

// [ reject_list | resolve_list ].disable; progress_list.lock
}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
```

这里有个`^`运算符， 这是位运算符 异或

```js
0 ^ 1 得 1
1 ^ 1 得 0
0 ^ 0 得 0
1 ^ 0 得 1
```

所以:

i=0 tuples[0^1]  `tuples[1][2]`代表了reject对应的cb, `tuples[1][2].disable()`表示禁止掉它， 意思是resolve()之后,  reject()就没有作用了

i=1 tuples[1^1]  tuples[0].disable() 同样的 reject()之后, resolve就没有作用了


`tuples[ 2 ][ 2 ].lock`, 不管是resolve()还是reject()  notify()都会被锁定了

## when()

when时deferred的一个帮助方法, 它的作用是管理多个延迟对象

```js
var fn1=function(){
    var deferred = $.Deferred();
    // deferred.reject();
    deferred.resolve();
    return deferred;
}
var fn2=function(){
    var deferred = $.Deferred();
    // deferred.reject();
    deferred.resolve();
    return deferred;
}
$.when(fn1(), fn2())
    .done(function(){
        alert('success');
    })
    .fail(function(){
        alert('fail');
    })
```

fn1, fn2都返回的是一个延迟对象，当这两个延迟对象的状态都是resolve的时候，才会弹出success

但是只要有一个延迟对象的状态为reject就会弹fail


### 原理分析

```js
$.when(fn1(), fn2(), fn3(), fn4() ).done(..)
```

$.when的参数是多个延迟对象， 返回值也是一个延迟对象（我叫它总延迟对象）

它内部实际是是通过一个计数器remaining来控制总延迟对象的触发， 

比如说每个延迟对象都加上一个done方法, 内部做remaining--

remaining 4
remaining 3 fn1 done
remaining 2 fn2 done
remaining 1 fn3 done
remaining 0 fn4 done

当remaining==0时触发总延迟对象上的resovle

### 当参数不是延迟对象的情况

```js
var fn1=function(){
    var deferred = $.Deferred();
    // deferred.reject();
    deferred.resolve();
    return deferred;
}

$.when(fn1(), 1)
    .done(function(){
        alert('success');
    })
    .fail(function(){
        alert('fail');
    })
```

并不会报错， 只是会忽略这个值， fn1()决定了是否弹success

```js
$.when(1, 2)
$.when()
```

都会弹success

不是延时对象的参数有什么作用， 在回调函数里， 可以获取， $.when传入的参数

```js
$.when(1,2).done(function(){
    alert(arguments[0]);//1
    alert(arguments[1]);//2
    alert('success');
})
```


如果传入的不是延迟对象， 就让计数器减减

```js
remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0
```

首先， `||` 运算符优先级高于三目运算符

```js
remaining = (length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ) ? length : 0
```

然后, `||`有短路的功能,只要有一个为true就为true,  遇true就停止，

所以 length!==1为true的情况有 0, 2,3,4..., 当lenght!=1为true就不用考虑后面的情况了

remaining=length

然后当length!==1为false的情况， 只有1, 需要判断`jQuery.isFunction( subordinate.promise )` 是否是延迟对象， 如果是的话 
remaining=lenght=1
不是的话就为0











