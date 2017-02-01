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
                        "menu",
                        {
                            "url"         : "/menu",
                            "controller"  : "GameMenuCtrl as menu",
                            "templateUrl" : "js/games/game-menu.html"
                        }
                    )
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
