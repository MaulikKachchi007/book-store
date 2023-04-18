<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DefaultAdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'name'     => 'Admin',
            'email'    => 'admin@gmail.com',
            'password' =>  Hash::make('123456'),
        ]);
        $role = Role::where('name', '=', 'admin')->first();
        $user->assignRole($role['name']);
    }
}
