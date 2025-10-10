import React, { useEffect, useRef } from "react";
import { Link } from "@inertiajs/react";

/**
 * SpecialProductsSection
 * Props:
 * - products: array of { id, title, slug, badge, excerpt, thumbnail, type }
 */
export default function SpecialProductsSection({ products = [] }) {
  const trackRef = useRef(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let raf;
    let pos = 0;
    const speed = 0.4;

    const step = () => {
      pos += speed;
      if (pos >= el.scrollWidth / 2) pos = 0; // loop
      el.scrollLeft = pos;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const loopItems = [...products, ...products];

  return (
    <section aria-labelledby="special-products-title" className="mt-8">
      <div className="max-w-6xl mx-auto px-4">
        <h2 id="special-products-title" className="text-3xl font-bold text-gray-900">
          Pelumas Pekerjaan Logam
        </h2>
        <p className="text-gray-600 mt-2">
          Dirancang untuk cutting, forming, dan drawing: performa, akurasi, dan umur alat lebih panjang.
        </p>
      </div>

      <div className="mt-6">
        <div ref={trackRef} className="flex overflow-x-scroll no-scrollbar" style={{ scrollBehavior: "smooth" }}>
          <div className="flex gap-6 px-4 w-max">
            {loopItems.map((p, idx) => (
              <article key={`${p?.id || p?.slug || idx}-${idx}`} className="w-[360px] shrink-0 bg-white rounded-2xl shadow hover:shadow-lg transition">
                <div className="aspect-[16/10] bg-gray-100 rounded-t-2xl overflow-hidden flex items-center justify-center">
                  {p?.thumbnail ? (
                    <img src={`/storage/${p.thumbnail}`} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <div className="text-gray-400 text-lg font-semibold">{p?.title}</div>
                  )}
                </div>

                <div className="p-4">
                  <div className="inline-flex items-center text-xs font-semibold bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full mb-2">
                    {p?.badge || p?.type}
                  </div>
                  <h3 className="text-xl font-bold">{p?.title}</h3>
                  <p className="text-gray-600 mt-1 line-clamp-3">{p?.excerpt}</p>

                  {p?.slug && (
                    <Link href={route("products.show", p.slug)} className="inline-flex items-center mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700">
                      Lihat Detail
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
