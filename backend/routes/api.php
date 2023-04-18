<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\BookController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('get-all-books', [BookController::class, 'getAllBooks']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    // user routes
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::post('/update-profile', [AuthController::class, 'updateProfile']);
    // books routes
    Route::resource('books', BookController::class);
    Route::post('/books/{book}', [BookController::class, 'update'])->name('books.update');
});


