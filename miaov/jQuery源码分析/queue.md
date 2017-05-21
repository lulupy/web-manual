# queue 队列

## 基本用法

```js
function a(){alert('1');}
function b(){alert('2');}

//入队 注意：值只能是函数
$.queue(document,'q1', a);
$.queue(document,'q1', b);

//等价于
//$.queue(document,'q1', [a,b]);

//查看
console.log( $.queue(document, 'q1') );

//出队，先入先出， 弹出1
$.dequeue(document, 'q1');
```

## 源码

### 简化结构

```js
jQuery.extend({
    queue                //push()
    dequeue              //shift()
    _queueHooks
});

jQuery.fn.extend({
    queue
    dequeue
    delay
    clearQueue
    promise
});
```

#### jQuery.queue

```js
queue: function( elem, type, data ) {
    var queue;

    if ( elem ) {
        //fx代表动画队列
        type = ( type || "fx" ) + "queue";
        queue = data_priv.get( elem, type );

        // Speed up dequeue by getting out quickly if this is just a lookup
        if ( data ) {
            //如果queue没有找到或者传入的是数组
            //数组是这种情况
            //$.queue(document,'q1', a);
            //$.queue(document,'q1', [b,c]); //会将之前队列覆盖掉
            if ( !queue || jQuery.isArray( data ) ) {
                queue = data_priv.access( elem, type, jQuery.makeArray(data) );
            } else {
                queue.push( data );
            }
        }
        return queue || [];
    }
}
```

#### jQuery.dequeue



```js

    

dequeue: function( elem, type ) {
    type = type || "fx";
    
    //先获取队列
    var queue = jQuery.queue( elem, type ),

        //获取队列长度
        startLength = queue.length,
        
        //取到第一个函数，并将其从队列中删除
        fn = queue.shift(),


        hooks = jQuery._queueHooks( elem, type ),
        next = function() {
            jQuery.dequeue( elem, type );
        };

    //这里是管理fx队列的
    if ( fn === "inprogress" ) {
        fn = queue.shift();
        startLength--;
    }

    if ( fn ) {

        // Add a progress sentinel to prevent the fx queue from being
        // automatically dequeued
        if ( type === "fx" ) {
            queue.unshift( "inprogress" );
        }

        // clear up the last queue stop function
        delete hooks.stop;

        fn.call( elem, next, hooks );
    }

    if ( !startLength && hooks ) {
        hooks.empty.fire();
    }
},

```


##### "inprogress"

我们先来看个例子:

```js
function a(){alert(1);}
function b(){alert(2);}

$(document).queue(a);
$(document).queue(b);
```

会弹出1， 这里我们并没有调用dequeue,  当我们使用$.fn.queue时，如果是fx队列，会自动
出队一次

```js
jQuery.fn.queue = function(type, data){
    //这里$(document).queue(a);  queue[0]为a  所以就直接出队了
    if ( type === "fx" && queue[0] !== "inprogress" ) {
        jQuery.dequeue( this, type );
    }
}


jQuery.dequeue = function(elem, type){

    // 3. 每次要去除"inprogress" 保证函数的正常获取
    if ( fn === "inprogress" ) {
        fn = queue.shift();
        startLength--;
    }

    ....
    

    // 2. 如果为fx  则加上inprogress 为的是防止第二次
    // $(document).queue(b); 的时候 不再自动出队
    if ( type === "fx" ) {
        queue.unshift( "inprogress" );
    }


}
```

##### _queueHooks



```js
// not intended for public consumption - generates a queueHooks object, or returns the current one
_queueHooks: function( elem, type ) {
    var key = type + "queueHooks";
    return data_priv.get( elem, key ) || data_priv.access( elem, key, {
        empty: jQuery.Callbacks("once memory").add(function() {
            data_priv.remove( elem, [ type + "queue", key ] );
        })
    });
}
```

_queueHooks的作用是在队列执行完了之后添加一些处理函数

```js
if ( !startLength && hooks ) {
    hooks.empty.fire();
}
```

empty: 作用清楚在data_priv的缓存

```js
var key = type + "queueHooks";
empty: jQuery.Callbacks("once memory").add(function() {
    //比如type为fx  type+"queue" fxqueue   key是它自身
    data_priv.remove( elem, [ type + "queue", key ] );
})
```

##### fn.call( elem, next, hooks )

执行函数

它this为elem, 两个参数next hooks 都很用

next可以控制是否执行下一个函数， hooks添加队列执行完之后的处理逻辑

1和2都会弹出

```js
function a(next){alert(1);next()}
function b(){alert(2);}

$.queue(document,'q1',a);
$.queue(document,'q1',b);

$.dequeue(document, 'q1');
```

### jQuery.fn.queue

```js
queue: function( type, data ) {
    var setter = 2;
    

    //$(document).queue(func) 这种情况
    if ( typeof type !== "string" ) {
        data = type;
        type = "fx";
        setter--;
    }
    
    //获取值
    if ( arguments.length < setter ) {
        return jQuery.queue( this[0], type );
    }

    return data === undefined ?
        this :
        this.each(function() {
            var queue = jQuery.queue( this, type, data );

            //这一句其实没有什么作用， 在jQuery.queue 也会处理
            jQuery._queueHooks( this, type );

            if ( type === "fx" && queue[0] !== "inprogress" ) {
                jQuery.dequeue( this, type );
            }
        });
}
```

### jQuery.fn.delay

使用

```js
function a(){console.log(1);}
function b(){console.log(2);}

$(document).queue('q1',a).delay(5000, 'q1').queue('q1',b);
$(document).dequeue('q1')
$(document).dequeue('q1')
```
先打印1, 过5秒钟之后才打印2

源码:

原理其实很简单， 在队列中添加了一个函数， 设置了一个定时器， 在设置时间之后自动调用下一个函数

```js
delay: function( time, type ) {
    time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
    type = type || "fx";

    return this.queue( type, function( next, hooks ) {
        var timeout = setTimeout( next, time );

        //在hooks添加一个函数， 可以取消调用下一个函数
        hooks.stop = function() {
            clearTimeout( timeout );
        };
    });
}
```

### jQuery.fn.promise

使用:

```js
function a(){console.log(1);}
function b(){console.log(2);}


$(document).queue('q1',a).queue('q1',b);
$(document).promise('q1').done(function(){
    console.log('complete')
});
$(document).dequeue('q1')
$(document).dequeue('q1')
$(document).dequeue('q1')
```

返回一个promise当队列完成时触发，注意是掉3次dequeue

源码:

```js
promise: function( type, obj ) {
    var tmp,
        count = 1,
        defer = jQuery.Deferred(),
        elements = this,
        //针对多个元素
        i = this.length,

        resolve = function() {
            //减到0时就代表完成了
            if ( !( --count ) ) {
                defer.resolveWith( elements, [ elements ] );
            }
        };

    if ( typeof type !== "string" ) {
        obj = type;
        type = undefined;
    }
    type = type || "fx";

    while( i-- ) {
        tmp = data_priv.get( elements[ i ], type + "queueHooks" );
        if ( tmp && tmp.empty ) {
            //有多少队列， 添加完成回调函数
            count++;
            tmp.empty.add( resolve );
        }
    }
    resolve();
    return defer.promise( obj );
}
```
