// 在Digest的时候获得提示
// 即使没有listenerFn，Angular也会寻找watchFn的返回值。如果返回了一个值，这个值会提交给脏检查。想要采用这个用法又想避免多余的事情，只要监控函数不返回任何值就行了。
function Scope(){
    this.$$watchers = [];
}

Scope.prototype.$watch = function(watchFn, listenFn) {
    this.$$watchers.push({
        watch: watchFn,
        listen: listenFn || function() { },
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

/***************************/
var scope = new Scope();

scope.$watch(function(scope){
     console.log('digest listener fired');
})

scope.$digest();
scope.$digest();
scope.$digest();
