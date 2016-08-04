/**
 * 监控对象属性：$watch和$digest
 * $watch和$digest是相辅相成的。两者一起，构成了Angular作用域的核心：数据变化的响应。
 * 使用$watch，可以在Scope上添加一个监听器。当Scope上发生变更时，监听器会收到提示。给$watch指定如下两个函数，就可以创建一个监听器：

一个监控函数，用于指定所关注的那部分数据。
一个监听函数，用于在数据变更的时候接受提示。
 */
function Scope(){
    this.$$watchers = [];
}

Scope.prototype.$watch = function(watchFn, listenFn) {
    this.$$watchers.push({
        watch: watchFn,
        listen: listenFn
    });
};

Scope.prototype.$digest = function(){
    _.forEach(this.$$watchers, function(watcher){
        watcher.listen();
    })
}

/******************************************************************/
var scope = new Scope();
scope.$watch(
  function() {console.log('watchFn'); },
  function() {console.log('listener'); }
);

scope.$digest();
scope.$digest();
scope.$digest();