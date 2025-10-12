// resources/js/Components/ContactSection.jsx
import React, { useState, useMemo, useRef } from "react";
import { FaPhone, FaEnvelope, FaLocationDot } from "react-icons/fa6";

const contactInfo = [
  {
    icon: <FaPhone />,
    title: "Telp (Bekasi)",
    content: (
      <a href="tel:+622129568888" className="hover:text-green-600 transition">
        (021) 2956 8888 ext 202
      </a>
    ),
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    content: (
      <a
        href="mailto:sales.admin@sugimura.co.id"
        className="hover:text-green-600 transition"
      >
        sales.admin@sugimura.co.id
      </a>
    ),
  },
  {
    icon: <FaLocationDot />,
    title: "Head Office",
    content: (
      <address className="not-italic">
        Jl. Selayar II Blok H 15, Kawasan Industri MM2100
        <br />
        Bekasi 17845, Indonesia
      </address>
    ),
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(""); // '', 'success', 'error', 'fallback'
  const [submitting, setSubmitting] = useState(false);

  // 1) RENDER anchor tersembunyi di DOM sejak awal (tanpa mengubah fungsi) — beberapa browser lebih konsisten bila elemennya tidak dibuat dinamis
  const mailtoRef = useRef(null);

  const isValid = useMemo(() => {
    if (!formData.name?.trim() || !formData.email?.trim() || !formData.message?.trim()) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (status) setStatus("");
  };

  const buildMailto = () => {
    const to = "sales.admin@sugimura.co.id";
    const subject = formData.subject?.trim() || `Inquiry Website - ${formData.name}`;
    const bodyLines = [
      "[Inquiry Website]",
      `Nama: ${formData.name}`,
      `Email: ${formData.email}`,
      formData.subject?.trim() ? `Subject: ${formData.subject.trim()}` : null,
      "",
      "Pesan:",
      formData.message,
    ]
      .filter(Boolean)
      .join("\n");

    return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid || submitting) {
      setStatus("error");
      return;
    }

    // — tetap sama dengan logic asli —
    const href = buildMailto();
    setSubmitting(true);

    try {
      // gunakan anchor yang sudah dirender di DOM sejak awal
      if (mailtoRef.current) {
        mailtoRef.current.setAttribute("href", href);
        // target _blank membantu di beberapa OS/browser agar handler mail terbuka sebagai navigasi baru
        mailtoRef.current.setAttribute("target", "_blank");
        mailtoRef.current.setAttribute("rel", "noopener noreferrer");
        mailtoRef.current.click();
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("fallback");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white" id="contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* hidden anchor: ada di DOM dari awal */}
        <a ref={mailtoRef} href="#" className="hidden" aria-hidden="true" />

        {/* Header */}
        <header className="mb-12 text-center max-w-2xl mx-auto" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Hubungi Kami</h2>
          <p className="mt-4 text-lg text-gray-600">
            Hubungi tim kami untuk konsultasi produk, rekomendasi aplikasi, hingga dukungan teknis.
          </p>
          <div className="mt-4 h-1.5 w-24 mx-auto bg-gradient-to-r from-green-500 to-blue-500 rounded-full" />
        </header>

        {/* 2 kolom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {/* Kiri: info + map */}
          <div className="flex flex-col gap-8" data-aos="fade-right">
            {contactInfo.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex-shrink-0 text-green-600 text-2xl mt-1">{item.icon}</div>
                <div>
                  <span className="block text-gray-500">{item.title}</span>
                  <strong className="text-gray-800 font-semibold">{item.content}</strong>
                </div>
              </div>
            ))}

            {/* Map kecil */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Lokasi Kami</h3>
              <div className="mt-3 rounded-xl overflow-hidden shadow-md ring-1 ring-black/5 max-w-md">
                <div className="relative w-full h-48 sm:h-52 md:h-56">
                  <iframe
                    title="PT Sugimura Chemical Indonesia - Google Maps"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.5200402111745!2d107.06598327322625!3d-6.326587093662946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69905a2a5a8177%3A0x663c98f53cad06f5!2sPT%20Sugimura%20Chemical%20Indonesia!5e0!3m2!1sid!2sid!4v1760185336222!5m2!1sid!2sid"
                    className="absolute inset-0 h-full w-full"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-600">
                Jl. Selayar II Blok H 15, Kawasan Industri MM2100, Bekasi 17845
              </p>
            </div>
          </div>

          {/* Kanan: form */}
          <div data-aos="fade-left" data-aos-delay="100">
            <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5 sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nama
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      placeholder="Nama lengkap"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      placeholder="nama@perusahaan.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subjek
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    placeholder="Topik pesan (opsional)"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Pesan
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    placeholder="Tulis kebutuhan Anda di sini..."
                  />
                </div>

                {/* tombol submit */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:gap-3">
                  <button
                    type="submit"
                    disabled={!isValid || submitting}
                    className={`w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold shadow transition ${
                      !isValid || submitting
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    {submitting ? "Menyiapkan email..." : "Kirim Pesan"}
                  </button>

                  {/* Tombol fallback manual — tidak mengubah fungsi submit, hanya menyediakan trigger eksplisit */}
                  <a
                    href={buildMailto()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 sm:mt-0 inline-flex items-center justify-center px-4 py-3 rounded-lg text-sm font-semibold text-green-700 bg-green-50 ring-1 ring-inset ring-green-200 hover:bg-green-100"
                  >
                    Buka Mail Client (Cadangan)
                  </a>
                </div>
              </form>

              {/* status */}
              {status === "success" && (
                <p className="mt-4 text-sm text-green-600">
                  Jendela email telah dibuka. Jika belum muncul, klik tombol "Buka Mail Client (Cadangan)".
                </p>
              )}
              {status === "error" && (
                <p className="mt-4 text-sm text-red-600">
                  Gagal, pastikan nama, email, dan pesan sudah diisi dengan benar.
                </p>
              )}
              {status === "fallback" && (
                <p className="mt-4 text-sm text-amber-600">
                  Browser memblokir pembukaan mail client. Klik tombol "Buka Mail Client (Cadangan)".
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
