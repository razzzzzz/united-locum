'use strict';

angular.module('clickeatApp').controller('SettingsController', function($scope,Auth,$timeout, $http){
    $scope.step4 = true;
    $scope.user = Auth.getCurrentUser();
    $scope.user.referance = [
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
        ];
        $scope.user.nhssystem = [];
        $scope.user.qualification = [];
        $scope.user.languages = [];
        $scope.billingAdd = false;
    $scope.qualifications = [ {id: 1, label: "MBBS"}, {id: 2, label: "BSC Nursing"}, {id: 3, label: "10"},{id:4,label:"10+2"}];
    $scope.nhsdata = [ {id: 1, label: "NHS SYSTEM1"}, {id: 2, label: "NHS SYSTEM2"}, {id: 3, label: "NHS SYSTEM3"},{id:4,label:"NHS SYSTEM4"},{id:5,label:"NHS SYSTEM5"},{id:6,label:"NHS SYSTEM6"}];
    $scope.languages = [ {id: 1, label: "Telugu"}, {id: 2, label: "French"}, {id: 3, label: "Jerman"}];
    $scope.currentRef = {};
    $scope.certificates = {
    		'GPS':['GMC Registration Certificate','Latest Performer List Report','Indemnity Insurance Certificate',' Passport/Work Permit/EEA card','Current DBS','Latest CV','Passport / Driving License'],
			'Dentist':['GDC Registration Certificate','Performer List Report','Indemnity Insurance Certificate', 'Passport / Work Permit','Current DBS' ,'Latest CV','Passport / Driving License'],
			'Nurses (Dental / Non-Dental)':['NMC Registration Certificate','Passport / EEA card/ Work Permit','Current DBS','Latest CV','Passport / Driving License','Qualifications Certificate']
	
    };
    $scope.selectedList = [];

    $scope.myEventListeners = {
      onItemSelect: onItemSelect,
    onItemDeselect: onItemDeselect,
    /*onSelectAll: onSelectAll,*/
    onDeselectAll: onDeselectAll
    };
    
    // MultiSelect Drop down select - Event
    function onItemSelect(property) {
    console.log('select > ' + property);
        updateSelectedList();
    }
    
    function onItemDeselect(property) {
    console.log('deselect : ' + property);
        updateSelectedList();
    }
    
    function onSelectAll() {
      console.log('select all');
        updateSelectedList();
    }
    
    function onDeselectAll() {
      console.log('deselect all');
        updateSelectedList();
    }
    
    function updateSelectedList(){
        $scope.selectedList.splice(0,$scope.selectedList.length);
        $timeout(function() {
                        for(var i=0;i<$scope.user.nhssystem.length;i++){
                for(var j=0;j<$scope.nhsdata.length;j++){
                    if($scope.user.nhssystem[i].id==$scope.nhsdata[j].id){
                        $scope.selectedList[i] =  $scope.nhsdata[j];
                        break;
                    }
                }
            }
        }, 10);
    }
    $scope.openTwo = function(i){

      $scope['step'+i] = true;
    };

    $scope.sameBillAdd = function(){
        $scope.billingAdd = !$scope.billingAdd;
        if($scope.billingAdd){
            $scope.user.billingAddress = $scope.user.currentAddress;
        }else{
            $scope.user.billingAddress = {};
        }
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
    };

    $scope.addToPreferedPractice = function(practice){
        if($scope.user.practice){
            $scope.user.practice.push(practice);
        }else{
            $scope.user.practice = [practice];
        }
    };

    $scope.reset = function(){
    	$scope.currentIndex = undefined;
    	$scope.currentRef = {};
    };

    $scope.searchPractice = function(){
        $http.post('/api/users/search',{'searchText':$scope.user.searchText})
        .then(function(response){
            $scope.autosuggest = response.data;
        },function(err){

        });
    };
});
