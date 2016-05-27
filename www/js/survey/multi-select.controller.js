// (function() {
//   'use strict';
//
//   angular
//     .module('tawks.survey')
//     .controller('MultiSelectCtrl', MultiSelectCtrl)
//   ;
//
//   function MultiSelectCtrl($state, Services) {
//     var vm = this;
//
//     var questionObj = $state.current.data.question;
//
//     vm.userResponse = {
//       questionId: questionObj.Id,
//       answer: []
//     };
//
//     vm.questionId = questionObj.Id;
//     vm.currentState = parseInt($state.current.name, 10);
//     vm.surveyLength = Services.getSurveyLength();
//     vm.questionText = questionObj.Content;
//     vm.responses = questionObj.Responses;
//   }
// })();