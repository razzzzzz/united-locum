'use strict';

angular.module('clickeatApp', [
  'clickeatApp.auth',
  'clickeatApp.admin',
  'clickeatApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'ngAnimate',
  'ui.calendar',
  'angularjs-dropdown-multiselect',
  'smart-table'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
