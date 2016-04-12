'use strict';

angular.module('clickeatApp')
  .directive('practicesignup', function () {
    return {
      templateUrl: 'app/practicesignup/signup.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      },
      controller:'PracticeSignupController'
    };
  });
