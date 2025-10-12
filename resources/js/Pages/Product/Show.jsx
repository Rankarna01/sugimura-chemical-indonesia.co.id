import React, { useState, useMemo, useRef, useEffect } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/* ===================== Utilities ===================== */
const norm = (src) => {
  if (!src) return null;
  const s = String(src).trim();
  if (!s) return null;
  return s.startsWith("/storage") || s.startsWith("http") ? s : `/storage/${s}`;
};
const cleanArr = (arr) => (Array.isArray(arr) ? arr : []).map(norm).filter(Boolean);

/* ===================== UI Bits ===================== */
const Bullet = ({ children }) => (
  <div className="rounded-xl border border-emerald-100/70 bg-emerald-50/70 py-3 px-4 text-sm text-emerald-900 flex gap-2 items-start shadow-sm">
    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
    <span className="font-medium break-words">{children}</span>
  </div>
);

/** Mini card image with tilt-ish effect */
function ThumbCard({ src, alt, onClick }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const handleMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const rx = ((y / r.height) - 0.5) * -4; // rotateX
      const ry = ((x / r.width) - 0.5) * 4;   // rotateY
      el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
    };
    const reset = () => (el.style.transform = "");
    el.addEventListener("mousemove", handleMove, { passive: true });
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative w-full"
      aria-label="Buka gambar"
    >
      <div
        ref={cardRef}
        className="rounded-2xl overflow-hidden border border-emerald-100/70 bg-white/60 backdrop-blur-sm shadow-[0_6px_18px_rgba(16,185,129,0.12)] transition-transform duration-200 will-change-transform"
      >
        {/* Gunakan rasio tetap agar grid stabil di semua device */}
        <div className="aspect-[4/3] w-full">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
          />
        </div>
      </div>

      {/* glow */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ boxShadow: "0 8px 30px rgba(16,185,129,.25)" }} />
    </button>
  );
}

/** Lightbox modal */
function Lightbox({ open, images = [], index = 0, onClose }) {
  const [i, setI] = useState(index);
  useEffect(() => setI(index), [index, open]);
  if (!open) return null;

  const prev = () => setI((p) => (p - 1 + images.length) % images.length);
  const next = () => setI((p) => (p + 1) % images.length);

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      <div className="relative max-w-6xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <img src={images[i]} alt={`img-${i}`} className="w-full max-h-[74vh] sm:max-h-[78vh] object-contain rounded-2xl shadow-2xl" />
        <button aria-label="Tutup lightbox" onClick={onClose} className="absolute -top-3 -right-3 bg-white text-emerald-700 rounded-full w-9 h-9 shadow-lg">×</button>
        {images.length > 1 && (
          <>
            <button aria-label="Gambar sebelumnya" onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full w-10 h-10 grid place-items-center shadow focus:outline-none focus:ring-2 focus:ring-emerald-400">
              ‹
            </button>
            <button aria-label="Gambar berikutnya" onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full w-10 h-10 grid place-items-center shadow focus:outline-none focus:ring-2 focus:ring-emerald-400">
              ›
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/** Section with text, list, and mini gallery grid */
function FancySection({ text, list, images }) {
  const imgs = cleanArr(images);
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);

  return (
    <div className="space-y-6">
      {/* text */}
      {text && (
        <p className="text-emerald-900/90 leading-relaxed whitespace-pre-line break-words">
          {text}
        </p>
      )}

      {/* bullet list */}
      {Array.isArray(list) && list.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {list.map((item, i) => (
            <Bullet key={i}>{item}</Bullet>
          ))}
        </div>
      )}

      {/* mini gallery */}
      {imgs.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {imgs.map((img, i) => (
            <ThumbCard
              key={i}
              src={img}
              alt={`gallery-${i}`}
              onClick={() => {
                setLbIndex(i);
                setLbOpen(true);
              }}
            />
          ))}
        </div>
      )}

      <Lightbox open={lbOpen} images={imgs} index={lbIndex} onClose={() => setLbOpen(false)} />
    </div>
  );
}

/* ===================== PAGE ===================== */
export default function Show() {
  const { product } = usePage().props;
  const [tab, setTab] = useState("Deskripsi");
  const tabs = ["Deskripsi", "Keunggulan", "Aplikasi"];

  // Hero images (slider)
  const heroImages = useMemo(() => {
    const gallery = cleanArr(product.banner_gallery);
    const fallback = cleanArr([product.banner, product.thumbnail]);
    return gallery.length ? gallery : fallback;
  }, [product]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-white to-white">
      <Head title={product.seo_title || product.title} />

      {/* Breadcrumb */}
      <div className="max-w-screen-xl mx-auto px-3 sm:px-4 pt-6 text-sm text-emerald-800/70">
        <div className="flex items-center flex-wrap gap-x-1 gap-y-1 min-w-0">
          <Link href={route("home")} className="hover:underline shrink-0">Beranda</Link>
          <span className="mx-1">›</span>
          <span className="shrink-0">Produk Khusus</span>
          <span className="mx-1">›</span>
          <span className="font-semibold text-emerald-900 break-words hyphens-auto min-w-0">{product.title}</span>
        </div>
      </div>

      {/* Hero + Meta */}
      <div className="max-w-screen-xl mx-auto px-3 sm:px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Slideshow */}
        <div className="lg:col-span-7 min-w-0">
          <div className="rounded-3xl bg-white shadow border border-emerald-100 p-2.5 sm:p-4 overflow-hidden">
            <div className="rounded-2xl overflow-hidden">
              {heroImages.length > 0 ? (
                <Swiper
                  modules={[Autoplay, Pagination, Navigation]}
                  autoplay={{ delay: 2800, disableOnInteraction: false }}
                  loop={heroImages.length > 1}
                  navigation
                  pagination={{ clickable: true }}
                  className="aspect-[4/3] sm:aspect-[3/2] md:aspect-[16/10] lg:aspect-[16/9]"
                >
                  {heroImages.map((src, i) => (
                    <SwiperSlide key={i}>
                      <img
                        src={src}
                        alt={`${product.title}-${i}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="aspect-[16/9] grid place-items-center bg-emerald-50 text-emerald-700">
                  Tidak ada gambar
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info kanan */}
        <div className="lg:col-span-5 min-w-0">
          <div className="rounded-3xl bg-white shadow border border-emerald-100 p-5 sm:p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                METALWORKING – {product.type?.toUpperCase()}
              </span>
              {product.badge && (
                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
                  {product.badge}
                </span>
              )}
              {product.product_code && (
                <span className="px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold">
                  Kode: {product.product_code}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-emerald-900 leading-tight break-words hyphens-auto">{product.title}</h1>

            {product.excerpt && (
              <p className="text-emerald-900/80 mt-3 leading-relaxed break-words">{product.excerpt}</p>
            )}

            {!!(product.features?.length) && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.slice(0, 4).map((f, i) => (
                  <Bullet key={i}>{f}</Bullet>
                ))}
              </div>
            )}

            <div className="mt-6">
              <Link href={route("home")} className="text-emerald-700 hover:underline">← Kembali</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-screen-xl mx-auto px-3 sm:px-4 pb-16">
        <div className="rounded-3xl bg-white shadow border border-emerald-100 overflow-hidden">
          <div className="px-3 sm:px-4 pt-4">
            <div className="flex gap-2 overflow-x-auto whitespace-nowrap no-scrollbar scroll-px-3 snap-x">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-2 rounded-2xl text-sm font-semibold transition shrink-0 snap-start ${
                    tab === t
                      ? "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {tab === "Deskripsi" && (
              <FancySection text={product.description} images={product.description_images} />
            )}
            {tab === "Keunggulan" && (
              <FancySection list={product.features} images={product.features_images} />
            )}
            {tab === "Aplikasi" && (
              <FancySection list={product.applications} images={product.applications_images} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== Utilities: hide scrollbar for overflow-x areas (optional, Tailwind plugin or global CSS) =====
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
*/
