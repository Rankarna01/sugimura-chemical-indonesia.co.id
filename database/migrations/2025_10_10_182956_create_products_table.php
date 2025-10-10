<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('title');                // ex: SUGICUT / SUNFORMER / SUNDRAW
            $table->string('slug')->unique();
            $table->string('type')->index();        // cutting | forming | drawing | forging
            $table->string('product_code')->nullable();
            $table->string('badge')->nullable();    // ex: "Forming", "Drawing" (chip kecil di kartu)
            $table->string('thumbnail')->nullable();// gambar kecil kartu (public path)
            $table->string('banner')->nullable();   // gambar besar di detail
            $table->text('excerpt')->nullable();    // ringkas di kartu
            $table->longText('description')->nullable(); // deskripsi panjang (detail)
            $table->json('features')->nullable();   // poin keunggulan (array string)
            $table->json('applications')->nullable();// aplikasi/penggunaan (array string)
            $table->json('standards')->nullable();  // standar & mutu (array string / key->val)
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('order_index')->default(0); // urutan di homepage
            // SEO optional
            $table->string('seo_title')->nullable();
            $table->text('seo_description')->nullable();

            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();

            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('products');
    }
};
