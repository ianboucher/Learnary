<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use App\Group;

class UserGroupsController extends Controller
{
    /**
     * Update/change the association between User and Group.
     *
     * @param  int  $userId
     * @param  int  $groupId
     * @return Response
     */
    public function update($userId, $groupId)
    {
        $user  = User::findOrFail($userId);
        $group = Group::with('school')->findOrFail($groupId);

        $user->group()->associate($group);
        $user->save();

        return response()->json($group);
    }
}
