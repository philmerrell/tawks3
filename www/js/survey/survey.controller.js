(function() {
  'use strict';

  angular
    .module('tawks.survey')
    .controller('SurveyCtrl', SurveyCtrl)
  ;

  function SurveyCtrl(Services) {
    var vm = this;

    vm.survey = {};

    activate();

    //////////////////////////

    function activate() {
      getSurvey();
    }

    function getSurvey() {
      return Services.getSurvey().then(function(result) {
        vm.survey = result.data;
        return vm.survey;
      });
    }


  }

})();