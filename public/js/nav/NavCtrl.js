(function()
{
    "use strict";

    angular
        .module("learnary")
        .controller("NavCtrl", ["$scope", "$rootScope", "$auth", "$state", "SessionService",
            function NavCtrl($scope, $rootScope, $auth, $state, SessionService)
            {
                var self = this;

                $scope.isAuthenticated = $auth.isAuthenticated();

                $scope.logout = function()
                {
                    $auth.logout();
                    $state.go("landing");
                }

                $rootScope.$on("login", function(event)
                {
                    // QUESTION: Why does this value disappear from the scope on page refresh?
                    $scope.currentUser = SessionService.currentUser;
                });

            }
        ]);
})();
