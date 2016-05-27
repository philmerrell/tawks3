/**
 * Created by philmerrell on 5/25/16.
 */

(function() {
  'use strict';
  
  angular
    .module('tawks.about', [])
    .config(AboutConfig);


  function AboutConfig($stateProvider) {
    $stateProvider
      .state('about', {
        url: '/about',
        views: {
          'main': {
            templateUrl: "js/about/about.html",
            controller: "AboutController as vm"
          }
        }
      });
  }

})();