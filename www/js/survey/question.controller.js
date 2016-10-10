(function() {
  'use strict';

  angular
    .module('tawks.survey')
    .controller('QuestionCtrl', QuestionCtrl)
  ;

  function QuestionCtrl($ionicPopup, $scope, $state, Services) {
    var vm = this;
    var questionObj = $state.current.data.question;

    vm.userResponse = {
      questionId: questionObj.Id,
      answer: []
    };

    vm.answerIsSelected = answerIsSelected;
    vm.questionId = questionObj.Id;
    vm.currentQuestionNumber = parseInt($state.current.name[1], 10) + 1;
    vm.currentState = parseInt($state.current.name, 10);
    vm.defineAnswer = defineAnswer;
    vm.surveyLength = Services.getSurveyLength();
    vm.questionText = questionObj.Content;
    vm.responses = questionObj.Responses;
    vm.goToNextQuestion = goToNextQuestion;
    vm.answer = {};
    vm.selectCheckBox = selectCheckbox;
    vm.selectRadio = selectRadio;
    vm.lastQuestion = lastQuestion;
    vm.saveSurvey = saveSurvey;
    vm.staggered = staggered;
    vm.stopper = false;


    activate();

    function activate() {

    }

    function selectCheckbox(id, value) {
      var response = {
        answerId: id
      };

      if(value) {
        vm.userResponse.answer.push(response);
      } else {
        var index = vm.userResponse.answer.indexOf(response);
        vm.userResponse.answer.splice(index, 1);
      }
    }

    function selectRadio(id, doSaveSurvey, ev) {
      var response = {
        answerId: id
      };

      vm.userResponse.answer.push(response);

      if(doSaveSurvey) {
        saveSurvey(ev);
      } else {
        goToNextQuestion();
      }
    }

    function lastQuestion() {
      if(vm.currentQuestionNumber === vm.surveyLength || vm.stopper) {
        return true;
      } else {
        return false;
      }

    }

    function answerIsSelected() {
      return (_.keys(vm.answer).length) ? true : false;
    }

    function goToNextQuestion() {
      Services.addSurveyResponse(vm.userResponse, vm.currentState);
      var state = vm.currentState + 1;
      $state.go(state.toString());
    }

    function defineAnswer(definition) {
      $ionicPopup.alert({
        title: 'Definition',
        buttons: [
          { // Array[Object] (optional). Buttons to place in the popup footer.
            text: 'OK',
            type: 'button-balanced'
          }
        ],
        template: definition || 'no definition available'
      });

    }

    function saveSurvey(ev) {

      Services.addSurveyResponse(vm.userResponse, vm.currentState);

      var surveyResults = Services.getSurveyResponses();

      Services.saveSurvey(surveyResults).then(function(result) {

        $ionicPopup.alert(
          {
            title: 'Thank You',
            buttons: [
              { // Array[Object] (optional). Buttons to place in the popup footer.
                text: 'OK',
                type: 'button-balanced'
              }
            ],
            template: 'Your answers have been submitted.'
          }
        ).then(function() {
          $state.go('home');
        });

        // TODO: show dialog that answers have been submitted.

      }).catch(function(error) {
        $ionicPopup.alert({
          title: error.statusText,
          template: error.data.Message,
          buttons: [
            { // Array[Object] (optional). Buttons to place in the popup footer.
              text: 'OK',
              type: 'button-balanced'
            }
          ],
        }).then(function() {

        });
      });

    }

    function staggered(id) {

      var response = {
        answerId: id
      };

      vm.userResponse.answer.push(response);
      // reset form

      vm.questionText = 'Add another function';
      console.log(vm.responses);
      var previousAnswer = _.find(vm.responses, {'Id': parseInt(id, 10)});
      _.pull(vm.responses, previousAnswer);

      vm.hideStaggeredButton = true;
      vm.answer = {};
      $scope.multiChoice.$setPristine();


    }

    $scope.$watch(
      function() { return vm.answer; },
      function(newValue) {
        if(newValue) {
          var answer = _.find(vm.responses, {"Id" : parseInt(newValue, 10)});

          if(typeof answer !== 'undefined') {
            if(answer.Stopper) {
              vm.stopper = true;
            }
            if(!answer.Stopper) {
              vm.stopper = false;
            }
          }
        }
      }
    );
  }

})();
