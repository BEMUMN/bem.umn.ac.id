import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Sparkles, Building2, Quote, CheckCircle2 } from "lucide-react";

type AboutPreviewProps = {
    id: string;
    className?: string;
};

const missionPoints = [
    {
        num: "01",
        title: "Internal Kolaboratif & Profesional",
        desc: "Menciptakan internal organisasi yang kolaboratif dengan menjunjung tinggi inklusifitas dan profesionalitas.",
    },
    {
        num: "02",
        title: "Komunikasi Terbuka Antarorganisator",
        desc: "Meningkatkan hubungan antar BEM UMN dan organisator agar dapat bekerja sama melalui komunikasi secara terbuka.",
    },
    {
        num: "03",
        title: "Pengembangan Inovasi & Potensi",
        desc: "Mendukung pengembangan inovasi dan potensi mahasiswa melalui kegiatan yang positif dan berdampak nyata.",
    },
];

const AboutPreview = ({ id, className }: AboutPreviewProps) => {
    return (
        <section
            id={id}
            className={`relative flex min-h-screen w-full items-center justify-center px-4 py-24 sm:px-6 md:px-12 ${className}`}
        >
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:items-stretch lg:justify-between">
                {/* SISI KIRI: Artistic Typographic Poster Panel (Swiss/Editorial Magazine Style) */}
                <div className="relative flex w-full flex-col justify-between overflow-hidden rounded-3xl border border-azure/30 bg-gradient-to-br from-blue-primary/40 via-navy-dark to-navy-dark p-8 shadow-2xl backdrop-blur-xl lg:w-5/12 xl:p-10">
                    {/* Background Ornamen Supergrafik Transparan */}
                    <div className="pointer-events-none absolute -right-12 -top-12 opacity-15">
                        <Image
                            src="/svgs/INCLUSIVE_supergrafik_2.svg"
                            alt="Supergrafik Inclusive"
                            width={260}
                            height={260}
                        />
                    </div>
                    <div className="pointer-events-none absolute -bottom-16 -left-16 opacity-10">
                        <Image
                            src="/svgs/COLLABORATIVE_supergrafik_1.svg"
                            alt="Supergrafik Collaborative"
                            width={280}
                            height={280}
                        />
                    </div>

                    {/* Top Meta Info */}
                    <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 p-1.5 shadow-inner">
                                <Image
                                    src="/svgs/LOGO_BEM.svg"
                                    alt="Logo BEM UMN"
                                    width={32}
                                    height={32}
                                    className="object-contain"
                                />
                            </div>
                            <div>
                                <span className="font-serif text-sm font-bold text-white">
                                    BEM UMN Gen XVI
                                </span>
                                <p className="font-sans text-[10px] uppercase tracking-wider text-azure">
                                    Est. 17 November 2008
                                </p>
                            </div>
                        </div>

                        <span className="rounded-full border border-azure/40 bg-azure/10 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-azure">
                            Editorial
                        </span>
                    </div>

                    {/* Center Pull Quote: Apple Garamond Grandeur */}
                    <div className="relative z-10 my-8">
                        <Quote size={28} className="text-azure/50 mb-2" />
                        <blockquote className="font-serif text-2xl font-semibold leading-snug tracking-wide text-white sm:text-3xl">
                            &ldquo;Wadah kolaborasi yang merangkul setiap perbedaan ide dan sudut pandang, mentransformasikannya menjadi inovasi nyata bagi KBM UMN.&rdquo;
                        </blockquote>
                        <p className="mt-4 font-sans text-xs font-semibold tracking-wider uppercase text-azure/80">
                            — Komitmen Kabinet Generasi XVI
                        </p>
                    </div>

                    {/* Bottom Architectural Accent */}
                    <div className="relative z-10 border-t border-white/10 pt-4">
                        <div className="grid grid-cols-2 gap-3 text-left font-sans">
                            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                                <span className="text-[10px] uppercase tracking-wider text-azure/70 block">Naungan</span>
                                <span className="text-xs font-bold text-white">Rektorat Kemahasiswaan</span>
                            </div>
                            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                                <span className="text-[10px] uppercase tracking-wider text-azure/70 block">Arah Gerak</span>
                                <span className="text-xs font-bold text-white">Inklusif &amp; Kolaboratif</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SISI KANAN: Penjelasan Kelembagaan & 3 Butir Misi */}
                <div className="flex w-full flex-col justify-between lg:w-7/12 lg:pl-6">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-azure/30 bg-blue-primary/40 px-4 py-1.5 font-sans text-xs font-semibold tracking-wider text-azure uppercase">
                            <Building2 size={14} className="text-azure" />
                            <span>Sekilas BEM UMN</span>
                        </div>

                        <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                            Mewadahi Aspirasi Mahasiswa, <br />
                            Mendorong Inovasi Berkelanjutan
                        </h2>

                        <p className="mt-4 font-sans text-sm leading-relaxed text-concrete/90 sm:text-base">
                            Badan Eksekutif Mahasiswa Universitas Multimedia Nusantara (BEM UMN) adalah
                            lembaga eksekutif tertinggi di tingkat universitas. Sebagai episentrum dinamika
                            kemahasiswaan, BEM UMN menaungi Himpunan Mahasiswa, UKM, LSO, serta 6 Kegiatan Mahasiswa (KEGMA).
                        </p>

                        {/* 3 Butir Misi Cards Minimalis */}
                        <div className="mt-8 space-y-3.5">
                            {missionPoints.map((m) => (
                                <div
                                    key={m.num}
                                    className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-navy-dark/60 p-4 transition-all duration-300 hover:border-azure/40 hover:bg-navy-dark/90"
                                >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-azure/30 bg-blue-primary/40 font-serif text-sm font-bold text-azure group-hover:scale-105 transition-transform">
                                        {m.num}
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-base font-bold text-white group-hover:text-azure transition-colors">
                                            {m.title}
                                        </h3>
                                        <p className="mt-1 font-sans text-xs leading-relaxed text-azure/80 sm:text-sm">
                                            {m.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Ke Halaman Tentang Kami */}
                    <div className="mt-8 pt-4">
                        <Link
                            href="/tentang-kami"
                            className="group inline-flex items-center gap-2 rounded-full border border-azure/50 bg-azure px-6 py-3 font-sans text-xs sm:text-sm font-bold text-navy-dark shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-azure"
                        >
                            <span>Pelajari Visi, Misi &amp; Filosofi Lengkap</span>
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutPreview;
