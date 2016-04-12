'use strict';
angular.module('clickeatApp').controller('SignupController', function($scope, Auth, $state){
/*    $scope.user = {
                    role:'locum',
                    fname:'ganesh',
                    lname:'bonangi',
                    email:'ab.slkd@gma.com',
                    confirmemail:'ab.slkd@gma.com',
                    mobile: 7710085878,
                    password:'abcd',
                    confirmPassword: 'abcd',
                    category:'GP'
                  };
*/
$scope.example1data = [ {id: 1, label: "GP"}, {id: 2, label: "Dentist"}, {id: 3, label: "Nurse(Dental)"},{id:4,label:"Nurse(Non-Dental)"}];
$scope.howdouknow = [ {id: 1, label: "FaceBook"}, {id: 2, label: "Google+"}, {id: 3, label: "Twitter"},{id:4,label:"LinkedIn"},{id:5,label:"Other"}];
    $scope.user = {
                    role:'locum',
                    category:$scope.example1data[0]
                  }
    $scope.resetForm = function(){
      $scope.user = {
                    role:'locum',
                    category:$scope.example1data[0]
                  }  
      $scope.submitted = false;
    }
    $scope.errors = {};
    $scope.submitted = false;
    $scope.Auth = Auth;
    $scope.$state = $state;
    $scope.register = function(form) {
console.log({
          fname: $scope.user.fname,
          gender: $scope.user.gender,
          lname: $scope.user.lname,
          email: $scope.user.email,
          password: $scope.user.password,
          category: Array.isArray($scope.user.category)?$scope.user.category:[$scope.user.category],
          idnumber: $scope.user.idNumber,
          performarnumber: $scope.user.performarNumber,
          package: $scope.user.package,          
          mobile: $scope.user.mobile,
          role:$scope.user.role,
          tc:$scope.user.tc,
          addagency: $scope.user.addagency
        });
      $scope.submitted = true;

      if (form.$valid) {
        $scope.Auth.createUser({
          fname: $scope.user.fname,
          gender: $scope.user.gender,
          lname: $scope.user.lname,
          email: $scope.user.email,
          password: $scope.user.password,
          category: Array.isArray($scope.user.category)?$scope.user.category:[$scope.user.category],
          idnumber: $scope.user.idNumber,
          performarnumber: $scope.user.performarNumber,
          package: $scope.user.package,          
          mobile: $scope.user.mobile,
          role:$scope.user.role,
          tc:$scope.user.tc,
          addagency: $scope.user.addagency
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
       // $("#category").removeAttr("multiple")
        $scope.user.category = $scope.example1data[0];
      }else{
        $scope.user.category = [];
       // $("#category").attr("multiple",true);      
      }
    }





});

//start-non-standard
//# sourceMappingURL=signup.controller.js.map
