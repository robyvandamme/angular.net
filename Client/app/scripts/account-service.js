'use strict';

angular.module('clientApp').factory('accountService', function ($http, $resource) {

    var apiUrl = "http://localhost/angular.net.server"; // TODO: make conditional depending on environment (global varibable?)
    var loginUrl = "/token";

    var addExternalLoginUrl = "/api/Account/AddExternalLogin";
    var changePasswordUrl = "/api/Account/changePassword";
    var logoutUrl = "/api/Account/Logout";
    var registerUrl = "/api/Account/Register";
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
                console.log(data);
            })
           .error(function (error) {
               console.log(error);
        });
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
        Register: register
    };
});