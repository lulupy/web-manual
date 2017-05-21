### JSON

#### JSON.parse

把json格式的字符串转化为js对象

json格式
```js
{
    "key":"value",
    "key2": 1, 
}
```

注意： 键值必须加双引号, 如果值是字符串，也必须加双引号

```js
var str = '{"key": "value"}';
var obj = JSON.parse(str);
```

#### JSON.stringify

把js对象转化为json格式的字符串


#### 使用JSON.parse和JSON.stringify做深拷贝

```js
function deepCopy(obj){
    var str = JSON.stringify(obj);
    return JSON.parse(str);
}

var obj = { a: 1 };

var objClone = deepCopy(obj);

objClone.a = 2;

console.log(obj.a);//1
```