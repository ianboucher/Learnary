(function()
{
    "use strict";

    angular
        .module("learnary")
        .controller("NavCtrl", ["$scope", "$rootScope", "$auth", "$state",
            function NavCtrl($scope, $rootScope, $auth, $state)
            {
                $scope.isAuthenticated = $auth.isAuthenticated();

                var currentUser = {};

                $scope.logout = function()
                {
                    $auth.logout();
                    $state.go("landing");
                }

                $rootScope.$on("login", function(event, data)
                {
                    currentUser.email  = data.email;
                    $scope.currentUser = currentUser; // TODO: Find out why the f***********ck this won't update in the view!
                                                      // Tried using $scope.$apply - error message saying digest already in
                                                      // progress, so I don't know why no update in view.
                });

            }
        ]);
})();
