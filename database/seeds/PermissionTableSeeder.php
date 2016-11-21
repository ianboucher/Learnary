<?php

use Illuminate\Database\Seeder;
use App\Permission;

class PermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permission = [
            [
                'name'         => 'manage-school',
                'display_name' => 'Manage Schools',
                'description'  => 'Create, edit and list schools'
            ],
            [
                'name'         => 'manage-group',
                'display_name' => 'Manage Groups',
                'description'  => 'Create, edit and list groups within a school'
            ],
            [
                'name'         => 'manage-user',
                'display_name' => 'Manage Users',
                'description'  => 'Assign roles, permissions and view users'
            ],
            [
                'name'         => 'View user',
                'display_name' => 'View User Data',
                'description'  => 'View user data, such a scores, progress, activity etc.'
            ],
        ];

        foreach ($permission as $key => $value)
        {
            Permission::create($value);
        }
    }
}
