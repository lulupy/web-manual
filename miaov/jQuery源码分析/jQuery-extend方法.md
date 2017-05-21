# jQuery-extend方法

```js
jQuery.extend = jQuery.fn.extend = function(){};
```

$.extend和$().extend用的是同一个函数

## extend的一些用法

1. 扩展插件,传入一个参数

```js
// 扩展工具方法
$.extend({
    aaa: function(){
        alert(1)
    }
})

$.aaa();

//扩展实例方法
$.fn.extend({
    aaa: function(){
        alert(1);
    }
})

$().aaa();
```

2. 当写多个对象字面量， 后面的对象都扩展在第一个对象上

```js
var a= {};
$.extend(a, {name: 'hello'}, {age: 10});
console.log(a);//{name: 'hello', age: 10}
```

3. 深拷贝

默认的是浅拷贝

```js
var a= {};
var b={
    obj: {
        age: 10
    }
};
$.extend(a, b);
b.obj.age = 15;
console.log(a.obj.age);//15
```

深拷贝需要把第一个参数设置为true

```js
var a= {};
var b={
    obj: {
        age: 10
    }
};
$.extend(true,a, b);
b.obj.age = 15;
console.log(a.obj.age);//10
```

## 代码简化

```js
jQuery.extend = jQuery.fn.extend = function(){
    
    定义一些变量
    
    if(){}   看是不是深拷贝情况
    
    if(){}   看参数正确不
    
    if(){}   看是不是插件情况
    
    for(){   可能有多个对象情况
        
        if(){}  防止循环引用
        
        if(){}   深拷贝
        else if(){}   浅拷贝
        
    }
    
}
```

```js
jQuery.extend = jQuery.fn.extend = function() {
    var options, name, src, copy, copyIsArray, clone,
        //目标对象, 默认是第一个参数， 如果第一个参数为假，则为空对象
        target = arguments[0] || {},
        //等下需要用for循环将多个对象扩展到目标对象, arguments[0]是目标对象， 所以i从1开始
        i = 1,
        length = arguments.length,
        //默认为浅拷贝
        deep = false;

    // 如果第一个参数为boolean值，则判断是否需要深拷贝，并且调整目标对象和for循环开始索引i
    if ( typeof target === "boolean" ) {
        deep = target;
        target = arguments[1] || {};
        // skip the boolean and the target
        i = 2;
    }

    //检查目标是否为对象， 函数也是对象单身需要单独判断
    if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
        target = {};
    }

    //扩展插件的情况$.extend({..}) $.extend(true, {...})
    if ( length === i ) {
        target = this;
        // for循环开始索引i需要减1
        --i;
    }


    //将参数传入的多个对象扩展到目标对象
    for ( ; i < length; i++ ) {
        // Only deal with non-null/undefined values
        if ( (options = arguments[ i ]) != null ) {
            // Extend the base object
            for ( name in options ) {
                src = target[ name ];
                copy = options[ name ];

                
                if ( target === copy ) {
                    continue;
                }

                // 如果是深拷贝，并且copy为对象或者数组
                if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
                    if ( copyIsArray ) {
                        //还原copyIsArray
                        copyIsArray = false;
                        clone = src && jQuery.isArray(src) ? src : [];

                    } else {
                        clone = src && jQuery.isPlainObject(src) ? src : {};
                    }
                    
                    // 递归调用
                    // Never move original objects, clone them
                    target[ name ] = jQuery.extend( deep, clone, copy );

                // Don't bring in undefined values
                } else if ( copy !== undefined ) {
                    target[ name ] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
};
```

```js
if ( target === copy ) {
    continue;
}
```

这里处理是一种特殊情况:



```js
var a={};
var b={
    c: a
}
$.extend(a, b);

```

如果去掉上面这句， a会是一个无限嵌套的对象, 相当于是下面这种结构

```js
var a={
}

a.c = a;

a;
// {
//     c: {
//         c: {
//             c: {
//                 ....
//             }
//         }
//     }
// }
```


```js
clone = src && jQuery.isArray(src) ? src : [];
clone = src && jQuery.isPlainObject(src) ? src : {};
```

如果直接写成:

```js
clone = [];
clone =  {};
```

这句的结果:

```js
var a={
    b: {
        c: 1
    }
}
var b={
    b: {
       b: 2 
    }
}
$.extend(true, a, b);
a;//{ b: {b:2} } 
```
c:1会被覆盖掉， 所以需要先判断一下src是否是对象， 如果是则直接使用src

