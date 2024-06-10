<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('event_scheduling_queue', function (Blueprint $table) {
            $table->id();
            $table->string('eventSchedulingSectionID');
            $table->string('employeeID');
            $table->string('eventID');
            $table->string('employeeName');
            $table->boolean('scheduled');
            $table->integer('queue');
            $table->integer('employeePreference');
            $table->timestamps();
            $table->time('startTime');
            $table->time('endTime');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('event_scheduling_queue');
    }
};
