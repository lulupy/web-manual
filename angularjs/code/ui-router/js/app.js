(function() {
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
                templateUrl: 'views/people.html',
                controller: function($scope, PeopleService) {
                    PeopleService.getAllPeople().then(function(data) {
                        $scope.people = data;
                    });
                }
            })
            .state({
                name: 'people.person',
                url: '/person/:personId',
                templateUrl: 'views/person.html',
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
})();
