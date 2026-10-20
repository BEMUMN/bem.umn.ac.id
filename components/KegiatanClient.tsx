"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
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
    Search,
    Layers,
    RotateCcw,
} from "lucide-react";
import KegmaCard from "@/components/KegmaCard";
import type { KegmaDetail, ProkerDetail } from "@/constants/workIndex";

interface KegiatanClientProps {
    kegmaList: KegmaDetail[];
    prokerList: ProkerDetail[];
}

type TabType = "all" | "kegma" | "proker";

export default function KegiatanClient({
    kegmaList,
    prokerList,
}: KegiatanClientProps) {
    const [activeTab, setActiveTab] = useState<TabType>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedKegma, setSelectedKegma] = useState<KegmaDetail | null>(null);

    // Filter KEGMA by query
    const filteredKegma = useMemo(() => {
        if (!searchQuery.trim()) return kegmaList;
        const q = searchQuery.toLowerCase();
        return kegmaList.filter(
            (k) =>
                k.title.toLowerCase().includes(q) ||
                k.fullName.toLowerCase().includes(q) ||
                k.tagline.toLowerCase().includes(q) ||
                k.description.toLowerCase().includes(q) ||
                k.supervisor.toLowerCase().includes(q) ||
                k.category.toLowerCase().includes(q)
        );
    }, [kegmaList, searchQuery]);

    // Filter PROKER by query
    const filteredProker = useMemo(() => {
        if (!searchQuery.trim()) return prokerList;
        const q = searchQuery.toLowerCase();
        return prokerList.filter(
            (p) =>
                p.title.toLowerCase().includes(q) ||
                p.subtitle.toLowerCase().includes(q) ||
                p.division.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                p.fullDescription.toLowerCase().includes(q)
        );
    }, [prokerList, searchQuery]);

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

    const showKegma = activeTab === "all" || activeTab === "kegma";
    const showProker = activeTab === "all" || activeTab === "proker";

    return (
        <div className="relative w-full">
            {/* ========================================================
                INTERACTIVE FILTER & SEARCH BAR
               ======================================================== */}
            <section className="sticky top-16 z-30 border-y border-white/10 bg-navy-dark/85 backdrop-blur-xl py-4 transition-all">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        {/* Segmented Filter Buttons */}
                        <div
                            role="tablist"
                            aria-label="Kategori Kegiatan & Program Kerja"
                            className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur-md"
                        >
                            <button
                                type="button"
                                role="tab"
                                aria-selected={activeTab === "all"}
                                onClick={() => setActiveTab("all")}
                                className={`flex items-center gap-2 rounded-xl px-4 py-2 font-sans text-xs font-semibold transition-all cursor-pointer ${
                                    activeTab === "all"
                                        ? "bg-azure text-navy-dark shadow-md"
                                        : "text-concrete/80 hover:text-white"
                                }`}
                            >
                                <Layers size={14} />
                                <span>Semua Agenda</span>
                                <span className="rounded-full bg-navy-dark/20 px-1.5 py-0.2 font-mono text-[10px]">
                                    {kegmaList.length + prokerList.length}
                                </span>
                            </button>

                            <button
                                type="button"
                                role="tab"
                                aria-selected={activeTab === "kegma"}
                                onClick={() => setActiveTab("kegma")}
                                className={`flex items-center gap-2 rounded-xl px-4 py-2 font-sans text-xs font-semibold transition-all cursor-pointer ${
                                    activeTab === "kegma"
                                        ? "bg-azure text-navy-dark shadow-md"
                                        : "text-concrete/80 hover:text-white"
                                }`}
                            >
                                <Sparkles size={14} />
                                <span>6 KEGMA</span>
                                <span className="rounded-full bg-navy-dark/20 px-1.5 py-0.2 font-mono text-[10px]">
                                    {kegmaList.length}
                                </span>
                            </button>

                            <button
                                type="button"
                                role="tab"
                                aria-selected={activeTab === "proker"}
                                onClick={() => setActiveTab("proker")}
                                className={`flex items-center gap-2 rounded-xl px-4 py-2 font-sans text-xs font-semibold transition-all cursor-pointer ${
                                    activeTab === "proker"
                                        ? "bg-azure text-navy-dark shadow-md"
                                        : "text-concrete/80 hover:text-white"
                                }`}
                            >
                                <Briefcase size={14} />
                                <span>PROKER Divisi</span>
                                <span className="rounded-full bg-navy-dark/20 px-1.5 py-0.2 font-mono text-[10px]">
                                    {prokerList.length}
                                </span>
                            </button>
                        </div>

                        {/* Search Input Bar */}
                        <div className="relative w-full md:w-72 lg:w-80">
                            <label htmlFor="search-kegiatan" className="sr-only">
                                Cari kegiatan atau program kerja
                            </label>
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-concrete/50">
                                <Search size={15} />
                            </div>
                            <input
                                id="search-kegiatan"
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari agenda, divisi, atau kata kunci..."
                                className="w-full rounded-2xl border border-white/10 bg-white/5 py-2 pl-9 pr-8 font-sans text-xs text-white placeholder-concrete/50 backdrop-blur-md transition-colors focus:border-azure focus:bg-white/10 focus:outline-none"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery("")}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-concrete/50 hover:text-white"
                                    aria-label="Bersihkan pencarian"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Empty Search Result State */}
            {showKegma &&
                showProker &&
                filteredKegma.length === 0 &&
                filteredProker.length === 0 && (
                    <div className="mx-auto max-w-xl px-4 py-24 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-azure">
                            <Search size={24} />
                        </div>
                        <h3 className="mt-4 font-serif text-2xl font-bold text-white">
                            Agenda Tidak Ditemukan
                        </h3>
                        <p className="mt-2 font-sans text-sm text-concrete/80">
                            Tidak ada kegiatan atau program kerja yang cocok dengan kata kunci{" "}
                            <span className="font-semibold text-azure">&ldquo;{searchQuery}&rdquo;</span>.
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                setSearchQuery("");
                                setActiveTab("all");
                            }}
                            className="mt-6 inline-flex items-center gap-2 rounded-full border border-azure/40 bg-azure/10 px-5 py-2 font-sans text-xs font-semibold text-azure transition hover:bg-azure hover:text-navy-dark cursor-pointer"
                        >
                            <RotateCcw size={14} />
                            <span>Reset Pencarian &amp; Filter</span>
                        </button>
                    </div>
                )}

            {/* ========================================================
                SECTION 1: 6 KEGIATAN MAHASISWA (KEGMA)
               ======================================================== */}
            {showKegma && filteredKegma.length > 0 && (
                <section
                    id="kegma-section"
                    className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
                >
                    {/* Section Header */}
                    <div className="mb-12 text-center md:mb-16">
                        <div className="inline-flex items-center gap-2 rounded-full border border-camel-brown/40 bg-white/5 px-4 py-1.5 font-sans text-xs font-semibold tracking-wider text-pale-taupe uppercase backdrop-blur-sm">
                            <Sparkles size={14} className="text-camel-brown" />
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
                        {filteredKegma.map((item, idx) => (
                            <KegmaCard
                                key={item.id}
                                kegma={item}
                                indexNumber={String(idx + 1).padStart(2, "0")}
                                onClick={() => setSelectedKegma(item)}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* ========================================================
                SECTION 2: PROGRAM KERJA (PROKER) — ASYMMETRICAL BENTO
               ======================================================== */}
            {showProker && filteredProker.length > 0 && (
                <section
                    id="proker-section"
                    className="relative border-t border-white/10 bg-gradient-to-b from-navy-dark/60 via-navy-dark/95 to-navy-dark/60 py-20 backdrop-blur-md"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Section Header */}
                        <div className="mb-12 text-center md:mb-16">
                            <div className="inline-flex items-center gap-2 rounded-full border border-camel-brown/40 bg-white/5 px-4 py-1.5 font-sans text-xs font-semibold tracking-wider text-pale-taupe uppercase">
                                <Briefcase size={14} className="text-camel-brown" />
                                <span>Inisiatif Fungsional Lembaga • 6 Divisi BEM</span>
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
                            {filteredProker.map((proker, index) => {
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
                                                <span className="rounded-full border border-camel-brown/40 bg-camel-brown/15 px-3 py-1 font-sans text-[11px] font-semibold text-pale-taupe">
                                                    {proker.division}
                                                </span>
                                                <span className="font-sans text-[11px] font-semibold tracking-wider text-azure uppercase">
                                                    PRK-0{index + 1}
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
            )}

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
                                    <span className="inline-block rounded-full border border-camel-brown/40 bg-camel-brown/15 px-2.5 py-0.5 font-sans text-[10px] font-semibold tracking-wider text-pale-taupe uppercase">
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
                                <p className="mt-1 font-sans text-xs italic text-pale-taupe">
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
                                    <Sparkles size={18} className="text-camel-brown" />
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
                                    <Calendar size={20} className="text-camel-brown" />
                                    <div>
                                        <p className="font-sans text-[10px] uppercase tracking-wider text-concrete/60">
                                            Divisi Pengawas
                                        </p>
                                        <p className="font-sans text-xs font-semibold text-pale-taupe">
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
                                <span>Kunjungi Website Resmi</span>
                                <ExternalLink size={15} />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
