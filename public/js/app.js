(function()
{
    "use strict";

    angular
        .module("learnary", ["ui.router", "ui.bootstrap"])
        .config(function ($stateProvider, $locationProvider)
        {
            $locationProvider
                .html5Mode
                ({
                    "enabled": true,
                    "requireBase": false
                });

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
                        "templateUrl" : "js/auth/login.html"//,
                        // "onEnter"     : ["$state", "Auth", function($state, Auth)
                        //                 {
                        //                     Auth.currentUser().then(function ()
                        //                     {
                        //                         $state.go("landing");
                        //                     });
                        //                 }]
                    }
                )
                .state
                (
                    "signup",
                    {
                        "url"         : "/signup",
                        "controller"  : "AuthCtrl as auth",
                        "templateUrl" : "js/auth/signup.html"//,
                        // "onEnter"     : ["$state", "Auth", function ($state, Auth)
                        //                 {
                        //                     Auth.currentUser().then(function ()
                        //                     {
                        //                         $state.go("landing");
                        //                     });
                        //                 }]
                    }
                )

        })
})();
