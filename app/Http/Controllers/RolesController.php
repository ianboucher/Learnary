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


    public function index()
    {
        $roles = Role::with('perms')->get();
        return $roles;
    }


    public function store(Request $request)
    {
        $role = new Role();
        $role->name         = $request->input('role.name');
        $role->display_name = $request->input('role.display_name');
        $role->description  = $request->input('role.description');
        $role->save();

        return response()->json('Role created');
    }


    /**
     * Update the specified Role in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $role = Role::findOrFail($id);
        $role->name         = $request->input('role.name');
        $role->display_name = $request->input('role.display_name');
        $role->description  = $request->input('role.description');
        $role->save();

        return $role;

        // return 'Role '. $role->name . ' successfully updated';
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


    /**
     * Remove the specified Role from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy(Request $request, $id)
    {
        $role = Role::findOrFail($id);
        $role->delete();

        return 'Role successfully deleted';
    }
}
