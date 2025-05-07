<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;

// ✅ Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/products', [ProductController::class, 'index']); // View products

// ✅ Protected routes
Route::middleware('auth:sanctum')->group(function () {

    // ✅ User info
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // ✅ Logout
    Route::post('/logout', function (Request $request) {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    });

    // ✅ Admin check
    Route::get('/admin-check', function (Request $request) {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Access denied. You are not admin'], 403);
        }
        return response()->json(['message' => 'Welcome Admin!']);
    });

    // ✅ Category routes
    Route::post('/categories', [CategoryController::class, 'store']); // Only admin
    Route::get('/categories', [CategoryController::class, 'index']);  // All users

    // ✅ Product routes
    Route::post('/products', [ProductController::class, 'store']);       // Admin only
    Route::put('/products/{id}', [ProductController::class, 'update']);  // Admin only
    Route::delete('/products/{id}', [ProductController::class, 'destroy']); // Admin only

    // ✅ Cart routes
    Route::post('/cart', [CartController::class, 'addToCart']);
    Route::get('/cart', [CartController::class, 'getCartItems']);
    Route::put('/cart/{id}', [CartController::class, 'updateCartItem']);
    Route::delete('/cart/{id}', [CartController::class, 'removeCartItem']);
});
