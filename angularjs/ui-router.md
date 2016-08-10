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
```js
$stateProvider
  .state('inbox', {
    url: '/inbox/:inboxId',
    template: '<div><h1>Welcome to your inbox</h1>\
        <a ui-sref="inbox.priority">Show priority</a>\
        <div ui-view></div>\
        </div>'
    controller: function($scope, $stateParams) {
        $scope.inboxId = $stateParams.inboxId;
} })
  .state('inbox.priority', {
      url: '/priority',
      template: '<h2>Your priority inbox</h2>'
});
```
inbox.prority是inbox的子路由

- /inbox/1 匹配第一个状态
- /inbox/1/priority 匹配第二个状态




### 实例

```js
var myApp = angular.module('myApp', ['ui.router']);
myApp.config(function($stateProvider) {
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
        .state({
            name: 'people',
            url: '/people',
            templateUrl: 'people.html',
            controller: function($scope, PeopleService) {
                PeopleService.getAllPeople().then(function(data) {
                    $scope.people = data;
                });
            }
        })
        .state({
            name: 'people.person',
            url: '/person/:personId',
            templateUrl: 'person.html',
            controller: function($scope, PeopleService, $stateParams) {
                var personId = $stateParams.personId;
                PeopleService.getPerson(personId).then(function(data) {
                    $scope.person = data;
                })
            }
        })
});

myApp.factory('PeopleService', function($http) {
    var service = {
        getAllPeople: function() {
            return $http.get('data/people.json', {
                cache: true
            }).then(function(resp) {
                return resp.data;
            });
        },

        getPerson: function(id) {
            function personMatchesParam(person) {
                return person.id === id;
            }

            return service.getAllPeople().then(function(people) {
                var person = people.filter(personMatchesParam);
                return person[0];
            });
        }
    }

    return service;
})
```

index.html
```html
<ul class="nav nav-tabs">
    <li><a ui-sref="hello">Hello</a></li>
    <li><a ui-sref="about">About</a></li>
    <li><a ui-sref="people">People</a></li>
</ul>
<div ui-view></div>
```

people.html
```html
<div class="container">
    <div class="row">
        <div class="col-md-3">
            <ul  class="nav nav-stacked">
                <li ng-repeat="person in people">
                    <a ui-sref="people.person({personId: person.id})">{{person.name}}</a>
                </li>
            </ul>
        </div>
        <div class="col-md-9">
            <ui-view></ui-view>
        </div>
    </div>
</div>
```

person.html
```html
<h3>A person!</h3>
<div>Name: {{person.name}}</div>
<div>Id: {{person.id}}</div>
<div>Company: {{person.company}}</div>
<div>Email: {{person.email}}</div>
<div>Address: {{person.address}}</div>
<button ui-sref="people">Close</button>
```

data/people.json
```json
[
  {
    "id": "293",
    "isActive": false,
    "eyeColor": "brown",
    "name": "Ingrid Townsend",
    "company": "JASPER",
    "email": "ingridtownsend@jasper.com",
    "address": "690 Charles Place, Santel, Northern Mariana Islands, 3791"
  },
  {
    "id": "581",
    "isActive": true,
    "eyeColor": "blue",
    "name": "Estrada Nolan",
    "company": "FIBRODYNE",
    "email": "estradanolan@fibrodyne.com",
    "address": "317 Seeley Street, Cade, Maryland, 3976"
  },
  {
    "id": "29",
    "isActive": true,
    "eyeColor": "brown",
    "name": "Laverne Andrews",
    "company": "INTRAWEAR",
    "email": "laverneandrews@intrawear.com",
    "address": "760 Provost Street, Valle, Alaska, 4628"
  },
  {
    "id": "856",
    "isActive": false,
    "eyeColor": "green",
    "name": "Hull Woodward",
    "company": "SENMAO",
    "email": "hullwoodward@senmao.com",
    "address": "452 Union Avenue, Hachita, Palau, 9166"
  },
  {
    "id": "2321",
    "isActive": false,
    "eyeColor": "green",
    "name": "Maria Stanley",
    "company": "EYERIS",
    "email": "mariastanley@eyeris.com",
    "address": "350 Remsen Avenue, Abrams, Ohio, 6355"
  }
]
```
 





