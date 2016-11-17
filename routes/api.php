<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:api');

// API ROUTES ==================================
Route::group(["prefix" => "v1.0.0"], function()
{
    // Entrust provides route filters like the following (see docs):
    // Entrust::routeNeedsPermission('admin/post*', 'create-post');
    // Entrust::routeNeedsRole('admin/advanced*', 'owner');

    Route::post('signup', 'UsersController@create');
    Route::get('users/show', 'UsersController@show');

    Route::post('login', 'AuthenticateController@login');

    Route::put('roles', 'RolesController@create');
    Route::post('roles', 'RolesController@assign');
    Route::get('roles', 'RolesController@check');

    Route::put('permissions', 'PermissionsController@create');
    Route::post('permissions', 'PermissionsController@attach');
    Route::get('permissions', 'PermissionsController@check');
});


// TODO: the following method of protecting routes with Entrust's 'ability' should
// work, but middleware has been modified to use JWT, so not sure if that is preventing it

// Route::group(["prefix" => "v1.0.0", "middleware" => ['ability:admin,listUsers']], function()
// {
//     Route::get('users', 'UsersController@index');
// });
