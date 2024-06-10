<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Event\CreateEventController;
use App\Http\Controllers\SchedulerController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

/*Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', );
})->middleware(['auth', 'verified'])->name('dashboard');*/
Route::get('/dashboard', [DashboardController::class, 'managerDashboard'] )->middleware(['auth', 'verified'])->name('dashboard');
//Route::get('/dashboard', [CreateEventController::class, 'getEventSectionSchedule'] )->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/scheduler/{eventID}', [SchedulerController::class, 'viewScheduler'] )->middleware(['auth', 'verified'])->name('scheduler');
//Route::get('/scheduler/{eventID}/{sectionTitle}', [SchedulerController::class, 'viewScheduler'] )->middleware(['auth', 'verified']);

//Route::get('/employeeScheduler/{eventID}', [SchedulerController::class, 'viewScheduler'] )->middleware(['auth', 'verified']);


require __DIR__.'/auth.php';
require __DIR__.'/events.php';
