'use strict';

angular.module('clickeatApp').controller('SettingsController', function($scope, Auth,$http){
    $scope.errors = {};
    $scope.submitted = false;

    $scope.Auth = Auth;
    $scope.changePassword = function(form) {

      $scope.submitted = true;

      if (form.$valid) {
        $scope.Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword).then(function () {
          $scope.message = 'Password successfully changed.';
        })['catch'](function () {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
    }

    var currentUser = Auth.getCurrentUser();
    $http.get('/api/profiles/'+currentUser._id).then(function(res){
      //debugger;
    },function(err){

    });



 var selected = null,
        previous = null;
    $scope.selectedIndex = 0;
    $scope.$watch('selectedIndex', function(current, old){
      previous = selected;
    });
    $scope.nextTab = function () {
      if($scope.selectedIndex !== $scope.tabsLength){
        $scope.selectedIndex = $scope.selectedIndex + 1;
      } else{
        
      }
    };
    $scope.save = function () {
      
    };
    $scope.user = {
      "main":{
        
      }
    };
    $scope.user.main = {};
    $scope.user.main.cateogry = "Student";
    $scope.varia = true;
    $scope.tabsLength = 8;
});
