// resources/js/Components/StatsSection.jsx

import React from 'react';
import CountUp from 'react-countup';

// Data untuk statistik, agar mudah diubah
const statsData = [
    { end: 50, label: 'Jumlah Karyawan', delay: 0 },
    { end: 100, label: 'Jumlah Client Perusahaan', delay: 100 },
    { end: 11, label: 'Networking', delay: 200 },
];

const StatItem = ({ stat }) => (
    <div className="text-center" data-aos="fade-up" data-aos-delay={stat.delay}>
        <h3 className="text-5xl md:text-6xl font-bold text-white tracking-tighter">
            <CountUp end={stat.end} duration={2.5} enableScrollSpy scrollSpyOnce />
            <span>+</span>
        </h3>
        <p className="mt-2 text-white/80">{stat.label}</p>
    </div>
);

export default function StatsSection() {
    return (
        <section className="py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div 
                    className="relative bg-[#254D4D] text-white rounded-2xl md:rounded-3xl shadow-lg overflow-hidden" 
                    data-aos="fade-up"
                >
                    {/* Garis-garis Dekoratif */}
                    <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/4 w-72 h-72 lg:w-96 lg:h-96 border-2 border-white/10 rounded-full"></div>
                    <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/3 w-72 h-72 lg:w-96 lg:h-96 border border-white/10 rounded-full"></div>
                    <div className="absolute top-0 right-0 -translate-y-1/6 translate-x-1/2 w-72 h-72 lg:w-96 lg:h-96 border border-white/10 rounded-full"></div>

                    {/* Konten Statistik */}
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-around gap-8 md:gap-4 py-12 md:py-16">
                        {statsData.map((stat, index) => (
                            <StatItem key={index} stat={stat} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}