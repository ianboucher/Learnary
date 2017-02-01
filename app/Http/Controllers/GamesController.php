<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Session;
use App\Game;

class GamesController extends Controller
{
    /**
     * Return a listing of all games.
     *
     * @return Response
     */
    public function index()
    {
        return Game::get();
    }

    /**
     * Store a newly created 'Game' in storage.
     *
     * @param  Request  $request
     * @param  int $userId
     * @return Response
     */
    public function store(Request $request, $userId, $sessionId)
    {
        $session = Session::findOrFail($sessionId);
        $game    = $session->games()->create(['name' => $request->get('name')]);

        $game->save();

        return response()->json($game);
    }

    /**
     * Display the specified Game.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($gameId)
    {
        return Game::find($id);
    }

    /**
     * Update the specified Game in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $userId, $sessionId, $gameId)
    {
        $game = Game::find($gameId);

        $game->name   = $request->input('name');
        $game->score  = $request->input('stats.score');
        $game->win    = $request->input('stats.win');
        $game->nMoves = $request->input('stats.nMoves');

        $game->save();

        return response()->json($game);
    }


    /**
     * Remove the specified Game from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy(Request $request, $gameId)
    {
        $game = Game::find($id);

        $game->delete();

        return 'Game # '. $game->id . ' successfully deleted';
    }
}
