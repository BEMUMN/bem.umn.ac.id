import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";
import KegiatanClient from "@/components/KegiatanClient";
import { kegmaList, prokerList } from "@/constants/workIndex";
import { ArrowRight, Layers, Users, Sparkles, Briefcase } from "lucide-react";

export const metadata: Metadata = {
    title: "Kegiatan & Program Kerja | BEM UMN GEN XVI",
    description:
        "Eksplorasi 6 Kegiatan Mahasiswa (KEGMA) di bawah naungan BEM UMN dan rangkaian Program Kerja BEM UMN Generasi XVI 'Inclusive for Innovation'.",
};

export default function KegiatanPage() {
    return (
        <main className="relative min-h-screen bg-navy-dark text-white selection:bg-azure selection:text-navy-dark">
            {/* Latar Belakang Tekstur Kanvas Halus GSM */}
            <div
                className="pointer-events-none fixed inset-0 -z-30 opacity-25"
                style={{
                    backgroundImage: `url('/pngs/texture/ASSET.webp')`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "220px",
                }}
            />
            <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,rgba(47,72,109,0.35)_0%,rgba(15,30,63,0.95)_75%)]" />

            <Navbar />

            {/* ========================================================
                HERO SECTION: EDITORIAL AGENDA & MONOGRAPH
               ======================================================== */}
            <section className="relative px-4 pt-28 pb-14 sm:px-6 md:pt-36 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    {/* Swiss Design Micro-Stamp Line */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-4 font-sans text-[11px] font-semibold tracking-[0.2em] text-azure uppercase">
                        <div className="flex items-center gap-2">
                            <span className="inline-block h-2 w-2 rounded-full bg-azure animate-pulse" />
                            <span>Arsip Agenda &amp; Portofolio Karya • BEM UMN Gen XVI</span>
                        </div>
                        <div className="flex items-center gap-4 text-concrete/70">
                            <span>Tahun Sidang 2026/2027</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="hidden sm:inline">6 KEGMA • 6 Program Kerja</span>
                        </div>
                    </div>

                    {/* Headline Spread Asimetris */}
                    <div className="mt-8 text-center max-w-4xl mx-auto">
                        <span className="inline-block font-sans text-xs sm:text-sm font-bold tracking-[0.25em] text-azure uppercase">
                            Katalog Karya &amp; Inisiatif
                        </span>
                        <h1 className="mt-3 font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                            Kegiatan Mahasiswa <br className="hidden sm:inline" />
                            <span className="font-serif italic font-normal text-azure">
                                &amp; Program Kerja
                            </span>{" "}
                            Kabinet.
                        </h1>

                        <p className="mx-auto mt-5 max-w-2xl font-sans text-sm sm:text-base leading-relaxed text-concrete/85">
                            Mewadahi antusiasme, kreativitas, dan inovasi civitas akademika UMN.
                            Dari perhelatan akbar 6 Kegiatan Mahasiswa hingga inisiatif program
                            kerja internal yang berdampak nyata bagi seluruh mahasiswa.
                        </p>

                        {/* Quick Navigation Anchors */}
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 font-sans text-xs sm:text-sm">
                            <a
                                href="#kegma-section"
                                className="inline-flex items-center gap-2 rounded-full border border-azure bg-azure px-6 py-2.5 font-bold text-navy-dark shadow-lg shadow-azure/20 transition-all hover:scale-105 hover:bg-white active:scale-95"
                            >
                                <Sparkles size={14} />
                                <span>6 Kegiatan Mahasiswa (KEGMA)</span>
                                <ArrowRight size={14} />
                            </a>
                            <a
                                href="#proker-section"
                                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2.5 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105 active:scale-95"
                            >
                                <Briefcase size={14} />
                                <span>Program Kerja (PROKER) BEM</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================
                INTERACTIVE KEGIATAN & PROKER CLIENT ISLAND
               ======================================================== */}
            <KegiatanClient
                kegmaList={kegmaList}
                prokerList={prokerList}
            />

            {/* ========================================================
                CALL TO ACTION / COLLABORATION GATEWAY
               ======================================================== */}
            <section className="relative overflow-hidden border-t border-white/10 bg-gradient-to-r from-blue-primary/40 via-navy-dark to-blue-primary/40 py-16 sm:py-20">
                <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
                    <div className="inline-flex items-center gap-2 rounded-full border border-azure/30 bg-blue-primary/40 px-3.5 py-1 font-sans text-xs font-semibold text-azure uppercase mb-4">
                        <Sparkles size={13} />
                        <span>Sinergi Bersama Lembaga</span>
                    </div>

                    <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                        Ingin Berkolaborasi Bersama BEM UMN?
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl font-sans text-sm sm:text-base leading-relaxed text-concrete/80">
                        Kenali seluruh struktur fungsionaris di balik setiap divisi dan program kerja,
                        serta mari ciptakan dampak positif bersama bagi Universitas Multimedia Nusantara.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="/divisi"
                            className="inline-flex items-center gap-2 rounded-full border border-azure bg-azure px-7 py-3.5 font-sans text-xs sm:text-sm font-bold text-navy-dark shadow-xl shadow-azure/20 transition-all hover:scale-105 hover:bg-white active:scale-95"
                        >
                            <Users size={16} />
                            <span>Buka Direktori Divisi BEM</span>
                        </Link>
                        <Link
                            href="/tentang-kami"
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 font-sans text-xs sm:text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105 active:scale-95"
                        >
                            <Layers size={16} />
                            <span>Pelajari Profil BEM Gen XVI</span>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
