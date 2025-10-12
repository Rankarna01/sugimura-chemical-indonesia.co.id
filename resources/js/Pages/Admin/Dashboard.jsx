import React from "react";
import { Link, useForm, usePage } from "@inertiajs/react";

/* ---------- Mini helpers ---------- */
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

/* ---------- Simple SVG Line Chart (no deps) ---------- */
function LineChart({ data = [], labels = [], height = 180, stroke = "#059669", fill = "rgba(16,185,129,.12)" }) {
  const H = height;
  const W = 560; // viewBox width
  const pad = 28;

  const vals = data.length ? data : [0];
  const max = Math.max(1, ...vals);
  const min = Math.min(0, ...vals);

  const range = max - min || 1;
  const dx = (W - pad * 2) / (vals.length - 1 || 1);

  const points = vals.map((v, i) => {
    const x = pad + i * dx;
    const y = pad + (1 - (v - min) / range) * (H - pad * 2);
    return [x, y];
  });

  const d =
    points
      .map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`))
      .join(" ") +
    ` L ${pad + dx * (vals.length - 1 || 0)} ${H - pad} L ${pad} ${H - pad} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      {/* grid lines */}
      <g stroke="rgba(0,0,0,.06)">
        {[0, 1, 2, 3, 4].map((i) => {
          const y = pad + (i / 4) * (H - pad * 2);
          return <line key={i} x1={pad} y1={y} x2={W - pad} y2={y} />;
        })}
      </g>

      {/* area fill */}
      <path d={d} fill={fill} stroke="none" />

      {/* line */}
      <path
        d={points.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(" ")}
        fill="none"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* x labels */}
      <g fontSize="10" fill="#64748b">
        {points.map((p, i) => (
          <text key={i} x={p[0]} y={H - pad + 16} textAnchor="middle">
            {labels[i] || ""}
          </text>
        ))}
      </g>

      {/* y max/min */}
      <g fontSize="10" fill="#64748b">
        <text x={8} y={pad + 4}>{max}</text>
        <text x={8} y={H - pad + 4}>{min}</text>
      </g>
    </svg>
  );
}

/* ---------- Simple SVG Bar Chart ---------- */
function BarChart({
  series = [],
  height = 200,
  barColor = "#34d399",
}) {
  const H = height;
  const W = 560;
  const pad = 32;

  const vals = series.map((s) => s.value || 0);
  const max = Math.max(1, ...vals);
  const barW = (W - pad * 2) / (series.length || 1) - 12;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      {/* grid */}
      <g stroke="rgba(0,0,0,.06)">
        {[0, 1, 2, 3, 4].map((i) => {
          const y = pad + (i / 4) * (H - pad * 2);
          return <line key={i} x1={pad} y1={y} x2={W - pad} y2={y} />;
        })}
      </g>

      {/* bars */}
      {series.map((s, i) => {
        const x = pad + i * (barW + 12);
        const h = clamp(((s.value || 0) / max) * (H - pad * 2), 0, H - pad * 2);
        const y = H - pad - h;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={h} rx="8" ry="8" fill={barColor} />
            <text x={x + barW / 2} y={H - pad + 14} fontSize="10" textAnchor="middle" fill="#64748b">
              {s.label}
            </text>
            <text x={x + barW / 2} y={y - 6} fontSize="10" textAnchor="middle" fill="#0f172a">
              {s.value}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ---------- Top Bar with user menu (Breeze) ---------- */
function TopBar() {
  const { auth } = usePage().props || {};
  const user = auth?.user;
  const logout = useForm();

  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Company / Brand */}
        <div className="flex items-center gap-3">
          <img src="/images/logo/logo.png" alt="Logo" className="h-8 w-8 rounded-md" />
          <div className="font-extrabold text-emerald-900 tracking-tight">
            PT. Sugimura Chemical Indonesia
          </div>
        </div>

        {/* Quick actions + user */}
        <div className="flex items-center gap-2">
          <Link
            href={route("admin.products.create")}
            className="hidden sm:inline-flex px-3 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700"
          >
            + Produk
          </Link>
          <Link
            href={route("admin.products.index")}
            className="hidden sm:inline-flex px-3 py-2 rounded-xl bg-white ring-1 ring-emerald-200 text-emerald-700 text-sm font-semibold hover:bg-emerald-50"
          >
            Kelola
          </Link>

          {/* user menu */}
          <div className="relative group">
            <button
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200 hover:bg-emerald-100"
            >
              <div className="h-6 w-6 rounded-full bg-emerald-600 text-white grid place-items-center text-xs font-bold">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </div>
              <span className="hidden sm:block text-sm font-semibold">{user?.name || "User"}</span>
              <svg className="h-4 w-4 opacity-70" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd"/></svg>
            </button>

            {/* dropdown */}
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg ring-1 ring-black/5 p-2 opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition">
              <div className="px-3 py-2">
                <div className="text-xs text-slate-500">Masuk sebagai</div>
                <div className="font-semibold text-slate-900">{user?.name || "-"}</div>
                <div className="text-xs text-slate-500 truncate">{user?.email || "-"}</div>
              </div>
              <button
                onClick={() => logout.post(route("logout"))}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Stat card ---------- */
function StatCard({ label, value, note }) {
  return (
    <div className="rounded-2xl bg-white/80 backdrop-blur border border-emerald-100 shadow-sm p-5">
      <div className="text-sm font-semibold text-emerald-800/80">{label}</div>
      <div className="text-3xl font-extrabold text-emerald-900 mt-1">{value}</div>
      {note && <div className="text-xs text-slate-500 mt-1">{note}</div>}
    </div>
  );
}

/* ---------- Main Dashboard ---------- */
export default function Dashboard() {
  const { stats } = usePage().props || {};
  // Fallback bila controller belum kirim data
  const safeStats = {
    total_products: stats?.total_products ?? 0,
    active_products: stats?.active_products ?? 0,
    inactive_products: stats?.inactive_products ?? 0,
    monthly: stats?.monthly ?? [3, 6, 7, 9, 12, 10, 14, 13, 16, 18, 20, 22], // contoh
    per_type: stats?.per_type ?? [
      { label: "cut", value: 8 },
      { label: "form", value: 6 },
      { label: "draw", value: 5 },
      { label: "rust", value: 4 },
      { label: "clean", value: 3 },
    ],
    month_labels: stats?.month_labels ?? ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white">
      <TopBar />

      {/* Hero section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-40 blur-3xl bg-[radial-gradient(800px_400px_at_20%_10%,#34d399,transparent),radial-gradient(600px_300px_at_80%_20%,#10b981,transparent)]" />
        <header className="max-w-7xl mx-auto px-5 py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-emerald-900">
            Admin Dashboard
          </h1>
          <p className="text-emerald-800/70 mt-2">
            Kelola konten website dengan cepat dan aman.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={route("admin.products.create")}
              className="px-5 py-2.5 rounded-2xl bg-emerald-600 text-white font-semibold hover:scale-[1.02] active:scale-100 transition"
            >
              + Tambah Produk
            </Link>
            <Link
              href={route("admin.products.index")}
              className="px-5 py-2.5 rounded-2xl bg-white text-emerald-700 ring-1 ring-emerald-200 font-semibold hover:bg-emerald-50"
            >
              Kelola Produk
            </Link>
          </div>
        </header>
      </div>

      {/* Stats summary */}
      <section className="max-w-7xl mx-auto px-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <StatCard label="Total Produk" value={safeStats.total_products} />
        <StatCard label="Aktif" value={safeStats.active_products} note="Produk yang tampil di website" />
        <StatCard label="Nonaktif" value={safeStats.inactive_products} note="Disembunyikan sementara" />
      </section>

      {/* Charts */}
      <section className="max-w-7xl mx-auto px-5 grid lg:grid-cols-2 gap-6 mt-6 pb-16">
        <div className="rounded-3xl bg-white/80 backdrop-blur border border-emerald-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="font-bold text-emerald-900">Tren Produk per Bulan</div>
            <div className="text-xs text-slate-500">12 bulan terakhir</div>
          </div>
          <LineChart data={safeStats.monthly} labels={safeStats.month_labels} />
        </div>

        <div className="rounded-3xl bg-white/80 backdrop-blur border border-emerald-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="font-bold text-emerald-900">Produk per Tipe</div>
            <div className="text-xs text-slate-500">Saat ini</div>
          </div>
          <BarChart series={safeStats.per_type} />
        </div>
      </section>

      {/* Menu cepat */}
      <section className="max-w-7xl mx-auto px-5 pb-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashCard
          title="Produk"
          value="Kelola daftar produk"
          href={route("admin.products.index")}
        />
        <DashCard title="Media" value="(opsional) manajemen file" disabled />
        <DashCard title="Pengaturan" value="(opsional) konfigurasi situs" disabled />
      </section>
    </div>
  );
}

/* ---------- Existing dash card ---------- */
function DashCard({ title, value, href, disabled }) {
  const cls =
    "group relative overflow-hidden rounded-3xl p-6 bg-white/80 backdrop-blur border border-emerald-100 shadow-sm hover:shadow-xl transition";
  const body = (
    <>
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-emerald-100/70 group-hover:bg-emerald-200/80 transition" />
      <div className="relative">
        <div className="text-emerald-700 font-semibold">{title}</div>
        <div className="text-2xl font-extrabold mt-1">{value}</div>
        <div className="mt-4 inline-flex items-center gap-2 text-emerald-700 group-hover:gap-3 transition">
          {disabled ? "Segera hadir" : "Buka"} <span>→</span>
        </div>
      </div>
    </>
  );

  if (disabled) return <div className={cls}>{body}</div>;
  return (
    <Link href={href} className={cls}>
      {body}
    </Link>
  );
}
