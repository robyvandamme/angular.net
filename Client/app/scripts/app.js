'use strict';

angular.module('clientApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'LocalStorageModule',
  'constants'
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
              controller: 'AccountCtrl',
              resolve: {
                  authorize: function ($location, localStorageService) {
                      var token = localStorageService.get('accessToken');
                      if (token == undefined) {
                          $location.url('/login'); // TODO: we need to broadcast an error here?
                      }
                  }
              }
          })
          .when('/logout', {
            resolve: {
                logout: function ($location, localStorageService) {
                    localStorageService.remove('accessToken');
                    localStorageService.remove('userName');
                    $location.url('/login'); 
                }
            }      
          })
         .otherwise({
            redirectTo: '/'
  });
  });

angular.module('clientApp').controller('AppCtrl', function ($scope, $rootScope) {
    $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
        // TODO: here we can check what type of rejection: unauthorized > redirect to login
        //  $location.url('/login');
        console.log('Some service has failed: ', rejection);

    });
});
