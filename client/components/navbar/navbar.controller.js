'use strict';


angular.module('clickeatApp')
  .controller('NavbarController', function($scope,Auth,$window){
    $scope.Auth = Auth;
    $scope.isCollapsed = true;
    $scope.menu = [{
    'title': 'Home',
    'state': 'main'
  }];
  $scope.openMenu = function($event){
    $event.stopPropagation();
    $scope.isMenu = true;
    angular.element($window).on('click', function(){
      $scope.isMenu = false;
       $scope.$apply();
      angular.element($window).off('click');
    });
  }
  
  });
