'use strict';

angular.module('clickeatApp').controller('SettingsController', function($scope){
  
    $scope.step9 = true;

    $scope.openTwo = function(i){

      $scope['step'+i] = true;
    }

});
