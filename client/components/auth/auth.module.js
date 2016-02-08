'use strict';

angular.module('clickeatApp.auth', [
  'clickeatApp.constants',
  'clickeatApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
