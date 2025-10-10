import React from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

/* ---------- helpers ---------- */

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm p-6">
      {title && <div className="text-emerald-900 font-bold mb-4">{title}</div>}
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, error, children, hint }) {
  return (
    <label className="block">
      {label && <div className="mb-1 text-sm font-semibold text-emerald-800">{label}</div>}
      {children}
      {hint && <div className="text-xs text-emerald-800/70 mt-1">{hint}</div>}
      {error && <div className="text-sm text-red-600 mt-1">{error}</div>}
    </label>
  );
}

function TagList({ title, items = [], onAdd, onRemove }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-semibold">{title}</div>
        <button type="button" onClick={onAdd} className="text-emerald-700 hover:underline text-sm">
          + Tambah
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.length ? (
          items.map((t, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100"
            >
              {t}
              <button type="button" onClick={() => onRemove(i)} className="text-red-600">×</button>
            </span>
          ))
        ) : (
          <div className="text-emerald-800/70 text-sm">Belum ada item.</div>
        )}
      </div>
    </div>
  );
}

function UploadGrid({ label, files = [], onChange, multiple = true }) {
  // files: array of File OR string (existing path)
  const inputRef = React.useRef(null);
  const preview = (f) => (typeof f === "string" ? (f.startsWith("/storage") ? f : `/storage/${f}`) : URL.createObjectURL(f));

  const remove = (idx) => {
    const next = files.filter((_, i) => i !== idx);
    onChange(next);
  };

  return (
    <Field label={label}>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        multiple={multiple}
        onChange={(e) => {
          const newFiles = Array.from(e.target.files || []);
          onChange([...(files || []), ...newFiles]);
          e.target.value = "";
        }}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {files?.map((f, i) => (
          <div key={i} className="relative group">
            <img
              src={preview(f)}
              className="rounded-xl border aspect-[16/10] object-cover w-full"
              alt="preview"
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-red-600 text-white text-xs opacity-90 hover:opacity-100"
              title="Hapus"
            >
              Hapus
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="aspect-[16/10] border-2 border-dashed rounded-xl grid place-items-center text-emerald-700 hover:bg-emerald-50"
        >
          Upload
        </button>
      </div>
    </Field>
  );
}

/* ---------- page ---------- */

export default function Form() {
  const { product } = usePage().props;
  const isEdit = !!product;

  const { data, setData, post, put, processing, errors } = useForm({
    title: product?.title || "",
    slug: product?.slug || "",
    type: product?.type || "cutting",
    badge: product?.badge || "",
    product_code: product?.product_code || "",
    excerpt: product?.excerpt || "",
    description: product?.description || "",
    features: product?.features || [],
    applications: product?.applications || [],
    standards: product?.standards || [],
    is_active: product?.is_active ?? true,
    order_index: product?.order_index ?? 0,
    seo_title: product?.seo_title || "",
    seo_description: product?.seo_description || "",

    // single legacy images (optional)
    thumbnail: null,
    banner: null,

    // new multi galleries (arrays of File OR existing strings)
    banner_gallery: product?.banner_gallery || [],
    description_images: product?.description_images || [],
    features_images: product?.features_images || [],
    applications_images: product?.applications_images || [],
    standards_images: product?.standards_images || [],
  });

  const submit = (e) => {
    e.preventDefault();

    const form = new FormData();

    // primitives
    [
      "title","slug","type","badge","product_code",
      "excerpt","description","is_active","order_index",
      "seo_title","seo_description",
    ].forEach((k) => form.append(k, data[k] ?? ""));

    // arrays of strings
    ["features","applications","standards"].forEach((k) => {
      (data[k] || []).forEach((v, i) => form.append(`${k}[${i}]`, v));
    });

    // single files
    if (data.thumbnail) form.append("thumbnail", data.thumbnail);
    if (data.banner) form.append("banner", data.banner);

    // multi files (File OR existing string path)
    const appendMany = (key) => {
      (data[key] || []).forEach((v, i) => {
        // Only append File objects. Existing strings will be handled server-side (keep).
        if (v instanceof File) form.append(`${key}[${i}]`, v);
      });
      // also send list of keep paths (strings) so backend can merge
      const keep = (data[key] || []).filter((x) => typeof x === "string");
      form.append(`${key}_keep`, JSON.stringify(keep));
    };

    ["banner_gallery","description_images","features_images","applications_images","standards_images"].forEach(appendMany);

    if (isEdit) {
      form.append("_method", "PUT");
      put(route("admin.products.update", product.id), { forceFormData: true });
    } else {
      post(route("admin.products.store"), { forceFormData: true });
    }
  };

  const addTag = (key) => {
    const val = prompt(`Tambah item untuk ${key}`);
    if (val) setData(key, [...data[key], val]);
  };
  const delTag = (key, i) => setData(key, data[key].filter((_, idx) => idx !== i));

  return (
    <AdminLayout title={`${isEdit ? "Edit" : "Tambah"} Produk`}>
      <form onSubmit={submit} className="grid lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Informasi Utama">
            <Field label="Judul" error={errors.title}>
              <input className="input" value={data.title} onChange={(e) => setData("title", e.target.value)} />
            </Field>

            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Slug (opsional)" error={errors.slug}>
                <input className="input" value={data.slug} onChange={(e) => setData("slug", e.target.value)} />
              </Field>
              <Field label="Type" error={errors.type}>
                <select className="input" value={data.type} onChange={(e) => setData("type", e.target.value)}>
                  <option value="cutting">cutting</option>
                  <option value="forming">forming</option>
                  <option value="drawing">drawing</option>
                  <option value="forging">forging</option>
                </select>
              </Field>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Badge" error={errors.badge}>
                <input className="input" value={data.badge} onChange={(e) => setData("badge", e.target.value)} />
              </Field>
              <Field label="Product Code" error={errors.product_code}>
                <input
                  className="input"
                  value={data.product_code}
                  onChange={(e) => setData("product_code", e.target.value)}
                />
              </Field>
            </div>

            <Field label="Excerpt" error={errors.excerpt}>
              <textarea
                className="input min-h-[80px]"
                value={data.excerpt}
                onChange={(e) => setData("excerpt", e.target.value)}
              />
            </Field>

            <Field label="Deskripsi" error={errors.description}>
              <textarea
                className="input min-h-[160px]"
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
              />
            </Field>
          </Card>

          <Card title="Keunggulan, Aplikasi & Standar">
            <TagList
              title="Keunggulan (features)"
              items={data.features}
              onAdd={() => addTag("features")}
              onRemove={(i) => delTag("features", i)}
            />
            <TagList
              title="Aplikasi"
              items={data.applications}
              onAdd={() => addTag("applications")}
              onRemove={(i) => delTag("applications", i)}
            />
            <TagList
              title="Standar & Mutu"
              items={data.standards}
              onAdd={() => addTag("standards")}
              onRemove={(i) => delTag("standards", i)}
            />
          </Card>

          <Card title="Gambar per Tab (Swiper Gallery)">
            <UploadGrid
              label="Deskripsi - Gallery"
              files={data.description_images}
              onChange={(arr) => setData("description_images", arr)}
            />
            <UploadGrid
              label="Keunggulan - Gallery"
              files={data.features_images}
              onChange={(arr) => setData("features_images", arr)}
            />
            <UploadGrid
              label="Aplikasi - Gallery"
              files={data.applications_images}
              onChange={(arr) => setData("applications_images", arr)}
            />
            <UploadGrid
              label="Standar & Mutu - Gallery"
              files={data.standards_images}
              onChange={(arr) => setData("standards_images", arr)}
            />
          </Card>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <Card title="Status & Urutan">
            <Field label="Aktif?" error={errors.is_active}>
              <select
                className="input"
                value={data.is_active ? "1" : "0"}
                onChange={(e) => setData("is_active", e.target.value === "1")}
              >
                <option value="1">Ya</option>
                <option value="0">Tidak</option>
              </select>
            </Field>
            <Field label="Order Index" error={errors.order_index}>
              <input
                type="number"
                className="input"
                value={data.order_index}
                onChange={(e) => setData("order_index", parseInt(e.target.value || 0))}
              />
            </Field>
          </Card>

          <Card title="SEO">
            <Field label="SEO Title" error={errors.seo_title}>
              <input className="input" value={data.seo_title} onChange={(e) => setData("seo_title", e.target.value)} />
            </Field>
            <Field label="SEO Description" error={errors.seo_description}>
              <textarea
                className="input min-h-[80px]"
                value={data.seo_description}
                onChange={(e) => setData("seo_description", e.target.value)}
              />
            </Field>
          </Card>

          <Card title="Gambar Utama">
            <Field label="Thumbnail (single)" error={errors.thumbnail}>
              <input type="file" onChange={(e) => setData("thumbnail", e.target.files?.[0] || null)} />
            </Field>
            <Field label="Banner (single - opsi lama)" error={errors.banner}>
              <input type="file" onChange={(e) => setData("banner", e.target.files?.[0] || null)} />
            </Field>
            <UploadGrid
              label="Banner Gallery (slideshow)"
              files={data.banner_gallery}
              onChange={(arr) => setData("banner_gallery", arr)}
            />
          </Card>

          <button
            disabled={processing}
            className="w-full px-5 py-3 rounded-2xl bg-emerald-600 text-white font-semibold hover:scale-[1.01] disabled:opacity-50 transition"
          >
            {processing ? "Menyimpan..." : "Simpan"}
          </button>

          {isEdit && (
            <Link
              as="button"
              method="delete"
              href={route("admin.products.destroy", product.id)}
              className="w-full px-5 py-3 rounded-2xl border border-red-200 text-red-700 hover:bg-red-50 font-semibold text-center"
            >
              Hapus Produk
            </Link>
          )}
        </div>
      </form>
    </AdminLayout>
  );
}

/* inject util class .input sekali (untuk Tailwind CDN) */
if (typeof window !== "undefined") {
  const id = "__admin_input_util";
  if (!document.getElementById(id)) {
    const s = document.createElement("style");
    s.id = id;
    s.innerHTML =
      ".input{width:100%;border-radius:0.75rem;border:1px solid rgb(209 250 229);padding:0.625rem 0.75rem;outline:none} .input:focus{box-shadow:0 0 0 2px rgb(52 211 153 / .4)}";
    document.head.appendChild(s);
  }
}
