<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Session;
use App\User;

class SessionsController extends Controller
{
    /**
     * Return a listing of all Sessions.
     *
     * @return Response
     */
    public function index()
    {
        return Session::get();
    }

    /**
     * Store a newly created 'Session' in storage.
     *
     * @param  Request  $request
     * @param  int $userId
     * @return Response
     */
    public function store(Request $request, $userId)
    {
        $user    = User::findOrFail($userId);
        $session = $user->sessions()->create([]);

        $session->save();

        return response()->json($session);
    }

    /**
     * Display the specified Session.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        return Session::find($id);
    }

    /**
     * Update the specified Session in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $session = Session::find($id);

        // TODO: Define session parameters to be updated and retrieve from Request

        $group->save();

        return response()->json($group);
    }


    /**
     * Remove the specified Session from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy(Request $request, $id)
    {
        $group = Session::find($id);

        $group->delete();

        return 'Session # '. $session->id . ' successfully deleted';
    }
}
