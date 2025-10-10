<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            [
                'title' => 'SUGICUT',
                'type'  => 'cutting',
                'badge' => 'Cutting',
                'excerpt' => 'Oli khusus untuk proses pemotongan, pembubutan, dan aplikasi lain pada baja, aluminium, dan stainless.',
                'features' => ['Performa stabil','Umur alat lebih panjang','Pendinginan baik'],
            ],
            [
                'title' => 'SUNFORMER',
                'type'  => 'forming',
                'badge' => 'Forming',
                'excerpt' => 'Pelumas penempaan untuk produksi massal yang stabil, emisi rendah, dan perlindungan mesin unggul.',
                'features' => ['Emisi & bau rendah','Perlindungan mesin unggul','Presisi dimensi lebih baik'],
            ],
            [
                'title' => 'SUNDRAW',
                'type'  => 'drawing',
                'badge' => 'Drawing',
                'excerpt' => 'Mengurangi gesekan, mencegah keausan, dan memastikan penarikan tetap lancar pada tekanan tinggi.',
                'features' => ['Gesekan rendah','Stabil pada tekanan tinggi'],
            ],
        ];

        foreach ($data as $i => $row) {
            Product::create(array_merge($row, [
                'order_index' => $i + 1,
                'description' => 'Konten deskripsi panjang untuk ' . $row['title'] . '.',
                'applications' => ['Aplikasi 1','Aplikasi 2'],
                'standards' => ['ISO 9001','RoHS compliant'],
            ]));
        }
    }
}
