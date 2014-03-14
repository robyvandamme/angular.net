'use strict';

angular.module('clientApp').controller('RegisterCtrl', function($scope, $location, accountService) { 

    $scope.user = {
        UserName: '',
        Password: '',
        ConfirmPassword: ''
    };

    $scope.$on('error', function (event, data) {
        $scope.errorMessage = data.errorMessage;
    });

    $scope.register = function () {
        var promise = accountService.Register($scope.user);
        promise.then(function () {
                $location.url('/account'); // TODO: redirect to where the user requested?
        });
    };

});