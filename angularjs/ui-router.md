# ui-router

AngularUI库提供的最有用的库之一便是ui-router。它是一个路由框架，允许你通过状态机
组织接口，而不是简单的URL路由。

## 安装
要安装ui-router库，你可以下载发布版本④的文件或者使用Bower安装。

```shell
$ bower install angular-ui-router --save
```

在html中导入
```html
<scripttype="text/javascript"
 src="app/bower_components/angular-ui-router/release/angular-ui-router.js"></script>
```

同时还需要将ui.router作为依赖注入到你的应用中：
```js
angular.module('myApp', ['ui.router']); 
```

## 使用
在模块的config函数中,使用$stateProvider.state 来配置状态

```js
var myApp = angular.module('myApp', ['ui.router']);
myApp.config(function($stateProvider){
    $stateProvider
        .state({
            name: 'hello',
            url: '/hello',
            template: '<h3>hello world!</h3>'
        })
        .state({
            name: 'about',
            url: '/about',
            template: '<h3>Its the UI-Router hello world app!</h3>'
        })
});
```

当用户导航到/hello时，应用会转换到inbox状态，然后使用模板内容（`<h3>hello world!</h3>`）填充ui-view指令。

```html
<a ng-href="#/hello">Hello</a>
<a ng-href="#/about">About</a>


<div ui-view></div>
```

也可以是ui-sref 指令实现跳转,ui-sref传入的是状态名
```html
<a ui-sref="hello">Hello</a>
<a ui-sref="about">About</a>
```


在视图上设置模板还可以用`templateUrl`
```js
.state({
    name: 'hello',
    url: '/hello',
    templateUrl: 'views/hello.html'
})
```

还可以为模板加上`controller`
```js
.state({
    name: 'hello',
    url: '/hello',
    templateUrl: 'views/hello.html',
    controller: 'helloCtrl'
})
```

在url中设置基本的参数
```js
$stateProvider
 .state('inbox', {
 url: '/inbox/:inboxId',
 template: '<h1>Welcome to your inbox</h1>',
 controller: function($scope, $stateParams) {
 $scope.inboxId = $stateParams.inboxId;
 }
}); 
```

### 嵌套路由
 





