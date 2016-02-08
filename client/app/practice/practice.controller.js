'use strict';

angular.module('clickeatApp')
  .controller('PracticeCtrl', function ($scope, $modal, $http) {
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
    	var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: 'app/practice/practicereq.html',
	      controller: 'ModalInstanceCtrl',
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

  }).controller('ModalInstanceCtrl', function ($scope, $modalInstance, items, $http) {
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
			  'time': $scope.req.mytime
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
