(function(){

    "use strict";

    angular
        .module("learnary")
        .controller("SignupCtrl", ["$scope", "$auth", "$state",
            function SignupCtrl($scope, $auth, $state)
            {
                var self = this;

                self.signup = function()
                {
                    $auth.signup($scope.credentials).then(function(response)
                    {
                        console.log(response);
                        $state.go("users", {});
                    })
                    .catch(function(error)
                    {
                        console.log(error); // TO-DO: Handle error properly (how?)
                        window.alert("Login failed - email or password are incorrect")
                    });
                };
            }
        ]);
})();
