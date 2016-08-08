# input相关指令
- ng-disabled
启用或禁用按钮
    + 服务 $interval
        * 用法与setInterval基本相同,取消定时器使用$interval.cancel(timer);
        * 与setInterval区别, setInterval不会触发视图更新


一个例子: 倒计时激活按钮(5秒之后按钮可点)
```html
<input type="text" value="{{text}}" ng-disabled="isDisabled">
```

```js
app.controller('ctrl', function($scope, $inerval){
    //使用$interval服务
    //setInterval不会触发视图的更新
    $scope.iNow = 5;
    $scope.text = $scope.iNow + '秒';
    $scope.isDisabled = true;
    var timer = $interval(function(){
        $scope.iNow--;
        $scope.text = $scope.iNow + '秒';
        if($scope.iNow==0){
            $scope.isDisabled = false;
            $interval.cancel(timer)
        }
    }, 1000)
})
```


- ng-readonly
- ng-checked
- ng-value
- ng-selected


