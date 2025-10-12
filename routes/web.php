<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Admin\ProductController as AdminProduct;
use App\Http\Controllers\Admin\DashboardController as AdminDashboard;

use Inertia\Inertia;

// HOME → Welcome.jsx (data diambil di controller)
Route::get('/', [ProductController::class, 'homeSection'])->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Detail produk (slug)
Route::get('/produk/{slug}', [ProductController::class, 'show'])->name('products.show');

// --- ADMIN ---
Route::middleware(['auth','can:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', fn() => inertia('Admin/Dashboard'))->name('dashboard');

    Route::get('/products', [AdminProduct::class, 'index'])->name('products.index');
    Route::get('/products/create', [AdminProduct::class, 'create'])->name('products.create');
    Route::post('/products', [AdminProduct::class, 'store'])->name('products.store');
    Route::get('/products/{product}/edit', [AdminProduct::class, 'edit'])->name('products.edit');
    Route::put('/products/{product}', [AdminProduct::class, 'update'])->name('products.update');
    Route::delete('/products/{product}', [AdminProduct::class, 'destroy'])->name('products.destroy');
});

require __DIR__.'/auth.php';
