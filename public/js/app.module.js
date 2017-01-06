(function()
{
    "use strict";

    angular
        .module("learnary", [

            // 3rd Party Modules
            "ui.router",
            "ui.bootstrap",
            "satellizer",

            // Custom Modules
            "learnary.landing",
            "learnary.admin",
            "learnary.auth",
            "learnary.orientation",
            // "learnary.shared" (modals?, nav?)
        ])
        .run(function ($rootScope, $state)
        {
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState)
            {
                $state.previous = fromState;
            });
        })
})();
