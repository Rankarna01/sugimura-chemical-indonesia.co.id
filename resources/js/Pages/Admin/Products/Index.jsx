import React from "react";
import { Link, usePage, router } from "@inertiajs/react";
import DeleteConfirm from "@/Shared/DeleteConfirm";

export default function Index() {
  const { products, filters } = usePage().props;
  const [open, setOpen] = React.useState(false);
  const [target, setTarget] = React.useState(null);

  const onSearch = (e) => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q");
    router.get(route("admin.products.index"), { search: q }, { preserveState: true });
  };

  return (
    <div className="min-h-screen bg-brand-50/40">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur sticky top-0 z-20 border-b border-brand-100">
        <div className="max-w-7xl mx-auto px-5 py-5 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-brand-900">Produk</h1>
            <p className="text-brand-700/70">Kelola data produk dan urutan tampil.</p>
          </div>

          <div className="flex gap-3">
            <form onSubmit={onSearch} className="relative">
              <input
                type="text"
                name="q"
                defaultValue={filters?.search || ""}
                placeholder="Cari judul..."
                className="px-4 py-2.5 rounded-2xl bg-brand-50 border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
              <button className="absolute right-1 top-1.5 px-3 py-1.5 rounded-xl bg-brand-600 text-white text-sm font-semibold">
                Cari
              </button>
            </form>

            <Link
              href={route("admin.products.create")}
              className="px-4 py-2.5 rounded-2xl bg-brand-600 text-white font-semibold hover:scale-[1.01] transition"
            >
              + Produk
            </Link>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto px-5 py-6">
        <div className="overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-sm">
          <table className="min-w-full">
            <thead className="bg-brand-50/70 text-sm">
              <tr className="text-left text-brand-800">
                <th className="p-4">Urut</th>
                <th className="p-4">Judul</th>
                <th className="p-4">Type</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-100">
              {products.data.map((p) => (
                <tr key={p.id} className="hover:bg-brand-50/40 transition">
                  <td className="p-4 font-mono text-sm text-brand-900">{p.order_index}</td>
                  <td className="p-4">
                    <div className="font-semibold text-brand-900">{p.title}</div>
                    <div className="text-xs text-brand-700/70">{p.slug}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-full bg-brand-100 text-brand-800 text-xs font-semibold">
                      {p.type}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        p.is_active
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {p.is_active ? "Active" : "Hidden"}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <Link
                      href={route("admin.products.edit", p.id)}
                      className="inline-flex items-center px-3 py-1.5 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:opacity-90"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        setTarget(p);
                        setOpen(true);
                      }}
                      className="inline-flex items-center px-3 py-1.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {!products.data.length && (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-brand-700/70">
                    Belum ada data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* pagination singkat */}
          <div className="p-4 text-sm text-brand-700/70 flex items-center justify-between bg-brand-50/40">
            <div>
              Halaman <b>{products.current_page}</b> dari <b>{products.last_page}</b>
            </div>
            <div className="space-x-2">
              {products.links.map((l, i) => (
                <Link
                  key={i}
                  href={l.url || "#"}
                  dangerouslySetInnerHTML={{ __html: l.label }}
                  className={`px-3 py-1.5 rounded-xl ${
                    l.active
                      ? "bg-brand-600 text-white"
                      : "bg-white border border-brand-200 hover:bg-brand-50"
                  } ${!l.url && "pointer-events-none opacity-40"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirm
        open={open}
        title="Hapus Produk?"
        message={`Yakin ingin menghapus "${target?.title}"? Tindakan ini bisa dibatalkan karena soft delete.`}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          router.delete(route("admin.products.destroy", target.id), {
            onFinish: () => setOpen(false),
          });
        }}
      />
    </div>
  );
}
