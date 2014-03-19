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
          loggedIn: ['$location', 'localStorageService', function ($location, localStorageService) {
                      var token = localStorageService.get('accessToken');
                      if (token !== undefined) {
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
                      if (token !== undefined) {
                        $location.url('/account');
                      }
                    }]
        }
      })
          .when('/account', {
              templateUrl: 'views/account.html',
              controller: 'AccountCtrl',
              resolve: {
                  authorize:  ['$location', 'localStorageService',function ($location, localStorageService) {
                      var token = localStorageService.get('accessToken');
                      if (token == undefined) {
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

angular.module('clientApp').factory('httpRequestInterceptor', ['localStorageService', function (localStorageService) {
    return {
        request: function (config) {
            var userToken = localStorageService.get('accessToken');
            if (userToken != undefined) {
                config.headers['Authorization'] = 'Bearer ' + userToken;
            }
            return config;
        }
    };
}]);

angular.module('clientApp').config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
}]);