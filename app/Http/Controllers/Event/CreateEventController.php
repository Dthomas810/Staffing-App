<?php

namespace App\Http\Controllers\Event;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\User;
use App\Models\EventSchedulingSections;
use App\Models\EventSchedulingQueue;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

use Illuminate\Support\Facades\DB;

use App\Http\Traits\eventSchedulingQueueTrait;

use Illuminate\Support\Facades\Mail;
use App\Mail\StaffingNotifications;

use Inertia\Inertia;
use function GuzzleHttp\Promise\exception_for;

//todo:: change to 'EventController'
class CreateEventController extends Controller
{
    use eventSchedulingQueueTrait;

    /**
     * Store new Event in DB
     *
     * @param \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function create(Request $request)
    {
//        date_default_timezone_set("America/Chicago");

        //todo:: could figure out how to get user timezone, probably parse from timestamp and make it it's own variable
        $tz = new \DateTimeZone("CST");

//        echo date_default_timezone_get() , "<br>";
//        echo '<pre>' , $request , '<pre>';
//        echo var_dump($request->daily_start_time), "<br>";
//        exit;
        $startTime = new \DateTime($request->daily_start_time);
        $endTime = new \DateTime($request->daily_end_time);

        $startTime->setTimezone($tz);
        $endTime->setTimezone($tz);

//        echo $startTime->format('H:i:s'), "<br>"; // 'H:i:s T' T = Timezone
//        echo $endTime->format('H:i:s'), "<br>";
//        exit;



        $newEvent = new Event();
        $newEvent->name = $request->name;
        $newEvent->start_date= $request->start_date;
        $newEvent->end_date = $request->end_date;
        $newEvent->start_time = $startTime->format('H:i:s');
        $newEvent->end_time = $endTime->format('H:i:s');
        $newEvent->number_of_shifts = $request->number_of_shifts;

        $newEvent->save();

        $eventID = $newEvent->id;

        /*Event::create([
            'name' => $request->name,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'start_time' => $startTime->format('H:i:s'),
            'end_time' => $endTime->format('H:i:s')
        ]);*/



        $sectionTitles = ['South Upper', 'North Upper', 'NE Lower', 'N Lower', 'W Lower', 'S Lower'];

        //loop through section titles and create event_scheduling_queue entries for this event
        foreach($sectionTitles as $sectionTitle){
            EventSchedulingSections::create([
                'eventID' => $eventID,
                'sectionTitle' => $sectionTitle
            ]);
        }





         return Inertia::render('Dashboard', [
             //'test' => 'stuff',
             'laravelVersion' => Application::VERSION,
             'phpVersion' => PHP_VERSION,
        ]);

    }

    /**
     * getEventSectionSchedule for ManagerShedulerSidePanel
     *
     * @param \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function getEventSectionSchedule(Request $request)
    {

//        echo '<pre>',  var_dump($request), '<pre>' ; exit;
//        var_dump($request); exit;
        echo 'hi'; exit;


        /*return inertia('ManagerScheduler', [
           'example' => $request->only('')
        ]);*/

//        $eventSectionScheduleQueue = EventSchedulingSections::where('eventID', '=' , $request->input('eventID') , 'and')->where('sectionTitle', '=', $request->input('sectionTitle'));
        $eventSectionScheduleQueue = EventSchedulingSections::all();
//        Log::debug('called Event Section Schedule Function in Create Event Controller');

        /*return Inertia::render('ManagerSchedulerSidePanel', [
            'sectionSchedule' => $eventSectionScheduleQueue->only('employeeID')
        ]);*/
        return Inertia::render('ManagerSchedulerSidePanel', [
            'sectionSchedule' => $eventSectionScheduleQueue
        ]);


        /*return response()->json([
            'example' => 'example'
        ]);*/


    }

    /**
     * getEventSectionSchedule for ManagerShedulerSidePanel
     *
     * @param \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    //todo: is not how  to get varables from request
    public function loadEventScheduleForm(Request $request, $eventID)
    {

        $eventTitle = Event::where('id' , '=' , $eventID)->first()->name;
        $sectionTitle = '';
//        echo '<pre>', $eventID , '<pre>'; exit;
//        echo '<pre>', $request->user()->id , '<pre>'; exit;

        //grab scheduled section (and then get  its name) if there is one
        $scheduledSection = EventSchedulingQueue::where('employeeID' , '=' , $request->user()->id , 'and')->where('eventID', '=', $eventID)->get();
//        $scheduledSection = EventSchedulingQueue::where('employeeID' , '=' , $request->user()->id , 'and')->where('eventID', '=', $eventID)->get();
//        echo '<pre>', $scheduledSection->eventSchedulingSectionID , '<pre>'; exit;
//        echo '<pre>', $scheduledSection , '<pre>'; exit;
        if( !($scheduledSection->isEmpty()) ){ //todo:Gross
            $scheduledSectionID = $scheduledSection->first()->eventSchedulingSectionID;
//            echo '<pre>', $scheduledSectionID , '<pre>'; exit;

            $sectionTitle = EventSchedulingSections::where('id',  '=', $scheduledSectionID)->first()->sectionTitle;
//            echo '<pre>', $sectionTitle , '<pre>'; exit;

//            $sectionTitle = $getEventTitle->name;

        }

//        $temp = EventSchedulingSections::where('id',  '=', $scheduledSection->eventSchedulingSectionID)->first();
//        echo '<pre>', $temp->sectionTitle , '<pre>'; exit;


//        $getEventTitle = Event::where('id' , '=' , $eventID)->first();
//                echo '<pre>', $getEventTitle->name , '<pre>'; exit;


        return Inertia::render('Event/ScheduleEvent', [
            'section_title' => $sectionTitle,
            'eventID' => $eventID,
            'eventTitle' => $eventTitle
            ]);


    }


    /**
     * getEventSectionSchedule for ManagerShedulerSidePanel
     *
     * @param \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    //todo: is not how  to get varables from request
    public function submitEventScheduleForm(Request $request)
    {

//                        echo '<pre>', $request , '<pre>'; exit;
//                        echo '<pre>', $request->user() , '<pre>'; exit;
//                        echo '<pre>', 'HERE' , '<pre>'; exit;
//                        echo '<pre>', $request->input(    'right') , '<pre>'; exit;
                        /*foreach( $request->input('right') as $selection){
                            echo '<pre>', $selection , '<pre> <br>';
                        }

                        echo '<pre>', $request , '<pre> <br>';
                        echo '<pre>', gettype($request->input('right')) , '<pre>';
                        exit;*/



        //Clear this employees schedule submissions/queue and update current submissions position in Queue
        eventSchedulingQueueTrait::removeUserFromAllEventSectionQueues($request->input('event_id'), $request->user()->id);


        //Signs up for multiple sections with correct queue values(does not clear existing queues)
        eventSchedulingQueueTrait::signUpForSections($request->input('right'), $request->input('event_id'), $request->user()->id );



//        Mail::to($request->user())->send(new StaffingNotifications());
        /*Mail::raw('Example Email', function ($message){
            $message->to('dthomas@provenit.com');
            $message->from('dthomas@provenit.com');
        })*/;


        return redirect()->route('dashboard');

    }


    /**
     * getEventSectionSchedule for ManagerShedulerSidePanel
     *
     * @param \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function getEventSectionScheduleList(Request $request)
    {
        // Does not work here, put stuff in the json return if you want to see it
//        echo '<pre>', $request , '<pre>'; exit;

        // get list of id's of schedule list
                //get sectionID
        $sectionID = EventSchedulingSections::where('eventID', '=', $request->input('eventID'), 'and')->where('sectionTitle', '=', $request->input('sectionTitle'))->get()->first()->id;
//                echo '<pre>', var_dump($temp) , '<pre>'; exit;
//        EventSchedulingQueue::where('eventID', '=', $request->input('eventID'), 'and')->where();
        // get names of id's
        $employeeNames = EventSchedulingQueue::where('eventID', '=', $request->input('eventID'), 'and')->where('eventSchedulingSectionID', '=', $sectionID)->get(['employeeName', 'employeeID'])->toArray();
        $employeeJustNames = EventSchedulingQueue::where('eventID', '=', $request->input('eventID'), 'and')->where('eventSchedulingSectionID', '=', $sectionID)->get(['employeeName'])->toArray();
        $employeeJustIDs = EventSchedulingQueue::where('eventID', '=', $request->input('eventID'), 'and')->where('eventSchedulingSectionID', '=', $sectionID)->get(['employeeID'])->toArray();
        $employeesNotScheduledNames =  DB::table('users')->orWhereNotIn('name', $employeeJustNames)->where('role', '=', 'Employee')->get(['id', 'name']);



//        echo '<pre>', $employeesNotScheduledNames , '<pre>'; exit;

        $stuff = array( "pls" => $request->user() ,  "notScheduledEmployees" => $employeesNotScheduledNames,  "scheduledEmployees" => $employeeNames, "section" => $request->input('sectionTitle'), "eventID" => $request->input('eventID'));
//        $stuff = [1,2,3];
        return json_encode($stuff);
    }

    /**
     * update Event Section Queue from request
     *
     * @param \Illuminate\Http\Request  $request
     * @return
     */
    public function managerUpdateEventQueue(Request $request)
    {
//        echo '<pre>', $request , '<pre>'; exit;

        // Clear queue
        $sectionID = EventSchedulingSections::where('sectionTitle', '=', $request->input('sectionVar') , 'and')->where('eventID' , '=', $request->input('eventIDVar'))->first()->id;
        if(EventSchedulingSections::where('sectionTitle', '=', $request->input('sectionVar') , 'and')->where('eventID' , '=', $request->input('eventIDVar'))->exists()){
            EventSchedulingQueue::where('eventSchedulingSectionID', '=', $sectionID)->delete();
        }

        // iterate array of names of schedule being applied and schedule said employees
        $currentQueueValue = 1;
    foreach($request->input('scheduledRight') as $employeeName){
        $userID = User::where('name' , '=' , $employeeName)->first()->id;
//        $userExist = User::where('name' , '=' , $employeeName)->exists();
//        echo '<pre>', 'User Exist: ' . $userExist , '<pre>'; exit;
//        echo '<pre>', 'Name: ' . $employeeName . "User ID: " . $userID , '<pre>'; exit;

        //todo:: update user preference and get value (last in preference) for EventSchedulingQueue
        // being made.
//        $employeePref = EventSchedulingQueue::where()->orderBy('employeePreference', 'desc')->first()->employeePreference;
        EventSchedulingQueue::create([
            'eventSchedulingSectionID' => $sectionID,
            'employeeID' => $userID,
            'eventID' => $request->input('eventIDVar'),
            'queue' => $currentQueueValue++,
            'employeeName' => $employeeName,
            'employeePreference' => 1,
            'scheduled' => 0
        ]);
        }

        return redirect()->route('dashboard');
    }

}
