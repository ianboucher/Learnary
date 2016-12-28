<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Role;
use App\Permission;

class RolePermissionsController extends Controller
{
    /**
     * Update/change the association between Role and Permission.
     *
     * @param  int  $id
     * @param  Request $request
     * @return Response
     */
     public function update(Request $request, $id)
     {
         $role          = Role::findOrFail($id);
         $permissionIds = $request->input('permissions');
         $role->perms()->sync($permissionIds);

         // TODO: Some error checking would be nice...

         return response()->json($role->perms);
     }
}
