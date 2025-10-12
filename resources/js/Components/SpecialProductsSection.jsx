import React, { useMemo, useRef, useEffect } from "react";
import { Link } from "@inertiajs/react";

/* normalize path */
const norm = (src) => {
  if (!src) return null;
  return src.startsWith("/storage") || src.startsWith("http") ? src : `/storage/${src}`;
};

/* ===== Card (basis responsif) ===== */
function ProductCard({ p }) {
  return (
    <article className="basis-card bg-white/90 backdrop-blur rounded-2xl border border-emerald-100 shadow hover:shadow-lg transition">
      <div className="aspect-[16/10] bg-gray-100 rounded-t-2xl overflow-hidden">
        {p?.thumbnail ? (
          <img src={norm(p.thumbnail)} alt={p?.title} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full grid place-items-center text-gray-400">{p?.title}</div>
        )}
      </div>
      <div className="p-4">
        <div className="inline-flex items-center text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full mb-2">
          {p?.badge || p?.type}
        </div>
        <h4 className="text-lg font-bold line-clamp-1">{p?.title}</h4>
        <p className="text-gray-600 mt-1 line-clamp-3">{p?.excerpt}</p>
        {p?.slug && (
          <Link
            href={route("products.show", p.slug)}
            className="inline-flex items-center mt-3 px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Lihat Detail
          </Link>
        )}
      </div>
    </article>
  );
}

/* ===== Marquee baris (arah: 'right' | 'left') ===== */
function MarqueeRow({ rowItems = [], direction = "right", speedPxPerSec = 110 }) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    // clone set-1 → set-2 untuk loop mulus
    const children = Array.from(track.children);
    // bersihkan clone lama jika ada (idempotent)
    children.slice(3).forEach((c) => c.remove());
    children.forEach((c) => track.appendChild(c.cloneNode(true)));

    const half = track.children.length / 2;

    const getWidthFirstSet = () => {
      let w = 0;
      const gap = 24; // gap-6
      for (let i = 0; i < half; i++) w += track.children[i].getBoundingClientRect().width;
      w += gap * Math.max(0, half - 1);
      return Math.max(1, w);
    };

    const apply = () => {
      const width = getWidthFirstSet();
      const duration = Math.max(12, Math.round(width / speedPxPerSec));
      track.style.animation = `${
        direction === "left" ? "marquee-left" : "marquee-right"
      } ${duration}s linear infinite`;
    };

    const raf = requestAnimationFrame(apply);
    const onResize = () => requestAnimationFrame(apply);
    window.addEventListener("resize", onResize);

    const onEnter = () => (track.style.animationPlayState = "paused");
    const onLeave = () => (track.style.animationPlayState = "running");
    wrap.addEventListener("mouseenter", onEnter);
    wrap.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      wrap.removeEventListener("mouseenter", onEnter);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, [rowItems, direction, speedPxPerSec]);

  return (
    <div ref={wrapRef} className="overflow-hidden">
      <div ref={trackRef} className="flex gap-6 will-change-transform">
        {rowItems.map((p, idx) => (
          <ProductCard key={(p?.id || p?.slug || "p") + "-" + idx} p={p} />
        ))}
      </div>
    </div>
  );
}

/* helper pecah per 3 */
const chunk3 = (arr) => {
  const out = [];
  for (let i = 0; i < arr.length; i += 3) out.push(arr.slice(i, i + 3));
  return out;
};

/* ====== SECTION ====== */
export default function SpecialProductsSection({ products = [] }) {
  const rows = useMemo(() => chunk3(products), [products]);

  return (
    <section id="produk-khusus" className="relative py-24 overflow-hidden" style={{ wordBreak: "normal" }}>
      {/* dekorasi */}
      <div
        aria-hidden="true"
        className="absolute inset-0 [background:radial-gradient(circle_at_1px_1px,theme(colors.gray.200)_1px,transparent_1.5px)] [background-size:22px_22px]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 right-0 w-[32rem] h-[32rem] blur-3xl opacity-30 bg-emerald-300/20" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-20 w-[28rem] h-[28rem] blur-3xl opacity-25 bg-indigo-300/30" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* HEADER */}
        <div className="mb-10 text-center">
  <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-emerald-600/10 text-emerald-700 ring-1 ring-emerald-600/20 mx-auto">
    Produk Khusus
  </span>

  <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
    Solusi Pelumas Spesialis – Fokus Berbagai Aplikasi
  </h2>

  <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
    PT. Sugimura Chemical Indonesia memproduksi berbagai jenis oli dan pelumas khusus untuk berbagai aplikasi,
    terutama untuk kebutuhan berbagai industri seperti logam, otomotif, dan lainnya.
  </p>
</div>


        {/* ROWS responsif */}
        <div className="space-y-8">
          {rows.map((row, i) => (
            <MarqueeRow
              key={`row-${i}`}
              rowItems={row}
              direction={i % 2 === 0 ? "right" : "left"} // baris 1 kanan, baris 2 kiri, dst
              speedPxPerSec={110}
            />
          ))}
        </div>
      </div>

      {/* keyframes + basis responsif */}
      <style>{`
        @keyframes marquee-left  { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }

        /* RESPONSIVE CARD BASIS:
           - default (mobile): ~85% lebar (seperti slider)
           - sm ≥640px: ~60%
           - md ≥768px: 50% (2 kolom)
           - lg ≥1024px: 33.333% (3 kolom) */
        .basis-card { flex: 0 0 85%; max-width: 85%; width: 85%; }
        @media (min-width: 640px) { .basis-card { flex-basis: 60%; max-width: 60%; width: 60%; } }
        @media (min-width: 768px) { .basis-card { flex-basis: 50%; max-width: 50%; width: 50%; } }
        @media (min-width: 1024px){ .basis-card { flex-basis: 33.3333%; max-width: 33.3333%; width: 33.3333%; } }
      `}</style>
    </section>
  );
}
