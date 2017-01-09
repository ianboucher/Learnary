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
                var self = this;

                self.createSession = function()
                {
                    console.log(SessionService.currentUser);
                };

                self.saveSession = function()
                {

                };

                self.endSession = function()
                {

                };

                self.gamesWon = function()
                {

                };

                return self;
            }
        ])
})();
