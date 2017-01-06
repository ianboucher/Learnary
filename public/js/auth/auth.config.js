(function()
{
    "use strict";

    angular
        .module("learnary.auth")
        .config(function ($stateProvider, $locationProvider, $authProvider, $urlRouterProvider)
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


            // Redirect to the auth state if any other states
            // are requested other than users
            $urlRouterProvider.otherwise("/login");

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
        })
})();
