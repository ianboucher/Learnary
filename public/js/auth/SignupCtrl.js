(function(){

    "use strict";

    angular
        .module("learnary")
        .controller("SignupCtrl", ["$auth", "$state",
            function SignupCtrl($auth, $state)
            {
                var self = this;

                self.signup = function()
                {
                    var credentials = {
                        "name"     : self.username,
                        "email"    : self.email,
                        "password" : self.password
                    };

                    $auth.signup(credentials).then(function(response)
                    {
                        console.log(response.config.url);
                        $state.go("users", {});
                    })
                    .catch(function(error)
                    {
                        console.log(error); // TODO: Handle error properly (how?)
                        window.alert("Signup failed - email or password are incorrect")
                    });
                };
            }
        ]);
})();
