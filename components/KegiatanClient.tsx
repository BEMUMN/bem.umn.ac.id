"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
    ExternalLink,
    X,
    Sparkles,
    Calendar,
    UserCheck,
    CheckCircle2,
    ShieldCheck,
    Briefcase,
} from "lucide-react";
import KegmaCard from "@/components/KegmaCard";
import type { KegmaDetail, ProkerDetail } from "@/constants/workIndex";

interface KegiatanClientProps {
    kegmaList: KegmaDetail[];
    prokerList: ProkerDetail[];
}

export default function KegiatanClient({
    kegmaList,
    prokerList,
}: KegiatanClientProps) {
    const [selectedKegma, setSelectedKegma] = useState<KegmaDetail | null>(null);

    // Close modal on ESC key
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") {
            setSelectedKegma(null);
        }
    }, []);

    useEffect(() => {
        if (selectedKegma) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedKegma, handleKeyDown]);

    return (
        <div className="relative w-full">
            {/* ========================================================
                SECTION 1: 6 KEGIATAN MAHASISWA (KEGMA)
               ======================================================== */}
            <section
                id="kegma-section"
                className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
            >
                {/* Section Header */}
                <div className="mb-12 text-center md:mb-16">
                    <div className="inline-flex items-center gap-2 rounded-full border border-azure/30 bg-blue-primary/40 px-4 py-1.5 font-sans text-xs font-semibold tracking-wider text-azure uppercase backdrop-blur-sm">
                        <Sparkles size={14} className="text-azure" />
                        <span>Naungan BEM UMN • SUKMA</span>
                    </div>

                    <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-white drop-shadow sm:text-4xl md:text-5xl">
                        6 Kegiatan Mahasiswa (KEGMA)
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl font-sans text-sm sm:text-base leading-relaxed text-concrete/85">
                        BEM UMN Generasi XVI membina, mengoordinasikan, dan mengawasi
                        enam kegiatan mahasiswa tahunan Universitas Multimedia Nusantara.
                        Pilih kartu kegiatan untuk melihat filosofi, sorotan nilai, dan mengakses portal website resminya.
                    </p>
                </div>

                {/* Grid 6 Poster Cards */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
                    {kegmaList.map((item, idx) => (
                        <KegmaCard
                            key={item.id}
                            kegma={item}
                            indexNumber={String(idx + 1).padStart(2, "0")}
                            onClick={() => setSelectedKegma(item)}
                        />
                    ))}
                </div>
            </section>

            {/* ========================================================
                SECTION 2: PROGRAM KERJA (PROKER) — ASYMMETRICAL BENTO
               ======================================================== */}
            <section
                id="proker-section"
                className="relative border-t border-white/10 bg-gradient-to-b from-navy-dark/60 via-navy-dark/95 to-navy-dark/60 py-20 backdrop-blur-md"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="mb-12 text-center md:mb-16">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 font-sans text-xs font-semibold tracking-wider text-azure uppercase">
                            <Briefcase size={14} className="text-azure" />
                            <span>Inisiatif Fungsional Lembaga</span>
                        </div>

                        <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-white drop-shadow sm:text-4xl md:text-5xl">
                            Program Kerja (PROKER) BEM UMN Gen XVI
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl font-sans text-sm sm:text-base leading-relaxed text-concrete/85">
                            Rangkaian program kerja yang dirancang dan dieksekusi
                            oleh divisi-divisi BEM UMN untuk melayani mahasiswa, memperkuat
                            tata kelola organisasi, dan mempererat hubungan internal maupun eksternal.
                        </p>
                    </div>

                    {/* Bento Grid Asimetris (6-6, 7-5, 5-7 Kolom) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {prokerList.map((proker, index) => {
                            // Penentuan rasio asimetris bento
                            const colSpanClass =
                                index === 0 || index === 1
                                    ? "lg:col-span-6"
                                    : index === 2 || index === 5
                                      ? "lg:col-span-7"
                                      : "lg:col-span-5";

                            return (
                                <div
                                    key={proker.id}
                                    className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-blue-primary/30 to-navy-dark/90 p-6 sm:p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-azure/50 hover:shadow-2xl hover:-translate-y-1 ${colSpanClass}`}
                                >
                                    {/* Top Metadata */}
                                    <div>
                                        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-4">
                                            <span className="rounded-full border border-azure/30 bg-blue-primary/60 px-3 py-1 font-sans text-[11px] font-bold text-cream">
                                                {proker.division}
                                            </span>
                                            <span className="font-sans text-[11px] font-semibold tracking-wider text-azure uppercase">
                                                PROKER 0{index + 1}
                                            </span>
                                        </div>

                                        {/* Titles */}
                                        <h3 className="mt-5 font-serif text-2xl sm:text-3xl font-bold tracking-wide text-white group-hover:text-azure transition-colors">
                                            {proker.title}
                                        </h3>
                                        <p className="mt-1 font-sans text-xs font-semibold uppercase tracking-wider text-azure/80">
                                            {proker.subtitle}
                                        </p>

                                        {/* Description */}
                                        <p className="mt-4 font-sans text-sm leading-relaxed text-concrete/85">
                                            {proker.fullDescription}
                                        </p>
                                    </div>

                                    {/* Objectives Checklist */}
                                    <div className="mt-8 border-t border-white/10 pt-5">
                                        <p className="font-sans text-xs font-bold uppercase tracking-wider text-azure flex items-center gap-1.5">
                                            <CheckCircle2 size={13} className="text-azure" />
                                            <span>Tujuan &amp; Fokus Pelaksanaan:</span>
                                        </p>
                                        <ul className="mt-3 space-y-2">
                                            {proker.objectives.map((obj, i) => (
                                                <li
                                                    key={i}
                                                    className="flex items-start gap-2.5 text-xs text-concrete/80"
                                                >
                                                    <span className="h-1.5 w-1.5 rounded-full bg-azure mt-1.5 shrink-0" />
                                                    <span>{obj}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ========================================================
                MODAL DIALOG DETAIL KEGMA
               ======================================================== */}
            {selectedKegma && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-kegma-title"
                >
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
                        onClick={() => setSelectedKegma(null)}
                    />

                    {/* Modal Window Container */}
                    <div className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-azure/40 bg-navy-dark shadow-2xl transition-all duration-300 animate-in zoom-in-95">
                        {/* Modal Header */}
                        <div className="relative flex items-center justify-between border-b border-white/10 bg-blue-primary/40 px-6 py-5 backdrop-blur-md sm:px-8">
                            <div className="flex items-center gap-4">
                                <div className="relative h-12 w-12 shrink-0 rounded-xl border border-white/20 bg-navy-dark/80 p-1.5 shadow-md">
                                    <Image
                                        src={selectedKegma.logo}
                                        alt={`Logo ${selectedKegma.title}`}
                                        fill
                                        className="object-contain p-1"
                                    />
                                </div>
                                <div>
                                    <span className="inline-block rounded-full border border-azure/40 bg-azure/10 px-2.5 py-0.5 font-sans text-[10px] font-semibold tracking-wider text-azure uppercase">
                                        {selectedKegma.category}
                                    </span>
                                    <h3
                                        id="modal-kegma-title"
                                        className="mt-0.5 font-serif text-xl font-bold tracking-wide text-white sm:text-2xl"
                                    >
                                        {selectedKegma.title}
                                    </h3>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setSelectedKegma(null)}
                                className="rounded-full border border-white/20 bg-white/10 p-2 text-white/80 transition-colors hover:border-azure hover:bg-white/20 hover:text-white cursor-pointer"
                                aria-label="Tutup jendela rincian kegiatan"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Scrollable Body */}
                        <div className="overflow-y-auto px-6 py-6 sm:px-8 space-y-6">
                            {/* Full Name & Tagline */}
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="font-sans text-xs uppercase tracking-wider text-azure font-semibold">
                                    Nama Resmi Kegiatan Mahasiswa
                                </p>
                                <h4 className="mt-1 font-serif text-lg font-semibold text-white">
                                    {selectedKegma.fullName}
                                </h4>
                                <p className="mt-1 font-sans text-xs italic text-azure/90">
                                    &ldquo;{selectedKegma.tagline}&rdquo;
                                </p>
                            </div>

                            {/* Penjelasan Lengkap */}
                            <div>
                                <h5 className="flex items-center gap-2 font-serif text-base font-semibold text-white">
                                    <ShieldCheck size={18} className="text-azure" />
                                    Tentang Kegiatan
                                </h5>
                                <p className="mt-2 text-justify font-sans text-sm leading-relaxed text-concrete/90">
                                    {selectedKegma.fullDescription}
                                </p>
                            </div>

                            {/* Poin-poin Utama */}
                            <div>
                                <h5 className="flex items-center gap-2 font-serif text-base font-semibold text-white">
                                    <Sparkles size={18} className="text-azure" />
                                    Sorotan &amp; Nilai Utama
                                </h5>
                                <ul className="mt-3 space-y-2">
                                    {selectedKegma.highlights.map((point, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-2.5 text-xs sm:text-sm text-concrete/85"
                                        >
                                            <CheckCircle2
                                                size={16}
                                                className="mt-0.5 shrink-0 text-azure"
                                            />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Informasi Kepengurusan & Naungan */}
                            <div className="grid grid-cols-1 gap-3 rounded-2xl border border-white/10 bg-navy-dark/60 p-4 sm:grid-cols-2">
                                <div className="flex items-center gap-3">
                                    <UserCheck size={20} className="text-azure" />
                                    <div>
                                        <p className="font-sans text-[10px] uppercase tracking-wider text-concrete/60">
                                            Supervisor BEM
                                        </p>
                                        <p className="font-sans text-xs font-semibold text-white">
                                            {selectedKegma.supervisor}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar size={20} className="text-azure" />
                                    <div>
                                        <p className="font-sans text-[10px] uppercase tracking-wider text-concrete/60">
                                            Divisi Pengawas
                                        </p>
                                        <p className="font-sans text-xs font-semibold text-white">
                                            SUKMA BEM UMN Gen XVI
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Action Footer */}
                        <div className="flex flex-col-reverse gap-3 border-t border-white/10 bg-blue-primary/20 px-6 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-8">
                            <button
                                type="button"
                                onClick={() => setSelectedKegma(null)}
                                className="w-full rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 font-sans text-xs font-medium text-white transition hover:bg-white/15 sm:w-auto cursor-pointer"
                            >
                                Tutup
                            </button>

                            <a
                                href={selectedKegma.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-azure/40 bg-azure px-6 py-2.5 font-sans text-xs font-bold text-navy-dark shadow-lg shadow-azure/20 transition-all hover:scale-105 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-azure sm:w-auto"
                            >
                                <span>Go to Website</span>
                                <ExternalLink size={15} />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
