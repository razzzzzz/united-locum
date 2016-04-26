'use strict';

angular.module('clickeatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('practicediary', {
        url: '/practicediary?openpopup',
        templateUrl: 'app/practicediary/practicediary.html',
        controller: 'PracticediaryCtrl',
        authenticate: 'practice'
      });
  });
