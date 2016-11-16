<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\User;

class AuthenticateController extends Controller
{
    public function __construct()
    {
        // Apply the jwt.auth middleware to all methods in this controller
        // except for the authenticate method. We don't want to prevent
        // the user from retrieving their token if they don't already have it
        $this->middleware('jwt.auth', ['except' => ['signup', 'login']]);
    }

    public function index()
    {
        $users = User::all();
        return $users;
    }


    public function signup(Request $request)
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

    public function createRole(Request $request)
    {
        $role = new Role();
        $role->name = $request->get('name');
        $role->save();

        return response()->json('created');
    }

    public function createPermission(Request $request)
    {
        $permission = new Permission();
        $permission->name = $request->get('name');
        $permission->save();

        return response()->json('created')
    }

    public function assignRole(Request $request)
    {
        $user = User::where('email', '=', $request->get('email'))->first();
        $role = Role::where('name', '=', $request->get('role'))->first();

        $user->roles()->attach($role->id);

        return response()->json('created');
    }

    public function attachPermission(Request $request)
    {
        $role = Role::where('name', '=', $request->get('role'))->first();
        $permission = Permission::where('name', '=', $request->get('name'))->first();

        $role->attachPermission($permission);

        return response()->json('created');
    }
}
