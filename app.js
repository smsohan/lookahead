var lookahead = angular.module('lookahead', ['ngRoute']);


lookahead.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

  $routeProvider
  .when('/calendar', {
    templateUrl: 'calendar.html',
    controller: 'CalendarController'
  })
  .otherwise({
    templateUrl: 'events.html',
    controller: 'EventsController'
  });

  $locationProvider.html5Mode(true);
}]);

lookahead.controller('EventsController', ['$scope', function($scope){
  $scope.events = [];

  $scope.addNewEvent = function(){
    $scope.newEvent = {};
    $scope.events.push($scope.newEvent);
  };

  $scope.addNewEvent();

}]);