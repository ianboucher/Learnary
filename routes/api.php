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

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

// API ROUTES ================================== add api version to Route::group
Route::group(["prefix" => "/v1.0.0"], function() {

    Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
    Route::post('signup', 'AuthenticateController@signup');
    Route::post('login', 'AuthenticateController@login');

});
