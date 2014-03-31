angular.module('clientApp').controller('AppCtrl', function ($rootScope, localStorageService) {

    $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
        // TODO: here we can check what type of rejection: unauthorized > redirect to login
        //  $location.url('/login');
        console.log('Some service has failed: ', rejection);
    });

    $rootScope.user = {
        UserName: localStorageService.get('userName'),
        get LoggedIn() { return this.UserName !== null; }
    };

    $rootScope.$on('userchanged', function () {
        $rootScope.user.UserName = localStorageService.get('userName');
    });

});
