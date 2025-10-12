// resources/js/Components/TrustedSection.jsx

import React from 'react';

export default function TrustedSection() {
    // Kelola logo dalam sebuah array agar lebih rapi
    const logos = [
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Honda.svg/1200px-Honda.svg.png', alt: 'Honda' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Toyota_logo_%28Red%29.svg/950px-Toyota_logo_%28Red%29.svg.png', alt: 'Toyota' },
        { src: 'https://perusahaanjepang.com/wp-content/uploads/2015/08/13-PT.-ASTRA-DAIHATSU-MOTOR-logo.png', alt: 'Daihatsu' },
        { src: 'https://media.licdn.com/dms/image/v2/C560BAQFdGPeTgPgHzQ/company-logo_200_200/company-logo_200_200/0/1668664396600/central_motor_wheel_indonesia_logo?e=2147483647&v=beta&t=g4fkvPFuOCHUka_lU2kHFV3ipnN1HdjYKvxXmHYsPYs', alt: 'Central Motor Wheel Indonesia' },
        { src: 'https://storage.bkkbisa.net/company_logo/hFk0oJVd61DAEs6iSuLJjOYk2dS256.jpg', alt: 'Chuhai Giken Indonesia' },
        { src: 'https://www.istw.co.id/assets/istw/logo.png', alt: 'ISTW' },
        { src: 'https://s3-symbol-logo.tradingview.com/garuda-metalindo-tbk-pt--600.png', alt: 'Garuda Metalindo' },
        { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3oQ1V-cMIelGibSwe9D_TQEh_x3MBg6b41A&s', alt: 'PT selamat sempurna TBK' },
        { src: 'https://media.licdn.com/dms/image/v2/D4E0BAQHC6zU-MgrPNg/company-logo_200_200/company-logo_200_200/0/1710920359673/pt_mitsubishi_krama_yudha_motors_and_manufacturing_logo?e=2147483647&v=beta&t=uPRYyToT2DiUUvJboGiAchrHrphj1hxubTkHWptXfek', alt: 'PT Mitsubishi motors Krama yudha' },
    ];

    // Duplikasi array untuk menciptakan efek loop yang mulus
    const duplicatedLogos = [...logos, ...logos];

    return (
        <section id="trusted" className="py-10 md:py-16 bg-white">
            <div className="container mx-auto px-4">
                <h3 className="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-8">
                    Dipercaya oleh berbagai perusahaan ternama
                </h3>
                <div className="relative overflow-hidden group flex justify-center h-12">
                    {/* Efek fade di sisi kiri dan kanan */}
                    <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent z-10"></div>
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent z-10"></div>

                    {/* Logo track yang bergerak */}
                    <div className="w-max flex items-center gap-12 animate-marquee-x group-hover:[animation-play-state:paused]">
                        {duplicatedLogos.map((logo, index) => (
                            <img
                                key={index}
                                src={logo.src}
                                alt={logo.alt}
                                className="h-8 md:h-10 w-auto object-contain grayscale opacity-70 transition duration-300 hover:grayscale-0 hover:opacity-100 hover:scale-110"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}