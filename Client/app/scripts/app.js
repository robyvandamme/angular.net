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
              controller: 'LoginCtrl',
              resolve: {
                  loggedIn: function ($location, localStorageService) {
                      var token = localStorageService.get('accessToken');
                      if (token != undefined) {
                          $location.url('/account');
                      }
                  }
              }
          })
          .when('/register', {
              templateUrl: 'views/register.html',
              controller: 'RegisterCtrl',
              resolve: {
                  loggedIn: function ($location, localStorageService) {
                      var token = localStorageService.get('accessToken');
                      if (token != undefined) {
                          $location.url('/account');
                      }
                  }
              }
          })
          .when('/account', {
              templateUrl: 'views/account.html',
              controller: 'AccountCtrl',
              resolve: {
                  authorize: function ($location, localStorageService) {
                      var token = localStorageService.get('accessToken');
                      if (token == undefined) {
                          $location.url('/login');
                      }
                  }
              }
          })
          .when('/logout', {
            resolve: {
                logout: function ($location, accountService) {
                    accountService.Logout();
                    $location.url('/login');
                }
            }      
          })
         .otherwise({
            redirectTo: '/'
  });
  });

angular.module('clientApp').controller('AppCtrl', function ($rootScope, localStorageService) {
    $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
        // TODO: here we can check what type of rejection: unauthorized > redirect to login
        //  $location.url('/login');
        console.log('Some service has failed: ', rejection);
    });

    $rootScope.user = {
        UserName: localStorageService.get('userName'),
        get LoggedIn() { return this.UserName != undefined; }
    };

    $rootScope.$on('userchanged', function (event) {
        $rootScope.user.UserName = localStorageService.get('userName');
    });

});
