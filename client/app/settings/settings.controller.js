'use strict';

angular.module('clickeatApp').controller('SettingsController', function($scope, Auth){
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






        var tabs = [
          { title: 'Main', content: "Tabs will become paginated if there isn't enough room for them."},
          { title: 'Location', content: "You can swipe left and right on a mobile device to change tabs."},
          { title: 'Documents', content: "You can bind the selected tab via the selected attribute on the md-tabs element."},
          { title: 'Services', content: "If you set the selected tab binding to -1, it will leave no tab selected."},
          { title: 'Social Accounts', content: "If you remove a tab, it will try to select a new one."},
          { title: 'NHS systems', content: "There's an ink bar that follows the selected tab, you can turn it off if you want."},
          { title: 'Payment', content: "If you set ng-disabled on a tab, it becomes unselectable. If the currently selected tab becomes disabled, it will try to select the next tab."}
        ],
        selected = null,
        previous = null;
    $scope.tabs = tabs;
    $scope.selectedIndex = 0;
    $scope.$watch('selectedIndex', function(current, old){
      previous = selected;
      selected = tabs[current];
    });
    $scope.nextTab = function () {
      if($scope.selectedIndex !== $scope.tabs.length-1){
        $scope.selectedIndex = $scope.selectedIndex + 1;
      } else{
        
      }
    };
    $scope.save = function () {
      
    };
    $scope.user = {};
    $scope.user.main = {};
    $scope.user.main.cateogry = "Student";
});
