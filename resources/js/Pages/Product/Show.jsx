// resources/js/Pages/Product/Show.jsx

import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';
import React, { useState, useMemo } from 'react';
import { products } from '@/Data/productData';

// Komponen baru untuk galeri gambar agar kode lebih rapi
const ImageGallery = ({ images }) => {
    if (!images || images.length === 0) return null;

    return (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {images.map((imgSrc, index) => (
                <div key={index} className="overflow-hidden rounded-lg shadow-sm border border-gray-200">
                    <img 
                        src={imgSrc} 
                        alt={`Detail image ${index + 1}`} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                    />
                </div>
            ))}
        </div>
    );
};

const TabButton = ({ tabName, activeTab, onClick }) => (
    <button
        onClick={() => onClick(tabName)}
        className={`relative px-4 py-2 font-semibold text-sm rounded-md transition-colors duration-200 ${
            activeTab === tabName
                ? 'bg-green-100 text-green-700'
                : 'text-gray-600 hover:bg-gray-100'
        }`}
    >
        {tabName}
    </button>
);

export default function Show({ slug }) {
    const [activeTab, setActiveTab] = useState('Deskripsi');
    const product = useMemo(() => products.find(p => p.slug === slug), [slug]);

    if (!product) {
        return (
            <main className="min-h-[80vh] grid place-items-center text-center p-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Produk Tidak Ditemukan</h1>
                    <p className="text-gray-600 mt-2">Maaf, kami tidak dapat menemukan produk dengan slug: <code>{slug}</code></p>
                    <a className="inline-block mt-6 px-6 py-3 bg-brand-600 text-white font-semibold rounded-lg" href="/#produk-khusus">
                        Kembali ke Daftar Produk
                    </a>
                </div>
            </main>
        );
    }

    return (
        <>
            <Head title={product.name} />

            <div className="bg-gray-50 pt-28 pb-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="mb-4">
                        <ol className="flex items-center gap-2 text-sm text-gray-500">
                            <li><Link href="/" className="text-brand-700 hover:underline">Beranda</Link></li>
                            <li><span className="text-gray-400">›</span></li>
                            <li><Link href="/#produk-khusus" className="text-brand-700 hover:underline">Produk Khusus</Link></li>
                            <li><span className="text-gray-400">›</span></li>
                            <li className="font-medium text-gray-700">{product.name}</li>
                        </ol>
                    </nav>

                    <section className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        <div className="md:col-span-2 bg-green-100/50 rounded-2xl flex items-center justify-center p-4 min-h-[280px]">
                            <img src={product.image || '/images/produkk/placeholder.png'} alt={product.name} className="max-h-[240px] w-auto object-contain" />
                        </div>
                        <div className="md:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-gray-200/80">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs font-bold uppercase px-2.5 py-1 bg-green-100 text-green-700 rounded-full">{product.subtitle}</span>
                                {product.tags.map(tag => (
                                    <span key={tag} className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full">{tag}</span>
                                ))}
                            </div>
                            <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900">{product.name}</h1>
                            <p className="mt-2 text-gray-600">{product.summary}</p>
                            <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                                {product.highlights.map(item => (
                                    <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                                        <span className="flex-shrink-0 w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/#produk-khusus" className="text-sm font-semibold text-gray-500 hover:text-brand-600 mt-4 inline-block">
                                ← Kembali ke Daftar Produk
                            </Link>
                        </div>
                    </section>

                    <main className="mt-6 grid lg:grid-cols-3 gap-6 items-start">
                        <section className="lg:col-span-2 bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-200/80">
                            <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3">
                                <TabButton tabName="Deskripsi" activeTab={activeTab} onClick={setActiveTab} />
                                <TabButton tabName="Keunggulan" activeTab={activeTab} onClick={setActiveTab} />
                                <TabButton tabName="Aplikasi" activeTab={activeTab} onClick={setActiveTab} />
                            </div>
                            
                            <div className="mt-5">
                                {activeTab === 'Deskripsi' && (
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-800">Deskripsi</h2>
                                        <div className="mt-3 prose prose-sm max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: product.description.replace(/\n/g, '<br />') }} />
                                        <ImageGallery images={product.description_images} />
                                    </div>
                                )}
                                {activeTab === 'Keunggulan' && (
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-800">Keunggulan</h2>
                                        <ul className="mt-4 grid sm:grid-cols-2 gap-x-8 gap-y-2 list-disc list-inside text-gray-600">
                                            {product.advantages.map(item => <li key={item}>{item}</li>)}
                                        </ul>
                                        <ImageGallery images={product.advantages_images} />
                                    </div>
                                )}
                                {activeTab === 'Aplikasi' && (
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-800">Aplikasi / Penggunaan</h2>
                                        <ul className="mt-4 grid sm:grid-cols-2 gap-x-8 gap-y-2 list-disc list-inside text-gray-600">
                                            {product.applications.map(item => <li key={item}>{item}</li>)}
                                        </ul>
                                        <ImageGallery images={product.applications_images} />
                                    </div>
                                )}
                            </div>
                        </section>
                        
                       <aside className="lg:col-span-1 bg-white p-5 rounded-2xl shadow-sm border border-gray-200/80 sticky top-28">
  <h3 className="text-lg font-semibold text-gray-900">Butuh Bantuan Teknis?</h3>
  <p className="mt-1 text-sm text-gray-600">
    Tim kami siap bantu rekomendasi produk, kompatibilitas, dan penerapan di lapangan.
  </p>
  <div className="mt-4 flex flex-col gap-2">
    {/* Tombol konsultasi langsung ke Gmail */}
    <a
      href="mailto:sales.admin@sugimura.co.id?subject=Konsultasi%20Gratis&body=Halo%20tim%20Sugimura,%0ASaya%20ingin%20melakukan%20konsultasi%20gratis%20terkait%20produk."
      className="w-full text-center px-4 py-2.5 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 transition"
    >
      Konsultasi Gratis
    </a>

    {/* Tombol email tambahan */}
    <a
      href="mailto:sales.admin@sugimura.co.id"
      className="w-full text-center px-4 py-2.5 bg-green-50 text-brand-700 font-semibold rounded-lg hover:bg-green-100 transition"
    >
      Email: sales.admin@sugimura.co.id
    </a>
  </div>
</aside>

                    </main>
                </div>
            </div>
        </>
    );
}

Show.layout = page => <MainLayout children={page} />;