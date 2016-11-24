<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\User;
use App\Group;
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
        $users = User::with('roles')->get();
        return $users;
    }

    // QUESTION: How to I structure this method properly so that users can sign-up
    // either as individuals, or as part of a school/group?

    public function create(Request $request)
    {
        $credentials = [
            'name'     => $request->get('name'),
            'email'    => $request->get('email'),
            'password' => bcrypt($request->get('password'))
        ];

        if ($request->has('group'))
        {
            if ($group = Group::where('name', '=', $request->get('group'))->first());
            {
                try
                {
                    $user = $group->users()->create($credentials);
                }
                catch (JWTException $error)
                {
                    return response()->json(['error' => 'User already exists'], HttpResponse::HTTP_CONFLICT);
                }

                $token = JWTAuth::fromUser($user);

                return response()->json(compact('token'));
            }
        }

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



    public function show(Request $request)
    {
        try
        {
            if (! $user = JWTAuth::parseToken()->authenticate())
            {
                return response()->json(['user_not_found'], 404);
            }
        }
        catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $error)
        {
            return response()->json(['token_expired'], $error->getStatusCode());
        }
        catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $error)
        {
            return response()->json(['token_invalid'], $error->getStatusCode());
        }
        catch (Tymon\JWTAuth\Exceptions\JWTException $error)
        {
            return response()->json(['token_absent'], $error->getStatusCode());
        }

        // the token is valid and user has been found via the sub claim
        return response()->json(compact('user'));

    }
}
