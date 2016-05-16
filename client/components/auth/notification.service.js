'use strict';

angular.module('clickeatApp.auth')
  .factory('notification', function($http,Auth){
    var getNotifications = function(){
     // var notificationList = [];
      notifications.notificationsList.splice(0,notifications.notificationsList.length);//cleaning existing notifications
      $http.get('/api/vacancys').then(function(res){
        if(Auth.isPractice()){
         for (var i = res.data.length - 1; i >= 0; i--) {
            res.data[i].title = getTitle(res.data[i].from,res.data[i].to);
            if(res.data[i].proposedUsers.length){
              for(var j=0; j<res.data[i].proposedUsers.length;j++){

                  if(res.data[i].proposedUsers[j].status=='Accept'){
                    res.data[i].className = 'greenbox';
                  }else{
                    res.data[i].className = 'amberbox';
                  }
                if(!res.data[i].proposedUsers[j].read){
                  notifications.notificationsList.push(res.data[i]);
                }
              }
            }else{
              res.data[i].className = 'redbox';
              notifications.notificationsList.push(res.data[i]);            
            }
         }
        }else{
         var currentUser = Auth.getCurrentUser();
         var currentUserId = currentUser._id;
         for (var i = res.data.length - 1; i >= 0; i--) {
            if(res.data[i].proposedUsers.length){
              var flag =true;
              for(var j=0; j<res.data[i].proposedUsers.length;j++){
                if(res.data[i].proposedUsers[j].locumId==currentUserId&&res.data[i].proposedUsers[j].status){
                  if(res.data[i].proposedUsers[j].status=='Accept'){
                    res.data[i].className = 'greenbox';
                  }else{
                    res.data[i].className = 'redbox';
                  }
                  res.data[i].title = getTitle(res.data[i].from,res.data[i].to);
                  notifications.notificationsList.push(res.data[i]);
                  flag = false;
                }
              }
              if(flag){
                res.data[i].className = 'amberbox';
                res.data[i].title = getTitle(res.data[i].from,res.data[i].to);
                notifications.notificationsList.push(res.data[i]);
              }
            }
         }  
         for(var j=0;j<currentUser.nonAvailability.length;j++){
          notifications.notificationsList.push(currentUser.nonAvailability[j]);
         }
        }
     //  notifications.notificationsList.concat(notificationList);
      // return notificationList;
       // $scope.events.push({pname: 'Long Event',title: 'Lunch',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)});
      },
      function(err){

      });
    };
    function getTitle(from,to){
      var str = '';
      str+=formatDate(from);
      str+="-";
      str+=formatDate(to);
      return str;
    }
    function formatDate(date) {
      date = new Date(date);
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }
    var getFilteredVacency = function(obj){
        $http.post('/api/vacancys/getfiltered',obj)
        .then(function(res) {
            notifications.getFilteredVacencyList = res.data;
        }, function(err) {

        });
    };
    var sendRequestForVacancy = function(id, obj){
        $http.put('/api/vacancys/' + id, obj)
            .then(function(res) {
              alert("Request Sent Successfully");
                for(var i=0;i<notifications.notificationsList.length;i++){
                  if(notifications.notificationsList[i]._id==res.data._id){
                    res.data.title = getTitle(res.data.from,res.data.to);
                    res.data.className = 'amberbox';
                    notifications.notificationsList[i] = res.data;
                    break;
                  }
                }
            }, function(err) {

        });
    }
    var notifications = {
      notificationsList:[],
      getNotifications:getNotifications,
      getFilteredVacency:getFilteredVacency,
      getFilteredVacencyList:[],
      sendRequestForVacancy:sendRequestForVacancy,
      getTitle:getTitle
    };
    return notifications;

  });


