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
    $scope.varia = true;
    $scope.tabsLength = 8;
    $scope.user = Auth.getCurrentUser();
    $scope.user.cateogry = "Student";



      var readURL = function(input) {
          if (input.files && input.files[0]) {
              var reader = new FileReader();

              reader.onload = function (e) {
                  $('.profile-pic').attr('src', e.target.result);
              }
      
              reader.readAsDataURL(input.files[0]);
          }
      }
      

      $scope.upload_change = function(){
          readURL(this);
      };
      
   /*   $(".upload-button").on('click', function() {
      });*/
      $scope.uploadClick = function(){
       // angular.element(".file-upload").trigger("change");
      };


});
