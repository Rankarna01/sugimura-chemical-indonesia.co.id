<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('products', function (Blueprint $table) {
            // slideshow banner & gallery per-tab
            $table->json('banner_gallery')->nullable();       // ["path1","path2",...]
            $table->json('description_images')->nullable();   // tab Deskripsi
            $table->json('features_images')->nullable();      // tab Keunggulan
            $table->json('applications_images')->nullable();  // tab Aplikasi
            $table->json('standards_images')->nullable();     // tab Standar & Mutu
        });
    }
    public function down(): void {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn([
                'banner_gallery','description_images','features_images',
                'applications_images','standards_images'
            ]);
        });
    }
};
