/**
 * Created by philmerrell on 5/25/16.
 */

(function() {
  'use strict';
  
  angular
    .module('tawks.home', [])
    .config(HomeConfig);


  function HomeConfig($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        views: {
          'main': {
            templateUrl: "js/home/home.html",
            controller: "HomeController as vm"
          }
        }
      });
  }

})();