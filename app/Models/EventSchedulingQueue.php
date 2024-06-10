<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\EventSchedulingSections;

class EventSchedulingQueue extends Model
{
    use HasFactory;

    protected $table = 'event_scheduling_queue';

    /*public static function boot()
    {
        parent::boot(); // TODO: Change the autogenerated stub

        static::created(function($model){
            $eventSectionID = $model->eventSchedulingSectionID;

            //todo why can't I use ->isEmpty() here?
           $temp = EventSchedulingSections::where('id', '=', $model->eventSchedulingSectionID)->get()->first();
//            echo '<pre>',  var_dump($temp->sectionTitle), '<pre>' ; exit;
            $this->sectionTitle=$temp->sectionTitle;
        });

    } */

    protected $fillable = [
        'eventSchedulingSectionID',
        'employeeID',
        'employeeName',
        'eventID',
        'scheduled',
        'queue',
        'employeePreference'
        ];
}