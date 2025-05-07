<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validate input
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6'
        ]);

        // Create user
        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password), // encrypt password
            'role'     => 'user' // default role
        ]);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user
        ]);
    }


    public function login(Request $request)
    {
        // Input check
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);
    
        // Email match panna user-a find pannurathu
        $user = User::where('email', $request->email)->first();
    
        // User illainna or password wrong-na
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }
    
        // Sanctum token generate pannurathu
        $token = $user->createToken('auth_token')->plainTextToken;
    
        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user
        ]);
    }
    

}
