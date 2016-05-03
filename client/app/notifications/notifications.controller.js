'use strict';

angular.module('clickeatApp').controller('NotificationsController', function($scope, notification,$http,Auth){
  	$scope.Auth = Auth;
	$scope.notification = notification;
	$scope.changeStatus = function(status,user_index,doc_index){
		$scope.notification.notificationsList[doc_index].vacancy.proposedUsers[user_index].status = status;
			$http.put('/api/vacancys/reqstatus/' + $scope.notification.notificationsList[doc_index].vacancy._id, { proposedUsers: $scope.notification.notificationsList[doc_index].vacancy.proposedUsers })
            .then(function(res) {
                alert("your request send successfully..");
            }, function(err) {

            });
	};
});
