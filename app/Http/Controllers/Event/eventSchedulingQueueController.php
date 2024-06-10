<?php

namespace App\Http\Controllers\Event;

use App\Models\EventSchedulingQueue;
use JetBrains\PhpStorm\NoReturn;

class eventSchedulingQueueController
{
    /**
     *
     *
     * @param
     * @return void
     */
     public function removeUserFromAllEventSectionQueues($eventID , $employeeID){
       $oldSectionIDs = EventSchedulingQueue::where('employeeID', '=', $employeeID , 'and')->where('eventID', '=', $eventID)->get()->pluck('eventSchedulingSectionID')->all();
        echo '<pre>', $oldSectionIDs , '<pre>'; exit;
        EventSchedulingQueue::where('employeeID', '=', $employeeID , 'and')->where('eventID', '=', $eventID)->delete();

        foreach($oldSectionIDs as $oldSectionID){


        }

    }
}
