(function()
{
    "use strict";

    angular
        .module("learnary.orientation")
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
                        "orientation",
                        {
                            "url"         : "/orientation",
                            "controller"  : "OrientationCtrl as orientation",
                            "templateUrl" : "js/orientation/orientation.html"
                        }
                    )
            }
        ])
})();
