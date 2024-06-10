<?php
namespace App\Http\Traits;


use App\Models\EventSchedulingQueue;
use App\Models\EventSchedulingSections;
use App\Models\User;

trait eventSchedulingQueueTrait
{
    /**
     *
     *
     * @param
     * @return void
     */
    public static function removeUserFromAllEventSectionQueues($eventID, $employeeID) //todo::make version of or flag for this one that keeps queue submissions when user is editing their submission but keeping a previous selection
    {
        $oldSectionIDs = EventSchedulingQueue::where('employeeID', '=', $employeeID, 'and')->where('eventID', '=', $eventID)->get()->pluck('eventSchedulingSectionID')->all();
//        echo '<pre>', implode(" ", $oldSectionIDs), '<pre>';exit;

        //Delete old Event Section Queue Subissions
        EventSchedulingQueue::where('employeeID', '=', $employeeID, 'and')->where('eventID', '=', $eventID)->delete();

        //todo:: I bet there's sql stuff that does this automatially on a column based on other colums/calculation of other colums
        //Loop through the queues of those old submissions and reset their queue values (without the gap of the submission that was just deleted)
        foreach ($oldSectionIDs as $oldSectionID) {
            //Queue of section as collection
            $queueCollection = EventSchedulingQueue::where('eventSchedulingSectionID' , '=', $oldSectionID)->orderBy('queue', 'ASC')->get();
//            echo '<pre>', implode(" ", $queueCollection), '<pre>';
//            echo '<pre>', 'Queue Collection: ' . $queueCollection, '<pre>';

            $queueCollection->each(function($item, $key){
//                echo '<pre>',   '  Key: ' . $key. ' Item: ' . $item , '<pre>';
                $element = EventSchedulingQueue::find($item->id);
                $element->queue = $key+1;
                $element->save();
            });
//            exit;


                //->orderbyDesc('')->;

        }
    }




    /**
     * Applies given user to sections given in array of sections being requested. DOES NOT clear queues, is
     * intended to be used with eventSchedulingQueueTrait::removeUserFromAllEventSectionQueues
     * @param array of strings $arrayofSectionsFromRequest
     * @return void
     */
    public static function signUpForSections($arrayofSectionsFromRequest, $eventID,  $requestingUserID){
        //todo:: get this from CreateEventController ln 236-260



        $prefIndex = 1;
        foreach($arrayofSectionsFromRequest as $section){

            // 'Sections' in request are in names, must get id's of sections to make EventSchedulingSections entries
            $requestedSection =  EventSchedulingSections::where('eventID' , '=' , $eventID , 'and')->where('sectionTitle', '=', $section )->first();

            $currentQueueValue = 1;
            $lastSubmissionFromRequestedQueue = EventSchedulingQueue::where('eventSchedulingSectionID', '=', $requestedSection->id)->orderByDesc('queue')->first();
            if(EventSchedulingQueue::where('eventSchedulingSectionID', '=', $requestedSection->id)->exists()){
                $currentQueueValue = EventSchedulingQueue::where('eventSchedulingSectionID', '=', $requestedSection->id)->orderByDesc('queue')->first()->queue+1;
            }


            EventSchedulingQueue::create([
                'eventSchedulingSectionID' => $requestedSection->id,
                'employeeID' => $requestingUserID,
                'eventID' => $eventID,
                'queue' => $currentQueueValue,
                'employeeName' => User::find($requestingUserID)->name,
                'employeePreference' => $prefIndex++,
                'scheduled' => 0
            ]);
        }

    }

}
