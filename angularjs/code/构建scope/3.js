// 脏值检测

// $digest需要记住每个监控函数上次返回的值。
// 既然我们现在已经为每个监听器创建过一个对象，
// 只要把上一次的值存在这上面就行了。
// 下面是检测每个监控函数值变更的$digest新实现：
function Scope(){
    this.$$watchers = [];
}

Scope.prototype.$watch = function(watchFn, listenFn) {
    this.$$watchers.push({
        watch: watchFn,
        listen: listenFn,
        last: null
    });
};

Scope.prototype.$digest = function(){
    var self = this;
    _.forEach(this.$$watchers, function(watcher){
        var newValue = watcher.watch(self);
        var oldValue = watcher.last;
        if(newValue !== oldValue){
            watcher.listen(newValue, oldValue, self);
            watcher.last = newValue;
        }
    })
}



/***********************************************/
var scope = new Scope();
scope.firstName = 'Joe';
scope.counter = 0;

scope.$watch(
  function(scope) {
    return scope.firstName;
  },
  function(newValue, oldValue, scope) {
    scope.counter++;
  }
);

// We haven't run $digest yet so counter should be untouched:
console.log(scope.counter === 0);

// The first digest causes the listener to be run
scope.$digest();
console.log(scope.counter === 1);

// Further digests don't call the listener...
scope.$digest();
scope.$digest();
console.log(scope.counter === 1);

// ... until the value that the watch function is watching changes again
scope.firstName = 'Jane';
scope.$digest();
console.log(scope.counter === 2);