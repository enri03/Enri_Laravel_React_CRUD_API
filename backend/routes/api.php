<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

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
//------------ User Route ------------
Route::post('login', [UserController::class, 'login']);
Route::post('register',[UserController::class,'register']);


Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::resource('user', 'App\Http\Controllers\UserController');
    Route::resource('company', 'App\Http\Controllers\CompanyController');
});
