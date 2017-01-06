(function()
{
    "use strict";

    angular
        .module("learnary.auth")
        .config([
            "$stateProvider",
            "$locationProvider",
            "$authProvider",

            function AuthConfig($stateProvider, $locationProvider, $authProvider)
            {
                $locationProvider
                    .html5Mode
                    ({
                        "enabled"     : true,
                        "requireBase" : false
                    });

                // Satellizer configuration that specifies which API
                // route the JWT should be retrieved from
                $authProvider.loginUrl  = "/api/v1.0.0/login";
                $authProvider.signupUrl = "/api/v1.0.0/signup";

                $stateProvider
                    .state
                    (
                        "login",
                        {
                            "url"         : "/login",
                            "controller"  : "LoginCtrl as login",
                            "templateUrl" : "js/auth/login.html"
                        }
                    )
                    .state
                    (
                        "signup",
                        {
                            "url"         : "/signup",
                            "controller"  : "SignupCtrl as signup",
                            "templateUrl" : "js/auth/signup.html"
                        }
                    )
            }
        ])
})();
