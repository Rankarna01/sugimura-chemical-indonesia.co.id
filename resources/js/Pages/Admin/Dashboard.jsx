import React from "react";
import { Link } from "@inertiajs/react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 via-white to-white">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-40 blur-3xl bg-[radial-gradient(800px_400px_at_20%_10%,#34d399,transparent),radial-gradient(600px_300px_at_80%_20%,#10b981,transparent)]"></div>
        <header className="max-w-7xl mx-auto px-5 py-10 md:py-14">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-900">
            Admin Dashboard
          </h1>
          <p className="text-brand-800/70 mt-2">
            Kelola konten website dengan cepat dan aman.
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              href={route("admin.products.create")}
              className="px-5 py-2.5 rounded-2xl bg-brand-600 text-white font-semibold hover:scale-[1.02] active:scale-100 transition"
            >
              + Tambah Produk
            </Link>
            <Link
              href={route("admin.products.index")}
              className="px-5 py-2.5 rounded-2xl bg-white text-brand-700 ring-1 ring-brand-200 font-semibold hover:bg-brand-50"
            >
              Kelola Produk
            </Link>
          </div>
        </header>
      </div>

      {/* Cards */}
      <main className="max-w-7xl mx-auto px-5 pb-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashCard
          title="Produk"
          value="Kelola daftar produk"
          href={route("admin.products.index")}
        />
        <DashCard title="Media" value="(opsional) manajemen file" disabled />
        <DashCard title="Pengaturan" value="(opsional) konfigurasi situs" disabled />
      </main>
    </div>
  );
}

function DashCard({ title, value, href, disabled }) {
  const cls =
    "group relative overflow-hidden rounded-3xl p-6 bg-white/80 backdrop-blur border border-brand-100 shadow-sm hover:shadow-xl transition";
  const body = (
    <>
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-brand-100/70 group-hover:bg-brand-200/80 transition"></div>
      <div className="relative">
        <div className="text-brand-700 font-semibold">{title}</div>
        <div className="text-2xl font-extrabold mt-1">{value}</div>
        <div className="mt-4 inline-flex items-center gap-2 text-brand-700 group-hover:gap-3 transition">
          {disabled ? "Segera hadir" : "Buka"}
          <span>→</span>
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
