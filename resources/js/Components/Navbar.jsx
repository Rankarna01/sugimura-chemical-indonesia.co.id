// resources/js/Components/Navbar.jsx

import React, { useState } from 'react';

export default function Navbar() {
    // Kita tidak lagi butuh 'isScrolled' dan 'useEffect'
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: '#home', text: 'Beranda' },
        { href: '#about', text: 'Tentang Kami' },
        { href: '#fasilitas', text: 'Fasilitas' },
        { href: '#produk-khusus', text: 'Produk Khusus' },
        { href: '#contact', text: 'Kontak' },
    ];

    return (
        // Langsung terapkan 'bg-white' dan 'shadow-lg' di sini
        <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="#home">
                            <img className="h-10" src="/images/logo/logo-1.png" alt="Logo Sugimura" />
                        </a>
                    </div>

                    {/* Navigasi Desktop */}
                    <nav className="hidden lg:flex lg:space-x-8">
                        {navLinks.map((link, index) => (
                            <a 
                                key={index} 
                                href={link.href} 
                                // Ganti 'text-gray-700' dan 'hover:text-green-600' menjadi 'text-brand-700' dan 'hover:text-brand'
                                className="text-base font-semibold text-gray-700 hover:text-brand-600 pb-1 border-b-2 border-transparent hover:border-brand-600 transition-colors duration-300"
                            >
                                {link.text}
                            </a>
                        ))}
                    </nav>

                    {/* Tombol Menu Mobile */}
                    <div className="lg:hidden">
                        <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none">
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Menu Mobile */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-200 shadow-md">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link, index) => (
                             <a key={index} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-brand-600">{link.text}</a>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}