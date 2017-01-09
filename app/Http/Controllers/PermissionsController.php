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

    public function store(Request $request)
    {
        $permission = new Permission();
        $permission->name         = $request->input('permission.name');
        $permission->display_name = $request->input('permission.display_name');
        $permission->description  = $request->input('permission.description');
        $permission->save();

        return response()->json(compact('permission'));
    }


    // TODO: are there verbs compatible with REST that could be user here?

    public function update(Request $request, $id)
    {
        $permission = Permission::findOrFail($id);
        $permission->name         = $request->input('permission.name');
        $permission->display_name = $request->input('permission.display_name');
        $permission->description  = $request->input('permission.description');
        $permission->save();

        return response()->json(compact('permission'));
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

    /**
     * Remove the specified Permission from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy(Request $request, $id)
    {
        $role = Permission::findOrFail($id);
        $role->delete();

        return 'Role successfully deleted';
    }
}
