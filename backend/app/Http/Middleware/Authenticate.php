<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if (!$request->expectsJson()) {
            return response()->json(['error' => 'Unauthenticated.'], ResponseAlias::HTTP_UNAUTHORIZED);
        }
    }
}
