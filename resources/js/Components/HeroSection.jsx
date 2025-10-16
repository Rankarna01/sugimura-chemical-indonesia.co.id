import React, { useEffect, useMemo, useRef, useState } from "react";

export default function HeroBanner() {
  const slides = useMemo(
    () => [
      {
        id: 1,
        image: "/images/hero/hero1.jpg",
        eyebrow: "PT. Sugimura Chemical Indonesia",
        title: "Solusi Pelumas Industri dengan Standar Internasional",
        text: "Produk berkualitas tinggi dengan dukungan teknis unggulan untuk otomotif, logam, dan manufaktur.",
        ctas: [
          { label: "Jelajahi Lebih Lanjut", href: "#about", primary: true },
          { label: "Hubungi Kami", href: "#contact", primary: false },
        ],
      },
      {
        id: 2,
        image: "/images/hero/hero2.jpg",
        eyebrow: "Riset & Formulasi",
        title: "Racikan Presisi untuk Performa Maksimal",
        text: "Formula disesuaikan kebutuhan proses Anda: umur pakai panjang, efisiensi pendinginan, dan proteksi korosi.",
        ctas: [
          { label: "Jelajahi Lebih Lanjut", href: "#about", primary: true },
          { label: "Hubungi Kami", href: "#contact", primary: false },
        ],
      },
      {
        id: 3,
        image: "/images/hero/heroo3.jpeg",
        eyebrow: "Layanan Purna Jual",
        title: "Monitoring Fluida & Optimasi Konsumsi",
        text: "Program audit rutin, analisa laboratorium, dan pelatihan operator untuk biaya total yang lebih rendah.",
        ctas: [
          { label: "Jelajahi Lebih Lanjut", href: "#about", primary: true },
          { label: "Hubungi Kami", href: "#contact", primary: false },
        ],
      },
      {
        id: 4,
        image: "/images/hero/heroo1.jpg",
        eyebrow: "Inovasi & Kualitas",
        title: "Spesialis Pelumas, Coolant, & Cairan Terbaik",
        text: "Spesialis Pelumas, Coolant, & Cairan Proses untuk Kinerja Industri yang Andal.",
        ctas: [
          { label: "Jelajahi Lebih Lanjut", href: "#about", primary: true },
          { label: "Hubungi Kami", href: "#contact", primary: false },
        ],
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef(null);
  const isInteractingRef = useRef(false);
  const containerRef = useRef(null);
  
  const AUTOPLAY_MS = 5000;

  const handleScrollTo = (selector) => {
    const section = document.querySelector(selector);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  
  const changeSlide = (newIndex) => {
    setIsTransitioning(true);
    setTimeout(() => {
        setIndex(newIndex);
        setTimeout(() => setIsTransitioning(false), 200);
    }, 500);
  };

  useEffect(() => {
    const start = () => {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        if (!isInteractingRef.current) {
          changeSlide((index + 1) % slides.length);
        }
      }, AUTOPLAY_MS);
    };
    start();
    return () => clearInterval(timerRef.current);
  }, [slides.length, index]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onEnter = () => (isInteractingRef.current = true);
    const onLeave = () => (isInteractingRef.current = false);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  
  const goTo = (slideIndex) => {
    if (slideIndex !== index) {
        changeSlide(slideIndex);
    }
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative isolate w-full h-[78vh] min-h-[520px] md:h-[88svh] overflow-hidden bg-black"
    >
      <style>{`
        @keyframes zoomPan {
          0% { transform: scale(1.1) translate(0, 0); }
          50% { transform: scale(1.2) translate(2%, -2%); }
          100% { transform: scale(1.1) translate(0, 0); }
        }
        .animate-zoom-pan {
          animation: zoomPan 20s ease-in-out infinite;
        }

        @keyframes slideInRight {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .slide-in { animation: slideInRight 0.8s ease-out both; }
        
        .slide-out { display: none; }
      `}</style>
      
      <div
        className={`absolute inset-0 z-20 transition-opacity duration-500 pointer-events-none ${
          isTransitioning ? "bg-white/80 opacity-100 backdrop-blur-sm" : "opacity-0"
        }`}
        aria-hidden="true"
      />

      {slides.map((s, i) => (
        <div
          key={s.id}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={s.image}
            alt="slide"
            className="absolute inset-0 h-full w-full object-cover animate-zoom-pan"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

          <div className="relative z-10 flex h-full w-full items-center justify-center px-4 sm:px-8 text-center text-white">
            <div
              className={`max-w-4xl ${ i === index ? "slide-in" : "slide-out"}`}
            >
              <span className="inline-block mb-3 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm">
                {s.eyebrow}
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-lg">
                {s.title}
              </h1>
              <p className="text-white text-base sm:text-lg md:text-xl mb-6 opacity-90 max-w-3xl mx-auto">
                {s.text}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {s.ctas.map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleScrollTo(c.href)}
                    className={`inline-flex items-center justify-center px-6 sm:px-8 py-3 rounded-lg font-semibold transition-transform duration-200 hover:scale-105 ${
                      c.primary
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg"
                        // <-- Diperbaiki: Mengganti '-' menjadi ':'
                        : "bg-white/10 hover:bg-white/20 text-white ring-1 ring-white/20 backdrop-blur-sm"
                    }`}
                  >
                    {c.label}
                    {!c.primary && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16" height="16" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2.5"
                        strokeLinecap="round" strokeLinejoin="round" className="ml-2"
                      >
                        <path d="M7 7h10v10"></path>
                        <path d="M7 17 17 7"></path>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigasi Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
              index === i
                // <-- Diperbaiki: Mengganti '-' menjadi ':'
                ? "bg-white w-6"
                : "bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}