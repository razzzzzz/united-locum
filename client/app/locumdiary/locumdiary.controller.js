'use strict';

angular.module('clickeatApp')
  .controller('LocumdiaryCtrl', function ($scope,$http,$compile,uiCalendarConfig,$modal,notification) {
   var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    $scope.changeTo = 'Hungarian';
    $scope.notification = notification;
    /* event source that pulls from google.com */
    $scope.events = $scope.notification.notificationsList;
    /* event source that contains custom events on the scope */
    /* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, timezone, callback) {
      var s = new Date(start).getTime() / 1000;
      var e = new Date(end).getTime() / 1000;
      var m = new Date(start).getMonth();
      var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
      callback(events);
    };

    $scope.calEventsExt = {
       color: '#f00',
       textColor: 'yellow',
       events: [ 
          {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
          {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false}
        ]
    };
    /* alert on eventClick */
    $scope.alertOnEventClick = function( date, jsEvent, view){
        $scope.alertMessage = (date.title + ' was clicked ');
        $scope.openModel(date);

    };
    /* alert on Drop */
     $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
       $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key){
        if(sources[key] === source){
          sources.splice(key,1);
          canAdd = 1;
        }
      });
      if(canAdd === 0){
        sources.push(source);
      }
    };
    /* add custom event*/
    $scope.addEvent = function() {
      $scope.events.push({
        title: 'Open Sesame',
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        className: ['openSesame']
      });
    };
    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };
    /* Change View */
    $scope.changeView = function(view,calendar) {
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalender = function(calendar) {
      if(uiCalendarConfig.calendars[calendar]){
        uiCalendarConfig.calendars[calendar].fullCalendar('render');
      }
    };
     /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) { 
        element.attr({'tooltip': event.title,
                     'tooltip-append-to-body': true});
        $compile(element)($scope);
    };
    $scope.dayClick = function(date, jsEvent, view) {
     $scope.openModel();
    }
    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'today prev,next',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender/*,
         dayClick: $scope.dayClick*/

      }
    };


    $scope.changeLang = function() {
      if($scope.changeTo === 'Hungarian'){
        $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
        $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
        $scope.changeTo= 'English';
      } else {
        $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        $scope.changeTo = 'Hungarian';
      }
    };
    /* event sources array*/
    $scope.eventSources = [];
    $scope.eventSources2 = [];
    var events = [$scope.events, $scope.eventsF];
    for(var i=0;i<events.length;i++){
      $scope.eventSources.push(events[i])  
    }
    var events2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
    for(var i=0;i<events2.length;i++){
      $scope.eventSources2.push(events2[i])  
    }




    $scope.openModel = function(data){
      $scope.items = data;
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'app/locum/locumtask.html',
        controller: 'ModalInstanceCtrl1',
        size: 'lg',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (updatevacancy) {
        if(updatevacancy.newvacancy){
      $scope.vacancyList.push(updatevacancy.newvacancy);
        }else if(updatevacancy.updatevacancy){
          //$scope.vacancyList.filter
        }
       // $scope.selected = selectedItem;
      }, function () {
       // $log.info('Modal dismissed at: ' + new Date());
      });
    }
  }).controller('ModalInstanceCtrl1', function ($scope, $modalInstance, items) {

    $scope.diary = items;
    if($scope.diary){
      $scope.updateEnable = true;
    }
  //console.log(items);
    $scope.selected = {
      newvacancy: $scope.newvacancy
    };

    $scope.ok = function () {
      $modalInstance.close($scope.selected);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };  
   
    $scope.cancleAppointment = function(){
      alert("have to cancle request");
    }
    $scope.makeRequest = function(form){
      $scope.submitted = true;
      if(form.$valid){
       var vacancyObj = {
          'category': $scope.req.category,
        'desc': $scope.req.desc,
        'skill': $scope.req.skill,
        'count': $scope.req.count,
        'rate': $scope.req.rate,
        'date': $scope.req.date,
        'time': $scope.req.mytime,
        'practiceId': $scope.user._id,
        'practiceEmail': $scope.user.email ,
        'practiceFname': $scope.user.fname,
        'practiceLname':  $scope.user.lname,
        'practiceTel':  $scope.user.mobile,
        'practiceAdd':  '$scope.user.address'
        };
        if($scope.updateEnable){//update the existing vacancy
          $http.patch('/api/vacancys/'+$scope.req._id,vacancyObj).then(
            function(res){
              $scope.updatevacancy = res.data;
              $scope.ok();
            },
            function(err){
              alert('error in /api/vacancys patch ');
            }
          );
        }else{//creating new vacancy
          $http.post('/api/vacancys',vacancyObj).then(
            function(res){
              $scope.selected.newvacancy = res.data;
              $scope.ok();
            },
            function(err){
              alert('error in /api/vacancys post ');
            }
          );
        }
        
      }
    }
});

