<?php

use App\Http\Controllers\Event\CreateEventController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::middleware('auth', 'verified')->group(function () {

    Route::get('/createEvent', function () {
        return Inertia::render('Event/CreateEvent');
    })->name('createEvent');

    Route::post('/createEvent', [CreateEventController::class, 'create'])->name('createEvent');

    Route::get('/getEventSectionSchedule/{eventID}/{sectionTitle}', [CreateEventController::class, 'getEventSectionSchedule'])->name('getEventSectionSchedule');

//    Route::get('/getEventScheduledSectionList/{eventID}/{sectionTitle}', [CreateEventController::class, 'getEventSectionScheduleList'])->name('getEventSectionSchedule');
    // todo don't know why axios won't see routes with parameters but their in the request any way
    Route::get('/getEventScheduledSectionList', [CreateEventController::class, 'getEventSectionScheduleList'])->name('getEventSectionSchedule');


    Route::get('/employeeScheduler/{eventID}', [CreateEventController::class, 'loadEventScheduleForm'] );
    Route::post('/employeeScheduler/', [CreateEventController::class, 'submitEventScheduleForm'] )->name('employeeScheduleEvent');


    Route::post('/managerUpdateEventSection', [CreateEventController::class, 'managerUpdateEventQueue'] )->name('managerUpdateEventSection');


});


