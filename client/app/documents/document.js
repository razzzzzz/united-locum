'use strict';

angular.module('clickeatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('documents', {
        url: '/documents',
        templateUrl: 'app/documents/document.html',
        controller: 'DocumentCtrl',
        authenticate: 'admin'
      });
  });
