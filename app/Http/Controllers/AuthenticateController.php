<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
// use Log;

class AuthenticateController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try
        {
            // verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials))
            {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        }
        catch (JWTException $error)
        {
            // error creating token
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        // if no errors are encountered, return a JWT
        return response()->json(compact('token'));
    }

    // TODO: Do I need 'logout' functionality on the backend?
}
