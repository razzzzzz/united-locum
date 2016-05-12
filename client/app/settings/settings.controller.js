'use strict';

angular.module('clickeatApp').controller('SettingsController', function($scope,Auth,$timeout, $http, Upload){
    $scope.step3 = true;
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
    		'GP':[
                    {label:'GMC Registration Certificate',name:'GMCReg'},
                    {label:'Latest Performer List Report',name:'GPPerformerList'},
                    {label:'Indemnity Insurance Certificate', name:'GPIndemnityInsurance'},
                    {label:' Passport/Work Permit/EEA card',name:'GPEligibility'},
                    {label:'Current DBS',name:'GPDBS'},
                    {label:'Latest CV',name:'GPCV'},
                    {label:'Passport / Driving License',name:'GPId'}
                ],
			'Dentist':[
                        {label:'GDC Registration Certificate',name:'GDCReg'},
                        {label:'Performer List Report',name:'DentPerformerList'},
                        {label:'Indemnity Insurance Certificate',name:'DentIndemnityInsurance'},
                        {label:'Passport / Work Permit',name:'DentEligibility'},
                        {label:'Current DBS',name:'DentDBS '} ,
                        {label:'Latest CV',name:'DentCV'},
                        {label:'Passport / Driving License',name:'DentId'}
                ],
            'Nurse(Dental)':[
                        {label:'NMC Registration Certificate',name:'NMCReg'},
                        {label:'Passport / EEA card/ Work Permit',name:'NurseEligibility'},
                        {label:'Current DBS',name:'NurseDBS'},
                        {label:'Latest CV',name:'NurseCV'},
                        {label:'Passport / Driving License',name:'NurseID'},
                        {label:'Qualifications Certificate',name:'NurseQualifications'},
                        {label:'Training Certificate',name:'NurseTrainCert'}
                    ],
            'Nurse(Non-Dental)':[
                        {label:'NMC Registration Certificate',name:'NMCReg'},
                        {label:'Passport / EEA card/ Work Permit',name:'NurseEligibility'},
                        {label:'Current DBS',name:'NurseDBS'},
                        {label:'Latest CV',name:'NurseCV'},
                        {label:'Passport / Driving License',name:'NurseID'},
                        {label:'Qualifications Certificate',name:'NurseQualifications'},
                        {label:'Training Certificate',name:'NurseTrainCert'}
                    ],
            'contract':[

                    {label:'Contract Certificate',name:'contract'}
            ]
	
    };
    $scope.contract = 
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
        if($scope.user.practices){
            var flag = true;
            for(var i=0; i<$scope.user.practices.length;i++){
                if($scope.user.practices[i]._id==practice._id){
                    flag = false;
                    break;
                }
            }
            if(flag){
                $scope.user.practices.push(practice);
            }
        }else{
            $scope.user.practices = [practice];
        }
    };

    $scope.removePreferance = function(practice){
        for(var i=0; i<$scope.user.practices.length;i++){
            if($scope.user.practices[i]._id==practice._id){
               $scope.user.practices.splice(i,1);
                break;
            }
        }
    };

    $scope.updatePracticeInDB = function(){
        $http.put('/api/users/'+$scope.user._id+'/practices',{'practices':$scope.user.practices})
        .then(function(response){
            $scope.autosuggest = response.data;
        },function(err){

        });
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
    $scope.triggerFileClick = function($event){
        angular.element($event.currentTarget).closest("td").prev().find("input").trigger("click");
    };

       $scope.uploadFile = function(fname, model,GMC_form){ //function to call on form submit 
           var ext = model.name.split('.').pop();
           if(ext=="pdf" || ext=="docx" || ext=="doc" || ext=="bmp" || ext == "jpg"){
            if (GMC_form.$valid && model) { //check if from is valid
                $scope.upload(model,fname); //call upload function
            }
           } else{
               alert("It is not supported formate");
           }
        }
        
        $scope.upload = function (file,fname) {
            Upload.upload({
                url: '/api/users/'+$scope.user._id+'/'+fname+'/documents', //webAPI exposed to upload the file
                data:{file:file} //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                if(!$scope.user.documents){
                    $scope.user.documents = {};
                }
                $scope.user.documents[resp.data.fileProp] = resp.data.fileName;
            }, function (resp) { //catch error
                console.log('Error status: ' + resp.status);
                alert('Error status: ' + resp.status);
            }, function (evt) { 
                console.log(evt);
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            });
        };

        $scope.documentupdate = function(prop){alert(prop);}
		$scope.updateUserProfileInDB = function(prop){alert(prop);}
});
