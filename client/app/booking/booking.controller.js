'use strict';

angular.module('clickeatApp').controller('BookingCtrl', function($scope, $http, Auth, notification) {

    $scope.user = Auth.getCurrentUser();
    $scope.notification = notification;
    $scope.init = function() {
        $scope.dt = new Date();
        $scope.popup1 = {
            opened: false
        };
        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };
        $scope.format = 'dd-MMMM-yyyy';
        $scope.displayed = [];
        $scope.notification.getFilteredVacency({date:$scope.dt,skill:$scope.user.category[0],practices:$scope.user.practices});
    };
    $scope.init();
});
