(function()
{
    "use strict";

    angular
        .module("learnary.games")
        .config([

            "$stateProvider",
            "$locationProvider",

            function ($stateProvider, $locationProvider)
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
                        "play",
                        {
                            "url"         : "/play",
                            "controller"  : "PlayCtrl as play",
                            "templateUrl" : "js/games/play.html"
                        }
                    )
            }
        ])
})();
