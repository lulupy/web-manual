# 获取params参数

```js
var router = require('koa-router')();

router.get('/:id', function *(next) {
  console.log(this.params);
  console.log(this.request.params);
  this.body = 'this a users response!';
});

module.exports = router;
```

首先肯定一点，this.params是可以取到params的
但是注意的是
```js
this.request.params != this.params
```
这说明params不是request上的方法
