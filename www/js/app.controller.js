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
      // TODO: when push notification is successful reload state of app with survey id...

      var app = this;

      app.go = go;
      app.open = open;

      activate();

      function activate() {

        // Todo... set up work flow to direct to active survey list...

        // Services.getSurvey()
        //   .then(Services.createSurveyStates)
        //   .then(Services.startSurvey)
        //   .catch(function() {
        //     console.log('catch');
        //       $state.go('home.welcome');
        //   });

      }

      function go(state){
        $state.go(state);
      }

      function open(url) {
      }


    }
})();
