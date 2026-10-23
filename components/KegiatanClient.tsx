"use client";

import { useState, useMemo } from "react";
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
import { ContentDialog } from "@/components/ContentDialog";
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
    const [selectedKegma, setSelectedKegma] = useState<KegmaDetail | null>(
        null,
    );

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
                k.category.toLowerCase().includes(q),
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
                p.fullDescription.toLowerCase().includes(q),
        );
    }, [prokerList, searchQuery]);

    const showKegma = activeTab === "all" || activeTab === "kegma";
    const showProker = activeTab === "all" || activeTab === "proker";

    return (
        <div className="relative w-full">
            {/* ========================================================
                INTERACTIVE FILTER & SEARCH BAR
               ======================================================== */}
            <section
                data-agenda-filter
                className="bg-navy-dark/85 relative z-30 border-y border-white/10 py-4 backdrop-blur-xl transition-all"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        {/* Segmented Filter Buttons */}
                        <div
                            role="group"
                            aria-label="Kategori Kegiatan & Program Kerja"
                            className="inline-flex flex-wrap gap-1 rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur-md"
                        >
                            <button
                                type="button"
                                aria-pressed={activeTab === "all"}
                                onClick={() => setActiveTab("all")}
                                className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-xl px-3 py-2 font-sans text-xs font-semibold transition-all ${
                                    activeTab === "all"
                                        ? "bg-azure text-navy-dark shadow-md"
                                        : "text-concrete/80 hover:text-white"
                                }`}
                            >
                                <Layers size={14} />
                                <span>Semua Agenda</span>
                                <span className="bg-navy-dark/20 py-0.2 rounded-full px-1.5 font-mono text-[10px]">
                                    {kegmaList.length + prokerList.length}
                                </span>
                            </button>

                            <button
                                type="button"
                                aria-pressed={activeTab === "kegma"}
                                onClick={() => setActiveTab("kegma")}
                                className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-xl px-3 py-2 font-sans text-xs font-semibold transition-all ${
                                    activeTab === "kegma"
                                        ? "bg-azure text-navy-dark shadow-md"
                                        : "text-concrete/80 hover:text-white"
                                }`}
                            >
                                <Sparkles size={14} />
                                <span>KEGMA</span>
                                <span className="bg-navy-dark/20 py-0.2 rounded-full px-1.5 font-mono text-[10px]">
                                    {kegmaList.length}
                                </span>
                            </button>

                            <button
                                type="button"
                                aria-pressed={activeTab === "proker"}
                                onClick={() => setActiveTab("proker")}
                                className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-xl px-3 py-2 font-sans text-xs font-semibold transition-all ${
                                    activeTab === "proker"
                                        ? "bg-azure text-navy-dark shadow-md"
                                        : "text-concrete/80 hover:text-white"
                                }`}
                            >
                                <Briefcase size={14} />
                                <span>PROKER Divisi</span>
                                <span className="bg-navy-dark/20 py-0.2 rounded-full px-1.5 font-mono text-[10px]">
                                    {prokerList.length}
                                </span>
                            </button>
                        </div>

                        {/* Search Input Bar */}
                        <div className="relative w-full md:w-72 lg:w-80">
                            <label
                                htmlFor="search-kegiatan"
                                className="sr-only"
                            >
                                Cari kegiatan atau program kerja
                            </label>
                            <div className="text-concrete/50 pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                                <Search size={15} />
                            </div>
                            <input
                                id="search-kegiatan"
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari agenda, divisi, atau kata kunci..."
                                className="placeholder-concrete/50 focus:border-azure min-h-11 w-full rounded-xl border border-white/10 bg-white/5 py-2 pr-8 pl-9 font-sans text-xs text-white backdrop-blur-md transition-colors focus:bg-white/10 focus:outline-none"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery("")}
                                    className="text-concrete/50 absolute inset-y-0 right-0 flex items-center pr-3 hover:text-white"
                                    aria-label="Bersihkan pencarian"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <p
                role="status"
                className="text-azure mx-auto mt-4 max-w-7xl px-4 text-xs sm:px-6 lg:px-8"
            >
                Menampilkan{" "}
                {(showKegma ? filteredKegma.length : 0) +
                    (showProker ? filteredProker.length : 0)}{" "}
                agenda
            </p>
            {/* Empty Search Result State */}
            {(showKegma ? filteredKegma.length : 0) +
                (showProker ? filteredProker.length : 0) ===
                0 && (
                <div className="mx-auto max-w-xl px-4 py-24 text-center">
                    <div className="text-azure mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/5">
                        <Search size={24} />
                    </div>
                    <h3 className="mt-4 font-serif text-2xl font-bold text-white">
                        Agenda Tidak Ditemukan
                    </h3>
                    <p className="text-concrete/80 mt-2 font-sans text-sm">
                        Tidak ada kegiatan atau program kerja yang cocok dengan
                        kata kunci{" "}
                        <span className="text-azure font-semibold">
                            &ldquo;{searchQuery}&rdquo;
                        </span>
                        .
                    </p>
                    <button
                        type="button"
                        onClick={() => {
                            setSearchQuery("");
                            setActiveTab("all");
                        }}
                        className="border-azure/40 bg-azure/10 text-azure hover:bg-azure hover:text-navy-dark mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full border px-5 py-2 font-sans text-xs font-semibold transition"
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
                    <div className="mb-8 text-center md:mb-10">
                        <div className="border-camel-brown/40 text-pale-taupe inline-flex items-center gap-2 rounded-full border bg-white/5 px-4 py-1.5 font-sans text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">
                            <Sparkles size={14} className="text-camel-brown" />
                            <span>Naungan BEM UMN • SUKMA</span>
                        </div>

                        <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-white drop-shadow sm:text-4xl md:text-5xl">
                            6 Kegiatan Mahasiswa (KEGMA)
                        </h2>
                        <p className="text-concrete/85 mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed sm:text-base">
                            BEM UMN Generasi XVI membina, mengoordinasikan, dan
                            mengawasi enam kegiatan mahasiswa tahunan
                            Universitas Multimedia Nusantara. Pilih kartu
                            kegiatan untuk melihat filosofi, sorotan nilai, dan
                            mengakses portal website resminya.
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
                    className="from-navy-dark/60 via-navy-dark/95 to-navy-dark/60 relative border-t border-white/10 bg-gradient-to-b py-20 backdrop-blur-md"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Section Header */}
                        <div className="mb-8 text-center md:mb-10">
                            <div className="border-camel-brown/40 text-pale-taupe inline-flex items-center gap-2 rounded-full border bg-white/5 px-4 py-1.5 font-sans text-xs font-semibold tracking-wider uppercase">
                                <Briefcase
                                    size={14}
                                    className="text-camel-brown"
                                />
                                <span>
                                    Inisiatif Fungsional Lembaga • 6 Divisi BEM
                                </span>
                            </div>

                            <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-white drop-shadow sm:text-4xl md:text-5xl">
                                Program Kerja (PROKER) BEM UMN Gen XVI
                            </h2>
                            <p className="text-concrete/85 mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed sm:text-base">
                                Rangkaian program kerja yang dirancang dan
                                dieksekusi oleh divisi-divisi BEM UMN untuk
                                melayani mahasiswa, memperkuat tata kelola
                                organisasi, dan mempererat hubungan internal
                                maupun eksternal.
                            </p>
                        </div>

                        {/* Bento Grid Asimetris (6-6, 7-5, 5-7 Kolom) */}
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {filteredProker.map((proker, index) => {
                                return (
                                    <div
                                        data-motion="rise"
                                        key={proker.id}
                                        className="flex flex-col overflow-hidden rounded-3xl border border-white/15 bg-white/[0.04] p-6 sm:p-8"
                                    >
                                        {/* Top Metadata */}
                                        <div>
                                            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-4">
                                                <span className="border-camel-brown/40 bg-camel-brown/15 text-pale-taupe rounded-full border px-3 py-1 font-sans text-[11px] font-semibold">
                                                    {proker.division}
                                                </span>
                                                <span className="text-azure font-sans text-[11px] font-semibold tracking-wider uppercase">
                                                    PRK-0{index + 1}
                                                </span>
                                            </div>

                                            {/* Titles */}
                                            <h3 className="group-hover:text-azure mt-5 font-serif text-2xl font-bold tracking-wide text-white transition-colors sm:text-3xl">
                                                {proker.title}
                                            </h3>
                                            <p className="text-azure/80 mt-1 font-sans text-xs font-semibold tracking-wider uppercase">
                                                {proker.subtitle}
                                            </p>

                                            {/* Description */}
                                            <p className="text-concrete/85 mt-4 font-sans text-sm leading-relaxed">
                                                {proker.fullDescription}
                                            </p>
                                        </div>

                                        {/* Objectives Checklist */}
                                        <div className="mt-8 border-t border-white/10 pt-5">
                                            <p className="text-azure flex items-center gap-1.5 font-sans text-xs font-bold tracking-wider uppercase">
                                                <CheckCircle2
                                                    size={13}
                                                    className="text-azure"
                                                />
                                                <span>
                                                    Tujuan &amp; Fokus
                                                    Pelaksanaan:
                                                </span>
                                            </p>
                                            <ul className="mt-3 space-y-2">
                                                {proker.objectives.map(
                                                    (obj, i) => (
                                                        <li
                                                            key={i}
                                                            className="text-concrete/80 flex items-start gap-2.5 text-xs"
                                                        >
                                                            <span className="bg-azure mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                                                            <span>{obj}</span>
                                                        </li>
                                                    ),
                                                )}
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
                <ContentDialog
                    labelledBy="modal-kegma-title"
                    onClose={() => setSelectedKegma(null)}
                >
                    {/* Modal Window Container */}
                    <div className="flex max-h-[90dvh] flex-col">
                        {/* Modal Header */}
                        <div className="bg-blue-primary/40 relative flex items-center justify-between border-b border-white/10 px-6 py-5 backdrop-blur-md sm:px-8">
                            <div className="flex items-center gap-4">
                                <div className="bg-navy-dark/80 relative h-12 w-12 shrink-0 rounded-xl border border-white/20 p-1.5 shadow-md">
                                    <Image
                                        src={selectedKegma.logo}
                                        alt={`Logo ${selectedKegma.title}`}
                                        fill
                                        className="object-contain p-1"
                                    />
                                </div>
                                <div>
                                    <span className="border-camel-brown/40 bg-camel-brown/15 text-pale-taupe inline-block rounded-full border px-2.5 py-0.5 font-sans text-[10px] font-semibold tracking-wider uppercase">
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
                                className="hover:border-azure flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                                aria-label="Tutup jendela rincian kegiatan"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Scrollable Body */}
                        <div className="space-y-6 overflow-y-auto px-6 py-6 sm:px-8">
                            {/* Full Name & Tagline */}
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="text-azure font-sans text-xs font-semibold tracking-wider uppercase">
                                    Nama Resmi Kegiatan Mahasiswa
                                </p>
                                <h4 className="mt-1 font-serif text-lg font-semibold text-white">
                                    {selectedKegma.fullName}
                                </h4>
                                <p className="text-pale-taupe mt-1 font-sans text-xs italic">
                                    &ldquo;{selectedKegma.tagline}&rdquo;
                                </p>
                            </div>

                            {/* Penjelasan Lengkap */}
                            <div>
                                <h5 className="flex items-center gap-2 font-serif text-base font-semibold text-white">
                                    <ShieldCheck
                                        size={18}
                                        className="text-azure"
                                    />
                                    Tentang Kegiatan
                                </h5>
                                <p className="text-concrete/90 mt-2 font-sans text-sm leading-relaxed">
                                    {selectedKegma.fullDescription}
                                </p>
                            </div>

                            {/* Poin-poin Utama */}
                            <div>
                                <h5 className="flex items-center gap-2 font-serif text-base font-semibold text-white">
                                    <Sparkles
                                        size={18}
                                        className="text-camel-brown"
                                    />
                                    Sorotan &amp; Nilai Utama
                                </h5>
                                <ul className="mt-3 space-y-2">
                                    {selectedKegma.highlights.map(
                                        (point, index) => (
                                            <li
                                                key={index}
                                                className="text-concrete/85 flex items-start gap-2.5 text-xs sm:text-sm"
                                            >
                                                <CheckCircle2
                                                    size={16}
                                                    className="text-azure mt-0.5 shrink-0"
                                                />
                                                <span>{point}</span>
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </div>

                            {/* Informasi Kepengurusan & Naungan */}
                            <div className="bg-navy-dark/60 grid grid-cols-1 gap-3 rounded-2xl border border-white/10 p-4 sm:grid-cols-2">
                                <div className="flex items-center gap-3">
                                    <UserCheck
                                        size={20}
                                        className="text-azure"
                                    />
                                    <div>
                                        <p className="text-concrete/60 font-sans text-[10px] tracking-wider uppercase">
                                            Supervisor BEM
                                        </p>
                                        <p className="font-sans text-xs font-semibold text-white">
                                            {selectedKegma.supervisor}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar
                                        size={20}
                                        className="text-camel-brown"
                                    />
                                    <div>
                                        <p className="text-concrete/60 font-sans text-[10px] tracking-wider uppercase">
                                            Divisi Pengawas
                                        </p>
                                        <p className="text-pale-taupe font-sans text-xs font-semibold">
                                            SUKMA BEM UMN Gen XVI
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Action Footer */}
                        <div className="bg-blue-primary/20 flex flex-col-reverse gap-3 border-t border-white/10 px-6 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-8">
                            <button
                                type="button"
                                onClick={() => setSelectedKegma(null)}
                                className="w-full cursor-pointer rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 font-sans text-xs font-medium text-white transition hover:bg-white/15 sm:w-auto"
                            >
                                Tutup
                            </button>

                            <a
                                href={selectedKegma.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border-azure/40 bg-azure text-navy-dark shadow-azure/20 focus-visible:ring-azure inline-flex w-full items-center justify-center gap-2 rounded-xl border px-6 py-2.5 font-sans text-xs font-bold shadow-lg transition-all hover:scale-105 hover:bg-white focus:outline-none focus-visible:ring-2 sm:w-auto"
                            >
                                <span>Kunjungi Website Resmi</span>
                                <ExternalLink size={15} />
                            </a>
                        </div>
                    </div>
                </ContentDialog>
            )}
        </div>
    );
}
