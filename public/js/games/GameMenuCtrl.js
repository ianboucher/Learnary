(function()
{
    "use strict";

    angular
        .module("learnary.games")
        .controller("GameMenuCtrl", [

            "$scope",
            "GameService",

            function GameMenu($scope, GameService)
            {
                self = this;

                self.newGame = function(gameName)
                {
                    GameService.storeNewGame(gameName)
                }
            }
        ]);
})();
