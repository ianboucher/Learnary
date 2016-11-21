<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\School;
use App\Group;
use App\User;
use App\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        DB::table('users')->delete();
        DB::table('schools')->delete();
        DB::table('groups')->delete();

        // ========================= CREATE SCHOOLS ============================

        $schools = [
            ['name' => 'Grange Hill'],
            ['name' => 'Springfield Elementary'],
        ];

        foreach ($schools as $school)
        {
            School::create($school);
        }

        // ================== CREATE GROUPS & ADD TO SCHOOL ====================

        $currentSchool = App\School::find(1);

        $currentSchool->groups()->saveMany([
            new Group(['name' => '1W']),
            new Group(['name' => '2H']),
            new Group(['name' => '3M']),
            new Group(['name' => '4F']),
        ]);

        // =================== CREATE USERS & ADD TO GROUP =====================

        $currentGroup = App\Group::find(2);

        $currentGroup->users()->saveMany([
            new User(['name' => 'Bert',   'email' => 'bert@user.com',   'password' => Hash::make('secret') ]),
            new User(['name' => 'Ernie',  'email' => 'ernie@user.com',  'password' => Hash::make('secret') ]),
            new User(['name' => 'Calvin', 'email' => 'calvin@user.com', 'password' => Hash::make('secret') ]),
            new User(['name' => 'Hobbes', 'email' => 'hobbes@user.com', 'password' => Hash::make('secret') ]),
            new User(['name' => 'admin',  'email' => 'admin@user.com',  'password' => Hash::make('secret') ]),
        ]);

        // ========================== CREATE ROLES ===========================

        $role = [
            [
                'name'         => 'admin',
                'display_name' => 'Administrator',
                'description'  => 'Can manage other users data'
            ],
            [
                'name'         => 'staff',
                'display_name' => 'Staff Member',
                'description'  => 'Can view and manage data belonging to their students'
            ],
            [
                'name'         => 'student',
                'display_name' => 'Student',
                'description'  => 'Can complete activities and view their own data'
            ],
        ];

        foreach ($role as $key => $value)
        {
            Role::create($value);
        }

        Model::reguard();
    }
}
