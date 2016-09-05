angular.module('todoApp')
    .controller('todoController', function($scope, $filter){
        var todos = $scope.todos = [];
        $scope.newTodo = '';
        $scope.status = 'all';

        $scope.$watch('todos', function () {
            $scope.remainingCount = $filter('filter')(todos, { completed: false }).length;
            $scope.completedCount = todos.length - $scope.remainingCount;
            $scope.allChecked = !$scope.remainingCount;
        }, true)

        $scope.$watch('status', function (newValue, oldValue) {
            if(newValue=='active'){
                $scope.statusFilter = {completed: false};
            }
            else if(newValue=='completed'){
                $scope.statusFilter = {completed: true};
            }
            else{
                $scope.statusFilter = '';
            }
        })

        $scope.addTodo = function(){
            var newTodo = {
                title: $scope.newTodo.trim(),
                completed: false
            };

            if( !newTodo.title ){
                return;
            }

            todos.push( newTodo );
            $scope.newTodo = '';

        }

        $scope.removeTodo = function(todo){
            var index = todos.indexOf( todo );
            if(index!==-1){
                todos.splice(index, 1);
            }
        }

        $scope.clearCompletedTodos = function(){

            for(var i=0; i< todos.length; i++){
                if(todos[i].completed){
                    todos.splice(i, 1);
                    i--;
                }
            }
        }
        $scope.editTodo = function(todo){
            $scope.editedTodo = todo;
            $scope.originTodo = angular.extend({}, todo);
        }

        $scope.saveEdits = function(){
            $scope.editedTodo = null;
            $scope.originTodo = null;
        }

        $scope.revertEdits = function(todo){
            todo.title = $scope.originTodo.title;
            $scope.editedTodo = null;
            $scope.originTodo = null;

        }
    })