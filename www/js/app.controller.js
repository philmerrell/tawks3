/**
 * Created by philmerrell on 5/25/16.
 */
(function() {
  'use strict';

  angular
    .module('tawks')
    .controller('AppController', AppController);

      function AppController ($cordovaInAppBrowser, $rootScope, $state, Services, PushNotificationService) {

      // TODO: listen for in app browser load start event for auth success...
      // TODO: after successful authentication register for push notifications...
      // TODO: when push notification is successfull reload state of app with survey id...

      var app = this;

      app.go = go;
      app.open = open;
      app.toggleList = toggleList;

      activate();

      function activate() {
        Services.getSurvey()
          .then(Services.createSurveyStates)
          .then(Services.startSurvey)
          .catch(function() {
              $state.go('home.welcome');
          });
      }

      function go(state){
        $state.go(state);
      }

      function toggleList() {
        $mdSidenav('left').toggle();
      }

      function open(url) {
        $cordovaInAppBrowser.open(url, '_blank');
      }

      $rootScope.$on('$cordovaInAppBrowser:loadstart', function(e, event){
        if(event.url === 'https://tawks.azurewebsites.net/account/MobileLoginSuccess') {
          $cordovaInAppBrowser.close();
          PushNotificationService.init();

        }

      });
    }
})();