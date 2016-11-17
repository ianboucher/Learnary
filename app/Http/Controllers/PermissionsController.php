<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\User;
use App\Role;
use App\Permission;
// use Log;

class PermissionsController extends Controller
{
    // public function __construct()
    // {
    //     // Apply the jwt.auth middleware to all methods in this controller
    //     $this->middleware('jwt.auth');
    // }

    public function create(Request $request)
    {
        $permission = new Permission();
        $permission->name = $request->get('name');
        $permission->save();

        return response()->json('created');
    }


    // TODO: are there verbs compatible with REST that could be user here?

    public function attach(Request $request) // TODO: is there a verb compatible with REST that could be user here?
    {
        $role = Role::where('name', '=', $request->get('role'))->first();
        $permission = Permission::where('name', '=', $request->get('permission'))->first();

        $role->attachPermission($permission);

        return response()->json('created');
    }


    public function check(Request $request)
    {
        $user = User::where('email', '=', $request->input('email'))->first();
        // Log::info($user);

        return response()->json([
            // "user" => $user,
            'editUser'  => $user->can('editUser'),
            'listUsers' => $user->can('listUsers'),
            'creatItems' => $user->can('createItems')
        ]);
    }

    // TODO: is there a method for revoking permissions?
}
