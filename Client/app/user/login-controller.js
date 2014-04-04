'use strict';

angular.module('clientApp').controller('LoginCtrl', function ($scope, $location, $window, accountService) {

  $scope.apiUrl = accountService.ApiUrl;

  $scope.credentials = {
    username: '',
    password: ''
  };

  //    $scope.externalLoginProviders = {
  //        Name: '',
  //        Url: ''
  //      };

  $scope.login = function (user) {
    $scope.errorMessage = null; // reset the api error message
    var promise = accountService.Login(user);
    promise.then(function () {
      $location.url('/account'); // TODO: redirect to where the user requested
    });
  };

  $scope.loginExternal = function (loginUrl) {
    $window.location = ($scope.apiUrl + loginUrl);
  };

  // TODO: this gets called twice, make sure we make this call only once.    
  accountService.GetExternalLogins().success(function (result) {
    $scope.externalLoginProviders = result;
  });

});