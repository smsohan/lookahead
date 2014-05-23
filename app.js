var lookahead = angular.module('lookahead', ['ngRoute']);

lookahead.config(['$routeProvider', '$sceProvider', function(router, sce){

  router.when('/', {
    templateUrl: 'home.html',
    controller: 'HomeController'
  });

  router.when('/new-slide', {
    templateUrl: 'new-slide.html',
    controller: 'NewSlideController'
  });

  router.when('/show-slide/:slide', {
    templateUrl: 'show-slide.html',
    controller: 'ShowSlideController'
  });

  sce.enabled(false);
}]);

lookahead.factory('deck', function(){
  return {
    slides: []
  };
});

var Slide = (function(){

  var Slide = function(markdownContent){
    this.markdownContent = markdownContent || '';
  };

  var markdownConverter = new Showdown.converter();
  Slide.prototype.htmlContent = function() {
    return markdownConverter.makeHtml(this.markdownContent);
  };

  return Slide;
})();

lookahead.controller('HomeController', ['$scope', 'deck', function(controllerScope, deck){
  controllerScope.deck = deck;
}]);

lookahead.controller('NewSlideController', ['$scope', '$sce', '$location', 'deck', function(controllerScope, htmlSafe, location, deck){

  controllerScope.slide = new Slide();

  controllerScope.save = function(){
    deck.slides.push(controllerScope.slide);
    location.path('/');
  }
}]);

lookahead.controller('ShowSlideController', ['$scope', '$routeParams', '$location', 'deck', function(controllerScope, params, location, deck){
  controllerScope.currentSlideNumber = parseInt(params.slide, 10);
  controllerScope.deck = deck;
  controllerScope.slide = deck.slides[controllerScope.currentSlideNumber - 1];

  controllerScope.showNext = function(){
    if(controllerScope.currentSlideNumber == deck.slides.length){
      return;
    }

    controllerScope.$apply(function(){
      location.path('/show-slide/' + (controllerScope.currentSlideNumber + 1));
    })
  }
  controllerScope.showPrevious = function(){
    if(controllerScope.currentSlideNumber == 1){
      return;
    }

    controllerScope.$apply(function(){
      location.path('/show-slide/' + (controllerScope.currentSlideNumber - 1));
    })
  }

}]);

lookahead.directive('slide', function(){

  return{
    restrict: 'E',
    transclude: true,
    templateUrl: 'slide.html',

    link: function(scope, element, attrs){

      element.bind('keydown keypress', function(event){
        if(event.keyCode == 38 || event.keyCode == 39){
          scope.showNext();
        }

        if(event.keyCode == 37 || event.keyCode == 40){
          scope.showPrevious();
        }
      });

    }


  }

});


