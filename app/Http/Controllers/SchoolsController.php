<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\School;

class SchoolsController extends Controller
{

    /**
     * Display a listing of the all registered Schools.
     *
     * @return Response
     */
    public function index()
    {
        return School::with('groups')->get();
    }

    /**
     * Store a newly created 'School' in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        $school = new School;

        $school->name = $request->input('name');
        $school->save();

        return 'School created successfully with id '. $school->id;
    }

    /**
     * Display the specified School.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        return School::find($id);
    }

    /**
     * Update the specified School in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $school = School::find($id);

        $school->name = $request->input('name');
        $school->save();

        return 'School # '. $school->id . ' successfully updated';
    }


    /**
     * Remove the specified School from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy(Request $request, $id)
    {
        $school = School::find($id);

        $school->delete();

        return 'School # '. $school->id . ' successfully deleted';
    }
}
