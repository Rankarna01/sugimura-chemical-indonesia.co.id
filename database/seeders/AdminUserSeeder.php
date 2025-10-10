<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // buat admin default kalau belum ada
        $adminEmail = 'admin@example.com';

        $admin = User::where('email', $adminEmail)->first();

        if (!$admin) {
            User::create([
                'name' => 'Administrator',
                'email' => $adminEmail,
                'password' => Hash::make('admin123'),
                'is_admin' => true,
            ]);

            $this->command->info('✅ Admin user created:');
            $this->command->info('   Email: admin@example.com');
            $this->command->info('   Password: admin123');
        } else {
            $this->command->info('⚠️  Admin user already exists.');
        }
    }
}
