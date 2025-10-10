<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory; // <-- TAMBAHKAN INI

// app/Models/ProductDetail.php
class ProductDetail extends Model
{
    use HasFactory;
    protected $guarded = [];
    public $timestamps = false; // Tabel ini tidak butuh timestamps

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
