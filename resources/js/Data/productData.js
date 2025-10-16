// resources/js/Data/productData.js

// Ini adalah "database" statis kita untuk semua produk khusus.
export const products = [
    { 
        slug:'sugicut', 
        name:'SUGICUT', 
        subtitle:'Metalworking – Cutting Oil', 
        image:'/images/produkk/sugicut.png', 
        summary:'Oli khusus untuk pemotongan & pembubutan pada baja, aluminium, dan stainless steel.', 
        tags:['Cutting','Metalworking'], 
        highlights:['Pendinginan & pelumasan seimbang','Kualitas permukaan halus','Umur alat lebih panjang'], 
        description:'SUGICUT dirancang untuk berbagai operasi pemotongan (turning, drilling, tapping) pada material ferrous maupun non-ferrous. Formulasinya menjaga gesekan rendah dan pembuangan panas optimal.', 
        advantages:['Mengurangi keausan tool','Memperbaiki finish permukaan','Stabil pada beban & temperatur kerja'], 
        applications:['Turning/Drilling/Tapping','Baja & Stainless','Aluminium'],
        // ===== GAMBAR BARU UNTUK SETIAP TAB =====
        description_images: ['/images/produkk/sugicut1.jpg', '/images/produkk/sugicut 2.jpg', '/images/produkk/sugicut 3.jpg'],
    },
    { 
        slug:'sunformer', 
        name:'SUNFORMER', 
        subtitle:'Metalworking – Forming/Forge Oil', 
        image:'/images/produkk/sunformer.png', 
        summary:'Pelumas penempaan untuk produksi massal yang stabil dan ramah lingkungan.', 
        tags:['Forming','Forging'], 
        highlights:['Emisi & bau rendah','Perlindungan mesin unggul','Presisi dimensi lebih baik'], 
        description:'SUNFORMER ditujukan untuk aplikasi forming/forging jangka panjang dengan fokus stabilitas proses, perlindungan mesin, serta viskositas yang mudah ditangani.', 
        advantages:['Friction control sangat baik','Kualitas produk tinggi','Umur alat lebih lama'], 
        applications:['Cold/Hot forming','Stamping/Pressing'],
        // ===== GAMBAR BARU UNTUK SETIAP TAB =====
        description_images: ['/images/produkk/sunformer1.jpg', '/images/produkk/sunformer 2.jpg', '/images/produkk/sunformer 3.jpg'],
        
    },
    { 
        slug:'sundraw', 
        name:'SUNDRAW', 
        subtitle:'Metalworking – Drawing Oil', 
        image:'/images/produkk/sundraw.png', 
        summary:'Pelumas drawing untuk penarikan logam melalui die pada tekanan tinggi.', 
        tags:['Drawing','High Pressure'], 
        highlights:['Kurangi gesekan & keausan','Proses penarikan lebih stabil','Cocok untuk berbagai logam'], 
        description:'SUNDRAW diformulasikan untuk memastikan aliran material halus saat penarikan, mencegah scoring & galling pada die.', 
        advantages:['Memperpanjang usia die','Mengurangi cacat permukaan','Konsistensi dimensi'], 
        applications:['Penarikan tabung/rod/wire','Baja karbon & stainless','Non-ferrous'],
        // ===== GAMBAR BARU UNTUK SETIAP TAB =====
        description_images: ['/images/produkk/sundraw 1.jpg', '/images/produkk/sundraw2.jpg'],
        
    },
    { 
        slug:'preton', 
        name:'PRETON', 
        subtitle:'Anti-Corrosion / Anti-Rust', 
        image:'/images/produkk/preton.png', 
        summary:'Proteksi karat & perubahan warna pada besi/non-besi; water-displacing.', 
        tags:['Anti-Rust','Protection'], 
        highlights:['Usir air & kotoran','Teruji salt spray/exposure/humidity','Aplikasi luas pada parts'], 
        description:'PRETON digunakan untuk mencegah korosi pada gulungan, pipa, poros, bagian pengerjaan logam hingga kabel, termasuk material non-besi.', 
        advantages:['Perlindungan permukaan andal','Aplikasi mudah & merata'], 
        applications:['Coil/pipa/poros/bagian logam','Gudang & pengiriman'],
        // ===== GAMBAR BARU UNTUK SETIAP TAB =====
        description_images: ['/images/produkk/proton1.jpg', '/images/produkk/proton2.jpg','/images/produkk/proton3.jpg', '/images/produkk/proton4.jpg'],
        
    },
    { 
        slug:'hibiron', 
        name:'HIBIRON', 
        subtitle:'Pickling Corrosion Inhibitor', 
        image:'/images/produkk/hibirion.png', 
        summary:'Inhibitor korosi untuk larutan asam (H₂SO₄/HCl) saat pengawetan baja.', 
        tags:['Inhibitor','Pickling'], 
        highlights:['Lindungi baja saat pickling','Bantu hilangkan kerak'], 
        description:'HIBIRON ditambahkan ke larutan asam untuk melindungi baja selama proses pickling. Juga digunakan sebagai aditif penghilang kerak pada boiler & pipa sistem pendingin.', 
        advantages:['Mengurangi laju korosi','Efisiensi pembersihan meningkat'], 
        applications:['Pickling line (H₂SO₄/HCl)','Boiler & cooling pipe descaling'],
        // ===== GAMBAR BARU UNTUK SETIAP TAB =====
        description_images: ['/images/produkk/hibiron1.jpg', , '/images/produkk/hibiron3.jpg' ],
        
    },
    { 
        slug:'sunspeed', 
        name:'SUNSPEED', 
        subtitle:'Pickling Accelerant', 
        image:'/images/produkk/sunspeed.png', 
        summary:'Akselerator pickling: kurangi waktu proses ±20–30% dan tekan oksidasi.', 
        tags:['Accelerant','Pickling'], 
        highlights:['Produktivitas naik','Kualitas permukaan konsisten'], 
        description:'SUNSPEED meningkatkan kecepatan pickling pada stainless, bearing steel, alloy steel, dan material keras.', 
        advantages:['Mengurangi waktu proses','Menekan oksidasi'], 
        applications:['Pickling baja biasa & khusus'],
        // ===== GAMBAR BARU UNTUK SETIAP TAB =====
        description_images: ['/images/produk-detail/sugicut-desc-1.jpg', '/images/produk-detail/sugicut-desc-2.jpg'],
        advantages_images: ['/images/produk-detail/sugicut-adv-1.jpg'],
        applications_images: [], // Kosongkan jika tidak ada gambar
    },
    { 
        slug:'suncleaner-waterbased', 
        name:'SUNCLEANER Waterbased', 
        subtitle:'Industrial Cleaner (Waterbased)', 
        image:'/images/produkk/suncleaner.png', 
        summary:'Degreaser berbasis air: bersihkan sisa minyak/kotoran & anti karat jangka pendek.', 
        tags:['Cleaner','Waterbased'], 
        highlights:['Degreasing efektif','Short-term anti-rust'], 
        description:'Efektif menghilangkan minyak sisa proses atau kotoran umum pada berbagai material.', 
        advantages:['Ramah lingkungan','Mudah dibilas'], 
        applications:['Komponen umum besi/logam','Pre/after-process cleaning'],
        // ===== GAMBAR BARU UNTUK SETIAP TAB =====
        
    },
    { 
        slug:'suncleaner-solventbased', 
        name:'SUNCLEANER Solventbased', 
        subtitle:'Industrial Cleaner (Solvent)', 
        image:'/images/produkk/suncleaner-2.png', 
        summary:'Pelarut efektif untuk menghilangkan minyak & kotoran pada bagian mekanis.', 
        tags:['Cleaner','Solvent'], 
        highlights:['Daya larut tinggi','Cepat kering'], 
        description:'Dirancang untuk membersihkan minyak dan partikel pada komponen mekanis.', 
        advantages:['Efek pembersih cepat','Residue rendah'], 
        applications:['Part mekanis & suku cadang','Workshop & line produksi'],
        // ===== GAMBAR BARU UNTUK SETIAP TAB =====
        
    },
];