'use strict';

angular.module('clickeatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('practicedairy', {
        url: '/practicedairy',
        templateUrl: 'app/practicedairy/practicedairy.html',
        controller: 'PracticedairyCtrl',
        authenticate: 'practice'
      });
  });
