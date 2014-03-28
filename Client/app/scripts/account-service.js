'use strict';

angular.module('clientApp').factory('accountService', function ($rootScope, $http, $location, localStorageService, config) {

    var apiUrl = config.apiUrl;
    var loginUrl = '/token';
    var registerUrl = '/api/account/register';
    var changePasswordUrl = '/api/account/changepassword';
    var availableExternalLoginsUrl = '/api/account/externallogins';
    var userInfoUrl = '/api/account/userinfo';

    var addExternalLoginUrl = '/api/Account/AddExternalLogin';
    var logoutUrl = '/api/Account/Logout';
    var registerExternalUrl = '/api/Account/RegisterExternal';
    var removeLoginUrl = '/api/Account/RemoveLogin';
    var setPasswordUrl = '/api/Account/setPassword';
   
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
                $rootScope.$broadcast('userchanged');
              })
           .error(function (error){
                $rootScope.$broadcast('error', {errorMessage: error.error_description});
              });
      };

    var getExternalLogins = function () {
        // we can not use the # in the url, since that gets rejected, see OAUTH specs for more info on this.
        var returnUrl = $location.$$protocol + '://' + $location.$$host;
        var theUrl = apiUrl + availableExternalLoginsUrl + '?returnurl=' + (encodeURIComponent(returnUrl)) +
              '&generateState=' + 'true'; /// TODO: check what generateState is for....
        return $http.get(theUrl).success(function(result) {
            console.log(result);
            // TODO: broadcast on error...
          });
      };

    var logout = function() {
        localStorageService.remove('accessToken');
        localStorageService.remove('userName');
        delete $http.defaults.headers.common['Authorization'];
        $rootScope.$broadcast('userchanged');
      };

    var register = function (user) {
        return $http.post(apiUrl + registerUrl, {
          username: user.username,
          emailaddress: user.email,
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

    var changePassword = function(password) {
        return $http.post(apiUrl + changePasswordUrl, {
          oldpassword: password.oldpassword,
          newpassword: password.newpassword,
          confirmpassword: password.confirmpassword
        })
            .success(function () {
                console.log('success');
                $rootScope.$broadcast('success', { errorMessage: 'Password changed.' }); // TODO: add success message logic.
              })
            .error(function (error) {
                console.log(error.modelState);
                $rootScope.$broadcast('error', { errorMessage: error.modelState });
              });
    };

    var getUserInfo = function() {
        return $http.get(apiUrl + userInfoUrl).success(function(data) {
            if (data.hasRegistered) {
                localStorageService.add('userName', data.userName);
                $rootScope.$broadcast('userchanged');
            }
        }). error(function() {
            // TODO. do something relevant here...
        });
    };

    return {
        ApiUrl: apiUrl,
        Login: login,
        Register: register,
        Logout: logout,
        ChangePassword: changePassword,
        GetExternalLogins: getExternalLogins,
        GetUserInfo: getUserInfo
      };
        
  });