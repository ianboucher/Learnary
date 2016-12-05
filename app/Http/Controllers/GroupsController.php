<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Group;

class GroupsController extends Controller
{
    /**
     * Display a listing of the all registered Groups.
     *
     * @return Response
     */
    public function index()
    {
        return Group::with('users', 'school')->get();
    }

    /**
     * Store a newly created 'Group' in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request, $school_id)
    {
        $school = School::find($school_id);

        $group = $school->groups()->create(['name' => $request->input('name')]);
        $group->save();

        return 'Group created successfully with id '. $group->id;
    }

    /**
     * Display the specified Group.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        return Group::find($id);
    }

    /**
     * Update the specified Group in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $group = Group::find($id);

        $group->name = $request->input('name');
        $group->save();

        return 'Group # '. $group->id . ' successfully updated';
    }


    /**
     * Remove the specified Group from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy(Request $request, $id)
    {
        $group = Group::find($id);

        $group->delete();

        return 'Group # '. $group->id . ' successfully deleted';
    }
}
