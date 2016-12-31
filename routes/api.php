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
    Route::get('users', 'UsersController@index');
    Route::post('users/{user}', 'UsersController@update');
    Route::delete('users/{user}', 'UsersController@destroy');

    Route::post('login', 'AuthenticateController@login');

    // Routes for standard CRUD operations on resources
    Route::resource('roles',       'RolesController');
    Route::resource('permissions', 'PermissionsController');
    Route::resource('schools',     'SchoolsController');
    Route::resource('groups',      'GroupsController');

    // Routes for managing relationships between resources
    Route::resource('users.groups',     'UserGroupsController');
    Route::resource('group-users',      'GroupUsersController');
    Route::resource('user-roles',       'UserRolesController');
    Route::resource('role-permissions', 'RolePermissionsController');
    Route::resource('permission-roles', 'PermissionRolesController');
    Route::resource('school-groups',    'SchoolGroupsController');
});


// TODO: the following method of protecting routes with Entrust's 'ability' should
// work, but middleware has been modified to use JWT, so not sure if that is preventing it

// Route::group(["prefix" => "v1.0.0", "middleware" => ['ability:admin,listUsers']], function()
// {
//     Route::get('users', 'UsersController@index');
// });
