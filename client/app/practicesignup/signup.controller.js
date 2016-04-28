'use strict';
angular.module('clickeatApp').controller('PracticeSignupController', function($scope, Auth, $state){
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
                    itsystems:[$scope.example1data[0]],
                    package:'basic',
                    country:'UK',
                    ccg:'CCG1',
                    category:'GP Practice'
                  }
    $scope.resetForm = function(){
      $scope.user = {
                    role:'locum',
                    category:[$scope.example1data[0]]
                  }  
      $scope.submitted = false;
    }
    $scope.errors = {};
    $scope.submitted = false;
    $scope.Auth = Auth;
    $scope.$state = $state;
    $scope.register = function(form) {

      $scope.submitted = true;

      if (form.$valid) {
        $scope.Auth.createUser({
          practicecode: $scope.user.pcode,
          currentAddress: {
              houseNumber: $scope.user.hname,
              line1: $scope.user.address1,
              line2: $scope.user.address2,
              line3: $scope.user.address3,
              town: $scope.user.town,
              country: $scope.user.country,
              zipCode: $scope.user.zip,
              county:$scope.user.county
          },
          ccg:$scope.user.ccg,
          itsystems:$scope.user.itsystems,
        /*  category:$scope.user.category,*/
          category: Array.isArray($scope.user.category)?$scope.user.category:[$scope.user.category],
          contactfname: $scope.user.contactfname,
          contactlname: $scope.user.contactlname,
          mobile: $scope.user.mobile,
          email: $scope.user.email,
          password: $scope.user.password,
          package:$scope.user.package,
          role:$scope.user.role,
          tc:$scope.user.tc
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
