'use strict';

angular.module('clickeatApp')
  .controller('PracticeCtrl', function ($scope, $modal, $http, Auth, $compile,uiCalendarConfig) {
 /*   $scope.vacancyList = [
    						{
    							category:'cat',
    							desc:'bal',
    							count:9,
    							skill:'html',
    							date:new Date(),
    							mytime: new Date(),
    							rate:2,

    						},
    						{
    							category:'cat',
    							desc:'bal',
    							count:9,
    							skill:'html',
    							date:new Date(),
    							mytime: new Date(),
    							rate:2
    						}
    ];*/

 var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    
    $scope.changeTo = 'Hungarian';
    /* event source that pulls from google.com */
    $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
    };
    /* event source that contains custom events on the scope */
    $scope.events = [
      {title: 'All Day Event',start: new Date(y, m, 1)},
      {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
      {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
      {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
    ];
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
    $scope.alertOnEventClick = function( date, jsEvent, view){
        $scope.alertMessage = (date.title + ' was clicked ');
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
    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
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
    $scope.eventSources = $scope.eventSources.push.apply($scope.eventSources, [$scope.events, $scope.eventSource, $scope.eventsF]);
    $scope.eventSources2 = $scope.eventSources2.push.apply($scope.eventSources2,[$scope.calEventsExt, $scope.eventsF, $scope.events]);













    
    $scope.formateDate = function(str){
    	var dateObj = new Date(str);
		var month = dateObj.getUTCMonth() + 1; //months from 1-12
		var day = dateObj.getUTCDate();
		var year = dateObj.getUTCFullYear();

		return day + "-" + month + "-" + year;
    }
    $http.get('/api/vacancys').then(function(res){
    	$scope.vacancyList = res.data;
    },function(res){
    	alert("erro in  api/vacancys get api"+res);
    });
    $scope.createVacancy = function(){
    	openModal();
    }
    $scope.editVacancy = function(vacancy){
    	openModal(vacancy);
    }
    $scope.trash = function(vacancy){
    	//trash vacancy here..
    	var id = vacancy._id;
    	$http.delete('/api/vacancys/'+vacancy._id).then(function(res){
    		$scope.vacancyList = $scope.vacancyList.filter(function(obj){
    			return obj._id != id;
    		});//splice()
    		console.log(res.data);
    	},function(err){

    	});
    }
    var openModal = function(vacancy){
    	$scope.items = vacancy;
    	$scope.user = Auth.currentUser;
    	var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: 'app/practice/practicereq.html',
	      controller: 'ModalInstanceCtrl',
	      size: 'lg',
	      resolve: {
	        items: function () {
	          return $scope.items;
	        },
	        user: function(){
	        	return $scope.user;
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

  }).controller('ModalInstanceCtrl', function ($scope, $modalInstance, items, $http, user) {

	  $scope.items = items;
	  if($scope.items){
	  	$scope.req = $scope.items;
	  	$scope.updateEnable = true;
	  }else{
  	  	$scope.req={};
	  }
	  $scope.selected = {
	    newvacancy: $scope.newvacancy
	  };

	  $scope.ok = function () {
	    $modalInstance.close($scope.selected);
	  };

	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };
	  $scope.popup1 = {
	    opened: false
	  };
	  $scope.maxDate = new Date(2020, 5, 22);

	  $scope.openPicker = function() {
	    $scope.popup1.opened = true;
	  };	
      $scope.minDate = new Date();
      $scope.today = function() {
   	  	$scope.req.date = new Date();
  	  };
  	  $scope.today();

  	  $scope.req.mytime = new Date();

	  $scope.hstep = 1;
	  $scope.mstep = 15;
	  $scope.ismeridian = true;
	  $scope.user = user;
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
