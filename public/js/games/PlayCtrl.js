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

                self.start = function()
                {
                    $scope.step()
                    GameService.storeNewGame($scope.gameName)
                }

                $scope.$on('game end', function()
                {
                    GameService.saveScore($scope.playerScore);
                })
            }
        ]);
})();
