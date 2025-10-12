// resources/js/Components/FacilitiesSection.jsx
import React, { useState, useRef, useEffect, useMemo } from "react";

// Data fasilitas
const facilitiesData = [
  {
    id: "gudang",
    tabTitle: "Gudang",
    panelTitle: "Gudang",
    description:
      "PT. Sugimura Chemical Indonesia memiliki Gudang material dengan kapasitas 800 MT, dan 800 MT untuk produk jadi.",
    features: ["Kapasitas besar", "Proses presisi", "QA/QC lengkap", "Supply andal"],
    imageUrl: "/images/fasilitas/gudang.jpg",
  },
  {
    id: "tangki",
    tabTitle: "Tangki Penyimpanan",
    panelTitle: "Tangki Penyimpanan",
    description:
      "PT. Sugimura Chemical Indonesia memiliki fasilitas tangki penyimpanan untuk base oil dan solvent dengan berbagai kapasitas.",
    features: ["8 x 60 KL", "2 x 200 KL", "2 x 25 KL", "Sistem terintegrasi"],
    imageUrl: "/images/fasilitas/tangki.JPG",
  },
  {
    id: "blending",
    tabTitle: "Blending Factory",
    panelTitle: "Blending Factory",
    description:
      "PT. Sugimura Chemical Indonesia memiliki fasilitas Blending Tank dengan kapasitas hingga 600 MT perbulan.",
    features: ["Kontrol presisi", "Skala fleksibel", "SOP ketat", "Lead time cepat"],
    imageUrl: "/images/fasilitas/blending.JPG",
  },
  {
    id: "laboratorium",
    tabTitle: "Laboratorium",
    panelTitle: "Laboratorium QA/QC",
    description:
      "Fasilitas laboratorium kami digunakan untuk memeriksa semua bahan, produk selama dan sesudah produksi, serta memeriksa kondisi minyak bekas dari pelanggan.",
    features: ["Analisis bahan baku", "Kontrol kualitas produk", "Analisis oli bekas", "Audit-ready"],
    imageUrl: "/images/fasilitas/laboratorium.JPG",
  },
];

export default function FacilitiesSection() {
  const [activeTab, setActiveTab] = useState(facilitiesData[0].id);
  const tabsContainerRef = useRef(null);
  const leftFadeRef = useRef(null);
  const rightFadeRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);

  // facility aktif
  const activeFacility = useMemo(
    () => facilitiesData.find((f) => f.id === activeTab),
    [activeTab]
  );

  // cek overflow untuk tampilkan panah & mask
  const updateOverflowUI = () => {
    const el = tabsContainerRef.current;
    if (!el) return;
    const overflow = el.scrollWidth > el.clientWidth + 2;
    setShowArrows(overflow);
    if (leftFadeRef.current) {
      leftFadeRef.current.style.opacity = el.scrollLeft > 2 ? "1" : "0";
    }
    if (rightFadeRef.current) {
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
      rightFadeRef.current.style.opacity = atEnd ? "0" : "1";
    }
  };

  useEffect(() => {
    updateOverflowUI();
    const el = tabsContainerRef.current;
    if (!el) return;

    const onScroll = () => updateOverflowUI();
    const onResize = () => updateOverflowUI();

    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const ro = new ResizeObserver(updateOverflowUI);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, []);

  // scroll tab kiri/kanan
  const handleScroll = (dir) => {
    const el = tabsContainerRef.current;
    if (!el) return;
    const amount = Math.max(240, el.clientWidth * 0.6);
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  // keyboard akses: panah kiri/kanan pindah fokus tab
  const onTabsKeyDown = (e) => {
    const el = tabsContainerRef.current;
    if (!el) return;
    const focusables = Array.from(el.querySelectorAll('button[role="tab"]'));
    const idx = focusables.findIndex((n) => n === document.activeElement);
    if (e.key === "ArrowRight") {
      const next = focusables[(idx + 1 + focusables.length) % focusables.length];
      next?.focus();
      e.preventDefault();
    } else if (e.key === "ArrowLeft") {
      const prev = focusables[(idx - 1 + focusables.length) % focusables.length];
      prev?.focus();
      e.preventDefault();
    }
  };

  return (
    <section id="fasilitas" className="relative bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Fasilitas yang dimiliki oleh PT. Sugimura Chemical Indonesia
          </h2>
          <p className="mt-4 text-gray-600">
            Fasilitas modern untuk memastikan kualitas konsisten, suplai andal, dan dukungan teknis cepat.
          </p>
          <div className="mt-5 h-1.5 w-24 mx-auto rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
        </div>

        {/* Tabs */}
        <div
          className="relative"
          data-aos="fade-up"
          data-aos-delay="80"
        >
          {/* fade mask kiri/kanan (muncul saat overflow) */}
          <div
            ref={leftFadeRef}
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white to-transparent transition-opacity duration-300 opacity-0"
          />
          <div
            ref={rightFadeRef}
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent transition-opacity duration-300 opacity-0"
          />

          {/* panah scroll (hidden kalau tidak overflow) */}
          {showArrows && (
            <>
              <button
                type="button"
                onClick={() => handleScroll("left")}
                className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white text-emerald-700 shadow ring-1 ring-emerald-100 hover:scale-[1.03] transition"
                aria-label="Scroll tabs ke kiri"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" className="m-auto">
                  <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => handleScroll("right")}
                className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white text-emerald-700 shadow ring-1 ring-emerald-100 hover:scale-[1.03] transition"
                aria-label="Scroll tabs ke kanan"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" className="m-auto">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
              </button>
            </>
          )}

          {/* list tabs (scroll di mobile, wrap di lg) */}
          <div
            ref={tabsContainerRef}
            className="flex gap-2 sm:gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth p-2 -mx-2 lg:flex-wrap lg:overflow-visible"
            role="tablist"
            aria-label="Fasilitas"
            onKeyDown={onTabsKeyDown}
          >
            {facilitiesData.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={active}
                  aria-controls={`panel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    "snap-start shrink-0 px-4 sm:px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 focus:outline-none",
                    active
                      ? "bg-emerald-600 text-white ring-1 ring-emerald-500"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100",
                  ].join(" ")}
                >
                  <span className="relative">
                    {tab.tabTitle}
                    {active && (
                      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-10 rounded-full bg-emerald-500/80" />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel konten */}
        <div className="mt-10" data-aos="fade-up" data-aos-delay="140">
          {activeFacility && (
            <div
              id={`panel-${activeFacility.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeFacility.id}`}
              className="grid md:grid-cols-2 gap-8 md:gap-12 items-start"
            >
              {/* teks */}
              <div className="order-2 md:order-1 max-w-2xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {activeFacility.panelTitle}
                </h3>
                <p className="text-gray-600 leading-relaxed">{activeFacility.description}</p>

                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-gray-700">
                  {activeFacility.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA opsional */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition shadow w-full sm:w-auto"
                  >
                    Konsultasi Teknis
                  </a>
                  <a
                    href="#produk-khusus"
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-white text-gray-800 font-semibold hover:bg-gray-100 transition shadow-sm border border-gray-300 w-full sm:w-auto"
                  >
                    Lihat Produk Terkait
                  </a>
                </div>
              </div>

              {/* gambar */}
              <div className="order-1 md:order-2">
                <figure className="rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5">
                  <img
                    src={activeFacility.imageUrl}
                    alt={activeFacility.panelTitle}
                    loading="lazy"
                    className="w-full h-full object-cover aspect-video"
                  />
                </figure>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* util style */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
