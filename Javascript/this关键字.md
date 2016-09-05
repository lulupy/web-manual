# this关键字

由于运行期绑定的特性，JavaScript 中的 this 含义非常多，它可以是全局对象、当前对象或者任意对象，这完全取决于函数的调用方式

随着函数使用场合的不同，this的值会发生变化。但是有一个总的原则，那就是this指的是，调用函数的那个对象


## 作为函数调用

在函数被直接调用时this绑定到全局对象。在浏览器中，window 就是该全局对象

```js
console.log(this);

function fn1(){
    console.log(this);
}

fn1();
```


## 作为构造函数调用

## 作为对象方法调用


在 JavaScript 中，函数也是对象，因此函数可以作为一个对象的属性，此时该函数被称为该对象的方法，在使用这种调用方式时，this 被自然绑定到该对象


```js
var obj1 = {
    name: 'Byron',
    fn : function(){
        console.log(this);
    }
};

obj1.fn();
```


## DOM对象绑定事件

在事件处理程序中this代表事件源DOM对象

```html
<input type="text" id="input" value="3">
```


```js
var input = document.getElementById('input');
input.onclick = function (){
    alert(this.value);
}
```
