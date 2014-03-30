'use strict';

angular.module('clientApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'LocalStorageModule',
  'constants'
])
    .config(function ($locationProvider) {
        $locationProvider.html5Mode(true); 
    })
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
          loggedIn: ['$location', 'localStorageService', function ($location, localStorageService) {
                      var token = localStorageService.get('accessToken');
                      if (token !== null) {
                        $location.url('/account');
                      }
                    }]
        }
      })
        .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        resolve: {
          loggedIn: ['$location', 'localStorageService', function ($location, localStorageService) {
                      var token = localStorageService.get('accessToken');
                      if (token !== null) {
                        $location.url('/account');
                      }
                    }]
        }
      })
          .when('/account', {
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl',
        resolve: {
          authorize: ['$location', 'localStorageService',function ($location, localStorageService) {
                      var token = localStorageService.get('accessToken');
                      if (token === null) {
                        $location.url('/login');
                      }
                    }]
        }
      })
          .when('/logout', {
        resolve: {
          logout: ['$location', 'accountService', function ($location, accountService) {
                    accountService.Logout();
                    $location.url('/login');
                  }]
        }
      })
         .otherwise({
             redirectTo: '/',
             resolve: {
                 inspectUrl: ['$window', '$location', 'localStorageService','accountService', function ($window, $location, localStorageService, accountService) {
                     var hash = $window.location.hash;
                     // verify what type of hash this is
                     if (hash.indexOf('access_token') > 0) {
                         var token = hash.substring((hash.indexOf('=') + 1), hash.indexOf('&'));
                         localStorageService.add('accessToken', token);
                         // so, user logged in? we don't have a user name....
                         var promise = accountService.GetUserInfo().then(function(result) {
                              $location.url('/account');
                         });
                     } else if (hash.indexOf('error') > 0) {
                         // TODO: ah, we came from where?... can be anything really... currently only oauth though
                         // so show login and an error?
                     } else {
                         // TODO: what else?
                     }
                 }]
             }
      });
    });

angular.module('clientApp').factory('tokenInterceptor', ['localStorageService', function (localStorageService) {
    return {
        request: function (config) {
            var userToken = localStorageService.get('accessToken');
            if (userToken !== null) {
              config.headers.Authorization = 'Bearer ' + userToken;
            }
            return config;
          }
      };
  }]);

angular.module('clientApp').config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('tokenInterceptor');
  }]);