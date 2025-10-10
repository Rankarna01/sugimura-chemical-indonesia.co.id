<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // <-- TAMBAHKAN INI
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Cek apakah user sudah login DAN merupakan seorang admin
        // <-- UBAH BAGIAN INI dari auth() menjadi Auth:: -->
        if (Auth::check() && Auth::user()->is_admin) {
            // Jika ya, lanjutkan ke halaman yang dituju
            return $next($request);
        }

        // Jika tidak, tendang user ke halaman dashboard biasa atau halaman login
        return redirect('/dashboard');
    }
}   