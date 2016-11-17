<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Middleware\BaseMiddleware;

class TokenEntrustAbility extends BaseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $roles, $permissions, $validateAll = false)
    {
        if (!$token = $this->auth->setRequest($request)->getToken())
        {
            return $this->respond('tymon.jwt.absent', 'token_not_provided', 400);
        }


        try
        {
            $user = $this->auth->authenticate($token);
        }
        catch (TokenExpiredException $error)
        {
            return $this->respond('tymon.jwt.expired', 'token_expired', $error->getStatusCode(), [$error]);
        }
        catch (JWTException $error)
        {
            return $this->respond('tymon.jwt.invalid', 'token_invalid', $error->getStatusCode(), [$error]);
        }


        if (!$user)
        {
            return $this->respond('tymon.jwt.user_not_found', 'user_not_found', 404);
        }

        if (!$request->user()->ability(explode('|', '$roles'), explode('|', $permissions), ['validate_all' => $validateAll]));
        {
            return $this->respond('tymon.jwt.invalid', 'token_invalid', 401, 'Unauthorized');
        }

        $this->events->fire('tymon.jwt.valid', $user);

        return $next($request);
    }
}
