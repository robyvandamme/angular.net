'use strict';

angular.module('clientApp').factory('accountService', function ($rootScope, $http, localStorageService, config) {

    var apiUrl = config.apiUrl;
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
        return $http.post(apiUrl + registerUrl, {
                username: user.username,
                password: user.password,
                confirmpassword: user.confirmpassword
            })
            .error(function(error) {
                $rootScope.$broadcast('error', { errorMessage: error.modelState });
            })
            .then(function onSuccess(response) {
                return login(user);
            });
    };

    return {
        Login:login,
        Register: register,
        Logout: logout
    };
});