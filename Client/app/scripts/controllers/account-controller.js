'use strict';

angular.module('clientApp').controller('AccountCtrl', function($scope,localStorageService) { 

    var apiUrl = "http://localhost/angular.net.server"; // TODO: make conditional depending on environment (global variable?)
    var loginUrl = "/token";

    $scope.user = {
        UserName: '',
    };

    $scope.getAccountDetails = function () {
        // get the username and show it
        $scope.user.UserName = localStorageService.get('userName');
    };

});