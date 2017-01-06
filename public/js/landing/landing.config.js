(function()
{
    "use strict";

    angular
        .module("learnary.landing")
        .config(function ($stateProvider, $locationProvider)
        {
            $locationProvider
                .html5Mode
                ({
                    "enabled"     : true,
                    "requireBase" : false
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
                );
        })
})();
