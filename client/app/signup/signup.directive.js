'use strict';

angular.module('clickeatApp')
  .directive('signup', function () {
    return {
      templateUrl: 'app/signup/signup.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      },
      controller:'SignupController'
    };
  });
