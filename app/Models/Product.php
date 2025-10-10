<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Product extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title','slug','type','product_code','badge','thumbnail','banner',
        'excerpt','description','features','applications','standards',
        'is_active','order_index','seo_title','seo_description',
        'created_by','updated_by'
    ];

    protected $casts = [
    'features' => 'array',
    'applications' => 'array',
    'standards' => 'array',
    'is_active' => 'boolean',
    'banner_gallery' => 'array',
    'description_images' => 'array',
    'features_images' => 'array',
    'applications_images' => 'array',
    'standards_images' => 'array',
];


    // auto-generate slug kalau kosong
    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->slug)) {
                $model->slug = Str::slug($model->title).'-'.Str::random(5);
            }
        });
    }

    public function scopeActive($q) { return $q->where('is_active', true); }
}
