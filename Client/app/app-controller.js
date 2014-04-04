'use strict';

angular.module('clientApp').controller('AppCtrl', function ($scope, $location, $rootScope, localStorageService, APP_EVENTS) {

  $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
    // TODO: here we can check what type of rejection: unauthorized > redirect to login
    //  $location.url('/login');
    console.log('Some service has failed: ', rejection);
  });

  $rootScope.$on('$routeChangeSuccess', function () {
    $scope.feedbackMessage = null;
  });

  $rootScope.user = {
    UserName: localStorageService.get('userName'),
    get LoggedIn() { return this.UserName !== null; }
  };

  $rootScope.$on(APP_EVENTS.userStatusChanged, function () {
    $rootScope.user.UserName = localStorageService.get('userName');
  });

  $scope.menuClass = function (page) {
    var current = $location.path().substring(1);
    return page === current ? 'active' : '';
  };

  // TODO: review if this is the correct location to handle the api events
  // if a message needs to be shown all that is necessary is add a feedback directive to the view
  // TODO: review clear the messages on navigate.... (doing this in the $routeChangeSuccess and using an event in an HttpInterceptor for now)
  $scope.$onRootScope(APP_EVENTS.apiError, function (event, data) {
    $scope.feedbackMessage = data.message;
    $scope.messageType = 'error';
  });

  $scope.$onRootScope(APP_EVENTS.apiSuccess, function (event, data) {
    $scope.feedbackMessage = data.message;
    $scope.messageType = 'success';
  });

  $scope.$onRootScope(APP_EVENTS.httpRequestStarted, function () {
    $scope.feedbackMessage = null;
  });

});
