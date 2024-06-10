<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class SchedulerController extends Controller
{
    /**
     * Display scheduler
     *
     * @return \Inertia\Response
     */
    public function  viewScheduler($eventID)
    {
//        $mapContents = Storage::get('maps\chicago-white-sox-seating-chart-with-rows-at-guaranteed-rate-field.jpg');
//        Storage::put('pls.jpg', $mapContents); exit;
//      echo  var_dump($eventID); exit;
//        var_dump(Storage::url('maps/chicago-white-sox-seating-chart-with-rows-at-guaranteed-rate-field.jpg')); exit;
//        var_dump(Storage::disk('local')->exists('maps\chicago-white-sox-seating-chart-with-rows-at-guaranteed-rate-field.jpg'));
//        var_dump(Storage::url('app/maps/chicago-white-sox-seating-chart-with-rows-at-guaranteed-rate-field.jpg')); exit;
        return Inertia::render('ManagerScheduler', [
            'eventID' => $eventID ,
//            'mapURL' => Storage::disk('local')->url('maps\chicago-white-sox-seating-chart-with-rows-at-guaranteed-rate-field.jpg')
            //'mapURL' => Storage::disk('local')->url('pls.jpg')
        ]);
    }
}
