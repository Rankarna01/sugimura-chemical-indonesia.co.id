// resources/js/Components/LubricantsSection.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const sliderData = [
  { imgSrc: "/images/produk/produk-1.jpeg", alt: "Pelumas untuk proses metalworking", caption: "Metal Working Fluids (Cutting & Forming)" },
  { imgSrc: "/images/produk/produk-3.jpg",   alt: "Pelumas transmisi dan gear",       caption: "Gear & Transmission Oils" },
  { imgSrc: "/images/produk/produk-4.jpg",   alt: "Oli hidraulik industri",            caption: "Hydraulic, Turbine & Heat Transfer Oils" },
];

const categoriesData = [
  { title: "Metal Working Fluid",          products: "SUNDRAW, SUGICUT, SUNFORMER, SUNROLL, SUNTOLL" },
  { title: "Anti-corrosion & Anti-rust",   products: "PRETON, HIBIRON, SUNSPEED" },
  { title: "Heat Transfer Oil",            products: "HITRO HR" },
  { title: "Engine & Transmission Oil",    products: "SUGILUBE ENGINE, SUGILUBE CF, SUGIMARINE, ATF DEXRON (NEW)" },
  { title: "Industrial Oil",               products: "COMPERO, TROIL, SUGIGEAR, SUGIGEAR TDTO, SUGILUBE HYDRAULICS" },
  { title: "Specialty Lubricant",          products: "RAPRO, SUGIWAY" },
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
          <div className="mt-4 h-1.5 w-24 mx-auto bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-shimmer" />
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* LEFT: Slider */}
          <div data-aos="fade-right">
            <Swiper
              modules={[Navigation, Pagination, Autoplay, A11y, Keyboard]}
              loop
              keyboard={{ enabled: true }}
              autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
              pagination={{ clickable: true }}
              navigation // panah di-hide via CSS di <md
              className="rounded-2xl shadow-xl overflow-hidden"
            >
              {sliderData.map((s, i) => (
                <SwiperSlide key={i}>
                  <figure className="relative">
                    {/* Rasio adaptif: mobile 4:3, sm 16:10, md+ 16:9 */}
                    <img
                      src={s.imgSrc}
                      alt={s.alt}
                      loading="lazy"
                      className="w-full h-full object-cover aspect-[4/3] sm:aspect-[16/10] md:aspect-video"
                    />
                    <figcaption className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white bg-gradient-to-t from-black/70 to-transparent text-sm sm:text-base font-semibold">
                      {s.caption}
                    </figcaption>
                  </figure>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* RIGHT: Text & Categories */}
          <div data-aos="fade-left" data-aos-delay="100" className="max-w-2xl md:max-w-none mx-auto md:mx-0">
            <p className="text-gray-600 leading-relaxed text-center md:text-left">
              Fungsi pelumasan adalah untuk meminimalisir keausan komponen yang bergesekan dengan cara menjaga permukaan
              tetap licin dan terlumasi. Pelumas berkualitas juga harus mampu mempertahankan karakteristiknya, melindungi
              permukaan, dan mendinginkan komponen yang bergesekan.
            </p>

            {/* 1 / 2 / 3 kolom */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoriesData.map((cat, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-white border border-gray-200 shadow-sm p-4 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300"
                >
                  <p className="text-[11px] uppercase tracking-wide text-gray-500">{cat.title}</p>
                  <p className="text-sm font-semibold text-gray-800 mt-1">{cat.products}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-3">
              <a
                href="#produk-khusus"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition shadow w-full sm:w-auto"
              >
                Lihat Produk
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-gray-800 font-semibold hover:bg-gray-100 transition shadow-sm border border-gray-300 w-full sm:w-auto"
              >
                Konsultasi Teknis
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CSS responsif tambahan */}
      <style>{`
        /* Sembunyikan tombol panah Swiper di layar kecil */
        @media (max-width: 767.98px) {
          .swiper-button-prev,
          .swiper-button-next { display: none !important; }
        }

        /* Animasi shimmer util (opsional) */
        @keyframes shimmer { 0% { transform: translateX(-40%);} 100% { transform: translateX(140%);} }
        .animate-shimmer { position: relative; overflow: hidden; }
        .animate-shimmer::after {
          content: ""; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.55), transparent);
          transform: translateX(-40%); animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
}
