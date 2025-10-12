<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
{
    // user admin demo opsional—kalau sudah ada, boleh dilewati
    // \App\Models\User::factory()->create([...]);

    $this->call(ProductDemoSeeder::class);
}

}
