<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NotificationController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [App\Http\Controllers\AuthController::class, 'login']);
Route::post('/logout', [App\Http\Controllers\AuthController::class, 'logout']);
Route::post('/register', [App\Http\Controllers\AuthController::class, 'register']);
Route::apiResource('notifications', NotificationController::class);
Route::patch('/notifications/{id}/views', [NotificationController::class, 'incrementViews']);
