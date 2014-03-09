'use strict';

angular.module('clientApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'LocalStorageModule'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl'
      })
    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegisterCtrl'
    })
    .when('/account', {
         templateUrl: 'views/account.html',
         controller: 'AccountCtrl'
     })
      .otherwise({
        redirectTo: '/'
      });
  });
