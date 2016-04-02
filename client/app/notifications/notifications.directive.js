'use strict';

angular.module('clickeatApp')
  .directive('notifications', function () {
    return {
      templateUrl: 'app/notifications/notifications.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      },
      controller:'NotificationsController'
    };
  });
