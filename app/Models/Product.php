<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    // Izinkan semua kolom (biar field JSON galeri ikut tersimpan)
    protected $guarded = [];

    protected $casts = [
        'features'            => 'array',
        'applications'        => 'array',
        'is_active'           => 'boolean',
        'banner_gallery'      => 'array',
        'description_images'  => 'array',
        'features_images'     => 'array',
        'applications_images' => 'array',
    ];
}
