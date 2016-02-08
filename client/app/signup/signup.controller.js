'use strict';
angular.module('clickeatApp').controller('SignupController', function($scope, Auth, $state){
    $scope.user = {
                    role:'locum',
                    fname:'ganesh',
                    lname:'bonangi',
                    email:'ab.slkd@gma.com',
                    confirmemail:'ab.slkd@gma.com',
                    mobile: 7710085878,
                    password:'abcd',
                    confirmPassword: 'abcd'
                  };
/*
    $scope.user = {
                    role:'locum'
                  }*/
    $scope.errors = {};
    $scope.submitted = false;
    $scope.Auth = Auth;
    $scope.$state = $state;
    $scope.register = function(form) {

      $scope.submitted = true;

      if (form.$valid) {
        $scope.Auth.createUser({
          fname: $scope.user.fname,
          lname: $scope.user.lname,
          email: $scope.user.email,
          password: $scope.user.password,
          category: Array.isArray($scope.user.category)?$scope.user.category:[$scope.user.category],
          mobile: $scope.user.mobile,
          role:$scope.user.role,
          tc:$scope.user.tc,
          certified: $scope.user.certified
        }).then(function () {
          // Account created, redirect to home
          $scope.$state.go('main');
        })['catch'](function (err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function (error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

    $scope.roleChange = function(){
      if($scope.user.role=='locum'){
        $("#category").removeAttr("multiple")
      }else{
        $("#category").attr("multiple",true);      
      }
    }

});

//start-non-standard
//# sourceMappingURL=signup.controller.js.map
