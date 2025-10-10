// resources/js/Layouts/Footer.jsx

import React from 'react';
import { Link } from '@inertiajs/react';
import { FaLocationDot, FaPhone, FaEnvelope } from 'react-icons/fa6';

// Data untuk link navigasi agar mudah dikelola
const navLinks = [
    { href: '#home', text: 'Beranda' },
    { href: '#about', text: 'Tentang Kami' },
    { href: '#fasilitas', text: 'Fasilitas' },
    { href: '/#produk-khusus', text: 'Produk Khusus' },
    { href: '#contact', text: 'Kontak' },
];

const facilityLinks = [
    { href: '#fasilitas', text: 'Ringkasan Fasilitas' },
    { href: '#fasilitas-tangki', text: 'Tangki Penyimpanan' },
    { href: '#fasilitas-blending', text: 'Blending Factory' },
    { href: '#fasilitas-lab', text: 'Laboratorium QA/QC' },
];

export default function Footer() {
    return (
        <footer className="relative bg-emerald-900 text-white overflow-hidden">
            {/* Background Dekoratif */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-10">
                <div className="absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-emerald-700 blur-3xl"></div>
                <div className="absolute -bottom-24 -right-24 h-[30rem] w-[30rem] rounded-full bg-teal-600 blur-3xl"></div>
            </div>

            <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 md:grid-cols-4 lg:gap-x-8">
                    
                    {/* Kolom 1: Tentang Perusahaan */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">PT. Sugimura Chemical Indonesia</h3>
                        <p className="text-emerald-100/90 leading-relaxed text-sm">
                            Solusi pelumas industri & coolant (cutting oil) untuk pengerjaan logam dan otomotif. Kualitas tinggi, layanan purna jual komprehensif, dan dukungan teknis andal.
                        </p>
                    </div>

                    {/* Kolom 2: Navigasi */}
                    <div>
                        <h4 className="text-base font-semibold uppercase tracking-wider text-emerald-200 mb-4">Navigasi</h4>
                        <ul className="space-y-3 text-sm">
                            {navLinks.map((link, index) => (
                                <li key={index}><a href={link.href} className="text-emerald-100 hover:text-white transition">{link.text}</a></li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* Kolom 3: Fasilitas */}
                    <div>
                        <h4 className="text-base font-semibold uppercase tracking-wider text-emerald-200 mb-4">Fasilitas</h4>
                        <ul className="space-y-3 text-sm">
                            {facilityLinks.map((link, index) => (
                                <li key={index}><a href={link.href} className="text-emerald-100 hover:text-white transition">{link.text}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Kolom 4: Kontak */}
                    <div>
                        <h4 className="text-base font-semibold uppercase tracking-wider text-emerald-200 mb-4">Kontak</h4>
                        <ul className="space-y-4 text-sm text-emerald-100">
                            <li className="flex items-start gap-3">
                                <FaLocationDot className="h-5 w-5 flex-shrink-0 text-emerald-300 mt-0.5" />
                                <span>Jl. Selayar II Blok H 15, Kawasan Industri MM2100, Cikarang Barat, Bekasi 17845, Indonesia</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaPhone className="h-5 w-5 flex-shrink-0 text-emerald-300" />
                                <a href="tel:+62318960022" className="hover:text-white transition">(031) 8960022 / 8944522</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaPhone className="h-5 w-5 flex-shrink-0 text-emerald-300" />
                                <a href="tel:+622129568888" className="hover:text-white transition">(021) 2956 8888 ext 202</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaEnvelope className="h-5 w-5 flex-shrink-0 text-emerald-300" />
                                <a href="mailto:sales.admin@sugimura.co.id" className="hover:text-white transition">sales.admin@sugimura.co.id</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bagian Copyright */}
                <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-emerald-100 md:flex-row">
                    <p>&copy; {new Date().getFullYear()} PT. Sugimura Chemical Indonesia. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <Link href="/kebijakan-privasi" className="hover:text-white">Kebijakan Privasi</Link>
                        <Link href="/syarat-ketentuan" className="hover:text-white">Syarat & Ketentuan</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}