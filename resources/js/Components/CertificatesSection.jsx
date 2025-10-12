// resources/js/Components/CertificatesSection.jsx

import React, { useState } from 'react';
// Impor library lightbox dan CSS-nya
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Data untuk sertifikat, agar mudah dikelola
const certificatesData = [
    { 
        src: "/images/sertifikat/2025_Copy Cert_9001_Sugimura Chemical Indonesia_page-0001.jpg", 
        alt: "Sertifikat ISO 9001",
        delay: "0",
    },
    { 
        src: "/images/sertifikat/2025_Copy Cert_14001_Sugimura Chemical Indonesia_page-0001.jpg", 
        alt: "Sertifikat ISO 14001",
        delay: "100",
    },
    { 
        src: "/images/sertifikat/2025_Copy Cert_45001_Sugimura Chemical Indonesia_page-0001.jpg", 
        alt: "Sertifikat ISO 45001",
        delay: "200",
    },
];

// Komponen Card untuk setiap sertifikat
const CertificateCard = ({ cert, onClick }) => (
    <div 
        onClick={onClick} 
        className="group block cursor-pointer" 
        data-aos="fade-up" 
        data-aos-delay={cert.delay}
    >
        <div className="relative overflow-hidden rounded-xl shadow-md border border-gray-200/80 transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
            <img 
                src={cert.src} 
                alt={cert.alt} 
                className="w-full h-auto object-cover aspect-[3/4] transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
            </div>
        </div>
    </div>
);

export default function CertificatesSection() {
    // State untuk mengontrol lightbox
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    const openLightbox = (certIndex) => {
        setIndex(certIndex);
        setOpen(true);
    };

    return (
        <section id="sertifikasi" className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-12 text-center max-w-2xl mx-auto" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                        Sertifikasi & Pengakuan
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Komitmen kami terhadap kualitas diakui melalui sertifikasi standar industri.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {certificatesData.map((cert, certIndex) => (
                        <CertificateCard 
                            key={certIndex} 
                            cert={cert} 
                            onClick={() => openLightbox(certIndex)} 
                        />
                    ))}
                </div>
            </div>

            {/* Komponen Lightbox akan muncul di sini saat 'open' bernilai true */}
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={certificatesData}
                index={index}
            />
        </section>
    );
}