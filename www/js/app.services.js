(function() {
  'use strict';

  angular.module('tawks.services', [])
    .factory('Services', Services)
  ;

  function Services($http, $q, $state, runtimeStates, $location) {

    var surveyQuestions, surveyResponses;
    var surveyId;

    var service = {
      createStateObject   : createStateObject,
      getProfile          : getProfile,
      getSurvey           : getSurvey,
      // getSurveyList       : getSurveyList,
      getSurveyLength     : getSurveyLength,
      // getEndOfDay         : getEndOfDay,
      createSurveyStates  : createSurveyStates,
      startSurvey         : startSurvey,
      initSurveyResponse  : initSurveyResponses,
      addSurveyResponse   : addSurveyResponse,
      getSurveyResponses  : getSurveyResponses,
      saveSurvey          : saveSurvey
    };

    return service;


    function createSurveyStates(getSurveyResultObj) {

      var defer = $q.defer();
      surveyId = getSurveyResultObj.data[0].Id;

      console.log('Survey Id: ', surveyId);
      initSurveyResponses(surveyId);
      surveyQuestions = getSurveyResultObj.data[0].Questions;

      // TODO: only create if the state doesn't already exist...

      console.log('State: ', surveyId.toString() + '0');

      if($state.get(surveyId.toString() + '0') === null) {
        angular.forEach(surveyQuestions, function(question, index) {
          var stateObj = service.createStateObject(question, index);
          runtimeStates.addState(surveyId.toString()+index.toString(), stateObj);
        });

      }

      defer.resolve(surveyQuestions);
      return defer.promise;

    }

    function createStateObject(question, index) {

      var stateObject;
      switch(question.QuestionType) {
        case 'Multi-Select':
          stateObject = {
            url: '/'+surveyId.toString()+'/'+index.toString(),
            views: {
              "main": {
                templateUrl: 'js/survey/multi-select.tpl.html',
                controller: 'QuestionCtrl as vm'
              }
            },
            data: {
              question: question
            }
          };
          break;
        case 'Multi-Choice':
          stateObject = {
            url: '/'+surveyId.toString()+'/'+index.toString(),
            views: {
              "main": {
                templateUrl: 'js/survey/multi-choice.tpl.html',
                controller: 'QuestionCtrl as vm'
              }
            },
            data: {
              question: question
            }
          };
          break;
        case 'Staggered Multi-Select':
          stateObject = {
            url: '/'+surveyId.toString()+'/'+index.toString(),
            views: {
              "main": {
                templateUrl: 'js/survey/staggered-multi-select.tpl.html',
                controller: 'QuestionCtrl as vm'
              }
            },
            data: {
              question: question
            }
          };
          break;

      }

      return stateObject;

    }

    /**
     * Get a list of surveys the user is allowed to take.
     */
    function getProfile() {
      return $http.get('https://tawksbsu.tk/api/survey/profile');

    }

    function getSurvey(id) {

      // if(typeof id === 'undefined') {
      //   return $q.reject();
      // } else {
        return $http.get('survey.json');
        // return $http.get('https://tawksbsu.tk/api/survey?id=4262');
      // }
    }

    function getSurveyLength() {
      return surveyQuestions.length;
    }

    function startSurvey() {
      $state.go(surveyId+'0');

    }

    function initSurveyResponses(surveyId) {
      surveyResponses = {
        surveyId: surveyId,
        questions: []
      };
    }

    function addSurveyResponse(response, index) {
      surveyResponses.questions[index] = response;
    }

    function getSurveyResponses() {
      return surveyResponses;
    }

    function saveSurvey(responses) {
      return $http.post('https://tawks.azurewebsites.net/api/survey?pingId='+surveyId, responses);
    }

  }
})();
