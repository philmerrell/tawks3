/**
 * Created by philmerrell on 8/23/16.
 */
(function() {
  'use strict';

  angular
    .module('tawks.profile')
    .controller('SurveyListCtrl', SurveyListCtrl);

  function SurveyListCtrl(Services) {
    var vm = this;

    vm.activeSurveys = [];
    vm.activeSurveysLoaded = false;

    vm.startSurvey = startSurvey;

    activate();


    function activate() {

      Services.getProfile().then(function(result) {
        console.log(result.data);
        vm.activeSurveysLoaded = true;

      });

    }

    function startSurvey() {
      var id = 4262;
      Services.getSurvey(id)
        .then(Services.createSurveyStates)
        .then(Services.startSurvey)
        .catch(function() {
          console.log('catch');

        });
    }
  }

})();
