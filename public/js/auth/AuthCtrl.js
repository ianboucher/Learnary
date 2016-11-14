(function(){

    "use strict";

    angular
        .module("learnary")
        .controller("AuthCtrl", ["$auth", "$state",
            function AuthCtrl($auth, $state)
            {
                var self = this;

                self.login = function()
                {
                    var credentials = {
                        "email"    : self.email,
                        "password" : self.password
                    };

                    $auth.login(credentials).then(function(response)
                    {
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
