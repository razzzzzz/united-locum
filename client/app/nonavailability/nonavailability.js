'use strict';

angular.module('clickeatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('nonavailability', {
        url: '/nonavailability',
        templateUrl: 'app/nonavailability/nonavailability.html',
        controller: 'NonAvailabilityCtrl',
        authenticate: 'locum'
      });
  });
