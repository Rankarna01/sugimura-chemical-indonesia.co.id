// resources/js/Components/FacilitiesSection.jsx

import React, { useState, useRef } from 'react';

// Data untuk semua fasilitas. Mudah untuk ditambah atau diubah.
const facilitiesData = [
    {
        id: 'gudang',
        tabTitle: 'Gudang',
        panelTitle: 'Gudang',
        description: 'PT. Sugimura Chemical Indonesia memiliki Gudang material dengan kapasitas 800 MT, dan 800 MT untuk produk jadi.',
        features: ['Kapasitas besar', 'Proses presisi', 'QA/QC lengkap', 'Supply andal'],
        imageUrl: '/images/fasilitas/gudang.jpg', // Ganti dengan path gambar Anda
    },
    {
        id: 'tangki',
        tabTitle: 'Tangki Penyimpanan',
        panelTitle: 'Tangki Penyimpanan',
        description: 'PT. Sugimura Chemical Indonesia memiliki fasilitas tangki penyimpanan untuk base oil dan solvent dengan berbagai kapasitas.',
        features: ['8 x 60 KL', '2 x 200 KL', '2 x 25 KL', 'Sistem terintegrasi'],
        imageUrl: '/images/fasilitas/tangki.JPG',
    },
    {
        id: 'blending',
        tabTitle: 'Blending Factory',
        panelTitle: 'Blending Factory',
        description: 'PT. Sugimura Chemical Indonesia memiliki fasilitas Blending Tank dengan kapasitas hingga 600 MT perbulan.',
        features: ['Kontrol presisi', 'Skala fleksibel', 'SOP ketat', 'Lead time cepat'],
        imageUrl: '/images/fasilitas/blending.JPG',
    },
    {
        id: 'laboratorium',
        tabTitle: 'Laboratorium',
        panelTitle: 'Laboratorium QA/QC',
        description: 'Fasilitas laboratorium kami digunakan untuk memeriksa semua bahan, produk selama dan sesudah produksi, serta memeriksa kondisi minyak bekas dari pelanggan.',
        features: ['Analisis bahan baku', 'Kontrol kualitas produk', 'Analisis oli bekas', 'Audit-ready'],
        imageUrl: '/images/fasilitas/laboratorium.JPG',
    },
];

export default function FacilitiesSection() {
    // State untuk melacak tab yang aktif
    const [activeTab, setActiveTab] = useState(facilitiesData[0].id);
    // Ref untuk mengakses DOM dari slider tab
    const tabsContainerRef = useRef(null);

    const handleScroll = (direction) => {
        const scrollAmount = 300; // Seberapa jauh scroll saat panah diklik
        if (tabsContainerRef.current) {
            tabsContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        } 
    };

    const activeFacility = facilitiesData.find(fac => fac.id === activeTab);

    return (
        <section id="fasilitas" className="py-16 bg-white md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-8 md:mb-12 text-center max-w-3xl mx-auto" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                        Fasilitas yang dimiliki oleh PT. Sugimura Chemical Indonesia
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Fasilitas modern untuk memastikan kualitas konsisten, suplai andal, dan dukungan teknis cepat.
                    </p>
                </div>

                {/* Tabs Slider */}
                <div className="relative" data-aos="fade-up" data-aos-delay="100">
                    <button onClick={() => handleScroll('left')} className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 h-10 w-10 rounded-full bg-white shadow-md items-center justify-center hover:scale-105 transition">
                        <svg width="20" height="20" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
                    </button>
                    <button onClick={() => handleScroll('right')} className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 h-10 w-10 rounded-full bg-white shadow-md items-center justify-center hover:scale-105 transition">
                        <svg width="20" height="20" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
                    </button>

                    <div ref={tabsContainerRef} className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth p-2 -mx-2">
                        {facilitiesData.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`snap-start shrink-0 px-5 py-2.5 rounded-full border text-sm font-semibold transition-all duration-300 ${activeTab === tab.id
                                        ? 'bg-green-600 text-white border-green-600'
                                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {tab.tabTitle}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Panels */}
                <div className="mt-10" data-aos="fade-up" data-aos-delay="200">
                    {activeFacility && (
                        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                            <div className="order-2 md:order-1">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{activeFacility.panelTitle}</h3>
                                <p className="text-gray-600 leading-relaxed">{activeFacility.description}</p>
                                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-gray-700">
                                    {activeFacility.features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="order-1 md:order-2">
                                <img src={activeFacility.imageUrl} alt={activeFacility.panelTitle} className="rounded-2xl shadow-lg w-full object-cover aspect-video" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}