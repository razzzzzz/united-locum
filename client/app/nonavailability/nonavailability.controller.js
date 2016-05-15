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
  });