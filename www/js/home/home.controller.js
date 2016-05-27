/**
 * Created by philmerrell on 5/25/16.
 */
(function() {
  'use strict';
  
  angular
    .module('tawks.home')
    .controller('HomeController', HomeController);
  
  function HomeController($cordovaInAppBrowser) {

    var vm = this;

    vm.signIn = signIn;

    function signIn() {
      if(window.cordova) {
        $cordovaInAppBrowser.open('https://tawks.azurewebsites.net/account/mobilelogin', '_blank');
      } else {
        window.open('https://tawks.azurewebsites.net/account/mobilelogin', '_blank');
      }
    }
    
  }
})();