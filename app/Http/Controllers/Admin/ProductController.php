<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $q = Product::query()
            ->when($request->search, fn($qq) =>
                $qq->where('title', 'like', '%'.$request->search.'%')
            )
            ->orderBy('order_index')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Products/Index', [
            'products' => $q,
            'filters'  => $request->only('search'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Products/Form', ['product' => null]);
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);

        $saveMany = function ($files) {
            $arr = [];
            foreach ((array) $files as $f) {
                if ($f) $arr[] = $f->store('products', 'public');
            }
            return $arr;
        };

        if ($request->hasFile('thumbnail')) {
            $data['thumbnail'] = $request->file('thumbnail')->store('products', 'public');
        }
        if ($request->hasFile('banner')) {
            $data['banner'] = $request->file('banner')->store('products', 'public');
        }

        $keep = fn(string $key) => json_decode($request->input($key.'_keep', '[]'), true) ?: [];

        // banner slideshow
        if ($request->hasFile('banner_gallery')) {
            $data['banner_gallery'] = array_merge(
                $keep('banner_gallery'),
                $saveMany($request->file('banner_gallery'))
            );
        } else {
            $data['banner_gallery'] = $keep('banner_gallery');
        }

        // galleries per tab (tanpa standar & mutu)
        foreach (['description_images','features_images','applications_images'] as $k) {
            if ($request->hasFile($k)) {
                $data[$k] = array_merge($keep($k), $saveMany($request->file($k)));
            } else {
                $data[$k] = $keep($k);
            }
        }

        $data['slug']       = $data['slug'] ?: Str::slug($data['title']).'-'.Str::random(5);
        $data['created_by'] = $request->user()->id;
        $data['updated_by'] = $request->user()->id;

        Product::create($data);

        return redirect()->route('admin.products.index')->with('success','Produk dibuat');
    }

    public function edit(Product $product)
    {
        return Inertia::render('Admin/Products/Form', ['product' => $product]);
    }

    public function update(Request $request, Product $product)
    {
        $data = $this->validated($request, $product->id);

        $old = [
            'thumbnail'          => $product->thumbnail,
            'banner'             => $product->banner,
            'banner_gallery'     => $product->banner_gallery ?? [],
            'description_images' => $product->description_images ?? [],
            'features_images'    => $product->features_images ?? [],
            'applications_images'=> $product->applications_images ?? [],
        ];

        $saveMany = function ($files) {
            $arr = [];
            foreach ((array) $files as $f) {
                if ($f) $arr[] = $f->store('products', 'public');
            }
            return $arr;
        };

        if ($request->hasFile('thumbnail')) {
            if ($product->thumbnail) Storage::disk('public')->delete($product->thumbnail);
            $data['thumbnail'] = $request->file('thumbnail')->store('products', 'public');
        }
        if ($request->hasFile('banner')) {
            if ($product->banner) Storage::disk('public')->delete($product->banner);
            $data['banner'] = $request->file('banner')->store('products', 'public');
        }

        $keep = fn(string $key) => json_decode($request->input($key.'_keep', '[]'), true) ?: [];

        if ($request->hasFile('banner_gallery')) {
            $newArr = array_merge($keep('banner_gallery'), $saveMany($request->file('banner_gallery')));
            $data['banner_gallery'] = array_values(array_unique($newArr));
        } else {
            $data['banner_gallery'] = $keep('banner_gallery');
        }

        foreach (['description_images','features_images','applications_images'] as $k) {
            if ($request->hasFile($k)) {
                $newArr = array_merge($keep($k), $saveMany($request->file($k)));
                $data[$k] = array_values(array_unique($newArr));
            } else {
                $data[$k] = $keep($k);
            }
        }

        $data['updated_by'] = $request->user()->id;

        $product->update($data);

        // cleanup yang tak terpakai
        $cleanupMany = function (array $oldArr, array $newArr) {
            $toDelete = array_values(array_diff($oldArr, $newArr));
            foreach ($toDelete as $p) {
                if ($p && Storage::disk('public')->exists($p)) {
                    Storage::disk('public')->delete($p);
                }
            }
        };
        $cleanupMany($old['banner_gallery'],     $product->banner_gallery ?? []);
        $cleanupMany($old['description_images'], $product->description_images ?? []);
        $cleanupMany($old['features_images'],    $product->features_images ?? []);
        $cleanupMany($old['applications_images'],$product->applications_images ?? []);

        return back()->with('success','Produk diperbarui');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return back()->with('success','Produk dihapus');
    }

    private function validated(Request $r, $ignoreId = null): array
    {
        return $r->validate([
            'title' => ['required','string','max:255'],
            'slug'  => ['nullable','string','max:255','unique:products,slug'.($ignoreId?','.$ignoreId:'')],
            'type'  => ['required','in:cutting,forming,drawing,forging,antirust,Inhibitor,accelerant,cleaner'],
            'badge' => ['nullable','string','max:50'],
            'product_code' => ['nullable','string','max:100'],
            'excerpt' => ['nullable','string'],
            'description' => ['nullable','string'],

            'features'     => ['nullable','array'],
            'features.*'   => ['string'],
            'applications' => ['nullable','array'],
            'applications.*'=> ['string'],

            'is_active'   => ['required','boolean'],
            'order_index' => ['required','integer','min:0'],
            'seo_title'   => ['nullable','string','max:255'],
            'seo_description' => ['nullable','string'],

            'thumbnail' => ['nullable','image','max:2048'],
            'banner'    => ['nullable','image','max:4096'],

            'banner_gallery'      => ['nullable','array'],
            'banner_gallery.*'    => ['file','image','max:4096'],
            'description_images'  => ['nullable','array'],
            'description_images.*'=> ['file','image','max:4096'],
            'features_images'     => ['nullable','array'],
            'features_images.*'   => ['file','image','max:4096'],
            'applications_images' => ['nullable','array'],
            'applications_images.*'=> ['file','image','max:4096'],
        ]);
    }
}
