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

                // self.login = function()
                // {
                //     $auth.login($scope.credentials).then(function(response)
                //     {
                //         console.log(response);
                //         SessionService.getUser($scope.credentials.email)
                //         SessionService.getRoles($scope.credentials.email)
                //         // SessionService.getPermissions($scope.credentials.email)
                //
                //         $state.go("users", {});
                //     })
                //     .catch(function(error)
                //     {
                //         console.log(error); // TO-DO: Handle error properly (how?)
                //         window.alert("Login failed: email or password are incorrect")
                //     });
                // };
            }
        ]);
})();
