(function()
{
    "use strict";

    angular
        .module("learnary")
        .controller("NavCtrl", ["$scope", "$rootScope", "SessionService",
            function NavCtrl($scope, $rootScope, SessionService)
            {
                var self = this;

                $scope.currentUser     = SessionService.currentUser;
                $scope.isAuthenticated = SessionService.isAuthenticated;

                $scope.logout = function()
                {
                    SessionService.logout();
                    $scope.isAuthenticated = false;
                };

                $rootScope.$on("login", function(event)
                {
                    $scope.currentUser = SessionService.currentUser;
                });

            }
        ]);
})();
