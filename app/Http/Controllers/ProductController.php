<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Render halaman Welcome (home) + kirim produk untuk section spesial.
     */
    public function homeSection()
    {
        $products = Product::active()
            ->orderBy('order_index')
            ->get(['id','title','slug','badge','excerpt','thumbnail','type']);

        return Inertia::render('Welcome', [
            'homeProducts'   => $products,
            // props tambahan seperti default route /
            'canLogin'       => \Illuminate\Support\Facades\Route::has('login'),
            'canRegister'    => \Illuminate\Support\Facades\Route::has('register'),
            'laravelVersion' => \Illuminate\Foundation\Application::VERSION,
            'phpVersion'     => \PHP_VERSION,
        ]);
    }

    /**
     * Halaman detail produk berdasarkan slug.
     */
    public function show(string $slug)
{
    $product = Product::where('slug', $slug)->firstOrFail();

    return \Inertia\Inertia::render('Product/Show', [
        'product' => $product
    ]);
}

}
