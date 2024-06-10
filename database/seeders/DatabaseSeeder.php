<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

         \App\Models\User::factory()->create([
             'name' => 'Test Manager',
             'email' => 'test@test.com',
             'role' => 'Manager'
         ]);


         \App\Models\User::factory()->create([
             'name' => 'Dwayne Thomas',
             'email' => 'test2@test.com',
             'role' => 'Employee'
         ]);
        \App\Models\User::factory()->create([
            'name' => 'Josh Newman',
            'email' => 'test3@test.com',
            'role' => 'Employee'
        ]);
        \App\Models\User::factory()->create([
            'name' => 'A. Soto',
            'email' => 'test4@test.com',
            'role' => 'Employee'
        ]);

        \App\Models\User::factory()->create([
            'name' => 'Kelly Borgia',
            'email' => 'test4@test.com',
            'role' => 'Employee'
        ]);


        \App\Models\Event::create([
           'name' => 'White Sox vs Dogers',
            'start_date' => '2023-02-01',
            'end_date' => '2023-02-02',
            'start_time' => '7:00:00',
            'end_time' => '16:00:00',
            'number_of_shifts' => 2
        ]);
        \App\Models\Event::create([
           'name' => 'Dogers vs White Sox',
            'start_date' => '2023-03-11',
            'end_date' => '2023-03-14',
            'start_time' => '7:00:00',
            'end_time' => '16:00:00',
            'number_of_shifts' => 2
        ]);
        \App\Models\Event::create([
           'name' => 'White Sox vs Cardinals',
            'start_date' => '2023-03-09',
            'end_date' => '2023-03-10',
            'start_time' => '7:00:00',
            'end_time' => '16:00:00',
            'number_of_shifts' => 2
        ]);


        \App\Models\EventSchedulingQueue::create([
            'employeeID' => 2,
            'employeeName' => 'Dwayne Thomas',
            'eventSchedulingSectionID' => 1,
            'eventID'=>1,
            'queue'=>1,
            'employeePreference'=>1,
            'scheduled'=>false,
            'startTime'=>'00:00:00.00000',
            'endTime'=>'00:00:00.00000'
        ]);\App\Models\EventSchedulingQueue::create([
            'employeeID' => 3,
        'employeeName' => 'Josh Newman',
        'eventSchedulingSectionID' => 1,
            'eventID'=>1,
        'queue'=>2,
        'employeePreference'=>1,
        'scheduled'=>false,
        'startTime'=>'00:00:00.00000',
        'endTime'=>'00:00:00.00000'

    ]);\App\Models\EventSchedulingQueue::create([
            'employeeID' => 4,
        'employeeName' => 'A. Soto',
        'eventSchedulingSectionID' => 1,
            'eventID'=>1,
        'queue'=>3,
        'employeePreference'=>1,
        'scheduled'=>false,
        'startTime'=>'00:00:00.00000',
        'endTime'=>'00:00:00.00000'
    ]);

    }
}
