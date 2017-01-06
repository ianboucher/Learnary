(function()
{
    "use strict";

    angular
        .module("learnary")
        .config([
            "$urlRouterProvider",

            function ($urlRouterProvider)
            {
                // Redirect to the login state if invalid route is entered
                $urlRouterProvider.otherwise("/login");
            }
        ]);
})();
