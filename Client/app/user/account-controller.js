'use strict';

angular.module('clientApp').controller('AccountCtrl', function ($scope, localStorageService, accountService) {

    $scope.password = {
        OldPassword: '',
        NewPassword: '',
        ConfirmPassword: ''
      };

    $scope.changePassword = function () {
        var promise = accountService.ChangePassword($scope.password);
        promise.then(function () {
            $scope.password = null;
            $scope.form.$setPristine();
          });
      };

    var getAccount = function () {
        var promise = accountService.GetUserAccountInfo();
        promise.then(function(result) {
            console.log(result.data);
            $scope.user = result.data;
            var localLogin = 'Local';
            $scope.user.hasLocalPassword = _.findWhere($scope.user.logins, { loginProvider: localLogin }) !== undefined;
            $scope.user.externalAccounts = _.filter($scope.user.logins, function(login) { return login.loginProvider !== localLogin; });
          });
      };

    getAccount();

  });