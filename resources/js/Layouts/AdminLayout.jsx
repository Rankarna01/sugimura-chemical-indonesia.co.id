import React from "react";
import { Link } from "@inertiajs/react";

export default function AdminLayout({ title = "Admin", children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-white to-white">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-emerald-600 text-white grid place-items-center font-bold">A</div>
            <div>
              <div className="text-sm text-emerald-800/70">Dashboard</div>
              <h1 className="text-xl font-extrabold text-emerald-900">{title}</h1>
            </div>
          </div>
          <nav className="flex items-center gap-2">
            <Link href={route("admin.products.index")} className="px-3 py-2 rounded-xl text-emerald-700 hover:bg-emerald-50">Produk</Link>
            <Link href={route("dashboard")} className="px-3 py-2 rounded-xl text-emerald-700 hover:bg-emerald-50">User</Link>
          </nav>
        </div>
      </header>

      <div className="pointer-events-none fixed inset-0 -z-10 opacity-40 blur-3xl
        bg-[radial-gradient(600px_260px_at_20%_-10%,#34d399,transparent),radial-gradient(520px_220px_at_80%_-10%,#10b981,transparent)]" />

      <main className="max-w-7xl mx-auto px-5 py-8">{children}</main>
    </div>
  );
}
