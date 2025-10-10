// resources/js/Components/AboutSection.jsx

import React from 'react';

// Komponen kecil untuk daftar keunggulan agar lebih rapi
const FeatureItem = ({ children }) => (
    <li className="flex items-center gap-3">
        <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white">
            {/* Ikon Checkmark SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
            </svg>
        </div>
        <span className="text-gray-700">{children}</span>
    </li>
);

export default function AboutSection() {
    return (
        <section className="bg-gray-50/50 py-16 md:py-24" id="about">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                    {/* Kolom Kiri: Gambar & Mission Statement */}
                    <div className="relative" data-aos="fade-right">
                        <img 
                            className="w-full rounded-2xl shadow-lg" 
                            src="/images/about/about.JPG" // <-- Pastikan gambar ada di public/images/about/about.JPG
                            alt="Fasilitas produksi & laboratorium" 
                        />
                        <div 
                            className="mt-[-4rem] ml-4 lg:ml-8 relative z-10 bg-green-800 text-white p-6 md:p-8 rounded-2xl shadow-xl flex items-start gap-4"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            <div className="flex-shrink-0 bg-white/10 rounded-full p-3">
                                {/* Ikon Lightbulb SVG */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-wider">Mission Statement</h3>
                                <p className="mt-2 text-base md:text-lg">
                                    Memberikan solusi pelumasan yang aman, efisien, dan berkelanjutan melalui formulasi tepat, kontrol mutu laboratorium, serta layanan teknis responsif—untuk memperpanjang umur peralatan dan meningkatkan produktivitas pelanggan.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Kolom Kanan: Teks Deskripsi */}
                    <div data-aos="fade-left">
                        <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-1.5 rounded-full uppercase">
                            Tentang Kami
                        </span>
                        
                        <h2 className="mt-4 text-3xl lg:text-4xl font-extrabold text-gray-900">
                            Spesialis Pelumas, Coolant, & Cairan Proses untuk Kinerja Industri yang Andal
                        </h2>
                        
                        <div className="mt-6 space-y-4 text-gray-600">
                            <p>
                                PT. Sugimura Chemical Indonesia berdiri sejak Maret 2013 sebagai joint venture 50%-50% antara Sugimura Chemical Industrial Co. Ltd (Jepang) dan PT. Adiguna Eka Sentra (Indochemical Citra Kimia Group).
                            </p>
                            <p>
                                Kami fokus memproduksi pelumas industri dan coolant (cutting oil), khususnya untuk pengerjaan logam dan industri otomotif. Dengan dukungan jaringan internasional Sugimura Co., Ltd di Jepang dan cabang globalnya, kami berkomitmen memberikan:
                            </p>
                        </div>
                        
                        <ul className="mt-6 space-y-4">
                            <FeatureItem>Produk berkualitas tinggi</FeatureItem>
                            <FeatureItem>Layanan purna jual komprehensif</FeatureItem>
                            <FeatureItem>Dukungan teknis yang handal</FeatureItem>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}