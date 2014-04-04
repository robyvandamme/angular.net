'use strict';

angular.module('clientApp') .constant('APP_EVENTS', {
  'apiError': 'api-error',
  'apiSuccess': 'api-success',
  'userStatusChanged': 'user-status-changed',
  'httpRequestStarted': 'http-request-started'
});