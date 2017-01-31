(function()
{
    "use strict";

    angular
        .module("learnary")
        .controller("LoginCtrl", [
            "$scope",
            "SessionService",

            function LoginCtrl ($scope, SessionService)
            {
                var self = this;

                self.login = function()
                {
                    SessionService.login($scope.credentials, "play");
                };
            }
        ]);
})();
