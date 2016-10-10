/**
 * Created by philmerrell on 5/25/16.
 */

(function() {
  'use strict';

  angular
    .module('tawks.profile', [])
    .config(StartConfig);


  function StartConfig($stateProvider) {
    $stateProvider
      .state('profile', {
        abstract: true,
        url: '/profile',
        views: {
          'main': {
            template: "<ion-nav-view name='profile' role='main'></ion-nav-view>"
          }
        }
      })
      .state('profile.surveyList', {
        url: '/survey-list',
        views: {
          'profile': {
            templateUrl: 'js/profile/survey-list.html',
            controller: 'SurveyListCtrl as vm'
          }
        }
      })
      .state('profile.info', {
        url: '/info',
        views: {
          'profile': {
            templateUrl: 'js/profile/info.html'
          }
        }
      })
    ;
  }

})();
