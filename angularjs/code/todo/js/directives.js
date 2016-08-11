angular.module('todoApp')
    .directive('todoEscape', function() {
        return {
            link: function(scope, elem, attrs) {
                elem.on('keydown', function(e) {
                    console.log(e.keyCode)
                    if (e.keyCode == 27) {
                        scope.$apply(attrs.todoEscape);
                    }
                })
            }
        }
    })
    .directive('todoFocus', function($timeout) {
        return {
            link: function(scope, elem, attrs) {
                scope.$watch(attrs.todoFocus, function(newVal) {
                    console.log(newVal);
                    if (newVal) {
                        $timeout(function() {
                            elem[0].focus();
                        }, 0, false);
                    }
                })
            }
        }
    })
