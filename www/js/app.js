// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('tawks', ['ionic', 'ngCordova', 'tawks.services', 'tawks.home', 'tawks.about', 'tawks.survey'])

.config(function($httpProvider, $stateProvider) {
  $httpProvider.defaults.withCredentials = true;
  $httpProvider.interceptors.push('AuthInterceptor');
  $stateProvider
    .state('survey', {
      url: '/',
      abstract: true,
      templateUrl: 'js/survey/survey.html'
    });
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.provider('runtimeStates', function runtimeStates($stateProvider) {
  // runtime dependencies for the service can be injected here, at the provider.$get() function.
  this.$get = function($q, $timeout, $state) { // for example
    return {
      addState: function(name, state) {
        $stateProvider.state(name, state);
      }
    };
  };
})

.factory('AuthInterceptor', function AuthInterceptor ($q, $window, $location, $rootScope, $cordovaInAppBrowser) {
  return {
    response: function (response) {
      return response;
    },
    responseError: function (response) {

      if (response.status === 401) {
        //TODO: set survey id in service for later use...
        var id = $location.search().id;
        
        if(window.cordova) {
          $cordovaInAppBrowser.open('https://tawks.azurewebsites.net/account/mobilelogin', '_blank');
        } else {
          window.open('https://tawks.azurewebsites.net/account/mobilelogin', '_blank');
        }


      } else {

        $rootScope.$broadcast('response:error', response);
      }

      return $q.reject(response);
    }
  };
});
