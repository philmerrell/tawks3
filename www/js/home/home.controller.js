/**
 * Created by philmerrell on 5/25/16.
 */
(function() {
  'use strict';

  angular
    .module('tawks.home')
    .controller('HomeController', HomeController);

  function HomeController(PushNotificationService, $http, $state, $ionicHistory) {

    var vm = this;

    vm.signIn = signIn;
    vm.creds = {};
    vm.creds['grant_type'] = 'password';

    function signIn() {
      $http.post('https://tawksbsu.tk/token', 'grant_type=password&username='+vm.creds.username+'&password='+vm.creds.password, { headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then(function(response) {
          localStorage.setItem('token', JSON.stringify(response.data));


          if(window.cordova && window.PushNotification) {
            PushNotificationService.init()
              .then(function(result) {
                $ionicHistory.nextViewOptions({
                  disableBack: true
                });

                $state.go('profile.surveyList');
              });
          } else {
            $state.go('profile.surveyList');
          }


      });

    }



  }
})();
