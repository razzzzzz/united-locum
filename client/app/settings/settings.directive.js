'use strict';

angular.module('clickeatApp')
  .directive('settings', function () {
    return {
      templateUrl: 'app/settings/settings.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      },
      controller:'SettingsController'
    };
  });
