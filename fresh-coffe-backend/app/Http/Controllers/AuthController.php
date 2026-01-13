<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {

        $data = $request->validated();

        //Create User
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);
        return [
            'token' => $user->createToken('token')->plainTextToken,
            'user' => $user
        ];
    }
    public function login(LoginRequest $request)
    {

        $data = $request->validated();

        //   Check password

        if (!Auth::attempt($data)) {
            return  response([
                'errors' => ['Incorrect email and password'],
            ], 422);
        }

        //auth user

        $user = Auth::user();
        return [
            'token' => $user->createToken('token')->plainTextToken,
            'user' => $user
        ];
    }

    public function logout(Request $request)
{
    /** @var User|null $user */
    $user = $request->user();

    /** @var PersonalAccessToken|null $token */
    $token = $user?->currentAccessToken();

    $token?->delete();

    return response()->json([
        'user' => null
    ]);
}
}
