<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Halaman Home (Welcome.jsx)
     * Mengirim daftar produk ringkas untuk section "Pelumas Pekerjaan Logam".
     */
    public function homeSection()
    {
        $products = Product::query()
            ->where('is_active', true)
            ->orderBy('order_index')
            ->take(12)
            ->get([
                'id',
                'title',
                'slug',
                'badge',
                'excerpt',
                'thumbnail',
                'type',
                'banner', // opsional; dipakai jika perlu
            ]);

        return Inertia::render('Welcome', [
            // dipakai oleh <SpecialProductsSection products={homeProducts} />
            'homeProducts' => $products,
        ]);
    }

    /**
     * Detail produk (produk/{slug})
     * Render ke resources/js/Pages/Product/Show.jsx
     */
    public function show(string $slug)
    {
        $product = Product::query()
            ->where('slug', $slug)
            ->firstOrFail([
                'id',
                'title',
                'slug',
                'type',
                'badge',
                'product_code',
                'excerpt',
                'description',
                'features',
                'applications',
                'thumbnail',
                'banner',
                'banner_gallery',
                'description_images',
                'features_images',
                'applications_images',
                'seo_title',
                'seo_description',
                'is_active',
                'order_index',
            ]);

        // (opsional) kalau tidak aktif, boleh 404
        // abort_unless($product->is_active, 404);

        return Inertia::render('Product/Show', [
            'product' => $product,
        ]);
    }

    /**
     * (Opsional) Index semua produk bila diperlukan nanti.
     * Tidak dipakai di routes saat ini, tapi disediakan untuk kemudahan.
     */
    public function index(Request $request)
    {
        $products = Product::query()
            ->when($request->search, function ($q) use ($request) {
                $q->where('title', 'like', '%'.$request->search.'%')
                  ->orWhere('excerpt', 'like', '%'.$request->search.'%');
            })
            ->where('is_active', true)
            ->orderBy('order_index')
            ->paginate(12)
            ->withQueryString([
                'search' => $request->search,
            ]);

        return Inertia::render('Product/Index', [
            'products' => $products,
            'filters'  => $request->only('search'),
        ]);
    }
}
