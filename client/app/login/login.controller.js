'use strict';

angular.module('clickeatApp')
  .controller('LoginController', function($scope, Auth, $state){
    $scope.user = {};
    $scope.errors = {};
    $scope.submitted = false;

    //$scope.Auth = Auth;
    //$scope.$state = $state;
    $scope.dummyUsers = [
            {
              email:'locum@example.com',
              password:'locum'
            },
               {
              email:'practice@example.com',
              password:'practice'
            },
               {
              email:'admin@example.com',
              password:'admin'
            },
    ]

    $scope.login = function(form) {
      $scope.submitted = true;

      if (form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then(function(){
          if(Auth.isPractice()){
            $state.go('practicediary');
          }else if(Auth.isLocum()){
            $state.go('locumdiary');
          }else if(Auth.isAdmin()){
            $state.go('admin');
          }
          // Logged in, redirect to home---------
        })['catch'](function(err){
          $scope.errors.other = 'Eighter user name or password invalid';//err.message;
        });
      }
    }

    $scope.forgetPassword = function(){
      if(!$scope.user.email){
        alert("Enter User id");
      }
    }
  });
