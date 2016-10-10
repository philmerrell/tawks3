(function() {
  'use strict';

  angular
    .module('tawks.survey')
    .controller('SurveyCtrl', SurveyCtrl)
  ;

  function SurveyCtrl(Services, $stateParams) {
    var vm = this;
    var id = $stateParams.id;

    vm.survey = {};

    activate();

    //////////////////////////

    function activate() {
      getSurvey(id);
    }

    function getSurvey(id) {
      return Services.getSurvey(id).then(function(result) {
        vm.survey = result.data;
        return vm.survey;
      });
    }


  }

})();
