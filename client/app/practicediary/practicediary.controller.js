'use strict';

angular.module('clickeatApp')
  .controller('PracticediaryCtrl', function ($scope,$http,$compile,uiCalendarConfig,$modal,$state, $stateParams,notification) {
  var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    $scope.changeTo = 'Hungarian';
    /* event source that pulls from google.com */
    $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           
            currentTimezone: 'America/Chicago' 
    };
    $scope.notification = notification;
    $scope.events = $scope.notification.notificationsList;
/*    $scope.events = [
      {
        start: new Date(y, m, 1),
        startTime:new Date(y, m, 1),
        endTime:new Date(y,m,1),
        rate:30,
        locumName:"Locum name",
        pname:"Practice name",title: 'Lunch'
      },
      {pname: 'Long Event',title: 'Lunch',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
      {id: 999,title: 'Lunch',pname: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
      {id: 999,title: 'Lunch',pname: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
      {pname: 'Birthday Party',title: 'Lunch',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
      {pname: 'Click for Google',title: 'Lunch',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
    ];*/
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
          {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
          {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        ]
    };
    /* alert on eventClick */
    $scope.alertOnEventClick = function( eventData, jsEvent, view){
      //  $scope.alertMessage = (date.title + ' was clicked ');
        eventData.type = 'editevent';
        eventData.heading = 'edit vacancy';
        $scope.openModel(eventData);

    };
    $scope.alertMessage = function(data){
      console.log(data);
    }
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
      var eventData = {
        type: 'newevent',
        heading:'Create New Vacancy',
        date:date
      }
      $scope.openModel(eventData);
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
        eventRender: $scope.eventRender,
         dayClick: $scope.dayClick

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
        templateUrl: 'app/practice/practicereq.html',
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
         // updatevacancy.newvacancy.title = "Ganesh";
          $scope.events.push(updatevacancy.newvacancy);
        }else if(updatevacancy.updatevacancy){
          //$scope.vacancyList.filter
        }
       // $scope.selected = selectedItem;
      }, function () {
       // $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.init = function(){
      if(parseInt($stateParams.openpopup)){
        $scope.openModel({type: 'newevent',heading:'Create New Vacancy'}); 
      }
    };
    $scope.init();
  }).controller('ModalInstanceCtrl1', function ($scope, $modalInstance, items, $http, Auth,$state) {
    $scope.diary = items;
    if($scope.diary){
      $scope.updateEnable = true;
    }
    $scope.today = function() {
      $scope.dt = new Date();
      if($scope.diary.date)
        $scope.dt = $scope.diary.date.toDate();
    };
    //$scope.today();
    $scope.popup1 = {
      opened: false
    };
    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };
     $scope.format = 'dd-MMMM-yyyy';
    $scope.init = function(){
    $scope.currentUser = Auth.getCurrentUser();
      $scope.cat = [
         {id: '1', name: 'Doctor',drilldown:['Audiologist','Allergist','Cardiologist','Dermetologist','Gynecologist','Microbiologist']},
         {id: '2', name: 'Dentist',drilldown:['Pediatric Dentist','Endodonist','Orthodontist','Periodontist','Prosthodontist']},
         {id: '3', name: 'Nurse',drilldown:['Cardiac Nursing','Dialysis Nursing','Forensic Nursing','Neonatal Nursing','Legal Nursing']}
       ];
      $scope.req = {
        count: 1,
        category: $scope.cat[0],
        from: new Date(),
        to: new Date()
      };
      $scope.hstep = 1;
      $scope.mstep = 15;

      $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
      };
      $scope.req.skills = $scope.req.category.drilldown[0];
    }
    $scope.init();
  //console.log(items);
    $scope.selected = {
      newvacancy: $scope.newvacancy
    };
    $scope.categoryChange = function(){
      $scope.req.skills = $scope.req.category.drilldown[0];
    }
    $scope.ok = function () {
      $scope.changeStateRoute();
      $modalInstance.close($scope.selected);
    };

    $scope.cancel = function () {
      $scope.changeStateRoute();
      $modalInstance.dismiss('cancel');
    };  
    $scope.changeStateRoute = function(){
      $state.transitionTo('practicediary', {openpopup: 0}, { notify: false });
    }
    $scope.makeRequest = function(form){
      $scope.submitted = true;
      if(form.$valid){
       var vacancyObj = {
        'category': $scope.req.category.name,
        'desc': $scope.req.desc,
        'skill': $scope.req.skill,
        'count': $scope.req.count,
        'rate': $scope.req.rate,
        'from':$scope.req.from,
        'to':$scope.req.to,
        'date': $scope.dt,
        'practiceId': $scope.currentUser._id/*,
        'practiceEmail': $scope.user.email ,
        'practiceFname': $scope.user.fname,
        'practiceLname':  $scope.user.lname,
        'practiceTel':  $scope.user.mobile,
        'practiceAdd':  '$scope.user.address'*/
        };
        if($scope.diary.type == 'editevent'){//update the existing vacancy
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

