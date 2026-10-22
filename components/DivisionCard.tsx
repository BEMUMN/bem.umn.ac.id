"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Users, Building2, Sparkles, Shield } from "lucide-react";

export type DivisionItem = {
    id: string;
    name: string;
    fullname: string;
    description: string;
    imageUrl: string;
    memberCount?: number;
    leaderName?: string;
};

type DivisionCardProps = {
    division: DivisionItem;
    onSelect?: (divisionId: string) => void;
    variant?: "featured" | "standard";
    indexNumber?: string;
    clusterBadge?: string;
    className?: string;
};

export const divisionSupergraphics: Record<string, string> = {
    BPH: "/svgs/SOLID_supergrafik_4.svg",
    SUKM: "/svgs/INCLUSIVE_supergrafik_2.svg",
    SUFAK: "/svgs/INNOVATIVE_supergrafik_3.svg",
    SULSO: "/svgs/INCLUSIVE_supergrafik_2.svg",
    SUKMA: "/svgs/INNOVATIVE_supergrafik_3.svg",
    PR: "/svgs/COLLABORATIVE_supergrafik_1.svg",
};

const divisionFocusMap: Record<string, string> = {
    BPH: "Kebijakan Strategis, Administrasi & Keuangan",
    SUKM: "Pembinaan & Advokasi Unit Kegiatan Mahasiswa",
    SUFAK: "Sinergi Lintas Fakultas & Himpunan Mahasiswa",
    SULSO: "Pengawasan & Tata Kelola Lembaga Semi Otonom",
    SUKMA: "Supervisi 6 Kegiatan Akbar Mahasiswa Kampus",
    PR: "Kanal Komunikasi, Branding & Diplomasi Publik",
};

export const DivisionCard = ({
    division,
    onSelect,
    variant = "standard",
    indexNumber,
    clusterBadge,
    className = "",
}: DivisionCardProps) => {
    const handleCardClick = () => {
        if (onSelect) {
            onSelect(division.id);
        }
    };

    const divKey = division.id.toUpperCase();
    const supergraphicSrc = divisionSupergraphics[divKey] || "/svgs/SOLID_supergrafik_4.svg";
    const focusScope = divisionFocusMap[divKey] || "Pengawasan & Koordinasi Lembaga";

    // Varian Featured: Khusus Tier 1 (BPH) sebagai Executive Core
    if (variant === "featured") {
        return (
            <div
                role="button"
                tabIndex={0}
                onClick={handleCardClick}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleCardClick();
                    }
                }}
                className={`group relative overflow-hidden rounded-3xl border border-camel-brown/30 bg-gradient-to-br from-blue-primary/40 via-navy-dark to-dark-blue p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-azure hover:shadow-azure/20 hover:-translate-y-1 cursor-pointer text-left ${className}`}
                aria-label={`Buka direktori pimpinan ${division.fullname}`}
            >
                {/* Watermark Supergrafik Solid */}
                <div className="pointer-events-none absolute -right-10 -bottom-10 opacity-15 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-25">
                    <Image
                        src={supergraphicSrc}
                        alt={`Motif Supergrafik ${division.name}`}
                        width={280}
                        height={280}
                    />
                </div>

                <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
                    {/* Visual Frame Kiri — Foto Tim Utuh Tanpa Terpotong */}
                    <div className="relative h-64 sm:h-72 lg:h-84 w-full overflow-hidden rounded-2xl border border-white/15 bg-navy-dark shadow-inner lg:col-span-5">
                        {/* Ambient Blurred Backdrop */}
                        <Image
                            src={division.imageUrl}
                            alt=""
                            fill
                            aria-hidden="true"
                            className="object-cover object-center blur-lg opacity-25 scale-110 pointer-events-none"
                        />
                        {/* Foreground Official Team Photo: Object Contain agar seluruh anggota utuh */}
                        <Image
                            src={division.imageUrl}
                            alt={`Foto representatif fungsionaris ${division.fullname}`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 450px"
                            className="relative z-10 object-contain object-center p-2.5 transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 rounded-full bg-dark-blue/90 px-3 py-1 font-serif text-xs font-bold text-azure backdrop-blur-md border border-white/10">
                            <Shield size={12} className="text-camel-brown" />
                            <span>{division.name}</span>
                        </div>
                        {division.memberCount && (
                            <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 rounded-full bg-dark-blue/90 px-3 py-1 text-xs font-medium text-pale-taupe backdrop-blur-md border border-azure/20">
                                <Users size={13} />
                                <span>{division.memberCount} Pengurus Inti</span>
                            </div>
                        )}
                        <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between rounded-xl bg-navy-dark/80 px-3 py-1.5 backdrop-blur-md border border-white/10 text-[10px] font-sans text-concrete/70">
                            <span>Foto Resmi Fungsionaris</span>
                            <span className="text-pale-taupe">BEM UMN Gen XVI</span>
                        </div>
                    </div>

                    {/* Deskripsi & Aksi Kanan */}
                    <div className="flex flex-col justify-between h-full lg:col-span-7">
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-camel-brown/40 bg-camel-brown/15 px-3 py-1 font-sans text-[11px] font-bold text-pale-taupe uppercase">
                                    <Sparkles size={12} className="text-camel-brown" />
                                    <span>{clusterBadge || "Inti Pimpinan Eksekutif"}</span>
                                </span>
                                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-sans text-[10px] text-concrete/60">
                                    DIV-01 // TIER 1
                                </span>
                            </div>

                            <h3 className="mt-4 font-serif text-3xl sm:text-4xl font-bold text-white transition-colors group-hover:text-azure">
                                {division.fullname} ({division.name})
                            </h3>

                            <p className="mt-4 font-sans text-sm sm:text-base leading-relaxed text-concrete/85">
                                {division.description}
                            </p>

                            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <span className="font-sans text-[11px] font-semibold text-pale-taupe uppercase tracking-wider">
                                        Fokus &amp; Mandat Utama:
                                    </span>
                                    <p className="mt-0.5 font-serif text-sm font-bold text-white">
                                        {focusScope}
                                    </p>
                                </div>
                                <span className="rounded-full bg-camel-brown/20 border border-camel-brown/40 px-3 py-1 text-xs font-semibold text-pale-taupe">
                                    Kabinet Gen XVI
                                </span>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                            <span className="font-sans text-xs text-azure/80 font-medium">
                                Klik kartu untuk membuka direktori lengkap
                            </span>
                            <div className="inline-flex items-center gap-2 rounded-full border border-azure bg-azure px-5 py-2.5 font-sans text-xs sm:text-sm font-bold text-navy-dark shadow-lg shadow-azure/20 transition-all duration-300 group-hover:scale-105 group-hover:bg-white">
                                <span>Buka Direktori Pengurus BPH</span>
                                <ArrowUpRight size={15} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Varian Standard: Khusus Tier 2 (5 Divisi Setara dalam Formasi W)
    return (
        <div
            role="button"
            tabIndex={0}
            onClick={handleCardClick}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardClick();
                }
            }}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-blue-primary/30 to-dark-blue/90 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-azure/60 hover:shadow-2xl hover:shadow-azure/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-azure cursor-pointer text-left ${className}`}
            aria-label={`Buka direktori pengurus divisi ${division.fullname}`}
        >
            {/* Watermark Supergrafik Halus Sesuai Karakter Divisi */}
            <div className="pointer-events-none absolute -right-8 -bottom-8 opacity-10 transition-transform duration-700 ease-out group-hover:scale-115 group-hover:opacity-20">
                <Image
                    src={supergraphicSrc}
                    alt=""
                    width={200}
                    height={200}
                />
            </div>

            <div className="relative z-10">
                {/* Visual Header / Foto Representatif Utuh Tanpa Terpotong */}
                <div className="relative h-60 sm:h-68 w-full overflow-hidden rounded-2xl border border-white/10 bg-dark-blue/80 shadow-inner">
                    {/* Ambient Blurred Backdrop */}
                    <Image
                        src={division.imageUrl}
                        alt=""
                        fill
                        aria-hidden="true"
                        className="object-cover object-center blur-lg opacity-25 scale-110 pointer-events-none"
                    />
                    {/* Foreground Official Team Photo: Object Contain */}
                    <Image
                        src={division.imageUrl}
                        alt={`Foto representatif fungsionaris divisi ${division.fullname}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                        className="relative z-10 object-contain object-center p-2.5 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 rounded-full bg-dark-blue/90 px-3 py-1 font-serif text-xs font-bold text-azure backdrop-blur-md border border-white/10">
                        {indexNumber && <span className="text-pale-taupe font-sans text-[10px]">{indexNumber}.</span>}
                        <span>{division.name}</span>
                    </div>
                    {division.memberCount && (
                        <div className="absolute top-3 right-3 z-20 flex items-center gap-1 rounded-full bg-dark-blue/90 px-2.5 py-1 text-[11px] font-medium text-pale-taupe backdrop-blur-md border border-azure/20">
                            <Users size={12} />
                            <span>{division.memberCount} Pengurus</span>
                        </div>
                    )}
                </div>

                {/* Info Text */}
                <div className="mt-5">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <span className="font-sans text-[10px] uppercase tracking-wider text-pale-taupe">
                                {focusScope}
                            </span>
                            <h3 className="mt-1 font-serif text-xl font-bold text-white transition-colors group-hover:text-azure">
                                {division.fullname}
                            </h3>
                        </div>
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/5 text-azure transition-all duration-300 group-hover:bg-azure group-hover:text-navy-dark group-hover:translate-x-0.5">
                            <ArrowRight size={14} />
                        </div>
                    </div>

                    <p className="mt-3 font-sans text-xs leading-relaxed text-concrete/80 line-clamp-3">
                        {division.description}
                    </p>
                </div>
            </div>

            {/* Subtle Footer Indicator */}
            <div className="relative z-10 mt-6 flex items-center justify-between border-t border-white/10 pt-3.5 text-[11px] font-sans text-azure/70">
                <span className="flex items-center gap-1.5 text-azure group-hover:underline">
                    <Building2 size={13} />
                    <span>Lihat Fungsionaris Divisi</span>
                </span>
                <span className="text-[10px] text-pale-taupe/70 font-mono">
                    Gen XVI
                </span>
            </div>
        </div>
    );
};
