"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
    ExternalLink,
    X,
    Sparkles,
    CheckCircle2,
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
                className="bg-navy-dark/85 relative z-30 border-y border-white/10 py-4 transition-all"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        {/* Segmented Filter Buttons */}
                        <div
                            role="group"
                            aria-label="Kategori Kegiatan & Program Kerja"
                            className="inline-flex flex-wrap gap-1 rounded-2xl border border-white/10 bg-white/5 p-1"
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
                                className="placeholder-concrete/50 focus:border-azure min-h-11 w-full rounded-xl border border-white/10 bg-white/5 py-2 pr-8 pl-9 font-sans text-xs text-white transition-colors focus:bg-white/10 focus:outline-none"
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
                        <div className="border-camel-brown/40 text-pale-taupe inline-flex items-center gap-2 rounded-full border bg-white/5 px-4 py-1.5 font-sans text-xs font-semibold tracking-wider uppercase">
                            <Sparkles size={14} className="text-camel-brown" />
                            <span>Naungan BEM UMN • SUKMA</span>
                        </div>

                        <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
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
                    className="relative border-t border-white/10 py-20"
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

                            <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
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
                    wide
                    labelledBy="modal-kegma-title"
                    onClose={() => setSelectedKegma(null)}
                >
                    <div className="relative flex max-h-[90dvh] flex-col md:flex-row">
                        <button
                            type="button"
                            onClick={() => setSelectedKegma(null)}
                            className="hover:border-azure absolute top-4 right-4 z-20 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-[#0a1530]/80 text-white/90 transition-colors hover:bg-white/20 hover:text-white"
                            aria-label="Tutup jendela rincian kegiatan"
                        >
                            <X size={20} />
                        </button>

                        {/* Panel identitas */}
                        <div className="relative flex shrink-0 flex-col justify-end overflow-hidden bg-[#0a1530] p-6 pt-20 sm:p-8 sm:pt-24 md:w-[22rem] md:pt-8">
                            <Image
                                src={selectedKegma.image}
                                alt=""
                                fill
                                sizes="360px"
                                className="object-cover opacity-30"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1530] via-[#0a1530]/80 to-[#0a1530]/40" />
                            <div className="relative z-10 flex flex-row items-center gap-5 md:flex-col md:items-start md:gap-0">
                                <div className="relative h-24 w-24 shrink-0 md:h-40 md:w-40">
                                    <Image
                                        src={selectedKegma.logo}
                                        alt={`Logo ${selectedKegma.title}`}
                                        fill
                                        sizes="160px"
                                        className="object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
                                    />
                                </div>
                                <div className="md:mt-8">
                                    <span className="border-camel-brown/50 text-pale-taupe inline-block rounded-full border px-3 py-1 font-sans text-[10px] font-semibold tracking-wider uppercase">
                                        {selectedKegma.category}
                                    </span>
                                    <h3
                                        id="modal-kegma-title"
                                        className="mt-3 font-serif text-3xl leading-tight text-white sm:text-4xl"
                                    >
                                        {selectedKegma.title}
                                    </h3>
                                    <p className="text-pale-taupe mt-2 font-serif text-sm italic md:text-base">
                                        &ldquo;{selectedKegma.tagline}&rdquo;
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Panel isi */}
                        <div className="flex min-h-0 flex-1 flex-col">
                            <div className="flex-1 space-y-8 overflow-y-auto p-6 sm:p-8">
                                <div>
                                    <p className="text-azure font-sans text-[11px] font-semibold tracking-[0.18em] uppercase">
                                        Nama resmi
                                    </p>
                                    <h4 className="mt-2 font-serif text-xl text-white sm:text-2xl">
                                        {selectedKegma.fullName}
                                    </h4>
                                </div>

                                <div>
                                    <p className="text-azure font-sans text-[11px] font-semibold tracking-[0.18em] uppercase">
                                        Tentang kegiatan
                                    </p>
                                    <p className="text-concrete/90 mt-3 font-sans text-sm leading-7 sm:text-[15px]">
                                        {selectedKegma.fullDescription}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-azure font-sans text-[11px] font-semibold tracking-[0.18em] uppercase">
                                        Sorotan &amp; nilai utama
                                    </p>
                                    <ol className="mt-3 divide-y divide-white/10 border-y border-white/10">
                                        {selectedKegma.highlights.map(
                                            (point, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-start gap-4 py-3.5"
                                                >
                                                    <span className="text-camel-brown font-serif text-lg leading-6">
                                                        {String(
                                                            index + 1,
                                                        ).padStart(2, "0")}
                                                    </span>
                                                    <span className="text-concrete/90 font-sans text-sm leading-6">
                                                        {point}
                                                    </span>
                                                </li>
                                            ),
                                        )}
                                    </ol>
                                </div>

                                <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div>
                                        <dt className="text-concrete/60 font-sans text-[10px] tracking-wider uppercase">
                                            Supervisor BEM
                                        </dt>
                                        <dd className="mt-1 font-sans text-sm font-semibold text-white">
                                            {selectedKegma.supervisor}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-concrete/60 font-sans text-[10px] tracking-wider uppercase">
                                            Divisi pengawas
                                        </dt>
                                        <dd className="text-pale-taupe mt-1 font-sans text-sm font-semibold">
                                            SUKMA BEM UMN Gen XVI
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="border-t border-white/10 bg-[#0a1530] p-4 sm:px-8">
                                <a
                                    href={selectedKegma.websiteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-pale-taupe text-navy-dark focus-visible:ring-azure inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 font-sans text-sm font-bold transition hover:bg-white focus:outline-none focus-visible:ring-2 active:scale-95 sm:w-auto"
                                >
                                    <span>Kunjungi website resmi</span>
                                    <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>
                    </div>
                </ContentDialog>
            )}
        </div>
    );
}
