'use strict';

angular.module('clientApp').controller('AccountCtrl', function($scope, localStorageService) {

    $scope.user = {
        UserName: ''
    };
    var getAccount = function() {
        $scope.user.username = localStorageService.get('userName');
    };
    getAccount();

});