<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Exception;
use Illuminate\Auth\Events\Login;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Testing\Fluent\Concerns\Has;
use Spatie\Permission\Models\Role;

class AuthController extends Controller
{
    /**
     * @param  RegisterRequest  $request
     * @return JsonResponse
     */
    public function register(RegisterRequest $request)
    {
        try {
            $input = $request->all();
            $user = User::create([
                'name'     => $input['name'],
                'email'    => $input['email'],
                'password' => Hash::make($input['password']),
            ]);
            $role = Role::where('name', 'user')->first();
            $user->assignRole($role['name']);

            return $this->sendSuccess('User has been registered successfully.');
        } catch (Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }

    /**
     * @param  LoginRequest  $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request)
    {
        try {
            $input = $request->all();
            $user = User::with('roles')->where('email', $input['email'])->first();
            if (empty($user)) {
                return $this->sendError('Invalid email or password.');
            }
            if (! Hash::check($input['password'], $user['password'])) {
                return $this->sendError('Invalid email or password.');
            }
            $data = [
                'token' => $user->createToken("API TOKEN")->plainTextToken,
                'data'  => $user,
            ];

            return $this->sendResponse('User Login successfully.', $data);
        } catch (Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }

    /**
     * @return JsonResponse
     */
    public function profile()
    {
        $user = User::with('roles')->where('id', auth()->id())->first();

        return $this->sendResponse('User profile retrieve successfully.', $user);
    }

    /**
     * @return JsonResponse
     */
    public function logout()
    {
        auth()->user()->tokens()->delete();

        return $this->sendSuccess('User Logout Successfully.');
    }

    /**
     * @param  Request  $request
     * @return JsonResponse
     */
    public function updateProfile(Request $request)
    {
        $input = $request->all();
        auth()->user()->update([
            'name'  => $input['name'],
            'email' => $input['email'],
        ]);
        
        return $this->sendSuccess('User Profile Updated Successfully.');
    }
}
