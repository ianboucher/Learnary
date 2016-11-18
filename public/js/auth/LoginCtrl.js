(function()
{
    "use strict";

    angular
        .module("learnary")
        .controller("LoginCtrl", ["$scope", "$auth", "$state", "SessionService",
            function LoginCtrl($scope, $auth, $state, SessionService)
            {
                var self = this;

                self.login = function()
                {
                    SessionService.login($scope.credentials);
                };
            }
        ]);
})();
