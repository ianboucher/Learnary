(function(){

    "use strict";

    angular
        .module("learnary")
        .controller("LoginCtrl", ["$scope", "$rootScope", "$auth", "$state",
            function LoginCtrl($scope, $rootScope, $auth, $state)
            {
                var self = this;

                self.login = function()
                {
                    $auth.login($scope.credentials).then(function(response)
                    {
                        $rootScope.$broadcast("login", $scope.credentials);
                        $state.go("users", {});
                    })
                    .catch(function(error)
                    {
                        console.log(error); // TO-DO: Handle error properly (how?)
                        window.alert("Login failed: email or password are incorrect")
                    });
                };
            }
        ]);
})();
