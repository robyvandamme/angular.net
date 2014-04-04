'use strict';

angular.module('clientApp').controller('RegisterCtrl', function($scope, $location, accountService) {

    $scope.user = {
        UserName: '',
        Email: '',
        Password: '',
        ConfirmPassword: ''
      };

    $scope.register = function () {
        var promise = accountService.Register($scope.user);
        promise.then(function () {
            $location.url('/account'); // TODO: redirect to where the user requested?
          });
      };

  });