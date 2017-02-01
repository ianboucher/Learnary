(function()
{
    "use strict";

    angular
        .module("learnary")
        .service("GameService", [

            "$http",
            "SessionService",

            function GameService($http, SessionService)
            {
                var self    = this,
                    user    = SessionService.currentUser,
                    session = SessionService.currentSession,
                    game    = {};


                self.storeNewGame = function(gameName)
                {
                    self.gameName = gameName;
                    $http.post("api/v1.0.0/users/" + user.id + "/sessions/" + session.id + "/games", {
                        "name" : gameName
                    })
                    .then(function(newGame)
                    {
                        game = newGame.data;
                    })
                    .catch(function(error)
                    {
                        self.error = error;
                        console.log(self.error); // TODO: handle error properly
                    });
                };


                self.saveGameStats = function(stats)
                {
                    game.stats = stats;
                    $http.put("api/v1.0.0/users/" + user.id + "/sessions/" + session.id + "/games/" + game.id, game)
                };


                self.gamesWon = function()
                {

                };

                self.game = game;
                return self;
            }
        ])
})();
