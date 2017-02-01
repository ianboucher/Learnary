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

                $scope.gameName = GameService.gameName;

                self.newGame = function()
                {
                    $scope.newGame()
                    GameService.storeNewGame($scope.gameName)
                }

                $scope.$on("game end", function()
                {
                    console.log($scope.gameStats);
                    GameService.saveGameStats($scope.gameStats);
                })
            }
        ]);
})();
