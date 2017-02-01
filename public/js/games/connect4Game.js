(function()
{
    "use strict";

    angular
        .module("learnary.games")
        .directive("connect4Game", [
            function connect4Game ()
            {
                var nToWin = 4, nCols = 7, nRows = 6, player = 1, nMoves = 0;

                var initializeBoard = function ()
                {
                    var array  = [];

                    for (var i = 0; i < nCols; i += 1)
                    {
                        array.push(Array(nRows).fill(0));
                    }

                    return array;
                };


                var checkHorizontal = function (board, player, currentCol, currentRow)
                {
                    var counter = 0, result  = false;

                    for (var i = 0; i < nCols; i += 1)
                    {
                        if (board[i][currentRow] === player)
                        {
                            counter += 1;
                        }
                        else
                        {
                            counter = 0;
                        }

                        if (counter === nToWin)
                        {
                            result = true;
                            break;
                        }
                    }

                    return result;
                };


                var checkVertical = function (board, player, currentCol, currentRow)
                {
                    var counter = 0, result  = false;

                    for (var i = 0; i < nCols; i += 1)
                    {
                        if (board[currentCol][i] === player)
                        {
                            counter += 1;
                        }
                        else
                        {
                            counter = 0;
                        }

                        if (counter === nToWin)
                        {
                            result = true;
                            break;
                        }
                    }

                    return result;
                };


                var checkDiagonal = function (board, player, currentCol, currentRow, gradient)
                {
                    var startPos = findDiagonalStart(currentCol, currentRow, gradient),
                        startCol = startPos[0],
                        startRow = startPos[1],
                        i = 0, counter = 0, result = false;

                    while ((startCol + i) < nCols && startRow + (i * gradient) < nRows)
                    {
                        var cellValue = board[startCol + i][startRow + (i * gradient)];

                        if (board[startCol + i][startRow + (i * gradient)] === player)
                        {
                            counter += 1;
                        }
                        else
                        {
                            counter = 0;
                        }

                        if (counter === nToWin)
                        {
                            result = true;
                            break;
                        }

                        i += 1;
                    }

                    return result;
                };


                // knowing that the 'gradient' of the diagonal must be 1 or -1,
                // we can use 'straight line' equation, y = mx - b, to determine
                // start element of current diagonal...

                var findDiagonalStart = function (currentCol, currentRow, gradient)
                {
                    var yIntercept = currentRow - (gradient * currentCol),
                        startCol, startRow;

                    if (yIntercept < 0)
                    {
                        startRow = 0;
                        startCol = 0 - yIntercept;
                    }
                    else if (yIntercept > nRows)
                    {
                        startRow = nRows;
                        startCol = yIntercept - nRows;
                    }
                    else
                    {
                        startRow = yIntercept;
                        startCol = 0;
                    }

                    return [startCol, startRow]
                };


                var checkForWin = function (board, player, currentCol, currentRow)
                {
                    var result = false;

                    result = checkHorizontal (board, player, currentCol, currentRow)  ||
                             checkVertical (board, player, currentCol, currentRow)    ||
                             checkDiagonal (board, player, currentCol, currentRow,  1)||
                             checkDiagonal (board, player, currentCol, currentRow, -1);

                    return result;
                };


                var changePlayer = function()
                {
                    player = (player === 1) ? 2 : 1;
                };
//
// =============================================================================
//
                return {
                    "template" :    '<div class="board">' +
                                        '<div class="column" ng-repeat="column in board track by $index" ng-click="dropToken($index)">' +
                                            '<div ng-repeat="token in column track by $index" ng-style="setDiscColor(token)" class="disc"></div>' +
                                        '</div>' +
                                    '</div>',
                    "replace"  : true,
                    "restrict" : "EAC",
                    link       : function (scope, element, attributes)
                    {
                        scope.gameName = "Connect4";
                        scope.winner;
                        scope.gameStats = {};
                        // scope.nWinsPlayer1 = 0,
                        // scope.nWinsPlayer2 = 0;

                        (scope.newGame = function()
                        {
                            scope.winner = null;
                            scope.board = initializeBoard()
                        })();


                        scope.dropToken = function(col)
                        {
                            var emptyRow = scope.board[col].lastIndexOf(0);

                        	if (emptyRow >= 0 && !scope.winner)
                        	{
                        		scope.board[col][emptyRow] = player;
                        		nMoves += 1;
                        	};

                        	if (nMoves > 6)
                        	{
                        		if (checkForWin(scope.board, player, col, emptyRow))
                                {
                                    scope.winner = player;
                                    scope.gameStats.win    = (player === 1) ? true : false;
                                    scope.gameStats.nMoves = nMoves;
                                    scope.$broadcast("game end")
                                };
                        	};

                        	changePlayer();
                        };


                        scope.setDiscColor = function(value)
                        {
                            var style = { "backgroundColor" : "white" };

                            if (value === 1)
                            {
                                style = { "backgroundColor" : "red" };
                            }
                            else if (value === 2)
                            {
                                style = { "backgroundColor" : "yellow" };
                            }

                            return style;
                        };
                    }
                }
            }
        ]);
})();
