(function()
{
    "use strict";

    angular
        .module("learnary", ["ui.router", "ui.bootstrap", "satellizer"])
        .config(function ($stateProvider, $locationProvider, $authProvider, $urlRouterProvider)
        {
            $locationProvider
                .html5Mode
                ({
                    "enabled": true,
                    "requireBase": false
                });

            // Satellizer configuration that specifies which API
            // route the JWT should be retrieved from
            $authProvider.loginUrl = "/api/v1.0.0/authenticate";

            // Redirect to the auth state if any other states
            // are requested other than users
            $urlRouterProvider.otherwise("/login");

            $stateProvider
                .state
                (
                    "landing",
                    {
                        "url"         : "/",
                        "controller"  : "LandingCtrl as landing",
                        "templateUrl" : "js/landing/landing.html"
                    }
                )
                .state
                (
                    "login",
                    {
                        "url"         : "/login",
                        "controller"  : "AuthCtrl as auth",
                        "templateUrl" : "js/auth/login.html"
                    }
                )
                .state
                (
                    "signup",
                    {
                        "url"         : "/signup",
                        "controller"  : "AuthCtrl as auth",
                        "templateUrl" : "js/auth/signup.html"
                    }
                )
                .state
                (
                    "users",
                    {
                        "url"         : "/users",
                        "controller"  : "UserCtrl as users",
                        "templateUrl" : "js/user/users.html"
                    }
                )
        })
})();
