'use strict';

angular.module('clickeatApp')
  .controller('LoginController', function($scope, Auth, $state){
    $scope.user = {};
    $scope.errors = {};
    $scope.submitted = false;

    //$scope.Auth = Auth;
    //$scope.$state = $state;

    $scope.login = function(form) {
      $scope.submitted = true;

      if (form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then(function(){
          
          // Logged in, redirect to home---------
          $state.go('admin');
        })['catch'](function(err){
          $scope.errors.other = 'Eighter user name or password invalid';//err.message;
        });
      }
    }
  });
