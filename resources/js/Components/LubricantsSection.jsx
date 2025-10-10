// resources/js/Components/LubricantsSection.jsx

import React from 'react';
// Impor komponen dan modul Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Impor CSS Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Data untuk slider, agar mudah dikelola
const sliderData = [
    {
        imgSrc: '/images/produk/produk-1.jpeg',
        alt: 'Pelumas untuk proses metalworking',
        caption: 'Metal Working Fluids (Cutting & Forming)',
    },
    {
        imgSrc: '/images/produk/produk-3.jpg',
        alt: 'Pelumas transmisi dan gear',
        caption: 'Gear & Transmission Oils',
    },
    {
        imgSrc: '/images/produk/produk-4.jpg',
        alt: 'Oli hidraulik industri',
        caption: 'Hydraulic, Turbine & Heat Transfer Oils',
    },
];

// Data untuk kategori produk
const categoriesData = [
    { title: 'Metal Working Fluid', products: 'SUNDRAW, SUGICUT, SUNFORMER, SUNROLL, SUNTOLL' },
    { title: 'Anti-corrosion & Anti-rust', products: 'PRETON, HIBIRON, SUNSPEED' },
    { title: 'Heat Transfer Oil', products: 'HITRO HR' },
    { title: 'Engine & Transmission Oil', products: 'SUGILUBE ENGINE, SUGILUBE CF, SUGIMARINE, ATF DEXRON (NEW)' },
    { title: 'Industrial Oil', products: 'COMPERO, TROIL, SUGIGEAR, SUGIGEAR TDTOa, SUGILUBE HYDRAULICS' },
    { title: 'Specialty Lubricant', products: 'RAPRO, SUGIWAY' },
];

export default function LubricantsSection() {
    return (
        <section id="pelumas" className="relative py-16 md:py-24 bg-gray-50/50 overflow-hidden">
            <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 text-center" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                        Solusi Pelumasan Lengkap untuk Industri
                    </h2>
                    <div className="mt-4 h-1.5 w-24 mx-auto bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-shimmer"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* KIRI: Slider */}
                    <div data-aos="fade-right">
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            loop={true}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            pagination={{ clickable: true }}
                            navigation={true}
                            className="rounded-2xl shadow-xl"
                        >
                            {sliderData.map((slide, index) => (
                                <SwiperSlide key={index}>
                                    <figure className="relative">
                                        <img src={slide.imgSrc} alt={slide.alt} className="w-full h-full object-cover aspect-video" />
                                        <figcaption className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/70 to-transparent text-base font-semibold">
                                            {slide.caption}
                                        </figcaption>
                                    </figure>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* KANAN: Deskripsi & Kategori */}
                    <div data-aos="fade-left" data-aos-delay="100">
                        <p className="text-gray-600 leading-relaxed text-justify">
                            Fungsi pelumasan adalah untuk meminimalisir keausan komponen yang bergesekan dengan cara menjaga permukaan tetap licin dan terlumasi. Pelumas berkualitas juga harus mampu mempertahankan karakteristiknya, melindungi permukaan, dan mendinginkan komponen yang bergesekan.
                        </p>

                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {categoriesData.map((cat, index) => (
                                <div key={index} className="rounded-xl bg-white border border-gray-200 shadow-sm p-4 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
                                    <p className="text-xs text-gray-500">{cat.title}</p>
                                    <p className="text-sm font-semibold text-gray-800">{cat.products}</p>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-8 flex flex-wrap gap-4">
                             <a href="#produk" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition shadow">
                                Lihat Produk
                            </a>
                            <a href="#kontak" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-gray-800 font-semibold hover:bg-gray-100 transition shadow-sm border border-gray-300">
                                Konsultasi Teknis
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}