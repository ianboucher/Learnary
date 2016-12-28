<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Permission;
use App\Role;

class PermissionRolesController extends Controller
{
    /**
     * Update/change the association between Permission and Roles.
     *
     * @param  int  $id
     * @param  Request $request
     * @return Response
     */
     public function update(Request $request, $id)
     {
         $permission = Permission::findOrFail($id);
         $role_ids   = $request->get('roles');
         $permission->roles()->sync($role_ids);

         return response()->json($permission->roles);
     }
}
