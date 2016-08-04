// 监听函数自身也修改作用域上的属性。 如果这个发生了， 
// 另外有个监听器在监控被修改的属性， 
// 有可能在同一个digest里面检测不到这个变动：
function Scope() {
    this.$$watchers = [];
}

Scope.prototype.$watch = function(watchFn, listenFn) {
    this.$$watchers.push({
        watch: watchFn,
        listen: listenFn,
        last: null
    });
};

Scope.prototype.$digest = function() {
    var self = this;
    _.forEach(this.$$watchers, function(watcher) {
        var newValue = watcher.watch(self);
        var oldValue = watcher.last;
        if (newValue !== oldValue) {
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
        return scope.counter;
    },
    function(newValue, oldValue, scope) {
        scope.counterIsTwo = (newValue === 2);
    }
);

scope.$watch(
    function(scope) {
        return scope.firstName;
    },
    function(newValue, oldValue, scope) {
        scope.counter++;
    }
);

// After the first digest the counter is 1
scope.$digest();
console.assert(scope.counter === 1);

// On the next change the counter becomes two, but our other watch hasn't noticed this yet
scope.firstName = 'Jane';
scope.$digest();
console.assert(scope.counter === 2);
console.assert(scope.counterIsTwo); // false

// Only sometime in the future, when $digest() is called again, does our other watch get run
scope.$digest();
console.assert(scope.counterIsTwo); // true
