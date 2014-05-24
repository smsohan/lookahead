![logo](https://angularjs.org/img/AngularJS-large.png)


Agenda
==

* Introduction
* Model-View-Controller-Route
* Dependency Injection
* Directives
* Filters

Introduction
==

* Enriched HTML
* Less boilerplate


Model-View-Controller-Route
==

_Model_

    var cat = {
      name: 'mai',
      color: 'white'
    }

_View_

    <input type="text" ng-model="user.name"/>
    {{user.name}}


_Controller_

    var myController = function(){

    }


_Route_

    router.when('/some/path/:id', {
      templateUrl: 'template.html',
      controller: 'myController'
    })

Dependency Injection
==

    angular.controller('HomeController', ['$scope', '$location', function(scope, location){

    }])


Directives
==

    <!-- typical js app -->

    <ul class="dropdown">
      <li>Calgary</li>
      <li>Edmonton</li>
    </ul>

    <!-- AngularJS app -->

    <dropdown items="cities">

    </dropdown>


Filters
==

    {{blogPost.body | limitTo:100}}

    {{user in users | filter:Kyle}}

    {{price | currency:'CAD'}}


Today's Scope
==

##[Build this Slide Deck!](https://github.com/smsohan/lookahead)

<https://github.com/smsohan/lookahead>


