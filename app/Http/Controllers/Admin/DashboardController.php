<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'can:admin']);
    }

    public function index()
    {
        // Kartu ringkas
        $total    = Product::count();
        $active   = Product::where('is_active', true)->count();
        $inactive = $total - $active;

        // Tren 12 bulan terakhir (by created_at)
        $start = Carbon::now()->startOfMonth()->subMonths(11);
        $end   = Carbon::now()->endOfMonth();

        $raw = Product::selectRaw('DATE_FORMAT(created_at, "%Y-%m") ym, COUNT(*) c')
            ->whereBetween('created_at', [$start, $end])
            ->groupBy('ym')
            ->orderBy('ym')
            ->get()
            ->keyBy('ym');

        $labels = [];
        $monthly = [];
        $cur = $start->copy();
        for ($i = 0; $i < 12; $i++) {
            $ym = $cur->format('Y-m');
            $labels[] = $cur->format('M');           // "Jan", "Feb", ...
            $monthly[] = (int) ($raw[$ym]->c ?? 0);  // 0 jika tak ada
            $cur->addMonth();
        }

        // Distribusi per tipe
        $perType = Product::select('type', DB::raw('COUNT(*) total'))
            ->groupBy('type')
            ->orderByDesc('total')
            ->get()
            ->map(fn($r) => [
                'label' => match ($r->type) {
                    'cutting' => 'cut',
                    'forming' => 'form',
                    'drawing' => 'draw',
                    'forging' => 'forg',
                    default   => substr((string) $r->type, 0, 4),
                },
                'value' => (int) $r->total,
            ])
            ->values();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_products'    => $total,
                'active_products'   => $active,
                'inactive_products' => $inactive,
                'monthly'           => $monthly,
                'month_labels'      => $labels,
                'per_type'          => $perType,
            ],
        ]);
    }
}
