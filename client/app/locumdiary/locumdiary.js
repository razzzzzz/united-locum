'use strict';

angular.module('clickeatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('locumdiary', {
        url: '/locumdiary',
        templateUrl: 'app/locumdiary/locumdiary.html',
        controller: 'LocumdiaryCtrl',
        authenticate: 'locum'
      });
  });
