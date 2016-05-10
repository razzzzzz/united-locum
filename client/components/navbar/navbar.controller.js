'use strict';


angular.module('clickeatApp')
  .controller('NavbarController', function($scope,Auth,$window,$http,notification){
    $scope.Auth = Auth;
    $scope.notification = notification;
    $scope.isCollapsed = true;
    $scope.hideBadge = true;
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
  };
  
  });
