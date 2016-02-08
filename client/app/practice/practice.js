'use strict';

angular.module('clickeatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('practice', {
        url: '/practice',
        templateUrl: 'app/practice/practice.html',
        controller: 'PracticeCtrl'
      });
  });
