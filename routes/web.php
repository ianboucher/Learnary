<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function() {
    return view('index');
});

// CATCH ALL ROUTE =======================================================
// all routes that are not home or api will be redirected to the frontend
// this allows angular to route them
Route::any('{undefinedRoute}', function ($undefinedRoute) {
    return view('index');
})->where('undefinedRoute', '([A-z\d-\/_.]+)?');
