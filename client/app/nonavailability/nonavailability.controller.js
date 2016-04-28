'use strict';

angular.module('clickeatApp')
  .controller('NonAvailabilityCtrl', function ($scope,$http,$modal) {
    
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
      $scope.dt = new Date();
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
    };
    $scope.init();
    $scope.openStatus = function() {
        $scope.popup1.opened = true;
    };
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

