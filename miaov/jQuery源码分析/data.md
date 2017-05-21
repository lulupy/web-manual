# data数据缓存

跟data方法使用相似的还有attr和prop方法， 下面我们来看一下它们的区别：

```js
$('#div1').attr('name', 'hello');
alert( $('#div1').attr('name') );

// document.getEelementById('div1').setAttribute('name', 'hello');
// alert( document.getEelementById('div1').getAttribute('name') );

$('#div1').prop('name', 'hello');
alert( $('#div1').prop('name') );

// document.getEelementById('div1').name = 'hello';
// alert( document.getEelementById('div1').name );

$('#div1').data('name', 'hello');
alert( $('#div1').data('name') );
```

上面这三种方式，实现的效果都一样， 那么它们有什么区别呢，

attr和prop适合缓存小的数据，比如说一个字符串，
如果缓存的数据比较大，比如说一个对象，最好是用data

## 内存泄漏

内存泄漏也称作“存储渗漏”，用动态存储分配函数动态开辟的空间，在使用完毕后未释放，结果导致一直占据该内存单元。直到程序结束。（其实说白了就是该内存空间使用完毕之后未回收）即所谓内存泄漏。

最终结果是程序运行时间越长，占用存储空间越来越多，最终用尽全部存储空间，整个系统崩溃。

### js中的内存泄漏

我们知道js中垃圾回收机制，使我们可以不用关心内存的释放，js会定期的检查已经没有使用的变量，然后释放内存

### js垃圾回收机制

#### 标记清除

JavaScript 中最常用的垃圾收集方式是标记清除(mark-and-sweep)，这种方式还没有完全弄清楚

#### 引用计数

当声明了一个变量并将一个引用类型值赋给该变量时,则这个值的引用次数就是 1

```js
function fn(){
    var a = {};
}
```

{}会在内存中开辟一个空间，来存储数据

如果同一个值又被赋给另一个变量,则该值的引用次数加 1

```js

var a = {};
b=a;
```


如果包含对这个值引用的变量又取 得了另外一个值,则这个值的引用次数减 1

```js
var a = {};
b=a;
b=1;
```

当这个值的引用次数变成 0 时,则说明没有办法再访问这 个值了,因而就可以将其占用的内存空间回收回来

```js

var a = {};
b=a;
b=1;
a=1;

```

##### 循环引用

Netscape Navigator 3.0 是最早使用引用计数策略的浏览器,但很快它就遇到了一个严重的问题:循 环引用

```js

var objectA = new Object();//这个对象我们叫做obj1, 它的计数为1
var objectB = new Object();//这个对象我们叫做obj2, 它的计数为1
objectA.someOtherObject = objectB;//obj2的计数为2
objectB.anotherObject = objectA;//obj1的计数为2

objectA=1;//obj1计数为1
objectB=1;//obj2计数为1

// 现在已经不能访问到obj1和obj2了， 但是它们的计数还是为1不为0，不能被回收
```

作为一个函数来说， 我觉得函数执行完之后会自动释放变量

```js
function problem(){
    var objectA = new Object();
    var objectB = new Object();
￼   objectA.someOtherObject = objectB; 
    objectB.anotherObject = objectA;
}
```

假如这个函数被重复多次调用,就会导致大量内存得 不到回收


**如果是标记清除就会有这个问题， 具体的原理没有搞清楚**

#### dom循环引用

dom循环引用，会导致内存得 不到回收，从而导致内存泄漏问题

我们知道,IE 中有一部分对象并不是原生 JavaScript 对象。例如,其 BOM 和 DOM 中的对象就是
使用 C++以 COM(Component Object Model,组件对象模型)对象的形式实现的,而 COM 对象的垃圾 收集机制采用的就是引用计数策略。因此,即使 IE 的 JavaScript 引擎是使用标记清除策略来实现的,但 JavaScript 访问的 COM 对象依然是基于引用计数策略的。换句话说,只要在 IE 中涉及 COM 对象,就会 存在循环引用的问题。

```js
var element = document.getElementById("some_element");
var myObject = new Object();
myObject.element = element;
element.someObject = myObject;
```

## attr prop问题

所以说如果使用attr prop来缓存对象，就可能产生内存泄漏问题

```js
var obj = {};
$('#div1').attr('obj', obj);
obj.div = $('#div1').get(0);
```

## data原理

data不会有这个问题

data是利用了一个中介，来解决dom元素的循环引用问题



```js
$('#div1').data('obj', {});
```

这句的效果：

1. 首先找div1
2. 在div1标签上创建一个定义属性，比如说xxx, 这个属性名是固定，属性值为一个唯一标示符

```html
<div id="div1" xxx="1"></div>
```

3. 然后再中介上创建这个唯一标示与数据缓存的对应关系

```js
cache = {
    "1": {
        obj: {}
    }
}
```

这里的1实际上就是对应了dom标签元素， 对应的值就是保存了键值对的对象

如果我们再运行这句:

```js
$('body').data('name', {});
```

那么:

```html
<body xxx="2">
    
</body>
```

```js
cache = {
    "1": {
        obj: {}
    },
    "2": {
        name: {}
    }
}
```

这样就不用担心dom的循环引用了， 因为xxx属性上保存是一个字符串



## 源码分析

```js
jQuery.extend({
    acceptData
    hasData
    data
    removeData
    _data
    _removeData
});

jQuery.fn.extend({
    data
    removeData
});

Data.prototype = {
    key
    set
    get
    access
    remove
    hasData
    discard
};
```

一些用法

```js
$('#div1').data('name','hello');
// $('#div1').removeData('name');
alert( $('#div1').data('name') );

$.data(document.body , 'age' , 30);
alert( $.hasData(document.body,'age') );
$.removeData(document.body , 'age');
alert( $.hasData(document.body,'age') );
```


```js
data_user = new Data();
data_priv = new Data();


jQuery.extend({
    acceptData: Data.accepts,

    hasData: function( elem ) {
        return data_user.hasData( elem ) || data_priv.hasData( elem );
    },

    data: function( elem, name, data ) {
        return data_user.access( elem, name, data );
    },

    removeData: function( elem, name ) {
        data_user.remove( elem, name );
    },

    // TODO: Now that all calls to _data and _removeData have been replaced
    // with direct calls to data_priv methods, these can be deprecated.
    _data: function( elem, name, data ) {
        return data_priv.access( elem, name, data );
    },

    _removeData: function( elem, name ) {
        data_priv.remove( elem, name );
    }
});
```

可以看到`data_priv`是用在内部函数中， `data_user`是用在外部函数中, 主要还是调用的Data对象上的方法， 所以我们来看一下Data对象


## Data

```js
Data.prototype = {
    //生成标识符 xxx='1'
    key
    set
    get
    //set get的一个集合方法
    access
    remove
    hasData
    discard
}
```

```js
function Data() {
    // Support: Android < 4,
    // Old WebKit does not have Object.preventExtensions/freeze method,
    // return new empty object instead with no [[set]] accessor
    Object.defineProperty( this.cache = {}, 0, {
        get: function() {
            return {};
        }
    });

    this.expando = jQuery.expando + Math.random();
}
```

因为老的webkit内核不支持 `Object.preventExtensions`和`Object.freeze`，所以我们这里使用`Object.defineProperty`

`Object.preventExtensions`和`Object.freez`作用一样， 为了防止对象被修改

```js
var obj = { name : "hello" };
    
Object.freeze(obj);

obj.name = 'hi';

alert( obj.name );//hello
```

Object.defineProperty用来定义一个对象的属性，
这里我们传入三个参数， 对象， 属性名， 配置项
这里的get表示获取该属性时，调用的函数， 这里永远返回{}, 则它是一个不可更改的值

```js
Object.defineProperty( obj, 0, {
    get: function() {
        return {};
    }
});
alert(obj[0]);
obj[0] = 123;
alert(obj[0]);
```


```js
Object.defineProperty( this.cache = {}, 0, {
    get: function() {
        return {};
    }
})
```

这句的作用相当于给this.cache对象加上了一个只读属性

```js
this.cache = {
    0: {}
}
```

这个有什么作用呢?

我们先来看下Data.accepts, 判断能够处理的对象, 

如果是DOM则element_node和document可以， 其他的不行
object都可以

```js
Data.accepts = function( owner ) {
    // Accepts only:
    //  - Node
    //    - Node.ELEMENT_NODE
    //    - Node.DOCUMENT_NODE
    //  - Object
    //    - Any
    return owner.nodeType ?
        owner.nodeType === 1 || owner.nodeType === 9 : true;
};
```

然后我们看下在哪儿调用了

```js
Data.prototype = {
    key: function( owner ) {
        // We can accept data for non-element nodes in modern browsers,
        // but we should not, see #8335.
        // Always return the key for a frozen object.
        if ( !Data.accepts( owner ) ) {
            return 0;
        }
    }
}
```

就是说如果传入的对象不满足要求，就返回0这个键值

```js
this.cache = {
    0: {},
    1: {..}
}
```

所有不满足要求的对象都对应着0， 这就是为什么把它设置成只读的了， 为了防治被其他对象串改



源码：

```js
Data.prototype.set = function(owner, data, value){
    var prop,
    // There may be an unlock assigned to this node,
    // if there is no entry for this "owner", create one inline
    // and set the unlock as though an owner entry had always existed
    unlock = this.key( owner ),
    cache = this.cache[ unlock ];

    // Handle: [ owner, key, value ] args
    if ( typeof data === "string" ) {
        cache[ data ] = value;

    // Handle: [ owner, { properties } ] args
    } else {
        // Fresh assignments by object are shallow copied
        if ( jQuery.isEmptyObject( cache ) ) {
            jQuery.extend( this.cache[ unlock ], data );
        // Otherwise, copy the properties one-by-one to the cache object
        } else {
            for ( prop in data ) {
                cache[ prop ] = data[ prop ];
            }
        }
    }
    return cache;
}
```

基本用法:

```js
var data_user = new Data();
//设置缓存
data_user.set(document, 'key', 'value');
//获取缓存
data_user.get(document, 'key');//value

//设置多个指
data_user.set(document, {
    key1: value1,
    key2: value2
})
```

源码:

```js
Data.prototype.key = function( owner ) {
    // We can accept data for non-element nodes in modern browsers,
    // but we should not, see #8335.
    // Always return the key for a frozen object.
    if ( !Data.accepts( owner ) ) {
        return 0;
    }

    var descriptor = {},
        // Check if the owner object already has a cache key
        unlock = owner[ this.expando ];

    // If not, create one
    if ( !unlock ) {
        unlock = Data.uid++;

        // Secure it in a non-enumerable, non-writable property
        try {
            descriptor[ this.expando ] = { value: unlock };
            Object.defineProperties( owner, descriptor );

        // Support: Android < 4
        // Fallback to a less secure definition
        } catch ( e ) {
            descriptor[ this.expando ] = unlock;
            jQuery.extend( owner, descriptor );
        }
    }

    // Ensure the cache object
    if ( !this.cache[ unlock ] ) {
        this.cache[ unlock ] = {};
    }

    return unlock;
}

```

this.expando = jQuery.expando + Math.random();

这个是键值


```js
descriptor[ this.expando ] = { value: unlock };
Object.defineProperties( owner, descriptor );
```

这里这麽写是为里防止属性值被修改

```js
document['jQuery1113035893594658053860.1354307327994182'] = 1
```

但是andriod4以下不支持，所以加上try catch



源码:

```js
Data.prototype.remove = function( owner, key ) {
    var i, name, camel,
        unlock = this.key( owner ),
        cache = this.cache[ unlock ];

    //如果没有传key, 则删除所有
    if ( key === undefined ) {
        this.cache[ unlock ] = {};

    } else {
        //传入数组的情况
        //user_data.remove(['key1', 'key2'])
        if ( jQuery.isArray( key ) ) {
            //key.map(jQuery.camelCase)  转换为駝峰命名  ['a-key1', 'a-key2'] --> ['aKey1', 'aKey2']
            //key.concat( key.map( jQuery.camelCase ) ) 和原来的数组组成新数组 ['a-key1', 'a-key2', 'aKey1', 'aKey2']
            name = key.concat( key.map( jQuery.camelCase ) );
        } else {
            //转駝峰
            camel = jQuery.camelCase( key );
            
            //
            if ( key in cache ) {
                name = [ key, camel ];
            } else {
                // If a key with the spaces exists, use it.
                // Otherwise, create an array by matching non-whitespace
                name = camel;
                
                //core_rnotwhite = /\S+/g,
                //name.match( core_rnotwhite ) 是针对这种情况 ' key1 key2 '-->['key1', 'key2']
                name = name in cache ?
                    [ name ] : ( name.match( core_rnotwhite ) || [] );


            }
        }

        i = name.length;
        while ( i-- ) {
            delete cache[ name[ i ] ];
        }
    }
}
```

## $.fn.data  $.fn.removeData

源码：

```javascript
jQuery.fn.extend({
    data: function( key, value ) {
        var attrs, name,
            //如果是获取数据取第一个元素的
            elem = this[ 0 ],
            i = 0,
            data = null;

        //如果不传key，则获取整个data
        if ( key === undefined ) {
            if ( this.length ) {
                data = data_user.get( elem );
                
                //这里是针对dataset的处理
                //jq认为， 我们在dataset设置的值，也可以被取到  <div data-key1="1"></div>
                //data_priv.get( elem, "hasDataAttrs" ) 第一次进来 肯定为空
                //data_priv是内部使用的
                if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
                    attrs = elem.attributes;
                    for ( ; i < attrs.length; i++ ) {
                        //属性名
                        name = attrs[ i ].name;
                        
                        if ( name.indexOf( "data-" ) === 0 ) {
                            //将data-key1 转w为  key1   或则 data-a-key1 --> aKey1
                            name = jQuery.camelCase( name.slice(5) );

                            dataAttr( elem, name, data[ name ] );
                        }
                    }
                    data_priv.set( elem, "hasDataAttrs", true );
                }
            }

            return data;
        }

        // Sets multiple values
        if ( typeof key === "object" ) {
            return this.each(function() {
                data_user.set( this, key );
            });
        }
        

        return jQuery.access( this, function( value ) {
            var data,
                camelKey = jQuery.camelCase( key );

            // The calling jQuery object (element matches) is not empty
            // (and therefore has an element appears at this[ 0 ]) and the
            // `value` parameter was not undefined. An empty jQuery object
            // will result in `undefined` for elem = this[ 0 ] which will
            // throw an exception if an attempt to read a data cache is made.
            if ( elem && value === undefined ) {
                // Attempt to get data from the cache
                // with the key as-is
                data = data_user.get( elem, key );
                if ( data !== undefined ) {
                    return data;
                }

                // Attempt to get data from the cache
                // with the key camelized
                data = data_user.get( elem, camelKey );
                if ( data !== undefined ) {
                    return data;
                }

                // Attempt to "discover" the data in
                // HTML5 custom data-* attrs
                data = dataAttr( elem, camelKey, undefined );
                if ( data !== undefined ) {
                    return data;
                }

                // We tried really hard, but the data doesn't exist.
                return;
            }

            // Set the data...
            this.each(function() {
                // First, attempt to store a copy or reference of any
                // data that might've been store with a camelCased key.
                var data = data_user.get( this, camelKey );

                // For HTML5 data-* attribute interop, we have to
                // store property names with dashes in a camelCase form.
                // This might not apply to all properties...*
                data_user.set( this, camelKey, value );

                // *... In the case of properties that might _actually_
                // have dashes, we need to also store a copy of that
                // unchanged property.
                if ( key.indexOf("-") !== -1 && data !== undefined ) {
                    data_user.set( this, key, value );
                }
            });
        }, null, value, arguments.length > 1, null, true );
    },

    removeData: function( key ) {
        return this.each(function() {
            data_user.remove( this, key );
        });
    }
});
```

```js
function dataAttr( elem, key, data ) {
    var name;

    //如果data有值， 证明缓存中已经有这个属性， 就不再从dataset中获取了
    if ( data === undefined && elem.nodeType === 1 ) {
        //key.replace( rmultiDash, "-$1" )  aKey1 --> a-Key1 然后再通过toLowerCase 转成小写  a-key1 
        //rmultiDash = /([A-Z])/g; 匹配大写字母
        //$1代表第一个子项
        //所以name--> data-a-key1
        name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
        //获取到数据
        data = elem.getAttribute( name );

        //因为从html获取的数据都为字符串，所以需要判断几种情况
        //"true"-->true
        //"false"-->false
        //"null"-->null
        if ( typeof data === "string" ) {
            try {
                data = data === "true" ? true :
                    data === "false" ? false :
                    data === "null" ? null :
                    //+data转化为数字 如果不能转就变成NaN +'111'-->111  +'abc'-->NaN
                    //+data+"" 又转会字符串  +'111'+'' --> '111'   +'abc'+'' --> 'NaN'
                    //所以如果data可以转数字 +data + "" === data  为true
                    +data + "" === data ? +data :
                    //判断是否为josn格式
                    //rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/  {...} [...]  是否由大扩号 或中括号包裹起来 是的话我们就认为是json格式
                    rbrace.test( data ) ? JSON.parse( data ) :
                    data;
            } catch( e ) {}

            // Make sure we set the data so it isn't changed later
            data_user.set( elem, key, data );
        } else {
            data = undefined;
        }
    }
    return data;
}
```










