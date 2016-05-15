'use strict';

angular.module('clickeatApp').controller('NotificationsController', function($scope, notification,$http,Auth){
  	$scope.Auth = Auth;
	$scope.notification = notification;
	$scope.changeStatus = function($event, status,user_index,doc_index){
		angular.element($event.currentTarget).closest(".panel").css("display","none");
		$scope.notification.notificationsList[doc_index].proposedUsers[user_index].status = status;
			$http.put('/api/vacancys/reqstatus/' + $scope.notification.notificationsList[doc_index]._id, { proposedUsers: $scope.notification.notificationsList[doc_index].proposedUsers })
            .then(function(res) {
               // alert("your request send successfully..");
            }, function(err) {

            });
	};
});
