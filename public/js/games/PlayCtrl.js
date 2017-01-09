(function()
{
    "use strict";

    angular
        .module("learnary.games")
        .controller("PlayCtrl", [

            "$scope",
            "GameService",

            function PlayCtrl($scope, GameService)
            {
                self = this;

                GameService.createSession();
            }
        ]);
})();
