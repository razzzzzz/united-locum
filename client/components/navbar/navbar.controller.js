'use strict';

/*class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}*/

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
