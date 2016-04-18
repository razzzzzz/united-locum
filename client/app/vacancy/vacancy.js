'use strict';

angular.module('clickeatApp')
  .directive('vacancy', function(){
  	return{
	    templateUrl: 'app/vacancy/vacancy.html',
	    controller: 'VacancyComponent'
	};
});
angular.module('clickeatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('vacancy', {
        url: '/vacancy',
        template: '<vacancy></vacancy>',
        authenticate: true
      });
  });