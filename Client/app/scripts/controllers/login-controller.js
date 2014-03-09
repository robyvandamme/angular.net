'use strict';

angular.module('clientApp').controller('LoginCtrl', function($scope, $http, localStorageService) { 

    var apiUrl = "http://localhost/angular.net.server"; // TODO: make conditional depending on environment (global variable?)
    var loginUrl = "/token";

    $scope.user = {
        UserName: '',
        Password: ''
    };

    $scope.login = function () {
        var loginData = $.param({
            grant_type: 'password',
            username: $scope.user.username,
            password: $scope.user.password
        });

        $http.post(apiUrl + loginUrl, loginData)
            .success(function (data) {
                // TODO: redirect to restricted area
                localStorageService.add('accesToken', data.access_token);
                localStorageService.add('userName', data.userName);
            })
           .error(function (error) {
               $scope.errorMessage = error.error_description;
           });
    };

});