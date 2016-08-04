# 内置指令

angular中除了几个特别的a, form, input, select, textarea之外,
其他的内置指令都是以'ng'开头的,所以我们在自定义指令的时候不用取名以ng开头

## ng-app
## ng-controller

## ng-repeat
遍历集合
通过in的方式遍历每一项


```js
$scope.datalist = [
    'aaaa',
    'bbbb',
    'cccc'
]
```

```html
<ul>
    <li ng-repeat="item in datalist">
        {{item}}
    </li>
</ul>
```

实例: 成绩单
```js
$scope.datalist = [
    {name: '张三', score: 100},
    {name: '李四', score: 99},
    {name: '王二麻子', score: 98}
]
```

```html
<table>
    <tr>
        <th>姓名</th>
        <th>成绩</th>
    </tr>
    <tr ng-repeat="item in datalist">
        <td>{{item.name}}</td>
        <td>{{item.score}}</td>
    </tr>
</table>
```


增加排序功能:
```html
<th ng-click="sortBy('name')">姓名</th>
<th ng-click="sortBy('score')">成绩</th>
```

```js
$scope.sortBy = function(arg){
    //需要注入$filer服务
    $scope.datalist = $filter('orderBy')($scope.datalist, arg);
}
```


增加切换排序功能:
需要加个开关

```js
$scope.sortBy = function(arg){
    //把开关加在函数对象上,name和score互不影响
    //为了防止跟函数对象上其他的属性冲突,我们加上前缀
    $scope.sortBy['prefix' + arg]  = !$scope.sortBy['prefix' + arg];
    var reverse = $scope.sortBy['prefix' + arg];
    $scope.datalist = $filter('orderBy')($scope.datalist, arg, reverse);
}
```

增加搜索功能

### 一些特殊的属性
- $index：遍历的进度（0...length-1）。
- $first：当元素是遍历的第一个时值为true。
- $middle：当元素处于第一个和最后元素之间时值为true。
- $last：当元素是遍历的最后一个时值为true。
- $even：当$index值是偶数时值为true。
- $odd：当$index值是奇数时值为true。

### 相关的指令
- ng-repeat-start
- ng-repeat-end

ng-repeat 循环的的没有item都有一个根元素

对于没有跟元素的item 我们需要用到ng-repeat-start,ng-repeat-end
比如说下面这种结构的item
```html
<div>{{name}}</div>
<p>{{description}}</p>
<span>{{sex}}</span>
```


```html
<div ng-repeat-start="item in datalist">{{item.name}}</div>
<p>{{item.description}}</p>
<span ng-repeat-end>{{item.sex}}</span>
```







