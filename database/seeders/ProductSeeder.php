<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductDemoSeeder extends Seeder
{
    public function run(): void
    {
        // Pastikan disk public ada
        if (!Storage::disk('public')->exists('products')) {
            Storage::disk('public')->makeDirectory('products');
        }

        // DATA dari HTML kamu (tanpa standar & mutu)
        $rows = [
            [
                'slug' => 'sugicut',
                'title' => 'SUGICUT',
                'category' => 'Metalworking – Cutting Oil',
                'image' => 'assets/images/produk-khusus/sugicut.png',
                'summary' => 'Oli khusus untuk pemotongan & pembubutan pada baja, aluminium, dan stainless steel.',
                'tags' => ['Cutting','Metalworking'],
                'highlights' => ['Pendinginan & pelumasan seimbang','Kualitas permukaan halus','Umur alat lebih panjang'],
                'desc' => ['SUGICUT dirancang untuk berbagai operasi pemotongan (turning, drilling, tapping) pada material ferrous maupun non-ferrous. Formulasinya menjaga gesekan rendah dan pembuangan panas optimal.'],
                'advantages' => ['Mengurangi keausan tool','Memperbaiki finish permukaan','Stabil pada beban & temperatur kerja'],
                'apps' => ['Turning/Drilling/Tapping','Baja & Stainless','Aluminium'],
            ],
            [
                'slug' => 'sunformer',
                'title' => 'SUNFORMER',
                'category' => 'Metalworking – Forming/Forge Oil',
                'image' => 'assets/images/produk-khusus/sunformer.png',
                'summary' => 'Pelumas penempaan untuk produksi massal yang stabil dan ramah lingkungan.',
                'tags' => ['Forming','Forging'],
                'highlights' => ['Emisi & bau rendah','Perlindungan mesin unggul','Presisi dimensi lebih baik'],
                'desc' => ['SUNFORMER ditujukan untuk aplikasi forming/forging jangka panjang dengan fokus stabilitas proses, perlindungan mesin, serta viskositas yang mudah ditangani.'],
                'advantages' => ['Friction control sangat baik','Kualitas produk tinggi','Umur alat lebih lama'],
                'apps' => ['Cold/Hot forming','Stamping/Pressing'],
            ],
            [
                'slug' => 'sundraw',
                'title' => 'SUNDRAW',
                'category' => 'Metalworking – Drawing Oil',
                'image' => 'assets/images/produk-khusus/sundraw.png',
                'summary' => 'Pelumas drawing untuk penarikan logam melalui die pada tekanan tinggi.',
                'tags' => ['Drawing','High Pressure'],
                'highlights' => ['Kurangi gesekan & keausan','Proses penarikan lebih stabil','Cocok untuk berbagai logam'],
                'desc' => ['SUNDRAW diformulasikan untuk memastikan aliran material halus saat penarikan, mencegah scoring & galling pada die.'],
                'advantages' => ['Memperpanjang usia die','Mengurangi cacat permukaan','Konsistensi dimensi'],
                'apps' => ['Penarikan tabung/rod/wire','Baja karbon & stainless','Non-ferrous'],
            ],
            [
                'slug' => 'preton',
                'title' => 'PRETON',
                'category' => 'Anti-Corrosion / Anti-Rust',
                'image' => 'assets/images/produk-khusus/preton.png',
                'summary' => 'Proteksi karat & perubahan warna pada besi/non-besi; water-displacing.',
                'tags' => ['Anti-Rust','Protection'],
                'highlights' => ['Usir air & kotoran','Teruji salt spray/exposure/humidity','Aplikasi luas pada parts'],
                'desc' => ['PRETON digunakan untuk mencegah korosi pada gulungan, pipa, poros, bagian pengerjaan logam hingga kabel, termasuk material non-besi.'],
                'advantages' => ['Perlindungan permukaan andal','Aplikasi mudah & merata'],
                'apps' => ['Coil/pipa/poros/bagian logam','Gudang & pengiriman'],
            ],
            [
                'slug' => 'hibiron',
                'title' => 'HIBIRON',
                'category' => 'Pickling Corrosion Inhibitor',
                'image' => 'assets/images/produk-khusus/hibirion.png', // tulisan di HTML hibirion.png
                'summary' => 'Inhibitor korosi untuk larutan asam (H₂SO₄/HCl) saat pengawetan baja.',
                'tags' => ['Inhibitor','Pickling'],
                'highlights' => ['Lindungi baja saat pickling','Bantu hilangkan kerak'],
                'desc' => ['HIBIRON ditambahkan ke larutan asam untuk melindungi baja selama proses pickling. Juga digunakan sebagai aditif penghilang kerak pada boiler & pipa sistem pendingin.'],
                'advantages' => ['Mengurangi laju korosi','Efisiensi pembersihan meningkat'],
                'apps' => ['Pickling line (H₂SO₄/HCl)','Boiler & cooling pipe descaling'],
            ],
            [
                'slug' => 'sunspeed',
                'title' => 'SUNSPEED',
                'category' => 'Pickling Accelerant',
                'image' => 'assets/images/produk-khusus/sunspeed.png',
                'summary' => 'Akselerator pickling: kurangi waktu proses ±20–30% dan tekan oksidasi.',
                'tags' => ['Accelerant','Pickling'],
                'highlights' => ['Produktivitas naik','Kualitas permukaan konsisten'],
                'desc' => ['SUNSPEED meningkatkan kecepatan pickling pada stainless, bearing steel, alloy steel, dan material keras.'],
                'advantages' => ['Mengurangi waktu proses','Menekan oksidasi'],
                'apps' => ['Pickling baja biasa & khusus'],
            ],
            [
                'slug' => 'suncleaner-waterbased',
                'title' => 'SUNCLEANER Waterbased',
                'category' => 'Industrial Cleaner (Waterbased)',
                'image' => 'assets/images/produk-khusus/suncleaner.png',
                'summary' => 'Degreaser berbasis air: bersihkan sisa minyak/kotoran & anti karat jangka pendek.',
                'tags' => ['Cleaner','Waterbased'],
                'highlights' => ['Degreasing efektif','Short-term anti-rust'],
                'desc' => ['Efektif menghilangkan minyak sisa proses atau kotoran umum pada berbagai material.'],
                'advantages' => ['Ramah lingkungan','Mudah dibilas'],
                'apps' => ['Komponen umum besi/logam','Pre/after-process cleaning'],
            ],
            [
                'slug' => 'suncleaner-solventbased',
                'title' => 'SUNCLEANER Solventbased',
                'category' => 'Industrial Cleaner (Solvent)',
                'image' => 'assets/images/produk-khusus/suncleaner-2.png',
                'summary' => 'Pelarut efektif untuk menghilangkan minyak & kotoran pada bagian mekanis.',
                'tags' => ['Cleaner','Solvent'],
                'highlights' => ['Daya larut tinggi','Cepat kering'],
                'desc' => ['Dirancang untuk membersihkan minyak dan partikel pada komponen mekanis.'],
                'advantages' => ['Efek pembersih cepat','Residue rendah'],
                'apps' => ['Part mekanis & suku cadang','Workshop & line produksi'],
            ],
        ];

        $order = 0;

        foreach ($rows as $r) {
            // map "type" ke salah satu: cutting/forming/drawing/forging (fallback: forming)
            $type = $this->inferType($r);

            // salin gambar ke storage/public/products
            $storedPath = $this->copyImageToStorage($r['image'], $r['slug']);

            Product::updateOrCreate(
                ['slug' => $r['slug']],
                [
                    'title' => $r['title'],
                    'type'  => $type,
                    'badge' => $r['category'],           // tampil seperti chip kategori
                    'product_code' => null,
                    'excerpt' => $r['summary'],
                    'description' => implode("\n\n", $r['desc'] ?? []),

                    'features'     => array_values($r['advantages'] ?? []),
                    'applications' => array_values($r['apps'] ?? []),

                    'is_active'   => true,
                    'order_index' => $order++,

                    'seo_title'       => $r['title'].' | PT. Sugimura Chemical Indonesia',
                    'seo_description' => $r['summary'],

                    // gambar
                    'thumbnail' => $storedPath, // pakai satu gambar ini sebagai thumbnail
                    'banner'    => $storedPath, // dan banner fallback

                    // galleries kosong dulu (bisa isi manual nanti)
                    'banner_gallery'      => [],
                    'description_images'  => [],
                    'features_images'     => [],
                    'applications_images' => [],

                    'created_by' => 1,
                    'updated_by' => 1,
                ]
            );
        }
    }

    private function inferType(array $r): string
    {
        $hay = Str::lower(($r['category'] ?? '').' '.implode(' ', $r['tags'] ?? []));
        return Str::contains($hay, 'cutting')  ? 'cutting'  :
               (Str::contains($hay, 'drawing') ? 'drawing'  :
               (Str::contains($hay, 'forg')    ? 'forging'  :
               (Str::contains($hay, 'form')    ? 'forming'  : 'forming')));
    }

    private function copyImageToStorage(?string $publicPath, string $slug): ?string
    {
        if (!$publicPath) return null;

        // lokasi sumber di public/
        $source = public_path(trim($publicPath, '/'));
        if (!File::exists($source)) {
            // jika sumber tak ada, abaikan
            return null;
        }

        $ext = pathinfo($source, PATHINFO_EXTENSION) ?: 'png';
        $dest = "products/{$slug}.{$ext}";

        // salin ke storage/public
        Storage::disk('public')->put($dest, File::get($source));

        return $dest; // simpan path relatif, front-end kita sudah normalisasi /storage/...
    }
}
