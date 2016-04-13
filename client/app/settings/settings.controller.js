'use strict';

angular.module('clickeatApp').controller('SettingsController', function($scope){
  
    $scope.step1 = true;

    $scope.user = {
    	'referance':[
    		{
    			name:'referance1',
    			mobile:9494979407,
    			id:'refId1'
    		},
    		{
    			name:'referance2',
    			mobile:9494979408,
    			id:'refId2'
    		}
    	],
    	'nhssystem':[],
    	'qualification':[],
    	'languages':[]
    };
    $scope.qualifications = [ {id: 1, label: "MBBS"}, {id: 2, label: "BSC Nursing"}, {id: 3, label: "10"},{id:4,label:"10+2"}];
    $scope.nhsdata = [ {id: 1, label: "NHS SYSTEM1"}, {id: 2, label: "NHS SYSTEM2"}, {id: 3, label: "NHS SYSTEM3"},{id:4,label:"NHS SYSTEM4"},{id:5,label:"NHS SYSTEM5"},{id:6,label:"NHS SYSTEM6"}];
    $scope.languages = [ {id: 1, label: "Telugu"}, {id: 2, label: "French"}, {id: 3, label: "Jerman"}];
    $scope.currentRef = {};
    $scope.certificates = {
    		'GPS':['GMC Registration Certificate','Latest Performer List Report','Indemnity Insurance Certificate',' Passport/Work Permit/EEA card','Current DBS','Latest CV','Passport / Driving License'],
			'Dentist':['GDC Registration Certificate','Performer List Report','Indemnity Insurance Certificate', 'Passport / Work Permit','Current DBS' ,'Latest CV','Passport / Driving License'],
			'Nurses (Dental / Non-Dental)':['NMC Registration Certificate','Passport / EEA card/ Work Permit','Current DBS','Latest CV','Passport / Driving License','Qualifications Certificate']
	
    }
    $scope.openTwo = function(i){

      $scope['step'+i] = true;
    }
    $scope.edit = function(index){
    	$scope.currentRef = $scope.user.referance[index];
    	$scope.currentIndex = index;
    }
    $scope.trash = function(index){
    	$scope.user.referance.splice(index,1);
    	if(index == $scope.currentIndex){
    		$scope.reset();
    	}
    }
    $scope.add = function(){
    	if($scope.currentRef.name && $scope.currentRef.mobile &&$scope.currentRef.id){
    		if($scope.currentIndex>=0){
    			$scope.user.referance[$scope.currentIndex] = $scope.currentRef;
    		}else{
	    		$scope.user.referance.push($scope.currentRef);
    		}
	    	$scope.currentRef = {};
    	}else{
    		alert("id,mobile,name are mandetary fields");
    	}
    } 
    $scope.reset = function(){
    	$scope.currentIndex = undefined;
    	$scope.currentRef = {};
    }
});
