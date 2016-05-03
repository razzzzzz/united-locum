'use strict';

angular.module('clickeatApp').controller('BookingCtrl', function($scope, $http, Auth) {
    $scope.vacancys = [{
        category: 'doctor',
        desc: "desc",
        skill: "mbbs",
        count: 10,
        rate: 2,
        date: "14-4-1990",
        from: "14-02-2016",
        to: "14-03-2016",
        practiceId: "id123455"
    }, {
        category: 'nurse',
        desc: "desc",
        skill: "mbbs2",
        count: 11,
        rate: 1,
        date: "14-4-1990",
        from: "14-02-2016",
        to: "14-03-2016",
        practiceId: "id123455"
    }, {
        category: 'doctor',
        desc: "desc",
        skill: "mbbs",
        count: 21,
        rate: 3,
        date: "14-4-1990",
        from: "14-02-2016",
        to: "14-03-2016",
        practiceId: "id123455"
    }, ];
    $scope.user = Auth.getCurrentUser();
    $scope.sendRequest = function(id) {
        $http.put('/api/vacancys/' + id, { proposedUsers: { locumId: $scope.user._id, locumName: $scope.user.fname,read:false } })
            .then(function(res) {
//                alert("your request send successfully..");
            }, function(err) {

            });
    };
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
        $scope.collection = [];
        $http.get('/api/vacancys').then(function(res) {
            $scope.collection = res.data;
        }, function(err) {

        });
    };
    $scope.init();
});
