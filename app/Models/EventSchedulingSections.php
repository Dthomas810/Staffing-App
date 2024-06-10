<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventSchedulingSections extends Model
{
    use HasFactory;

    protected $table = 'event_scheduling_sections';

    protected $fillable = [
        'eventID',
        'sectionTitle',
    ];
}
