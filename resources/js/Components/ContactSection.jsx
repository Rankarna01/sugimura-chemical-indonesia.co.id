// resources/js/Components/ContactSection.jsx

import React, { useState } from 'react';
import { FaPhone, FaWhatsapp, FaEnvelope, FaLocationDot } from 'react-icons/fa6';

// Data untuk info kontak di sebelah kiri
const contactInfo = [
    {
        icon: <FaPhone />,
        title: 'Telp (Sidoarjo)',
        // Link telepon biasa
        content: <a href="tel:+62318960022" className="hover:text-green-600 transition">(031) 8960022 / 8944522</a>,
    },
    {
        // === BAGIAN YANG DIPERBAIKI ===
        icon: <FaPhone />, // Ikon diubah menjadi telepon
        title: 'Telp (Bekasi)',  // Judul diubah agar lebih jelas
        // Link diubah menjadi "tel:..."
        content: <a href="tel:+622129568888" className="hover:text-green-600 transition">(021) 2956 8888 ext 202</a>,
    },
    {
        icon: <FaEnvelope />,
        title: 'Email',
        content: <a href="mailto:sales.admin@sugimura.co.id" className="hover:text-green-600 transition">sales.admin@sugimura.co.id</a>,
    },
    {
        icon: <FaLocationDot />,
        title: 'Head Office',
        content: (
            <address className="not-italic">
                Jl. Selayar II Blok H 15, Kawasan Industri MM2100<br />
                Bekasi 17845, Indonesia
            </address>
        ),
    },
];

export default function ContactSection() {
    const WA_NUMBER = '6285779966830'; // Nomor tujuan untuk form
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState(''); // 'success' atau 'error'

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, message, subject } = formData;

        if (!name || !email || !message) {
            setStatus('error');
            return;
        }

        const lines = [
            '*[Inquiry Website]*',
            `*Nama:* ${name}`,
            `*Email:* ${email}`,
            subject ? `*Subject:* ${subject}` : null,
            '*Pesan:*',
            message
        ].filter(Boolean).join('\n');

        const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`;
        window.open(waUrl, '_blank');
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
    };

    return (
        <section className="py-16 md:py-24 bg-white" id="contact">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-12 text-center max-w-2xl mx-auto" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                        Hubungi Kami
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Hubungi tim kami untuk konsultasi produk, rekomendasi aplikasi, hingga dukungan teknis.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Kolom Kiri: Info Kontak */}
                    <div className="flex flex-col gap-8" data-aos="fade-right">
                        {contactInfo.map((item, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <div className="flex-shrink-0 text-green-600 text-2xl mt-1">
                                    {item.icon}
                                </div>
                                <div>
                                    <span className="block text-gray-500">{item.title}</span>
                                    <strong className="text-gray-800 font-semibold">{item.content}</strong>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Kolom Kanan: Form */}
                    <div data-aos="fade-left" data-aos-delay="200">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subjek</label>
                                <input type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
                                <textarea name="message" id="message" rows="5" value={formData.message} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"></textarea>
                            </div>
                          
                        </form>
                        {status === 'success' && <p className="mt-4 text-sm text-green-600">Berhasil! Membuka WhatsApp...</p>}
                        {status === 'error' && <p className="mt-4 text-sm text-red-600">Gagal, pastikan semua kolom yang wajib diisi sudah terisi.</p>}
                    </div>
                </div>
            </div>
        </section>
    );
}