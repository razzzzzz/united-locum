'use strict';

angular.module('clickeatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('locumdairy', {
        url: '/locumdairy',
        templateUrl: 'app/locumdairy/locumdairy.html',
        controller: 'LocumdairyCtrl',
        authenticate: 'locum'
      });
  });
