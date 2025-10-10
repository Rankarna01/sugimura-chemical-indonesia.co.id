// resources/js/Layouts/MainLayout.jsx

import React from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Layouts/Footer'; // <-- 1. Pastikan Footer sudah di-import

export default function MainLayout({ children }) {
  return (
    <div className="main-container">
      <Navbar />
      <main>
        {children}
      </main>
      <Footer /> {/* <-- 2. Pastikan <Footer /> ada di sini, di luar <main> */}
    </div>
  );
}