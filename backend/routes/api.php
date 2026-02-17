<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ProjectController;
use App\Http\Controllers\API\SubmissionController;
use App\Http\Controllers\API\EvaluationController;
use App\Http\Controllers\API\DashboardController;
use App\Http\Controllers\API\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/dashboard/stats', [DashboardController::class, 'index']);
    Route::apiResource('users', UserController::class);

    // Project routes
    Route::apiResource('projects', ProjectController::class);
    
    // Submission routes (nested under projects for creation, direct for viewing/updating if needed)
    Route::post('/projects/{project}/submissions', [SubmissionController::class, 'store']);
    Route::get('/projects/{project}/submissions', [SubmissionController::class, 'index']);
    Route::get('/submissions/{submission}', [SubmissionController::class, 'show']);

    // Evaluation routes
    Route::post('/submissions/{submission}/evaluations', [EvaluationController::class, 'store']);
});
