<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Group;
use App\User;

class GroupUsersController extends Controller
{

    /**
     * Update/change the association between User and Group.
     *
     * @param  int  $userId
     * @param  int  $groupId
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $group = Group::findOrFail($id);
        $users = User::find($request->input('users'));

        $group->users()->saveMany($users);

        // QUESTION: No sync method available for hasMany, so had to dissociate
        // each group from the other side of the relationship. Is there a better
        // way?

        User::where('group_id', $group->id)->get()->diff($users)->each(function($user)
        {
            $user->group()->dissociate();
            $user->save();
        });

        // TODO: Some error checking would be nice...

        return response()->json($users);
    }

}
