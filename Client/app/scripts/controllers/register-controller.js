'use strict';

angular.module('clientApp').controller('RegisterCtrl', function($scope, $http) { 

    $scope.user = {
        UserName: '',
        Password: '',
        ConfirmPassword: ''
    };

    $scope.register = function () {
            $http({
                method: 'POST',
                url: 'http://localhost/angular.net.server/api/account/register',
                data:
                {
                    username: $scope.user.username, password: $scope.user.password, confirmpassword: $scope.user.confirmpassword
                }
            }).success(function (data) {
                // on success: get a token for the registered user
                // that logic is currently in the logincontroller....
                console.log(data);
            }).error(function (error) {
                //{"message":"The request is invalid.","modelState":{"model.Password":["The Password must be at least 6 characters long."]}}
                // {"message":"The request is invalid.","modelState":{"":["Name xxx is already taken."]}}
                $scope.errorMessage = error.modelState;
            });
    };
});