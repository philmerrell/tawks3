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
        abstract: true,
        url: '/home',
        views: {
          'main': {
            template: "<ion-nav-view name='home' role='main'></ion-nav-view>"
          }
        }
      })
      .state('home.welcome', {
        url: '/welcome',
        views: {
          'home': {
            templateUrl: 'js/home/home.html',
            controller: 'HomeController as vm'
          }
        }
      })
      .state('home.about', {
        url: '/about',
        views: {
          'home': {
            templateUrl: 'js/about/about.html',
            controller: 'AboutController as vm'
          }
        }
      })
    ;
  }

})();