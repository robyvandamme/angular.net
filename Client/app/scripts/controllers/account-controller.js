'use strict';

angular.module('clientApp').controller('AccountCtrl', function ($scope, localStorageService, accountService) {

    $scope.user = {
        UserName: ''
    };

    $scope.password = {
        OldPassword: '',
        NewPassword: '',
        ConfirmPassword: ''
    };

    $scope.$on('error', function (event, data) {
        $scope.errorMessage = data.errorMessage;
    });

    $scope.changePassword = function () {
        var promise = accountService.ChangePassword($scope.password);
        promise.then(function () {
            $scope.password = null;
            $scope.form.$setPristine();
        });
    };

    var getAccount = function () {
        $scope.user.username = localStorageService.get('userName');
    };

    getAccount();

});