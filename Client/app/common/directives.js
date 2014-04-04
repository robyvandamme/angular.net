'use strict';

angular.module('clientApp').directive('header', function () {
    return {
        templateUrl: 'common/header.html'
      };
  })
.directive('feedback', function () {
  return {
    templateUrl: 'common/feedback.html'
  };
});
