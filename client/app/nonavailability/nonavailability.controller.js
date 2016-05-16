'use strict';

angular.module('clickeatApp')
  .controller('NonAvailabilityCtrl', function ($scope,$http,Auth,notification) {
    $scope.user = Auth.getCurrentUser();
    $scope.notification = notification;
    $scope.init = function(){
      $scope.nonavailabilityreasons = [
        {
          name:'Attending Party',
          id:1
        },
        {
          name:'Personal Problems',
          id:2
        },
        {
          name:'Weekend',
          id:3
        }
      ];
      $scope.start = new Date();
      $scope.popup1 = {
        opened: false
      };
     $scope.format = 'dd-MMMM-yyyy';
      $scope.hstep = 1;
      $scope.mstep = 15;

      $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
      };
    $scope.openStatus = function() {
      $scope.popup1.opened = true;
    };
    };
    $scope.addNonAvailibility = function(){
      var obj = {
        title: 'Non - avialbel ',
        start: $scope.start,
        from: $scope.from,
        to: $scope.to,
        className: ['greybox']
      };
      $scope.updateUserProfileInDB(obj);
    }
    $scope.updateUserProfileInDB = function(obj) {
        var prop = 'nonAvailability';
        $http.post('/api/users/' + $scope.user._id + '/'+prop+'/saltvalue', {
                [prop]: obj })
            .then(function(response) {
                alert("added non-availability");
                $scope.notification.notificationsList.push(obj);
            }, function(err) {

            });
    }
    $scope.init();

  });