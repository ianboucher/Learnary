<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\User;
use App\Role;

class RolesController extends Controller
{
    // public function __construct()
    // {
    //     // Apply the jwt.auth middleware to all methods in this controller
    //     $this->middleware('jwt.auth');
    // }


    public function create(Request $request)
    {
        $role = new Role();
        $role->name = $request->get('name');
        $role->save();

        return response()->json('created');
    }

    // TODO: are there verbs compatible with REST that could be used here?

    public function assign(Request $request)
    {
        $user = User::where('email', '=', $request->get('email'))->first();
        $role = Role::where('name', '=', $request->get('role'))->first();

        $user->roles()->attach($role->id);

        return response()->json('created');
    }


    public function check(Request $request)
    {
        $user = User::where('email', '=', $request->input('email'))->first();
        // Log::info($user);

        return response()->json([
            // "user" => $user,
            'admin'     => $user->hasRole('admin'),
            'staff'     => $user->hasRole('staff'),
            'student'   => $user->hasRole('student')
        ]);
    }

    // TODO: is there a method for changing roles once assigned?
}
