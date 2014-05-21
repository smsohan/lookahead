var lookahead = angular.module('lookahead', ['ngRoute']);


lookahead.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

  $routeProvider.otherwise({
    templateUrl: 'new.html',
    controller: 'NewPostController'
  });

  $routeProvider.when('/details/:id', {
    templateUrl: 'details.html',
    controller: 'PostDetailsController'
  });

}]);

lookahead.factory("postsFactory", function(){
  return {
    posts: []
  };
});

lookahead.controller('NewPostController', ['$scope', 'postsFactory', function($scope, postsFactory){
  $scope.posts = postsFactory.posts;;

  $scope.addNewPost = function(){
    $scope.newPost = {};
    $scope.posts.push($scope.newPost);
  };

  $scope.addNewPost();

  $scope.isBig = function(body){
    return body && body.length > 30;
  };

}]);

lookahead.controller('PostDetailsController', ['$scope', '$routeParams', 'postsFactory', function($scope, $routeParams, postsFactory){
  $scope.post = postsFactory.posts[$routeParams.id];
}]);

lookahead.directive('markdown', ['$compile', function($compile){
  return{
    restrict: 'E',
    transclude: true,
    templateUrl: 'markdown.html',

    link: function(scope, element, attrs){
      element.html(new Showdown.converter().makeHtml(scope.post.body));
    }
  }
}]);