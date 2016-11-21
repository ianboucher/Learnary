<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\User;
use App\Role;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class RolesController extends Controller
{
    public function __construct()
    {
        // Apply the jwt.auth middleware to all methods in this controller
        $this->middleware('jwt.auth');
    }


    public function create(Request $request)
    {
        $role = new Role();
        $role->name = $request->get('name');
        $role->save();

        return response()->json('Role created');
    }

    // TODO: are there verbs compatible with REST that could be used here?

    public function assign(Request $request)
    {
        // $user = User::where('email', '=', $request->get('email'))->first();
        $user = JWTAuth::parseToken()->authenticate();
        $role = Role::where('name', '=', $request->get('role'))->first();

        $user->roles()->attach($role->id);

        return response()->json('Role assigned');
    }


    public function check(Request $request)
    {
        // $user = User::where('email', '=', $request->input('email'))->first();

        // TODO: Decide if JWTAuth error checking is unecessary here as it is
        // performed on the User before roles/permissions are requested by the
        // client.
        $user = JWTAuth::parseToken()->authenticate();

        return response()->json(array_filter([
            'admin'     => $user->hasRole('admin'),
            'staff'     => $user->hasRole('staff'),
            'student'   => $user->hasRole('student')
        ]));
    }

    // QUESTION: is there a method for changing roles once assigned?
}
