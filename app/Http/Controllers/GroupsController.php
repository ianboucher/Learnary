<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Group;
use App\School;

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
    public function store(Request $request)
    {
        if ($request->has('group.school'))
        {
            $school = School::where('name', '=', $request->input('group.school'))->first();
            $group  = $school->groups()->create(['name' => $request->input('group.name')]);
        }
        else
        {
            $group       = new Group();
            $group->name = $request->input('group.name');
        }

        $group->save();

        return response()->json($group);
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
        $group->name = $request->input('group.name');

        if ($request->has('group.school'))
        {
            $school = School::where('name', '=', $request->input('group.school'))->first();
            $group->school()->associate($school);
        }

        $group->save();

        return response()->json($group);
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
