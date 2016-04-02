'use strict';

angular.module('clickeatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('notifications', {
        url: '/notifications',
        template: '<notifications></notifications>'
      });
  });
