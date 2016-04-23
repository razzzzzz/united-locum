'use strict';

angular.module('clickeatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('practicedairy', {
        url: '/practicedairy?openpopup',
        templateUrl: 'app/practicedairy/practicedairy.html',
        controller: 'PracticedairyCtrl',
        authenticate: 'practice'
      });
  });
