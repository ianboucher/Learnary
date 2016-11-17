<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\User;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;


class UsersController extends Controller
{
    public function __construct()
    {
        // Apply the jwt.auth middleware to all methods in this controller
        // except for the 'create' method.
        // TODO: Should the user be issued a token and logged-in upon sign-up,
        // or would it be preferable to direct them to a login page?
        $this->middleware('jwt.auth', ['except' => ['create']]);
    }


    public function index()
    {
        $users = User::all();
        return $users;
    }


    public function create(Request $request)
    {
        $credentials = [
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => bcrypt($request->get('password'))
        ];

        try
        {
            $user = User::create($credentials);
        }
        catch (JWTException $error)
        {
            return response()->json(['error' => 'User already exists'], HttpResponse::HTTP_CONFLICT);
        }

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('token'));
    }
}
