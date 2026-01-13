<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    })->middleware('auth:sanctum');
    Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);
    //almacenar orders
    Route::apiResource('orders', OrderController::class);

    // Route::get('/categories', [CategoryController::class,'index']);

    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('products', ProductController::class);

    });
    
// Auth

Route::post('register', [AuthController::class, 'register']);

Route::post('login', [AuthController::class, 'login']);
