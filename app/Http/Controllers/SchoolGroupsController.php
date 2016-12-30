<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\School;
use App\Group;

class SchoolGroupsController extends Controller
{
    /**
     * Update/change the association between School and Groups.
     *
     * @param  int  $id
     * @param  Request $request
     * @return Response
     */
    public function update(Request $request, $id)
     {
        $school = School::findOrFail($id);
        $groups = Group::find($request->input('groups'));

        $school->groups()->saveMany($groups);

        // QUESTION: No sync method available for hasMany, so had to dissociate
        // each group from the other side of the relationship. Is there a better
        // way?

        Group::where('school_id', $school->id)->get()->diff($groups)->each(function($group)
        {
            $group->school()->dissociate();
            $group->save();
        });

        // TODO: Some error checking would be nice...

        return response()->json($groups);
    }
}
