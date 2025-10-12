<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            // Jika DB kamu tidak support JSON, ganti ->json(...) menjadi ->longText(...)
            if (!Schema::hasColumn('products', 'banner_gallery')) {
                $table->json('banner_gallery')->nullable()->after('banner');
            }
            if (!Schema::hasColumn('products', 'description_images')) {
                $table->json('description_images')->nullable()->after('banner_gallery');
            }
            if (!Schema::hasColumn('products', 'features_images')) {
                $table->json('features_images')->nullable()->after('description_images');
            }
            if (!Schema::hasColumn('products', 'applications_images')) {
                $table->json('applications_images')->nullable()->after('features_images');
            }
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            if (Schema::hasColumn('products', 'applications_images')) {
                $table->dropColumn('applications_images');
            }
            if (Schema::hasColumn('products', 'features_images')) {
                $table->dropColumn('features_images');
            }
            if (Schema::hasColumn('products', 'description_images')) {
                $table->dropColumn('description_images');
            }
            if (Schema::hasColumn('products', 'banner_gallery')) {
                $table->dropColumn('banner_gallery');
            }
        });
    }
};
