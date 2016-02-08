'use strict';

angular.module('clickeatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('locum', {
        url: '/locum',
        templateUrl: 'app/locum/locum.html',
        controller: 'LocumCtrl',
        authenticate: 'locum'
      });
  });
