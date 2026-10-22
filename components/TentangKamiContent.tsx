"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";
import { divisions } from "@/constants/divisionIndex";
import {
    Compass,
    Target,
    ArrowRight,
    ArrowUpRight,
    Building2,
    Sparkles,
    Shield,
    Lightbulb,
    Share2,
    FileText,
    Layers,
    Award,
    CheckCircle2,
    Palette,
    ScrollText,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const missionList = [
    {
        no: "01",
        title: "Kolaborasi Internal yang Inklusif",
        desc: "Menciptakan iklim internal organisasi yang kolaboratif dengan senantiasa menjunjung tinggi nilai inklusivitas, integritas, dan standar profesionalitas kerja.",
        badge: "Inklusivitas & Soliditas",
        focus: "Budaya Kerja & Sinergi Internal",
    },
    {
        no: "02",
        title: "Komunikasi Terbuka Antarorganisator",
        desc: "Membangun dan mempererat sinergi harmonis antara BEM UMN dengan seluruh entitas himpunan, UKM, serta LSO melalui saluran komunikasi yang transparan dan setara.",
        badge: "Sinergi Multipihak",
        focus: "Harmonisasi Lintas Ormawa",
    },
    {
        no: "03",
        title: "Pengembangan Potensi & Inovasi Mahasiswa",
        desc: "Mendukung akselerasi gagasan solutif dan potensi karya mahasiswa UMN melalui inisiatif program kerja yang relevan, berdaya guna, dan berdampak nyata bagi kampus.",
        badge: "Inovasi Berdampak",
        focus: "Akselerasi Karya & Prestasi",
    },
];

const pillars = [
    {
        title: "SOLID",
        role: "Pilar 01",
        colSpan: "lg:col-span-7",
        meaning:
            "Berlandaskan komitmen dan integritas yang kokoh serta dapat diandalkan dalam menavigasi dinamika organisasi kemahasiswaan.",
        symbolism:
            "Kombinasi bentuk persegi yang konsisten dan saling menopang di berbagai sudut pandang — merefleksikan kekuatan struktural yang stabil dan pantang goyah.",
        icon: Shield,
        supergraphic: "/svgs/SOLID_supergrafik_4.svg",
        tag: "Komitmen & Integritas",
    },
    {
        title: "INNOVATIVE",
        role: "Pilar 02",
        colSpan: "lg:col-span-5",
        meaning:
            "Solusi-solusi besar lahir dari gagasan kreatif yang disatukan dengan tujuan mulia untuk kemajuan civitas akademika UMN.",
        symbolism:
            "Setengah lingkaran yang bersatu membentuk komposisi geometris utuh — melambangkan gagasan kecil yang berkumpul menjadi dampak besar.",
        icon: Lightbulb,
        supergraphic: "/svgs/INNOVATIVE_supergrafik_3.svg",
        tag: "Gagasan Solutif",
    },
    {
        title: "COLLABORATIVE",
        role: "Pilar 03",
        colSpan: "lg:col-span-5",
        meaning:
            "Perbedaan karakter, pola pikir, dan keahlian bukanlah batasan, melainkan elemen yang saling melengkapi demi mencapai tujuan bersama.",
        symbolism:
            "Harmoni kurva lengkung dan sudut tegas yang merefleksikan sinergi lintas karakter di lingkungan kampus Universitas Multimedia Nusantara.",
        icon: Share2,
        supergraphic: "/svgs/COLLABORATIVE_supergrafik_1.svg",
        tag: "Sinergi Multikarakter",
    },
    {
        title: "INCLUSIVE",
        role: "Pilar 04",
        colSpan: "lg:col-span-7",
        meaning:
            "Menjunjung tinggi kesetaraan dan keterbukaan bagi setiap aspirasi mahasiswa UMN untuk tumbuh, bersuara, dan berdaya bersama.",
        symbolism:
            "Pancaran empat titik kilau yang berakar dari satu pusat yang seimbang — melambangkan harmoni keberagaman dalam satu arah gerak.",
        icon: Sparkles,
        supergraphic: "/svgs/INCLUSIVE_supergrafik_2.svg",
        tag: "Kesetaraan & Keterbukaan",
    },
];

const colorPalette = [
    {
        name: "Dark Navy",
        hex: "#0F1E3F",
        bgClass: "bg-[#0F1E3F]",
        borderClass: "border-white/20",
        role: "Latar Utama & Wibawa",
    },
    {
        name: "Blue Primary",
        hex: "#2F486D",
        bgClass: "bg-[#2F486D]",
        borderClass: "border-white/20",
        role: "Struktur & Kedalaman",
    },
    {
        name: "Azure Blue",
        hex: "#B3C3D1",
        bgClass: "bg-[#B3C3D1]",
        borderClass: "border-white/20",
        textClass: "text-[#0F1E3F]",
        role: "Aksen & Sorotan Visual",
    },
    {
        name: "Camel Brown",
        hex: "#997953",
        bgClass: "bg-[#997953]",
        borderClass: "border-white/20",
        role: "Integritas & Kehangatan",
    },
    {
        name: "Pale Taupe",
        hex: "#D2C7B8",
        bgClass: "bg-[#D2C7B8]",
        borderClass: "border-white/20",
        textClass: "text-[#0F1E3F]",
        role: "Harmoni & Keseimbangan",
    },
];

export default function TentangKamiContent() {
    const mainRef = useRef<HTMLDivElement>(null);

    // Lenis Smooth Scroll Setup
    useEffect(() => {
        if (
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }

        const lenis = new Lenis({
            duration: 0.8,
            smoothWheel: true,
            syncTouch: false,
            gestureOrientation: "vertical",
            lerp: 0.1,
            wheelMultiplier: 0.6,
        });

        function update(time: number) {
            lenis.raf(time * 1000);
        }

        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(update);
            lenis.destroy();
        };
    }, []);

    // GSAP ScrollTrigger Motion Orchestration
    useGSAP(
        () => {
            const prefersReducedMotion =
                typeof window !== "undefined" &&
                window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            if (prefersReducedMotion) {
                gsap.set(".tt-reveal", { opacity: 1, y: 0 });
                return;
            }

            const revealElements =
                gsap.utils.toArray<HTMLElement>(".tt-reveal");

            revealElements.forEach((el) => {
                const rect = el.getBoundingClientRect();
                const inInitialView =
                    rect.top < window.innerHeight && rect.bottom > 0;

                // Elemen yang sudah berada di viewport pertama langsung tampil tanpa jeda/flash
                if (!inInitialView) {
                    gsap.set(el, { opacity: 0, y: 30 });
                } else {
                    gsap.set(el, { opacity: 1, y: 0 });
                }

                ScrollTrigger.create({
                    trigger: el,
                    start: "top 88%",
                    end: "bottom 12%",
                    onEnter: () => {
                        gsap.to(el, {
                            opacity: 1,
                            y: 0,
                            duration: 0.7,
                            ease: "power2.out",
                            overwrite: "auto",
                        });
                    },
                    onLeave: () => {
                        gsap.to(el, {
                            opacity: 0,
                            y: -20,
                            duration: 0.5,
                            ease: "power2.in",
                            overwrite: "auto",
                        });
                    },
                    onEnterBack: () => {
                        gsap.to(el, {
                            opacity: 1,
                            y: 0,
                            duration: 0.7,
                            ease: "power2.out",
                            overwrite: "auto",
                        });
                    },
                    onLeaveBack: () => {
                        gsap.to(el, {
                            opacity: 0,
                            y: 30,
                            duration: 0.5,
                            ease: "power2.in",
                            overwrite: "auto",
                        });
                    },
                });
            });
        },
        { scope: mainRef },
    );

    return (
        <div
            ref={mainRef}
            className="bg-navy-dark selection:bg-azure selection:text-navy-dark relative min-h-screen text-white"
        >
            {/* Latar Belakang Tekstur Kanvas Halus GSM */}
            <div
                className="pointer-events-none fixed inset-0 -z-30 opacity-25"
                style={{
                    backgroundImage: `url('/pngs/texture/ASSET.webp')`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "220px",
                }}
            />

            {/* Gradient Radial Ambient */}
            <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_top_right,rgba(47,72,109,0.35)_0%,rgba(15,30,63,0.98)_75%)]" />

            {/* Navigasi Utama */}
            <Navbar />

            <main className="relative z-10 pt-28 pb-20 md:pt-36">
                {/* ========================================================
                    SECTION 1: EDITORIAL HERO & MONOGRAPH TITLE
                   ======================================================== */}
                <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Swiss Design Micro-Stamp Line */}
                    <div className="tt-reveal text-azure flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-4 font-sans text-[11px] font-semibold tracking-[0.2em] uppercase">
                        <div className="flex items-center gap-2">
                            <span className="bg-azure inline-block h-2 w-2 animate-pulse rounded-full" />
                            <span>
                                Dokumen Profil Lembaga • BEM UMN Gen XVI
                            </span>
                        </div>
                        <div className="text-concrete/70 flex items-center gap-4">
                            <span>Tahun Sidang 2026/2027</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="hidden sm:inline">
                                Arsip Resmi Kabinet
                            </span>
                        </div>
                    </div>

                    {/* Headline Spread Asimetris */}
                    <div className="mt-8 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
                        <div className="tt-reveal flex flex-col justify-between lg:col-span-8">
                            <div>
                                <span className="border-camel-brown/40 bg-camel-brown/10 text-pale-taupe inline-flex items-center gap-2 rounded-full border px-3.5 py-1 font-sans text-xs font-semibold tracking-wider uppercase">
                                    <Sparkles
                                        size={12}
                                        className="text-camel-brown"
                                    />
                                    <span>Monograf Eksklusif Kabinet</span>
                                </span>
                                <h1 className="mt-4 font-serif text-4xl leading-[1.08] font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
                                    Mewadahi Gagasan,{" "}
                                    <br className="hidden sm:inline" />
                                    <span className="text-azure font-serif font-normal italic">
                                        Menggerakkan
                                    </span>{" "}
                                    Inovasi.
                                </h1>
                                <p className="text-concrete/85 mt-6 max-w-2xl font-sans text-sm leading-relaxed sm:text-base md:text-lg">
                                    Badan Eksekutif Mahasiswa Universitas
                                    Multimedia Nusantara hadir sebagai wadah
                                    pemersatu, pelindung aspirasi, dan inkubator
                                    inovasi yang berakar pada keberagaman
                                    seluruh civitas akademika kampus.
                                </p>
                            </div>

                            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6 font-sans text-xs sm:text-sm">
                                <a
                                    href="#sejarah-section"
                                    className="text-azure inline-flex min-h-11 items-center gap-2 font-semibold transition-colors hover:text-white"
                                >
                                    <span>
                                        Pelajari Sejarah &amp; Landasan Lembaga
                                    </span>
                                    <ArrowRight size={14} />
                                </a>
                                <span className="hidden text-white/30 sm:inline">
                                    •
                                </span>
                                <a
                                    href="#visi-misi-section"
                                    className="text-concrete/70 inline-flex min-h-11 items-center gap-2 transition-colors hover:text-white"
                                >
                                    <span>Tinjau Visi &amp; Misi</span>
                                    <ArrowRight size={14} />
                                </a>
                            </div>
                        </div>

                        {/* Abstract Box dengan Stempel Pendirian */}
                        <div className="tt-reveal border-camel-brown/30 from-blue-primary/40 via-navy-dark/95 to-navy-dark flex flex-col justify-between rounded-3xl border bg-gradient-to-br p-6 shadow-lg backdrop-blur-xl sm:p-8 lg:col-span-4">
                            <div>
                                <div className="flex items-center justify-between">
                                    <span className="text-azure font-sans text-[10px] font-bold tracking-widest uppercase">
                                        Lembaga Eksekutif
                                    </span>
                                    <span className="bg-camel-brown/20 border-camel-brown/50 text-pale-taupe rounded-full border px-2.5 py-0.5 font-sans text-[10px] font-semibold">
                                        EST. 17.11.2008
                                    </span>
                                </div>

                                <div className="mt-5 border-t border-white/10 pt-4">
                                    <p className="font-serif text-3xl font-bold tracking-wide text-white">
                                        Generasi XVI
                                    </p>
                                    <p className="text-azure mt-1 font-serif text-sm italic">
                                        &ldquo;Inclusive for Innovation&rdquo;
                                    </p>
                                    <p className="text-concrete/85 mt-4 font-sans text-xs leading-relaxed">
                                        Menaungi 6 Divisi Manajerial, 6 Kegiatan
                                        Mahasiswa (KEGMA), serta koordinasi
                                        puluhan Himpunan Mahasiswa dan UKM/LSO
                                        di Universitas Multimedia Nusantara.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-3.5">
                                <div className="text-pale-taupe flex items-center gap-2 font-sans text-[11px] font-semibold">
                                    <CheckCircle2
                                        size={13}
                                        className="text-camel-brown"
                                    />
                                    <span>Birokrasi Kemahasiswaan UMN</span>
                                </div>
                                <p className="text-concrete/70 mt-1 font-sans text-[11px] leading-relaxed">
                                    Badan hukum &amp; perwakilan resmi mahasiswa
                                    tingkat universitas.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========================================================
                    SECTION 2: SEJARAH & LANDASAN INSTITUSI (SPLIT-SCREEN)
                   ======================================================== */}
                <section
                    id="sejarah-section"
                    className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 md:mt-20 lg:px-8"
                >
                    <div className="bg-navy-dark/85 grid grid-cols-1 gap-8 rounded-3xl border border-white/15 p-6 shadow-lg backdrop-blur-xl sm:p-10 lg:grid-cols-12 lg:gap-12">
                        {/* Kolom Kiri: Piagam Legalitas 17 November 2008 */}
                        <div className="tt-reveal relative flex flex-col justify-between overflow-hidden border-b border-white/10 pb-8 lg:col-span-5 lg:border-r lg:border-b-0 lg:pr-10 lg:pb-0">
                            {/* Giant Watermark Numeral */}
                            <div className="text-azure/10 pointer-events-none absolute -top-6 -left-4 font-serif text-8xl font-black select-none sm:text-9xl">
                                17.11
                            </div>

                            <div className="relative z-10">
                                <div className="border-camel-brown/40 text-pale-taupe inline-flex items-center gap-2 rounded-full border bg-white/5 px-3.5 py-1 font-sans text-xs font-semibold">
                                    <Building2
                                        size={14}
                                        className="text-camel-brown"
                                    />
                                    <span>Landasan Legalitas &amp; Mandat</span>
                                </div>

                                <div className="mt-8">
                                    <span className="text-azure/40 font-serif text-5xl font-bold sm:text-6xl">
                                        17.11
                                    </span>
                                    <span className="mt-1 block font-serif text-3xl font-bold text-white sm:text-4xl">
                                        Tahun 2008
                                    </span>
                                </div>

                                <p className="text-concrete/80 mt-4 font-sans text-xs leading-relaxed sm:text-sm">
                                    BEM UMN diresmikan sebagai entitas eksekutif
                                    tertinggi mahasiswa di bawah naungan{" "}
                                    <strong>
                                        Rektorat Bidang Kemahasiswaan
                                    </strong>{" "}
                                    Universitas Multimedia Nusantara.
                                </p>
                            </div>

                            <div className="relative z-10 mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
                                <div className="flex items-center gap-2">
                                    <ScrollText
                                        size={15}
                                        className="text-azure"
                                    />
                                    <span className="text-azure font-sans text-[11px] font-semibold tracking-wider uppercase">
                                        Fungsi Pokok Lembaga
                                    </span>
                                </div>
                                <p className="text-concrete/90 mt-1.5 font-sans text-xs leading-relaxed">
                                    Menyelaraskan koordinasi vertikal bersama
                                    rektorat serta membina hubungan horizontal
                                    yang setara dengan seluruh ormawa kampus.
                                </p>
                            </div>
                        </div>

                        {/* Kolom Kanan: Narasi Sejarah & Trio Milestone Cards */}
                        <div className="tt-reveal flex flex-col justify-between lg:col-span-7">
                            <div>
                                <h2 className="font-serif text-2xl leading-tight font-bold text-white sm:text-3xl lg:text-4xl">
                                    Menjembatani Dinamika Kemahasiswaan Sejak
                                    Awal Berdiri
                                </h2>
                                <p className="text-concrete/85 mt-4 font-sans text-sm leading-relaxed sm:text-base">
                                    Sebagai pilar eksekutif kemahasiswaan di
                                    UMN, Badan Eksekutif Mahasiswa menjadi
                                    katalisator yang mewadahi dan mengalirkan
                                    aspirasi, kebutuhan, serta inisiatif
                                    mahasiswa. BEM UMN berperan aktif dalam
                                    menciptakan iklim kampus yang suportif,
                                    mendorong terciptanya karya-karya bermakna,
                                    serta mengawal keutuhan nilai kebersamaan.
                                </p>
                                <p className="text-concrete/75 mt-3 font-sans text-sm leading-relaxed">
                                    Memasuki usia kepengurusan yang ke-16,
                                    Kabinet Generasi XVI mengusung semangat
                                    inklusivitas tanpa sekat untuk memastikan
                                    bahwa setiap suara mahasiswa—dari berbagai
                                    program studi dan latar belakang
                                    minat—memiliki ruang yang sama untuk
                                    bertumbuh dan berprestasi.
                                </p>
                            </div>

                            {/* Trio Milestone Cards */}
                            <div className="mt-8 grid grid-cols-1 gap-3 border-t border-white/10 pt-6 sm:grid-cols-3">
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                    <span className="font-serif text-lg font-bold text-white">
                                        16 Generasi
                                    </span>
                                    <span className="text-azure mt-1 block font-sans text-[11px]">
                                        Konsistensi Kepemimpinan
                                    </span>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                    <span className="text-pale-taupe font-serif text-lg font-bold">
                                        10 Himpunan
                                    </span>
                                    <span className="text-concrete/70 mt-1 block font-sans text-[11px]">
                                        Di Bawah 4 Fakultas
                                    </span>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                    <span className="text-azure font-serif text-lg font-bold">
                                        25+ Ormawa
                                    </span>
                                    <span className="text-concrete/70 mt-1 block font-sans text-[11px]">
                                        UKM &amp; LSO Terkoordinasi
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========================================================
                    SECTION 3: VISI & MISI — GRAND EDITORIAL MANIFESTO
                   ======================================================== */}
                <section
                    id="visi-misi-section"
                    className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 md:mt-20 lg:px-8"
                >
                    <div className="border-azure/30 from-blue-primary/40 via-navy-dark to-navy-dark rounded-3xl border bg-gradient-to-b p-6 shadow-lg backdrop-blur-xl sm:p-12 lg:p-14">
                        {/* Section Tag */}
                        <div className="tt-reveal flex items-center justify-between border-b border-white/10 pb-6">
                            <div className="flex items-center gap-2">
                                <Compass
                                    size={16}
                                    className="text-camel-brown"
                                />
                                <span className="text-pale-taupe font-sans text-xs font-bold tracking-[0.2em] uppercase">
                                    Arah Perjuangan &amp; Haluan Kerja
                                </span>
                            </div>
                            <span className="text-azure hidden font-sans text-xs font-semibold tracking-widest uppercase sm:inline">
                                PEDOMAN RESMI 2026/2027
                            </span>
                        </div>

                        {/* Grand Visi Pull Quote */}
                        <div className="tt-reveal border-azure mt-8 border-l-4 pl-6 sm:pl-10">
                            <span className="text-azure/80 font-sans text-xs font-semibold tracking-widest uppercase">
                                VISI KABINET GENERASI XVI
                            </span>
                            <blockquote className="mt-4 font-serif text-2xl leading-[1.25] font-medium text-white sm:text-3xl md:text-4xl lg:text-5xl">
                                &ldquo;Menjadikan BEM UMN sebagai wadah
                                kolaborasi yang{" "}
                                <span className="text-azure font-serif italic">
                                    inklusif
                                </span>{" "}
                                dan{" "}
                                <span className="text-azure font-serif italic">
                                    inovatif
                                </span>{" "}
                                untuk mendorong kontribusi positif serta
                                memperkuat integritas bagi seluruh organisator
                                dan mahasiswa.&rdquo;
                            </blockquote>
                            <p className="text-concrete/60 mt-4 font-sans text-xs tracking-wider uppercase">
                                Dokumen Visi Resmi Sidang Umum • Universitas
                                Multimedia Nusantara
                            </p>
                        </div>

                        {/* Three-Column Numbered Mission Spread */}
                        <div className="mt-14 border-t border-white/15 pt-10">
                            <div className="tt-reveal mb-8 flex items-center justify-between">
                                <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-white sm:text-2xl">
                                    <Target
                                        size={20}
                                        className="text-camel-brown"
                                    />
                                    <span>Tiga Misi Utama Kabinet:</span>
                                </h2>
                                <span className="text-pale-taupe font-sans text-xs tracking-wider">
                                    3 Fokus Strategis
                                </span>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
                                {missionList.map((m) => (
                                    <div
                                        key={m.no}
                                        className="tt-reveal group hover:border-azure/50 relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-azure/40 group-hover:text-azure font-serif text-4xl font-bold transition-colors sm:text-5xl">
                                                    {m.no}
                                                </span>
                                                <span className="border-camel-brown/40 bg-camel-brown/15 text-pale-taupe rounded-full border px-2.5 py-0.5 font-sans text-[10px] font-semibold">
                                                    {m.badge}
                                                </span>
                                            </div>
                                            <h3 className="mt-4 font-serif text-lg font-bold text-white sm:text-xl">
                                                {m.title}
                                            </h3>
                                            <p className="text-concrete/80 mt-3 font-sans text-xs leading-relaxed sm:text-sm">
                                                {m.desc}
                                            </p>
                                        </div>

                                        <div className="text-azure/80 mt-6 flex items-center justify-between border-t border-white/10 pt-4 font-sans text-[11px] font-medium">
                                            <div className="flex items-center gap-1.5">
                                                <CheckCircle2
                                                    size={13}
                                                    className="text-azure"
                                                />
                                                <span>{m.focus}</span>
                                            </div>
                                            <span className="text-concrete/50">
                                                Misi #{m.no}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========================================================
                    SECTION 4: ANATOMI LOGO & SIMBOLISME FOLDED PAPER XVI
                   ======================================================== */}
                <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 md:mt-20 lg:px-8">
                    <div className="border-azure/30 from-blue-primary/30 via-navy-dark to-dark-blue grid grid-cols-1 gap-8 rounded-3xl border bg-gradient-to-br p-6 shadow-lg backdrop-blur-xl sm:p-10 lg:grid-cols-12 lg:gap-12">
                        {/* Frame Logo dengan Ambient Glow */}
                        <div className="tt-reveal relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-8 lg:col-span-5">
                            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(179,195,209,0.25)_0%,transparent_70%)]" />
                            <Image
                                src="/svgs/BEM_GEN_16_LOGO_LIGHT.svg"
                                alt="Logo BEM UMN Gen XVI — Inclusive for Innovation"
                                width={360}
                                height={150}
                                priority
                                className="h-auto w-full max-w-[280px] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] sm:max-w-[320px]"
                            />
                            <div className="mt-6 text-center">
                                <span className="border-camel-brown/40 bg-camel-brown/10 text-pale-taupe inline-block rounded-full border px-3 py-1 font-sans text-[11px] font-semibold">
                                    Folded Paper XVI Identity
                                </span>
                            </div>
                        </div>

                        {/* Narasi Filosofi Logo & Tagline */}
                        <div className="tt-reveal flex flex-col justify-between lg:col-span-7">
                            <div>
                                <div className="border-camel-brown/40 text-pale-taupe inline-flex items-center gap-2 rounded-full border bg-white/10 px-3.5 py-1 font-sans text-xs font-semibold">
                                    <FileText
                                        size={13}
                                        className="text-camel-brown"
                                    />
                                    <span>Filosofi Identitas Visual</span>
                                </div>

                                <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl">
                                    Simbolisme Lipatan Kertas (Folded Paper XVI)
                                </h2>

                                <p className="text-concrete/85 mt-4 font-sans text-sm leading-relaxed sm:text-base">
                                    Elemen lipatan kertas pada angka Romawi{" "}
                                    <strong>XVI</strong> melambangkan proses
                                    membuka lembaran baru—refleksi dari
                                    keterbukaan BEM XVI terhadap beragam
                                    aspirasi, perspektif, dan gagasan tanpa
                                    batas dari seluruh civitas akademika.
                                </p>

                                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="bg-navy-dark/80 rounded-2xl border border-white/10 p-4">
                                        <h3 className="flex items-center gap-1.5 font-serif text-sm font-bold text-white">
                                            <span className="bg-azure h-2 w-2 rounded-full" />
                                            Ruang Inklusif Tanpa Sekat
                                        </h3>
                                        <p className="text-azure/90 mt-1.5 font-sans text-xs leading-relaxed">
                                            Menjadi fondasi di mana inovasi
                                            dapat tumbuh subur melalui
                                            keberlimpahan gagasan dari mahasiswa
                                            lintas fakultas dan program studi.
                                        </p>
                                    </div>
                                    <div className="bg-navy-dark/80 rounded-2xl border border-white/10 p-4">
                                        <h3 className="flex items-center gap-1.5 font-serif text-sm font-bold text-white">
                                            <span className="bg-camel-brown h-2 w-2 rounded-full" />
                                            Dampak Solutif Nyata
                                        </h3>
                                        <p className="text-pale-taupe mt-1.5 font-sans text-xs leading-relaxed">
                                            Mendorong lahirnya inisiatif yang
                                            memberi solusi nyata dan relevan
                                            bagi ekosistem Universitas
                                            Multimedia Nusantara.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Palet Warna Resmi GSM */}
                            <div className="mt-8 border-t border-white/10 pt-5">
                                <div className="mb-3 flex items-center gap-2">
                                    <Palette size={14} className="text-azure" />
                                    <span className="text-azure font-sans text-xs font-semibold tracking-wider uppercase">
                                        Palet Warna Resmi Graphic Standard
                                        Manual (GSM)
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                                    {colorPalette.map((c) => (
                                        <div
                                            key={c.name}
                                            className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-center"
                                        >
                                            <div
                                                className={`mx-auto h-5 w-full rounded-md ${c.bgClass} ${c.borderClass} mb-2 border`}
                                            />
                                            <p className="truncate font-serif text-xs font-bold text-white">
                                                {c.name}
                                            </p>
                                            <p className="text-azure/80 font-mono font-sans text-[10px]">
                                                {c.hex}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 font-sans text-xs">
                                    <span className="text-azure tracking-wider">
                                        Tagline Resmi:{" "}
                                        <strong>#InclusiveForInnovation</strong>
                                    </span>
                                    <span className="text-concrete/60">
                                        Standard Graphic Manual GSM BEM XVI
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========================================================
                    SECTION 5: EMPAT NILAI KABINET — ASYMMETRICAL BENTO
                   ======================================================== */}
                <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 md:mt-20 lg:px-8">
                    <div className="tt-reveal mx-auto max-w-3xl text-center">
                        <div className="border-camel-brown/40 bg-blue-primary/40 text-pale-taupe inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-sans text-xs font-semibold tracking-wider uppercase">
                            <Sparkles size={14} className="text-camel-brown" />
                            <span>Pilar Supergrafik &amp; Nilai Inti</span>
                        </div>
                        <h2 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                            Empat Nilai BEM UMN Gen XVI
                        </h2>
                        <p className="text-concrete/80 mt-4 font-sans text-sm leading-relaxed sm:text-base">
                            Berdasarkan Graphic Standard Manual (GSM), identitas
                            visual BEM Gen XVI digerakkan oleh empat motif
                            supergrafik yang mencerminkan karakter kepengurusan.
                        </p>
                    </div>

                    {/* Bento Grid Asimetris (7-5-5-7 Kolom) */}
                    <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
                        {pillars.map((p) => {
                            const Icon = p.icon;
                            return (
                                <div
                                    key={p.title}
                                    className={`tt-reveal group from-blue-primary/30 to-navy-dark/95 hover:border-azure/50 relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:shadow-lg sm:p-8 ${p.colSpan}`}
                                >
                                    {/* Supergraphic Watermark */}
                                    <div className="pointer-events-none absolute -right-6 -bottom-6 opacity-20 transition-all duration-500 group-hover:scale-110 group-hover:opacity-35">
                                        <Image
                                            src={p.supergraphic}
                                            alt={`Motif Supergrafik ${p.title}`}
                                            width={180}
                                            height={180}
                                            className="drop-shadow"
                                        />
                                    </div>

                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white shadow-md">
                                                <Icon
                                                    size={22}
                                                    className="text-azure"
                                                />
                                            </div>
                                            <span className="border-camel-brown/30 bg-camel-brown/10 text-pale-taupe rounded-full border px-3 py-1 font-sans text-[10px] font-bold tracking-widest uppercase">
                                                {p.role}
                                            </span>
                                        </div>

                                        <h3 className="mt-6 font-serif text-2xl font-bold tracking-wide text-white sm:text-3xl">
                                            {p.title}
                                        </h3>
                                        <p className="text-concrete/85 mt-2 max-w-xl font-sans text-xs leading-relaxed sm:text-sm">
                                            {p.meaning}
                                        </p>

                                        <div className="bg-navy-dark/80 mt-6 rounded-2xl border border-white/10 p-4">
                                            <span className="text-pale-taupe flex items-center gap-1.5 font-serif text-xs font-semibold">
                                                <Award
                                                    size={13}
                                                    className="text-camel-brown"
                                                />
                                                Simbolisme Visual Bentuk:
                                            </span>
                                            <p className="text-concrete/75 mt-1 font-sans text-[11px] leading-relaxed sm:text-xs">
                                                {p.symbolism}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ========================================================
                    SECTION 6: STRUKTUR 6 DIVISI & GATEWAY DIRECTORY
                   ======================================================== */}
                <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 md:mt-20 lg:px-8">
                    <div className="tt-reveal rounded-3xl border border-white/15 bg-white/5 p-6 shadow-lg backdrop-blur-xl sm:p-10 lg:p-12">
                        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                            <div>
                                <div className="border-camel-brown/40 bg-blue-primary/40 text-pale-taupe inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-sans text-xs font-semibold tracking-wider uppercase">
                                    <Layers
                                        size={14}
                                        className="text-camel-brown"
                                    />
                                    <span>Pilar Fungsional Kabinet</span>
                                </div>
                                <h2 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl">
                                    Enam Divisi Strategis BEM UMN Gen XVI
                                </h2>
                                <p className="text-concrete/80 mt-2 max-w-2xl font-sans text-sm leading-relaxed sm:text-base">
                                    Masing-masing divisi mengemban mandat
                                    manajerial khusus demi menjamin kelancaran
                                    operasional, pembinaan organisasi mahasiswa,
                                    dan relasi publik.
                                </p>
                            </div>

                            <Link
                                href="/divisi"
                                className="group border-azure bg-azure text-navy-dark shadow-azure/20 inline-flex items-center gap-2 rounded-full border px-6 py-3 font-sans text-xs font-bold shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white active:scale-95 sm:text-sm"
                            >
                                <span>Buka Direktori Pengurus</span>
                                <ArrowUpRight
                                    size={16}
                                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                            </Link>
                        </div>

                        {/* Grid 6 Divisi Ringkas & Interaktif */}
                        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {divisions.map((div) => (
                                <Link
                                    key={div.id}
                                    href="/divisi"
                                    className="group bg-navy-dark/70 hover:border-azure/50 hover:bg-navy-dark flex flex-col justify-between rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                                >
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <span className="bg-blue-primary/60 text-azure border-azure/20 rounded-full border px-3 py-1 font-serif text-xs font-bold">
                                                {div.name}
                                            </span>
                                            <span className="text-concrete/60 font-sans text-[11px]">
                                                Gen XVI
                                            </span>
                                        </div>

                                        <h3 className="group-hover:text-azure mt-4 font-serif text-lg font-bold text-white transition-colors">
                                            {div.fullname}
                                        </h3>
                                        <p className="text-concrete/80 mt-2 line-clamp-3 font-sans text-xs leading-relaxed">
                                            {div.description}
                                        </p>
                                    </div>

                                    <div className="text-azure mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-semibold">
                                        <span>Lihat Pengurus Divisi</span>
                                        <ArrowRight
                                            size={14}
                                            className="transition-transform group-hover:translate-x-1"
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Call to Action Banner ke Kegiatan */}
                        <div className="from-blue-primary/40 via-navy-dark to-blue-primary/40 mt-12 flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/10 bg-gradient-to-r p-6 text-center sm:flex-row sm:p-8 sm:text-left">
                            <div>
                                <h3 className="font-serif text-xl font-bold text-white sm:text-2xl">
                                    Ingin Meninjau Program Kerja &amp; KEGMA?
                                </h3>
                                <p className="text-concrete/80 mt-1 font-sans text-xs sm:text-sm">
                                    Eksplorasi 6 Kegiatan Mahasiswa (KEGMA)
                                    serta rangkaian inisiatif BEM UMN Gen XVI.
                                </p>
                            </div>
                            <Link
                                href="/kegiatan"
                                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 font-sans text-xs font-semibold text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20 active:scale-95 sm:text-sm"
                            >
                                <span>Tinjau Kegiatan (KEGMA)</span>
                                <ArrowRight size={15} />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer Resmi */}
            <Footer />
        </div>
    );
}
