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
      templateUrl: 'main/main.html',
      controller: 'MainCtrl'
    })
      .when('/login', {
        templateUrl: 'user/login.html',
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
        templateUrl: 'user/register.html',
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
          templateUrl: 'user/account.html',
          resolve: {
            authorize: ['$location', 'localStorageService', function ($location, localStorageService) {
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
        .when('/oauth', {
          resolve: {
            inspectUrl: ['$window', '$location', 'localStorageService', 'accountService', function ($window, $location, localStorageService, accountService) {
              var url = $window.location.href;
              // verify what type of hash this is
              if (url.indexOf('access_token') > 0) {
                // we should only arrive here if we log in using an external login
                var token = url.substring((url.indexOf('=') + 1), url.indexOf('&'));
                localStorageService.add('accessToken', token);
                // so, user logged in? we don't have a user name....
                var promise = accountService.GetUserInfo().then(function (result) {
                  $location.url('/account');
                });
              } else if (url.indexOf('error') > 0) {
                // TODO: ah, we came from where?... can be anything really... currently only oauth though
                // so show login and an error?
              } else {
                // TODO: what else?
              }
            }]
          }
      })
       .otherwise({
          redirectTo: '/' 
        });
  });

angular.module('clientApp').factory('tokenInterceptor', ['$rootScope', 'localStorageService', 'APP_EVENTS',
function ($rootScope, localStorageService, APP_EVENTS) {
  return {
    request: function (config) {
      $rootScope.$emit(APP_EVENTS.httpRequestStarted);
      var userToken = localStorageService.get('accessToken');
      if (userToken !== null) {
        config.headers.Authorization = 'Bearer ' + userToken;
      }
      return config;
    }
  };
}]);

angular.module('clientApp').factory('securityInterceptor', ['$rootScope', '$q', '$location', 'localStorageService',
  function ($rootScope, $q, $location, localStorageService) {
    return {
      responseError: function (response) {
        if (response.status === 401) {
          // TODO: check what we want to broadcast here.
          //        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated,
          //                              response); 
          localStorageService.remove('accessToken');
          $location.path('/login');
        }
        return $q.reject(response);
      }
    };
  }]);

angular.module('clientApp').config(['$httpProvider', function ($httpProvider) {
  $httpProvider.interceptors.push('tokenInterceptor');
  $httpProvider.interceptors.push('securityInterceptor');
}]);

angular.module('clientApp').config(['$provide', function ($provide) {
  $provide.decorator('$rootScope', ['$delegate', function ($delegate) {
    
    $delegate.constructor.prototype.$onRootScope = function (name, listener) {
      var unsubscribe = $delegate.$on(name, listener);
      this.$on('$destroy', unsubscribe);
    };

    return $delegate;
  }]);
}]);
