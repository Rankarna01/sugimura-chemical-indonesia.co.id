// resources/js/Components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProductsOpen, setProductsOpen] = useState(false); // desktop dropdown
  const [isProductsMobileOpen, setProductsMobileOpen] = useState(false); // mobile accordion
  const dropdownRef = useRef(null);

  // ====== NAV LINKS (kiri-kanan) ======
  const navLinks = [
    { href: "#home", text: "Beranda" },
    { href: "#about", text: "Tentang Kami" },
    { href: "#fasilitas", text: "Fasilitas" },
    // Produk Khusus → ditangani khusus (dropdown)
    { href: "#produk-khusus", text: "Produk Khusus", isDropdown: true },
    { href: "#contact", text: "Kontak" },
  ];

  // ====== PRODUK KHUSUS (isi dropdown) ======
  // Ganti slug sesuai halaman detail produk kamu
  const specialProducts = [
    { name: "SUNFORMER", slug: "/produk/sunformer-ILfvp" },
    { name: "SUGICUT", slug: "/produk/sugicut-o3IvS" },
    { name: "SUNDRAW", slug: "/produk/sundraw-HPh7W" },
    { name: "PRETON", slug: "/produk/preton-UnfD1" },
    { name: "HIBIRON", slug: "/produk/hibiron-nu04o" },
    { name: "SUNCLEANER Waterbased", slug: "/produk/suncleaner-waterbased-nZJzX" },
    { name: "SUNCLEANER Solventbased", slug: "/produk/suncleaner-solventbased-nZJzX" },
    // Tambahkan lain jika perlu:
    // { name: "SUNROLL", slug: "/products/sunroll" },
    // { name: "SUNTOLL", slug: "/products/suntoll" },
  ];

  // Tutup dropdown desktop jika klik di luar
  useEffect(() => {
    const onClickOutside = (e) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target)) setProductsOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // Utility: tutup semua menu (dipanggil saat klik link)
  const closeAllMenus = () => {
    setMobileMenuOpen(false);
    setProductsOpen(false);
    setProductsMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* bar transparan + blur */}
      <div className="bg-white/85 backdrop-blur-md shadow-md ring-1 ring-black/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="#home" onClick={closeAllMenus} className="inline-flex items-center gap-2">
                <img className="h-9 sm:h-10" src="/images/logo/logo-1.png" alt="Logo Sugimura" />
              </a>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, idx) =>
                link.isDropdown ? (
                  <div
                    key={idx}
                    className="relative"
                    ref={dropdownRef}
                    onMouseEnter={() => setProductsOpen(true)}
                    onMouseLeave={() => setProductsOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setProductsOpen((s) => !s)}
                      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-[15px] font-semibold transition
                        ${isProductsOpen ? "text-emerald-700" : "text-gray-700 hover:text-emerald-700"}`}
                      aria-expanded={isProductsOpen}
                      aria-haspopup="true"
                    >
                      Produk Khusus
                      <svg
                        className={`h-4 w-4 transition ${isProductsOpen ? "rotate-180" : ""}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {/* Dropdown panel (desktop) */}
                    <div
                      className={`absolute left-0 mt-2 w-64 rounded-xl bg-white shadow-lg ring-1 ring-black/5 overflow-hidden transition-all
                        ${isProductsOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"}`}
                    >
                      <div className="p-2">
                        {specialProducts.map((p, i) => (
                          <a
                            key={i}
                            href={p.slug}
                            onClick={closeAllMenus}
                            className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                          >
                            <span>{p.name}</span>
                            <svg className="h-4 w-4 opacity-60" viewBox="0 0 20 20" fill="currentColor">
                              <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <a
                    key={idx}
                    href={link.href}
                    onClick={closeAllMenus}
                    className="px-3 py-2 rounded-lg text-[15px] font-semibold text-gray-700 hover:text-emerald-700 transition"
                  >
                    {link.text}
                  </a>
                )
              )}
            </nav>

            {/* Mobile button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen((s) => !s)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-emerald-700 focus:outline-none"
                aria-label="Toggle navigation"
                aria-expanded={isMobileMenuOpen}
              >
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-8 6h8" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white shadow-lg ring-1 ring-black/5 transition-transform origin-top ${
          isMobileMenuOpen ? "scale-y-100" : "scale-y-0 pointer-events-none"
        }`}
      >
        <nav className="px-3 py-3 space-y-1">
          {navLinks.map((link, idx) =>
            link.isDropdown ? (
              <div key={idx} className="border-t border-gray-100 pt-2">
                <button
                  type="button"
                  onClick={() => setProductsMobileOpen((s) => !s)}
                  className="w-full flex items-center justify-between px-2 py-2 rounded-md text-base font-semibold text-gray-700 hover:bg-emerald-50"
                  aria-expanded={isProductsMobileOpen}
                >
                  <span>Produk Khusus</span>
                  <svg
                    className={`h-5 w-5 transition ${isProductsMobileOpen ? "rotate-180 text-emerald-700" : ""}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/* Submenu (accordion) */}
                <div className={`overflow-hidden transition-all ${isProductsMobileOpen ? "max-h-96" : "max-h-0"}`}>
                  <ul className="mt-1 mb-2 space-y-1">
                    {specialProducts.map((p, i) => (
                      <li key={i}>
                        <a
                          href={p.slug}
                          onClick={closeAllMenus}
                          className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                        >
                          {p.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <a
                key={idx}
                href={link.href}
                onClick={closeAllMenus}
                className="block px-3 py-2 rounded-md text-base font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
              >
                {link.text}
              </a>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
