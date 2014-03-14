'use strict';

angular.module('clientApp').factory('accountService', function ($rootScope, $http, $resource, $q, $timeout, localStorageService) {

    var apiUrl = "http://localhost/angular.net.server"; // TODO: make conditional depending on environment (global varibable?)
    var loginUrl = "/token";
    var registerUrl = "/api/account/register";

    var addExternalLoginUrl = "/api/Account/AddExternalLogin";
    var changePasswordUrl = "/api/Account/changePassword";
    var logoutUrl = "/api/Account/Logout";
    var registerExternalUrl = "/api/Account/RegisterExternal";
    var removeLoginUrl = "/api/Account/RemoveLogin";
    var setPasswordUrl = "/api/Account/setPassword";

    var userInfoUrl = "/api/Account/UserInfo";

    var login = function (user) {
        var loginData = $.param({
            grant_type: 'password',
            username: user.username,
            password: user.password
        });
        return $http.post(apiUrl + loginUrl, loginData)
            .success(function (data) {
                localStorageService.add('accessToken', data.access_token);
                localStorageService.add('userName', data.userName);
            })
           .error(function (error) {
               $rootScope.$broadcast('error', {errorMessage: error.error_description});
        });
    };

    var logout = function() {
        localStorageService.remove('accessToken');
        localStorageService.remove('userName');
    };

    var register = function (user) {
//
//        var token = $http({
//            method: 'POST',
//            url: 'http://localhost/angular.net.server/api/account/register',
//            data:
//            {
//                username: user.username, password: user.password, confirmpassword: user.confirmpassword
//            }
//        });
//        return token;

    };

    return {
        Login:login,
        Register: register,
        Logout: logout
    };
});