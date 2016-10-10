// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('tawks', ['ionic', 'ngCordova', 'tawks.services', 'tawks.home', 'tawks.about', 'tawks.survey', 'tawks.profile'])

.config(function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');

  document.addEventListener("deviceready", function () {


  }, false);

})

.run(function($ionicPlatform, PushNotificationService, Services, $state) {
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


    // TODO: if user has a token in local storage, then we can init push notificaitons...

    var token = JSON.parse(localStorage.getItem('token'));

    if(token) {
      if(window.cordova && window.PushNotification) {
        PushNotificationService.init()
          .then(function(result) {
            console.log('Run Block: ', result);

          });
      }
      console.log('Got a token');
      $state.go('profile.surveyList');
    } else {
      console.log('No token');
      $state.go('home.welcome');


    }

    // If the user doesn't have a valid token, the auth interceptor will redirect them to the sign in view
    // Services.getProfile().then(function(result) {
    //   if(window.cordova && window.PushNotification) {
    //     PushNotificationService.init()
    //       .then(function(result) {
    //         console.log('Run Block: ', result);
    //
    //       });
    //   }
    //
    //   console.log('Token works');
    // });


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

.factory('AuthInterceptor', function AuthInterceptor ($injector, $q, $window, $location, $rootScope, $cordovaInAppBrowser) {
  return {
    response: function (response) {
      return response;
    },
    responseError: function (response) {

      if (response.status === 401) {

        $injector.get('$state').go('home.welcome');

      } else {

        $rootScope.$broadcast('response:error', response);
      }

      return $q.reject(response);
    },
    request: function(config) {
      config.headers = config.headers || {};

      var token = JSON.parse(localStorage.getItem('token'));

      if(token) {
        config.headers.Authorization = 'Bearer ' + token['access_token'];
      }


      return config;
    }
  };
});
