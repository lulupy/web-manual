# getElementsByClassName

返回一个类似数组的对象，包含了所有指定 class 名称的子元素

## 语法

```js
var elements = document.getElementsByClassName(names); // or:
var elements = rootElement.getElementsByClassName(names);
```
- elements 是查找到的所有元素的集合 HTMLCollection .
- names 是一个字符串，表示用于匹配的 class 名称列表; class 名称通过空格分隔
- getElementsByClassName 可以在任意的元素上调用，不仅仅是 document。 调用这个方法的元素将作为本次查找的根元素.

## 浏览器兼容性


|    Feature    | Chrome | Firefox (Gecko) | Internet Explorer | Opera | Safari |
|---------------|--------|-----------------|-------------------|-------|--------|
| Basic support | (Yes)  |             3.0 |               9.0 | (Yes) | (Yes)  |



## 手写getElementsByClassName

由于此方法的兼容性，我们在ie9以前需要手写这个方法

```js
function getElementsByClassName(name){
    var findArr = [];
    var arr = document.getElementsByTagName('*');
    
    for(var i=0; i<arr.length; i++){
        if(arr[i].className === name){
            findArr.push(arr[i]);
        }
    }

    return findArr;
}
```


上面的方法如果遇到有两个class的时候就会出问题
    比如说`<li class="box box1"></li>`
```js
function getElementsByClassName(name){
    var findArr = [];
    var arr = document.getElementsByTagName('*');
    
    for(var i=0; i<arr.length; i++){
        var classList = arr[i].className.split(' ');
        for(var j=0; j< classList.length; j++){
            if(classList[j] === name){
                findArr.push(arr[i]);
                break;
            }
        }
    }

    return findArr;
}
```


指定查找范围

```js
function getElementsByClassName(rootElement,name){
    var findArr = [];
    var arr = rootElement.getElementsByTagName('*');
    
    for(var i=0; i<arr.length; i++){
        var classList = arr[i].className.split(' ');
        for(var j=0; j< classList.length; j++){
            if(classList[j] === name){
                findArr.push(arr[i]);
                break;
            }
        }
    }

    return findArr;
}
```


指定标签

```js
function getElementsByClassName(rootElement,tagName,name){
    var findArr = [];
    var arr = rootElement.getElementsByTagName(tagName);
    
    for(var i=0; i<arr.length; i++){
        var classList = arr[i].className.split(' ');
        for(var j=0; j< classList.length; j++){
            if(classList[j] === name){
                findArr.push(arr[i]);
                break;
            }
        }
    }

    return findArr;
}
```