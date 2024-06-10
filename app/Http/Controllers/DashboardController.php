<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\EventSchedulingSections;
use App\Models\EventSchedulingQueue;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the Dashboard view For Managers.
     *
     * @return \Inertia\Response
     */
    public function managerDashboard(Request $request)
    {
        //Get all Events
//         $getEvents = Event::all();
         $events = Event::all();
         $testEvents = Event::all();
        $request->user()->id;

        //todo: Has to be the wrong way to call other user info
//        $requestingUser = User::where( 'id',Auth::id())->get();
        $requestingUserRole = Auth::user()->role;
//        $requestingUserRole = Auth::

//        echo '<pre>',  var_dump($events), '<pre>' ; exit;

        if($requestingUserRole=='Manager'){
            return Inertia::render('Dashboard', [
                'data' => $events
            ]);
        }else if($requestingUserRole=='Employee'){

            // keep events as collection attempt
            /*foreach($events as $event){
//                $event->id ;
//                echo '<pre>',  var_dump($event), '<pre>' ; exit;
                $scheduledStatus = '';
                //look for if there's an event_scheduling_queue for this user for this event

                //get id's of sections of event
//                $sectionIDs = EventSchedulingSections::where('eventID', '=' , $event->id)->get()->only("eventID");
                $sections = EventSchedulingSections::where('eventID', '=' , $event->id)->get();
                $sectionIDs = [];
                foreach($sections as $section){
                    array_push($sectionIDs ,$section->id );
                }

//                echo '<pre>', implode(",", $sectionIDs), '<pre>' ; exit;

//                $sectionsQueues = EventSchedulingQueue::where('')>get();

                //check event_scheduling_queue for any entries of any of the sectionID's and requesting user's ID

                $employeeScheduledSections = EventSchedulingQueue::where('employeeID' , '=' , $request->user()->id, 'and')->wherein('eventSchedulingSectionID', $sectionIDs)->get();
//                $scheduledForEvent = EventSchedulingQueue::where('employeeID' , '=' , $request->user()->id, 'and')->wherein('eventSchedulingSectionID', $sectionIDs)->exist()->get();
                // Do any of these sections

//                echo '<pre>',  var_dump($employeeScheduledSections->count), '<pre>' ; exit;
//                echo '<pre>',  var_dump($employeeScheduledSections->isEmpty()), '<pre>' ; exit;
                // todo::append "scheduled" to Events and set value based on line above
//                $event->scheduled = !($employeeScheduledSections->isEmpty());
//                $arr = $event->toArray();
//                $event->setAttribute('scheduled', !($employeeScheduledSections->isEmpty()));
//                $event->setAttribute('scheduled', true);

                $event->setScheduledAttribute(!($employeeScheduledSections->isEmpty()));

                $arr = $event->toArray();
                $arr['scheduled'] = !($employeeScheduledSections->isEmpty());
//                $event = new Event($arr);


                //$scheduledStatus = EventSchedulingQueue::where('employeeID', '=', $request->user()->id , 'and')->where();

                //$tempEvent = new stdClass();

//                                echo '<pre>',  var_dump($event), '<pre>' ; exit;
//                                echo '<pre>',  var_dump($arr), '<pre>' ; exit;

            }*/


            // to see events
            foreach($events as $event){
//                echo '<pre>',  var_dump($event), '<pre>' ; exit;
            }


            $eventsArr = $testEvents->toArray();
            // turn into array attempt
            foreach($eventsArr as &$eventArr){
//                echo '<pre>',   implode(",", $eventArr), '<pre>' ; exit;
//                echo '<pre>',   $eventArr['id'], '<pre>' ; exit;

                $sections = EventSchedulingSections::where('eventID', '=' , $eventArr['id'])->get();
                $sectionIDs = [];
                foreach($sections as $section){
                    array_push($sectionIDs ,$section->id );
                }

//                                echo '<pre>',   implode(",", $sectionIDs), '<pre>' ; exit;


                $employeeScheduledSections = EventSchedulingQueue::where('employeeID' , '=' , $request->user()->id, 'and')->wherein('eventSchedulingSectionID', $sectionIDs)->get();
                $eventArr['scheduled'] = !($employeeScheduledSections->isEmpty());
//                $eventArr['scheduled'] = 10;


//                echo '<pre>',   var_dump($eventArr['scheduled']), '<pre>' ; exit;
//                echo '<pre>',   var_dump($eventArr), '<pre>' ; exit;
//                echo '<pre>',   var_dump($eventArr), '<pre>' ; exit;
//                echo '<pre>',   var_dump($employeeScheduledSections->isEmpty()), '<pre>' ; exit;

            }

            // to see Event Array
//            echo '<pre>',  var_dump($eventsArr), '<pre>' ; exit;
            foreach($eventsArr as $event){
//                echo '<pre>',  var_dump($event), '<pre>' ; exit;

            }

            // to see attempt at turning event array back into a collection
            /*$whats = collect($eventsArr);
            foreach($whats as $what){
//                echo '<pre>',  var_dump($what), '<pre>' ; exit;

            }*/


            return Inertia::render('Dashboard', [
//                'data' => $events
                'data' => $eventsArr
            ]);
        }



        return Inertia::render('Dashboard', [
            'events' => $events
        ]);
    }
}
