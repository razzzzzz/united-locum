'use strict';

angular.module('clickeatApp')
  .directive('practicesettings', function () {
    return {
      templateUrl: 'app/practicesettings/settings.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      },
      controller:'PracticesSettingsController'
    };
  });
