'use strict';

angular.module('clickeatApp.auth')
  .factory('notification', function($http,Auth){
    var getNotifications = function(){
     // var notificationList = [];
      notifications.notificationsList.splice(0,notifications.notificationsList.length);//cleaning existing notifications
      $http.get('/api/vacancys').then(function(res){
        if(Auth.isPractice()){
         for (var i = res.data.length - 1; i >= 0; i--) {
            var proposedUsers = res.data[i].proposedUsers;
            if(proposedUsers){
              for(var j=0; j<proposedUsers.length;j++){
                if(!proposedUsers[j].read){
                  notifications.notificationsList.push({vacancy:res.data[i],user:proposedUsers[j]});
                }
              }
            }
         }
        }else{
         var currentUserId = Auth.getCurrentUser()._id;
         for (var i = res.data.length - 1; i >= 0; i--) {
            var proposedUsers = res.data[i].proposedUsers;
            if(proposedUsers){
              for(var j=0; j<proposedUsers.length;j++){

                if(proposedUsers[j].locumId==currentUserId&&proposedUsers[j].status){
                  notifications.notificationsList.push({vacancy:res.data[i],user:proposedUsers[j]});
                }
              }
            }
         }    
        }
     //  notifications.notificationsList.concat(notificationList);
      // return notificationList;
       // $scope.events.push({pname: 'Long Event',title: 'Lunch',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)});
      },
      function(err){

      });
    };
    var notifications = {
      notificationsList:[],
      getNotifications:getNotifications
    }
    return notifications;

  });


