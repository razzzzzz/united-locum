'use strict';

angular.module('clickeatApp')
  .directive('booking', function(){
  	return{
	    templateUrl: 'app/booking/booking.html',
	    controller: 'BookingCtrl'
	};
});
angular.module('clickeatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('booking', {
        url: '/booking',
        template: '<booking></booking>',
        authenticate: true
      });
  });