<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\User;
use App\Role;
use App\Permission;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
// use Log;

class PermissionsController extends Controller
{
    public function __construct()
    {
        // Apply the jwt.auth middleware to all methods in this controller
        $this->middleware('jwt.auth');
    }

    public function index()
    {
        $permissions = Permission::with('roles')->get();
        return $permissions;
    }

    public function create(Request $request)
    {
        $permission = new Permission();
        $permission->name        = $request->get('name');
        $permission->displayName = $request->get('display-name');
        $permission->description = $request->get('description');
        $permission->save();

        return response()->json(compact('permission'));
    }


    // TODO: are there verbs compatible with REST that could be user here?

    public function update(Request $request)
    {
        $role       = Role::where('name', '=', $request->get('role'))->first();
        $permission_ids = $request->get('permissions');
        $role->perms()->sync($permission_ids);

        // TODO: Some error checking would be nice...

        return response()->json($role->perms);
    }


    public function check(Request $request)
    {
        // $user = User::where('email', '=', $request->input('email'))->first();

        // TODO: Decide if JWTAuth error checking is unecessary here as it is
        // performed on the User before roles/permissions are requested by the
        // client.
        $user = JWTAuth::parseToken()->authenticate();

        return response()->json(array_filter([
            'editUser'   => $user->can('editUser'),
            'listUsers'  => $user->can('listUsers'),
            'creatItems' => $user->can('createItems')
        ]));
    }
    // TODO: is there a method for revoking permissions?
}
