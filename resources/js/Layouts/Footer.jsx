// resources/js/Layouts/Footer.jsx
import React from "react";
import { Link } from "@inertiajs/react";
import { FaLocationDot, FaPhone, FaEnvelope } from "react-icons/fa6";

const navLinks = [
  { href: "#home", text: "Beranda" },
  { href: "#about", text: "Tentang Kami" },
  { href: "#fasilitas", text: "Fasilitas" },
  { href: "/#produk-khusus", text: "Produk Khusus" },
  { href: "#contact", text: "Kontak" },
];

const facilityLinks = [
  { href: "#fasilitas", text: "Ringkasan Fasilitas" },
  { href: "#fasilitas-tangki", text: "Tangki Penyimpanan" },
  { href: "#fasilitas-blending", text: "Blending Factory" },
  { href: "#fasilitas-lab", text: "Laboratorium QA/QC" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-emerald-900 text-emerald-50">
      {/* Dekorasi background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-emerald-700/50 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-[30rem] w-[30rem] rounded-full bg-teal-600/40 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.07] [background:radial-gradient(circle_at_1px_1px,white_1px,transparent_1.5px)] [background-size:22px_22px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Top branding bar (optional) */}
        <div className="mb-10 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
          <h3 className="text-xl font-bold tracking-tight text-white">
            PT. Sugimura Chemical Indonesia
          </h3>
          <span className="inline-flex h-1.5 w-24 rounded-full bg-gradient-to-r from-emerald-400 to-teal-300" />
        </div>

        {/* Grid kolom */}
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-10">
          {/* Kolom 1: Tentang */}
          <div>
            <p className="text-emerald-100/90 leading-relaxed text-sm">
              Solusi pelumas industri & coolant (cutting oil) untuk pengerjaan
              logam dan otomotif. Kualitas tinggi, layanan purna jual
              komprehensif, dan dukungan teknis andal.
            </p>

            {/* Kontak ringkas untuk mobile */}
            <div className="mt-6 space-y-3 text-sm sm:hidden">
              
              <a
                href="tel:+622129568888"
                className="inline-flex items-center gap-2 text-emerald-100 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300/70 rounded px-1 py-0.5"
              >
                <FaPhone className="h-4 w-4 text-emerald-300" />
                (021) 2956 8888 ext 202
              </a>
              <a
                href="mailto:sales.admin@sugimura.co.id"
                className="inline-flex items-center gap-2 text-emerald-100 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300/70 rounded px-1 py-0.5"
              >
                <FaEnvelope className="h-4 w-4 text-emerald-300" />
                sales.admin@sugimura.co.id
              </a>
            </div>
          </div>

          {/* Kolom 2: Navigasi */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-emerald-200 mb-4">
              Navigasi
            </h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-2 text-emerald-100/90 hover:text-white hover:translate-x-0.5 transition will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300/70 rounded px-1 py-1"
                  >
                    <span className="h-1 w-1 rounded-full bg-emerald-300/80" />
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Fasilitas */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-emerald-200 mb-4">
              Fasilitas
            </h4>
            <ul className="space-y-2 text-sm">
              {facilityLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-2 text-emerald-100/90 hover:text-white hover:translate-x-0.5 transition will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300/70 rounded px-1 py-1"
                  >
                    <span className="h-1 w-1 rounded-full bg-emerald-300/80" />
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 4: Kontak detail */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-emerald-200 mb-4">
              Kontak
            </h4>
            <ul className="space-y-4 text-sm text-emerald-100">
              <li className="flex items-start gap-3">
                <FaLocationDot className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-300" />
                <span>
                  Jl. Selayar II Blok H 15, Kawasan Industri MM2100, Cikarang
                  Barat, Bekasi 17845, Indonesia
                </span>
              </li>
            
              <li className="flex items-center gap-3">
                <FaPhone className="h-5 w-5 flex-shrink-0 text-emerald-300" />
                <a
                  href="tel:+622129568888"
                  className="text-emerald-300 px-1"
                >
                  (021) 2956 8888 
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="h-5 w-5 flex-shrink-0 text-emerald-300" />
                <a
                  href="mailto:sales.admin@sugimura.co.id"
                  className="text-emerald-300 px-1"
                >
                  sales.admin@sugimura.co.id
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider lembut */}
        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-emerald-200/20 to-transparent" />

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-emerald-100/90 md:flex-row">
          <p className="order-2 md:order-1">
            &copy; {new Date().getFullYear()} PT. Sugimura Chemical Indonesia. All rights reserved.
          </p>
          <div className="order-1 md:order-2 flex flex-wrap items-center gap-4">
            <Link
              href="/kebijakan-privasi"
              className="hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300/70 rounded px-1 py-0.5"
            >
              Kebijakan Privasi
            </Link>
            <span className="h-3 w-px bg-emerald-200/20" aria-hidden="true" />
            <Link
              href="/syarat-ketentuan"
              className="hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300/70 rounded px-1 py-0.5"
            >
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>

      {/* Sedikit style util jika belum ada */}
      <style>{`
        @media (pointer: coarse) {
          a, button { -webkit-tap-highlight-color: rgba(20, 184, 166, 0.25); }
        }
      `}</style>
    </footer>
  );
}
