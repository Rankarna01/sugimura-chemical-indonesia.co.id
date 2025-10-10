// resources/js/Components/CommodityProductsSection.jsx

import React from 'react';
import { Link } from '@inertiajs/react';
import { 
    FaOilCan, FaTruck, FaGears, FaCar, FaGaugeHigh, FaIndustry, FaWater, 
    FaShip, FaAnchor, FaLifeRing, FaGear, FaTemperatureHigh, FaSitemap, 
    FaScrewdriverWrench, FaCircleNodes, /* FaCogs dihapus karena salah */ FaArrowsDownToLine, FaFan, 
    FaRegSnowflake, FaRotate, FaSliders, FaGripLinesVertical 
} from 'react-icons/fa6';

// Data produk komoditas kita simpan di sini untuk sementara
// Setiap produk memiliki nama dan komponen ikon yang sesuai
const commodityProductsData = [
    { name: 'SUGILUBE ENGINE', icon: <FaOilCan /> },
    { name: 'SUGILUBE ENGINE CF-4/SG', icon: <FaTruck /> },
    { name: 'SUGILUBE CF Series (SAE 10W/30/40/50)', icon: <FaGears /> },
    { name: 'SUGILUBE ENGINE XP', icon: <FaCar /> },
    { name: 'SUGILUBE ENGINE XP2', icon: <FaGaugeHigh /> },
    { name: 'SUGILUBE ENGINE CI-4/SL', icon: <FaIndustry /> },
    { name: 'SUGILUBE MARINE 2T TC-W3', icon: <FaWater /> },
    { name: 'SUGIMARINE MR-5070', icon: <FaShip /> },
    { name: 'SUGIMARINE MR-4030', icon: <FaAnchor /> },
    { name: 'SUGIMARINE MR-4015', icon: <FaLifeRing /> },
    { name: 'SUGIGEAR ATF DEXRON IIIH', icon: <FaGear /> },
    { name: 'HITRO HR Series', icon: <FaTemperatureHigh /> },
    { name: 'SUGIGEAR TDTO', icon: <FaSitemap /> },
    { name: 'SUGIGEAR HD', icon: <FaScrewdriverWrench /> },
    { name: 'SUGIGEAR GL-4 Series', icon: <FaCircleNodes /> },
    // Ganti FaCogs dengan FaGears yang benar
    { name: 'SUGIGEAR GL-5 Series', icon: <FaGears /> }, 
    { name: 'SUGILUBE HYDRAULIC OIL (AW)', icon: <FaArrowsDownToLine /> },
    { name: 'COMPERO CR Series', icon: <FaFan /> },
    { name: 'COMPERO FG Series', icon: <FaRegSnowflake /> },
    { name: 'TROIL TR Series', icon: <FaRotate /> },
    { name: 'SUGIWAY (SLIDE OIL)', icon: <FaSliders /> },
    { name: 'RAPRO 30 (Rubber Processing Oil)', icon: <FaGripLinesVertical /> },
];

// Komponen Card untuk setiap produk
const ProductCard = ({ product }) => (
    <a href="#" className="group block rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:border-green-500 transition-all duration-300">
        <div className="p-6 text-center">
            <div className="text-4xl text-green-600 group-hover:scale-110 transition-transform duration-300 inline-block">
                {product.icon}
            </div>
            <h3 className="mt-4 text-sm font-semibold text-gray-800 group-hover:text-green-700 transition-colors duration-300">
                {product.name}
            </h3>
        </div>
    </a>
);

export default function CommodityProductsSection() {
    return (
        <section id="produk-komoditas" className="relative py-16 md:py-24 bg-gray-50/70">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-10 text-center" data-aos="fade-up">
                    <span className="inline-flex items-center text-xs font-semibold uppercase px-3 py-1 rounded-full bg-green-100 text-green-700 ring-1 ring-green-200">
                        Produk Komoditas
                    </span>
                    <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-gray-900">
                        Pilihan Lengkap untuk Kebutuhan Kendaraan & Industri
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Klik kartu untuk lihat spesifikasi lengkap di halaman detail.
                    </p>
                </header>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5" data-aos="fade-up" data-aos-delay="200">
                    {commodityProductsData.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}