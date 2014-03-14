'use strict';

angular.module('clientApp').controller('LoginCtrl', function($scope, $location, accountService) {

    $scope.user = {
        UserName: '',
        Password: ''
    };

    $scope.$on('error', function(event, data) {
        $scope.errorMessage = data.errorMessage;
    });

    $scope.login = function() {
        var promise = accountService.Login($scope.user);
        promise.then(function() {
            $location.url('/account'); // TODO: redirect to where the user requested
        });
    };

});