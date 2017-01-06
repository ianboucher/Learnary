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
            // Add previous state to ui-router's $state to enable a 'back' redirect
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState)
            {
                $state.previous = fromState;
            });
        })
})();
