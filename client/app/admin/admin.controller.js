'use strict';
/*
(function() {

class AdminController {
  constructor(User) {
    // Use the User $resource to fetch all users
    this.users = User.query();
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
}

angular.module('clickeatApp.admin')
  .controller('AdminController', AdminController);

})();*/

angular.module('clickeatApp.admin')
  .controller('AdminController', function($scope, User){
  	$scope.users = User.query();
  	$scope.delete = function(user) {
	    user.$remove();
	    $scope.users.splice($scope.users.indexOf(user), 1);
	}
  });
