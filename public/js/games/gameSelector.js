(function()
{
    "use strict";

    angular
    .module("learnary.games")
    .directive("gameSelector", ["$compile",
        function($compile)
        {
            // Gratefully stolen from: http://www.codelord.net/2015/05/19/angularjs-dynamically-loading-directives/
            
            return {
                // scope: {
                //     gameName: '='
                // },
                link: function(scope, element)
                {
                    var gameName = scope.gameName.toLowerCase() + "-game";
                    var generatedTemplate = "<" + gameName + "></" + gameName + ">"

                    element.append($compile(generatedTemplate)(scope));
                }
            };
        }
    ]);
})();
