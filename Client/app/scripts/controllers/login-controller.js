'use strict';

angular.module('clientApp').controller('LoginCtrl', function ($scope, $location, $window, $http, accountService) {

    $scope.apiUrl = accountService.ApiUrl;

    $scope.user = {
        UserName: '',
        Password: ''
      };

//    $scope.externalLoginProviders = {
//        Name: '',
//        Url: ''
//      };

    $scope.$on('error', function(event, data) {
        $scope.errorMessage = data.errorMessage;
      });

    $scope.login = function() {
        var promise = accountService.Login($scope.user);
        promise.then(function() {
            $location.url('/account'); // TODO: redirect to where the user requested
          });
      };

    $scope.loginExternal = function (loginUrl) {
        $window.location = ($scope.apiUrl + loginUrl);
    };

    // TODO: this gets called twice, make sure we make this call only once.    
    accountService.GetExternalLogins().success(function(result) {
        $scope.externalLoginProviders = result;
      });
  });