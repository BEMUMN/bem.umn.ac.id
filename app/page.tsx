import Navbar from "@/layouts/Navbar";
import Hero from "@/layouts/home-page/Hero";
import AboutPreview from "@/layouts/home-page/AboutPreview";
import Values from "@/layouts/home-page/Values";
import Work from "@/layouts/home-page/Work";
import Footer from "@/layouts/Footer";

export default function Home() {
    return (
        <main className="bg-navy-dark selection:bg-azure selection:text-navy-dark relative min-h-screen w-full overflow-x-hidden text-white">
            {/* Texture Background Layer */}
            <div className="super-bg absolute inset-0 -z-30 bg-cover bg-center opacity-30" />

            {/* Navbar Floating Pill */}
            <Navbar />

            {/* 1. HERO SECTION (Centerpiece Identity) */}
            <Hero id="hero" />

            {/* Subtle Divider 1 */}
            <div className="relative mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* 2. SEKILAS TENTANG KAMI & VISI MISI (Editorial Magazine) */}
            <AboutPreview id="tentang" />

            {/* Subtle Divider 2 */}
            <div className="via-azure/20 relative mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent to-transparent" />

            {/* 3. NILAI ATAU IDENTITAS KABINET (Bento Grid 4 Supergrafik) */}
            <Values id="nilai" />

            {/* Subtle Divider 3 */}
            <div className="via-camel-brown/30 relative mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent to-transparent" />

            {/* 4. HIGHLIGHT KEGIATAN MAHASISWA & PROKER */}
            <Work id="kegiatan" />

            {/* 5. FOOTER INSTITUSIONAL */}
            <Footer />
        </main>
    );
}
