<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Role;

class UserRolesController extends Controller
{
    /**
     * Update/change the association between User and Role.
     *
     * @param  int  $id
     * @param  Request $request
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $user    = User::findOrFail($id);
        $roleIds = $request->get('roles');
        $user->roles()->sync($roleIds);

        return response()->json($user->roles);
    }
}
