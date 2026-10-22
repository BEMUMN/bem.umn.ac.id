"use client";

import React from "react";
import Image from "next/image";
import {
    ArrowRight,
    ArrowUpRight,
    Users,
    Building2,
    Sparkles,
    Shield,
} from "lucide-react";

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
    const supergraphicSrc =
        divisionSupergraphics[divKey] || "/svgs/SOLID_supergrafik_4.svg";
    const focusScope =
        divisionFocusMap[divKey] || "Pengawasan & Koordinasi Lembaga";

    // Varian Featured: Khusus Tier 1 (BPH) sebagai Executive Core
    if (variant === "featured") {
        return (
            <div
                role="button"
                data-division-id={division.id}
                tabIndex={0}
                onClick={handleCardClick}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleCardClick();
                    }
                }}
                className={`group border-camel-brown/30 from-blue-primary/40 via-navy-dark to-dark-blue hover:border-azure hover:shadow-azure/20 relative cursor-pointer overflow-hidden rounded-3xl border bg-gradient-to-br p-6 text-left shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 sm:p-8 lg:p-10 ${className}`}
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
                    <div className="bg-navy-dark relative h-64 w-full overflow-hidden rounded-2xl border border-white/15 shadow-inner sm:h-72 lg:col-span-5 lg:h-84">
                        {/* Ambient Blurred Backdrop */}
                        <Image
                            src={division.imageUrl}
                            alt=""
                            fill
                            aria-hidden="true"
                            className="pointer-events-none scale-110 object-cover object-center opacity-25 blur-lg"
                        />
                        {/* Foreground Official Team Photo: Object Contain agar seluruh anggota utuh */}
                        <Image
                            src={division.imageUrl}
                            alt={`Foto representatif fungsionaris ${division.fullname}`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 450px"
                            className="relative z-10 object-contain object-center p-2.5 transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="bg-dark-blue/90 text-azure absolute top-3 left-3 z-20 flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 font-serif text-xs font-bold backdrop-blur-md">
                            <Shield size={12} className="text-camel-brown" />
                            <span>{division.name}</span>
                        </div>
                        {division.memberCount && (
                            <div className="bg-dark-blue/90 text-pale-taupe border-azure/20 absolute top-3 right-3 z-20 flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-md">
                                <Users size={13} />
                                <span>
                                    {division.memberCount} Pengurus Inti
                                </span>
                            </div>
                        )}
                        <div className="bg-navy-dark/80 text-concrete/70 absolute right-3 bottom-3 left-3 z-20 flex items-center justify-between rounded-xl border border-white/10 px-3 py-1.5 font-sans text-[10px] backdrop-blur-md">
                            <span>Foto Resmi Fungsionaris</span>
                            <span className="text-pale-taupe">
                                BEM UMN Gen XVI
                            </span>
                        </div>
                    </div>

                    {/* Deskripsi & Aksi Kanan */}
                    <div className="flex h-full flex-col justify-between lg:col-span-7">
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="border-camel-brown/40 bg-camel-brown/15 text-pale-taupe inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-sans text-[11px] font-bold uppercase">
                                    <Sparkles
                                        size={12}
                                        className="text-camel-brown"
                                    />
                                    <span>
                                        {clusterBadge ||
                                            "Inti Pimpinan Eksekutif"}
                                    </span>
                                </span>
                                <span className="text-concrete/60 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-sans text-[10px]">
                                    DIV-01 // TIER 1
                                </span>
                            </div>

                            <h3 className="group-hover:text-azure mt-4 font-serif text-3xl font-bold text-white transition-colors sm:text-4xl">
                                {division.fullname} ({division.name})
                            </h3>

                            <p className="text-concrete/85 mt-4 font-sans text-sm leading-relaxed sm:text-base">
                                {division.description}
                            </p>

                            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                                <div>
                                    <span className="text-pale-taupe font-sans text-[11px] font-semibold tracking-wider uppercase">
                                        Fokus &amp; Mandat Utama:
                                    </span>
                                    <p className="mt-0.5 font-serif text-sm font-bold text-white">
                                        {focusScope}
                                    </p>
                                </div>
                                <span className="bg-camel-brown/20 border-camel-brown/40 text-pale-taupe rounded-full border px-3 py-1 text-xs font-semibold">
                                    Kabinet Gen XVI
                                </span>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                            <span className="text-azure/80 font-sans text-xs font-medium">
                                Klik kartu untuk membuka direktori lengkap
                            </span>
                            <div className="border-azure bg-azure text-navy-dark shadow-azure/20 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-sans text-xs font-bold shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:bg-white sm:text-sm">
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
            data-division-id={division.id}
            tabIndex={0}
            onClick={handleCardClick}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardClick();
                }
            }}
            className={`group from-blue-primary/30 to-dark-blue/90 hover:border-azure/60 hover:shadow-azure/20 focus-visible:ring-azure relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b p-6 text-left shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus-visible:ring-2 ${className}`}
            aria-label={`Buka direktori pengurus divisi ${division.fullname}`}
        >
            {/* Watermark Supergrafik Halus Sesuai Karakter Divisi */}
            <div className="pointer-events-none absolute -right-8 -bottom-8 opacity-10 transition-transform duration-700 ease-out group-hover:scale-115 group-hover:opacity-20">
                <Image src={supergraphicSrc} alt="" width={200} height={200} />
            </div>

            <div className="relative z-10">
                {/* Visual Header / Foto Representatif Utuh Tanpa Terpotong */}
                <div className="bg-dark-blue/80 relative h-60 w-full overflow-hidden rounded-2xl border border-white/10 shadow-inner sm:h-68">
                    {/* Ambient Blurred Backdrop */}
                    <Image
                        src={division.imageUrl}
                        alt=""
                        fill
                        aria-hidden="true"
                        className="pointer-events-none scale-110 object-cover object-center opacity-25 blur-lg"
                    />
                    {/* Foreground Official Team Photo: Object Contain */}
                    <Image
                        src={division.imageUrl}
                        alt={`Foto representatif fungsionaris divisi ${division.fullname}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                        className="relative z-10 object-contain object-center p-2.5 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="bg-dark-blue/90 text-azure absolute top-3 left-3 z-20 flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 font-serif text-xs font-bold backdrop-blur-md">
                        {indexNumber && (
                            <span className="text-pale-taupe font-sans text-[10px]">
                                {indexNumber}.
                            </span>
                        )}
                        <span>{division.name}</span>
                    </div>
                    {division.memberCount && (
                        <div className="bg-dark-blue/90 text-pale-taupe border-azure/20 absolute top-3 right-3 z-20 flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium backdrop-blur-md">
                            <Users size={12} />
                            <span>{division.memberCount} Pengurus</span>
                        </div>
                    )}
                </div>

                {/* Info Text */}
                <div className="mt-5">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <span className="text-pale-taupe font-sans text-[10px] tracking-wider uppercase">
                                {focusScope}
                            </span>
                            <h3 className="group-hover:text-azure mt-1 font-serif text-xl font-bold text-white transition-colors">
                                {division.fullname}
                            </h3>
                        </div>
                        <div className="text-azure group-hover:bg-azure group-hover:text-navy-dark flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/5 transition-all duration-300 group-hover:translate-x-0.5">
                            <ArrowRight size={14} />
                        </div>
                    </div>

                    <p className="text-concrete/80 mt-3 line-clamp-3 font-sans text-xs leading-relaxed">
                        {division.description}
                    </p>
                </div>
            </div>

            {/* Subtle Footer Indicator */}
            <div className="text-azure/70 relative z-10 mt-6 flex items-center justify-between border-t border-white/10 pt-3.5 font-sans text-[11px]">
                <span className="text-azure flex items-center gap-1.5 group-hover:underline">
                    <Building2 size={13} />
                    <span>Lihat Fungsionaris Divisi</span>
                </span>
                <span className="text-pale-taupe/70 font-mono text-[10px]">
                    Gen XVI
                </span>
            </div>
        </div>
    );
};
