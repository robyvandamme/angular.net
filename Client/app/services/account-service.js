'use strict';

angular.module('clientApp').factory('accountService', function ($rootScope, $http, $location, localStorageService, ENV_CONFIG, APP_EVENTS) {

  var apiUrl = ENV_CONFIG.apiUrl;
  var loginUrl = '/token';
  var registerUrl = '/api/account/register';
  var changePasswordUrl = '/api/account/changepassword';
  var availableExternalLoginsUrl = '/api/account/externallogins';
  var userInfoUrl = '/api/account/userinfo';

  var userAccountInfoUrl = '/api/account/manageinfo';

  var addExternalLoginUrl = '/api/Account/AddExternalLogin';
  var logoutUrl = '/api/Account/Logout';
  var registerExternalUrl = '/api/Account/RegisterExternal';
  var removeLoginUrl = '/api/Account/RemoveLogin';
  var setPasswordUrl = '/api/Account/setPassword';

  var ACCESS_TOKEN = 'accessToken';
  var USER_NAME = 'userName';

  var login = function (credentials) {
    var loginData = $.param({
      grant_type: 'password',
      username: credentials.username,
      password: credentials.password
    });
    return $http.post(apiUrl + loginUrl, loginData)
        .success(function (data) {
          localStorageService.add(ACCESS_TOKEN, data.access_token);
          localStorageService.add(USER_NAME, data.userName);
          $rootScope.$emit(APP_EVENTS.userStatusChanged);
        })
       .error(function (error) {
          $rootScope.$emit(APP_EVENTS.apiError, { message: error.error_description });
        });
  };

  var getExternalLogins = function () {
    // IMPORTANT: we can not use the # in the url, since that gets rejected, see OAUTH specs for more info on this.
    var returnUrl = $location.$$protocol + '://' + $location.$$host + '/oauth';
    var theUrl = apiUrl + availableExternalLoginsUrl + '?returnurl=' + (encodeURIComponent(returnUrl)) +
          '&generateState=' + 'true'; /// TODO: check what generateState is for....
    return $http.get(theUrl); // TODO; what if this fails?
  };

  var logout = function () {
    localStorageService.remove(ACCESS_TOKEN);
    localStorageService.remove(USER_NAME);
    delete $http.defaults.headers.common['Authorization'];
    $rootScope.$emit(APP_EVENTS.userStatusChanged);
  };

  var register = function (user) {
    return $http.post(apiUrl + registerUrl, {
      username: user.username,
      email: user.email,
      password: user.password,
      confirmpassword: user.confirmpassword
    })
        .error(function (error) {
          $rootScope.$emit(APP_EVENTS.apiError, { message: error.modelState });
        })
        .then(function onSuccess() {
          return login(user);
        });
  };

  var changePassword = function (password) {
    return $http.post(apiUrl + changePasswordUrl, {
      oldpassword: password.oldpassword,
      newpassword: password.newpassword,
      confirmpassword: password.confirmpassword
    })
        .success(function () {
          $rootScope.$emit(APP_EVENTS.apiSuccess, { message: 'Password changed.' });
        })
        .error(function (error) {
          console.log(error.modelState);
          $rootScope.$emit(APP_EVENTS.apiError, { message: error.modelState });
        });
  };

  var getUserInfo = function () {
    return $http.get(apiUrl + userInfoUrl).success(function (data) {
      if (data.hasRegistered) {
        localStorageService.add(USER_NAME, data.userName);
        $rootScope.$emit(APP_EVENTS.userStatusChanged);
      }
    }).error(function () {
      // TODO. do something relevant here...
    });
  };

  var getUserAccountInfo = function () {
    var querystring = '?returnUrl=/';
    var url = apiUrl + userAccountInfoUrl + querystring;
    return $http.get(url).success(function (data) {
    }).error(function () {
      // TODO: find out what comes back here and pass related message to event
      $rootScope.$emit(APP_EVENTS.apiError, { message: 'An error occured' });
    });
  };

  return {
    ApiUrl: apiUrl,
    Login: login,
    Register: register,
    Logout: logout,
    ChangePassword: changePassword,
    GetExternalLogins: getExternalLogins,
    GetUserInfo: getUserInfo,
    GetUserAccountInfo: getUserAccountInfo
  };

});