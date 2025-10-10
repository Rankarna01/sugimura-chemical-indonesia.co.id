import React, { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Show() {
  const { product } = usePage().props;
  const tabs = ["Deskripsi", "Keunggulan", "Aplikasi", "Standar & Mutu"];
  const [tab, setTab] = useState(tabs[0]);

  const heroImages = product.banner_gallery?.length
    ? product.banner_gallery
    : [product.banner || product.thumbnail].filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-white to-white">
      <Head title={product.seo_title || product.title} />

      {/* BREADCRUMB sederhana */}
      <div className="max-w-6xl mx-auto px-4 pt-6 text-sm text-emerald-800/70">
        <Link href={route("home")} className="hover:underline">Beranda</Link> <span>›</span> Produk Khusus <span>›</span> <span className="font-semibold text-emerald-900">{product.title}</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 grid lg:grid-cols-[1.1fr_1fr] gap-8 items-start">
        {/* LEFT: HERO SLIDESHOW */}
        <div className="rounded-3xl bg-white shadow border border-emerald-100 p-4">
          <div className="rounded-2xl overflow-hidden">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              autoplay={{ delay: 2800, disableOnInteraction: false }}
              loop={heroImages.length > 1}
              navigation
              pagination={{ clickable: true }}
              className="aspect-[16/11]"
            >
              {heroImages.map((src, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={src.startsWith('/storage') ? src : `/storage/${src}`}
                    alt={`${product.title}-${i}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* RIGHT: META */}
        <div className="rounded-3xl bg-white shadow border border-emerald-100 p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
              METALWORKING – {product.type?.toUpperCase()}
            </span>
            {product.badge && (
              <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
                {product.badge}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-900">{product.title}</h1>
          {product.excerpt && <p className="text-emerald-900/80 mt-3">{product.excerpt}</p>}

          {/* highlights */}
          {!!(product.features?.length) && (
            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              {product.features.slice(0,3).map((f, i) => (
                <div key={i} className="rounded-xl border border-emerald-100 bg-emerald-50/40 py-3 px-4 text-sm text-emerald-900 flex gap-2 items-start">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600"></span>
                  <span className="font-medium">{f}</span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6">
            <Link href={route("home")} className="text-emerald-700 hover:underline">← Kembali</Link>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="max-w-6xl mx-auto px-4 pb-16 grid lg:grid-cols-[1fr_0.7fr] gap-8 items-start">
        <div className="rounded-3xl bg-white shadow border border-emerald-100">
          {/* tab header */}
          <div className="px-4 pt-4">
            <div className="flex flex-wrap gap-2">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-2 rounded-2xl text-sm font-semibold transition
                    ${tab === t ? "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {tab === "Deskripsi" && (
              <TabWithGallery
                text={product.description}
                images={product.description_images}
              />
            )}

            {tab === "Keunggulan" && (
              <TabWithGallery
                list={product.features}
                images={product.features_images}
              />
            )}

            {tab === "Aplikasi" && (
              <TabWithGallery
                list={product.applications}
                images={product.applications_images}
              />
            )}

            {tab === "Standar & Mutu" && (
              <TabWithGallery
                list={product.standards}
                images={product.standards_images}
              />
            )}
          </div>
        </div>

        {/* Sidebar bantuan */}
        <aside className="rounded-3xl bg-white shadow border border-emerald-100 p-6">
          <h3 className="text-xl font-bold text-emerald-900">Butuh Bantuan Teknis?</h3>
          <p className="text-emerald-900/80 mt-2">
            Tim kami siap bantu rekomendasi produk, kompatibilitas, dan penerapan di lapangan.
          </p>
          <a
            href="mailto:info@sugimura.co.id"
            className="mt-5 block text-center px-5 py-3 rounded-2xl bg-emerald-600 text-white font-semibold hover:opacity-90"
          >
            Konsultasi Gratis
          </a>

          <div className="mt-3 px-4 py-2 rounded-2xl bg-emerald-50 text-emerald-800 font-medium">
            Email: info@sugimura.co.id
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ---------------- components ---------------- */

function TabWithGallery({ text, list, images = [] }) {
  const hasImages = images?.length > 0;

  return (
    <div className="space-y-6">
      {hasImages && (
        <div className="rounded-2xl overflow-hidden border border-emerald-100">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={images.length > 1}
            navigation
            pagination={{ dynamicBullets: true }}
            className="aspect-[16/9]"
          >
            {images.map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  src={img.startsWith('/storage') ? img : `/storage/${img}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {text && (
        <div className="prose max-w-none prose-emerald">
          <p className="text-emerald-900 whitespace-pre-line">{text}</p>
        </div>
      )}

      {Array.isArray(list) && list.length > 0 && (
        <ul className="grid sm:grid-cols-2 gap-3">
          {list.map((item, i) => (
            <li key={i} className="flex gap-3 items-start rounded-xl bg-emerald-50/40 border border-emerald-100 px-4 py-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-emerald-600"></span>
              <span className="text-emerald-900">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
