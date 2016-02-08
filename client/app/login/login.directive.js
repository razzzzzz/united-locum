'use strict';

angular.module('clickeatApp')
  .directive('login', function () {
    return {
      templateUrl: 'app/login/login.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      },
      controller:'LoginController'
    };
  });
