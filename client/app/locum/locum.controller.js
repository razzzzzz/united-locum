'use strict';

angular.module('clickeatApp')
  .controller('LocumCtrl', function ($scope,$http) {
    $scope.message = 'Hello';
    $http.get('/api/vacancys').then(function(res){
    	$scope.vacancyList = res.data;
    },function(res){
    	alert("erro in  api/vacancys get api"+res);
    });
  });
