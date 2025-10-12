import { Head } from "@inertiajs/react";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Impor komponen
import HeroSection from "@/Components/HeroSection";
import TrustedSection from "@/Components/TrustedSection";
import AboutSection from "@/Components/AboutSection";
import FacilitiesSection from "@/Components/FacilitiesSection";
import LubricantsSection from "@/Components/LubricantsSection";
import SpecialProductsSection from "@/Components/SpecialProductsSection";
import CommodityProductsSection from "@/Components/CommodityProductsSection";
import StatsSection from "@/Components/StatsSection";
import CertificatesSection from '@/Components/CertificatesSection';
import ContactSection from "@/Components/ContactSection";
import MainLayout from "@/Layouts/MainLayout";


// Komponen utama
export default function Welcome({ auth, homeProducts = [] }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      <Head title="Beranda" />

      <HeroSection />
      <TrustedSection />
      <AboutSection />
      <CertificatesSection /> 
      <FacilitiesSection />
      <LubricantsSection />
      {/* Bagian Produk Spesial (data dari controller via props) */}
      <SpecialProductsSection products={homeProducts} />
      <CommodityProductsSection />
      <StatsSection />
      <ContactSection />
    </>
  );
}

// Layout global
Welcome.layout = (page) => <MainLayout children={page} />;
