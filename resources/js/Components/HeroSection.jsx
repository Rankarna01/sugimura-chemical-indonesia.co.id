// resources/js/Components/HeroSection.jsx

import React from 'react';

export default function HeroSection() {
    return (
        <section className="relative bg-white pt-24 lg:pt-32" id="home">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    
                    {/* Kolom Kiri: Teks & Tombol */}
                    <div className="text-center lg:text-left">
                        <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-1.5 rounded-full uppercase">
                            PT. Sugimura Chemical Indonesia
                        </span>
                        
                        <h1 className="mt-4 text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
                            Solusi Pelumas Industri dengan Standar Internasional
                        </h1>
                        
                        <p className="mt-6 text-lg text-gray-600">
                            Kami hadir untuk memenuhi kebutuhan pelumas Anda. Produk berkualitas tinggi, layanan purna jual komprehensif, serta dukungan teknis unggulan menjadikan kami mitra ideal untuk berbagai industri otomotif, logam, dan manufaktur.
                        </p>
                        
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <a href="#about" className="inline-block bg-green-600 text-white font-bold text-center py-3 px-8 rounded-lg hover:bg-green-700 transition duration-300">
                                Jelajahi Lebih Lanjut
                            </a>
                            <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-white text-gray-800 font-bold py-3 px-8 rounded-lg border border-gray-300 hover:bg-gray-100 transition duration-300">
                                Hubungi Kami
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M7 7h10v10"></path><path d="M7 17 17 7"></path>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Kolom Kanan: Gambar */}
                    <div className="relative">
                        {/* Gambar Utama */}
                        <img 
                            src="/images/hero/hero-card.JPG" 
                            alt="Pabrik Sugimura Chemical Indonesia"
                            className="rounded-2xl shadow-xl w-full h-auto"
                            data-aos="fade-left"
                        />
                        {/* Gambar Overlay Kecil */}
                        <div 
                            className="absolute -bottom-8 -left-8 hidden lg:block"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            <img 
                                src="/images/hero/hero.JPG" 
                                alt="Tangki Penyimpanan"
                                className="w-56 h-auto rounded-2xl shadow-2xl border-4 border-white"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}