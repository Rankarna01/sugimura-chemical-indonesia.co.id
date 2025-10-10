<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory; // <-- TAMBAHKAN INI
use Illuminate\Database\Eloquent\Model;                 // <-- DAN INI

class ProductCategory extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
