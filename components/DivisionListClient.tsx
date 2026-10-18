"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";
import { DivisionCard, DivisionItem } from "@/components/DivisionCard";
import { MemberCard } from "@/components/MemberCard";
import { MemberDetailModal } from "@/components/MemberDetailModal";
import { Member } from "@/constants/divisionMembers";
import Image from "next/image";
import {
    Search,
    ArrowLeft,
    Calendar,
    Building2,
    X,
    Layers,
    Shield,
} from "lucide-react";

type DivisionListPageProps = {
    divisions: DivisionItem[];
    allMembers: Array<Member & { divisionName?: string }>;
};

const generations = [
    {
        id: "gen-16",
        name: "Gen XVI",
        fullName: "Generasi XVI (2026/2027)",
        tagline: "Inclusive for Innovation",
        isActive: true,
    },
];

export const DivisionListClient = ({
    divisions,
    allMembers,
}: DivisionListPageProps) => {
    const [selectedGeneration, setSelectedGeneration] = useState("gen-16");
    const [activeDivisionId, setActiveDivisionId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMemberModal, setSelectedMemberModal] = useState<Member | null>(null);

    // Pisahkan BPH (Tier 1 Core Executive) dan 5 Divisi Operasional (Tier 2 W Formation)
    const bphDivision = useMemo(() => {
        return divisions.find((d) => d.id.toUpperCase() === "BPH");
    }, [divisions]);

    const tier2Divisions = useMemo(() => {
        // Urutan: SUKM, SUFAK, SULSO (baris atas), lalu SUKMA, PR (baris bawah sela-sela W)
        const order = ["SUKM", "SUFAK", "SULSO", "SUKMA", "PR"];
        return order
            .map((id) => divisions.find((d) => d.id.toUpperCase() === id))
            .filter((d): d is DivisionItem => Boolean(d));
    }, [divisions]);

    // Dapatkan data divisi yang sedang aktif jika ada
    const currentDivision = useMemo(() => {
        if (!activeDivisionId) return null;
        return divisions.find(
            (d) => d.id.toUpperCase() === activeDivisionId.toUpperCase(),
        );
    }, [activeDivisionId, divisions]);

    // Dapatkan daftar anggota dari divisi yang aktif
    const currentDivisionMembers = useMemo(() => {
        if (!activeDivisionId) return [];
        return allMembers.filter(
            (m) =>
                m.divisionId?.toUpperCase() ===
                activeDivisionId.toUpperCase(),
        );
    }, [activeDivisionId, allMembers]);

    // Filter anggota divisi berdasarkan query pencarian
    const filteredDivisionMembers = useMemo(() => {
        if (!searchQuery) return currentDivisionMembers;
        return currentDivisionMembers.filter(
            (m) =>
                m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (m.major && m.major.toLowerCase().includes(searchQuery.toLowerCase())),
        );
    }, [currentDivisionMembers, searchQuery]);

    // Buka detail divisi
    const handleSelectDivision = (divisionId: string) => {
        setActiveDivisionId(divisionId);
        setSearchQuery("");
        window.scrollTo({ top: 260, behavior: "smooth" });
    };

    // Kembali ke daftar 6 divisi
    const handleBackToDivisions = () => {
        setActiveDivisionId(null);
        setSearchQuery("");
    };

    return (
        <div className="relative min-h-screen bg-navy-dark text-white selection:bg-azure selection:text-navy-dark">
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

            <main className="relative z-10 pt-28 pb-20 md:pt-36">
                {/* ========================================================
                    HEADER EDITORIAL & STATUS KEPENGURUSAN
                   ======================================================== */}
                <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Swiss Design Micro-Stamp Line */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-4 font-sans text-[11px] font-semibold tracking-[0.2em] text-azure uppercase">
                        <div className="flex items-center gap-2">
                            <span className="inline-block h-2 w-2 rounded-full bg-azure animate-pulse" />
                            <span>Direktori Struktural • BEM UMN Gen XVI</span>
                        </div>
                        <div className="flex items-center gap-4 text-concrete/70">
                            <span>Tahun Sidang 2026/2027</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="hidden sm:inline">6 Divisi • 28 Fungsionaris</span>
                        </div>
                    </div>

                    {/* Headline Spread Asimetris */}
                    <div className="mt-8 text-center max-w-4xl mx-auto">
                        <span className="inline-block font-sans text-xs sm:text-sm font-bold tracking-[0.25em] text-azure uppercase">
                            Struktur &amp; Fungsionaris
                        </span>
                        <h1 className="mt-3 font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                            Enam Pilar Penggerak <br className="hidden sm:inline" />
                            <span className="font-serif italic font-normal text-azure">
                                Kolaborasi
                            </span>{" "}
                            &amp; Inovasi.
                        </h1>
                        <p className="mx-auto mt-5 max-w-2xl font-sans text-sm sm:text-base leading-relaxed text-concrete/85">
                            Mengenal jajaran pimpinan eksekutif dan supervisor pengawas yang
                            mendedikasikan dedikasi serta integritas bagi kemajuan seluruh civitas
                            akademika Universitas Multimedia Nusantara.
                        </p>

                        {/* Pilihan Kepengurusan Capsule Selector */}
                        <div className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 p-1.5 backdrop-blur-md">
                            {generations.map((gen) => {
                                const isSelected = selectedGeneration === gen.id;
                                return (
                                    <button
                                        key={gen.id}
                                        type="button"
                                        onClick={() => {
                                            setSelectedGeneration(gen.id);
                                            setActiveDivisionId(null);
                                        }}
                                        className={`flex items-center gap-2 rounded-full px-6 py-2 font-sans text-xs font-bold tracking-wide transition-all ${
                                            isSelected
                                                ? "bg-azure text-navy-dark shadow-lg shadow-azure/25 scale-105"
                                                : "text-white/80 hover:text-white hover:bg-white/10"
                                        }`}
                                    >
                                        <Calendar size={14} />
                                        <span>{gen.fullName}</span>
                                        {gen.isActive && (
                                            <span className="ml-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                                                Aktif
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ========================================================
                    LEVEL 1: TAMPILAN 6 DIVISI (TIER 1 BPH & TIER 2 W-FORMATION)
                   ======================================================== */}
                {!activeDivisionId && (
                    <div className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
                        {/* ----------------------------------------------------
                            TIER 1: CORE EXECUTIVE (BPH) — FEATURED ANCHOR
                           ---------------------------------------------------- */}
                        {bphDivision && (
                            <section>
                                <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                                    <div className="flex items-center gap-2 font-sans text-xs font-bold tracking-widest text-azure uppercase">
                                        <Shield size={14} className="text-azure" />
                                        <span>Tier 01 • Inti Pimpinan Eksekutif</span>
                                    </div>
                                    <span className="font-sans text-[11px] text-concrete/60">
                                        Fokus Kebijakan, Legalitas, &amp; Finansial
                                    </span>
                                </div>

                                <DivisionCard
                                    division={bphDivision}
                                    variant="featured"
                                    onSelect={handleSelectDivision}
                                    clusterBadge="Pimpinan Tertinggi Eksekutif"
                                />
                            </section>
                        )}

                        {/* ----------------------------------------------------
                            TIER 2: SAYAP OPERASIONAL & PENGAWASAN (W-FORMATION)
                           ---------------------------------------------------- */}
                        <section>
                            <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-4 gap-2">
                                <div>
                                    <div className="flex items-center gap-2 font-sans text-xs font-bold tracking-widest text-azure uppercase">
                                        <Layers size={14} className="text-azure" />
                                        <span>Tier 02 • Sayap Pengawasan &amp; Relasi Publik</span>
                                    </div>
                                    <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-white">
                                        Lima Pilar Pelaksana Lembaga
                                    </h2>
                                    <p className="mt-1 font-sans text-xs sm:text-sm text-concrete/75">
                                        Membina seluruh rumpun himpunan, UKM, LSO, kegiatan mahasiswa, dan diplomasi publik kampus secara setara.
                                    </p>
                                </div>
                                <span className="rounded-full border border-azure/30 bg-blue-primary/40 px-3 py-1 font-sans text-xs font-semibold text-azure self-start sm:self-auto">
                                    5 Divisi Setara
                                </span>
                            </div>

                            {/* FORMASI HURUF "W" (3 Kartu di Baris Atas, 2 Kartu di Sela-Sela Bawah) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8">
                                {/* Baris Atas Kolom 1-2: 02. SUKM */}
                                {tier2Divisions[0] && (
                                    <div className="md:col-span-1 lg:col-span-2">
                                        <DivisionCard
                                            division={tier2Divisions[0]}
                                            indexNumber="02"
                                            onSelect={handleSelectDivision}
                                        />
                                    </div>
                                )}

                                {/* Baris Atas Kolom 3-4: 03. SUFAK */}
                                {tier2Divisions[1] && (
                                    <div className="md:col-span-1 lg:col-span-2">
                                        <DivisionCard
                                            division={tier2Divisions[1]}
                                            indexNumber="03"
                                            onSelect={handleSelectDivision}
                                        />
                                    </div>
                                )}

                                {/* Baris Atas Kolom 5-6: 04. SULSO */}
                                {tier2Divisions[2] && (
                                    <div className="md:col-span-1 lg:col-span-2">
                                        <DivisionCard
                                            division={tier2Divisions[2]}
                                            indexNumber="04"
                                            onSelect={handleSelectDivision}
                                        />
                                    </div>
                                )}

                                {/* Baris Bawah Di Antara Kartu 1 & 2: 05. SUKMA (lg:col-start-2 lg:col-span-2) */}
                                {tier2Divisions[3] && (
                                    <div className="md:col-span-1 lg:col-start-2 lg:col-span-2">
                                        <DivisionCard
                                            division={tier2Divisions[3]}
                                            indexNumber="05"
                                            onSelect={handleSelectDivision}
                                        />
                                    </div>
                                )}

                                {/* Baris Bawah Di Antara Kartu 2 & 3: 06. PR (lg:col-start-4 lg:col-span-2) */}
                                {tier2Divisions[4] && (
                                    <div className="md:col-span-2 md:max-w-md md:mx-auto lg:max-w-none lg:mx-0 lg:col-start-4 lg:col-span-2 w-full">
                                        <DivisionCard
                                            division={tier2Divisions[4]}
                                            indexNumber="06"
                                            onSelect={handleSelectDivision}
                                        />
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                )}

                {/* ========================================================
                    LEVEL 2: DIREKTORI PENGURUS SESUAI DIVISI YANG DIPILIH
                   ======================================================== */}
                {activeDivisionId && currentDivision && (
                    <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300">
                        {/* Tombol Back Floating Capsule */}
                        <div className="mb-8">
                            <button
                                type="button"
                                onClick={handleBackToDivisions}
                                className="group inline-flex items-center gap-2 rounded-full border border-azure/40 bg-white/10 px-6 py-2.5 font-sans text-xs font-bold text-azure shadow-md backdrop-blur-sm transition-all hover:bg-azure hover:text-navy-dark hover:scale-105 active:scale-95 cursor-pointer"
                            >
                                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                                <span>← Kembali ke Indeks 6 Divisi</span>
                            </button>
                        </div>

                        {/* Divisi Header Info Cover Banner (Split-Screen) */}
                        <div className="relative overflow-hidden rounded-3xl border border-azure/30 bg-gradient-to-br from-blue-primary/40 via-navy-dark/95 to-navy-dark p-6 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-xl">
                            {/* Watermark Supergrafik Background */}
                            <div className="pointer-events-none absolute -right-12 -bottom-12 opacity-15">
                                <Image
                                    src="/svgs/COLLABORATIVE_supergrafik_1.svg"
                                    alt="Supergrafik Dekoratif"
                                    width={240}
                                    height={240}
                                />
                            </div>

                            <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
                                {/* Visual Foto Grup Divisi */}
                                <div className="relative h-60 sm:h-72 w-full overflow-hidden rounded-2xl border border-white/15 bg-navy-dark lg:col-span-5 shadow-inner">
                                    <Image
                                        src={currentDivision.imageUrl}
                                        alt={`Foto grup ${currentDivision.fullname}`}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 450px"
                                        className="object-cover object-center"
                                        priority
                                    />
                                    <div className="absolute top-3 left-3 rounded-full bg-dark-blue/90 px-3 py-1 font-serif text-xs font-bold text-azure backdrop-blur-md border border-white/10">
                                        {currentDivision.name}
                                    </div>
                                </div>

                                {/* Deskripsi Rinci Divisi */}
                                <div className="flex flex-col justify-between h-full lg:col-span-7">
                                    <div>
                                        <div className="inline-flex items-center gap-2 rounded-full border border-azure/30 bg-blue-primary/60 px-3.5 py-1 font-sans text-xs font-bold text-cream uppercase">
                                            <Building2 size={13} />
                                            <span>Direktori Fungsionaris Resmi</span>
                                        </div>

                                        <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
                                            {currentDivision.fullname} ({currentDivision.name})
                                        </h2>

                                        <p className="mt-3 font-sans text-sm sm:text-base leading-relaxed text-concrete/90">
                                            {currentDivision.description}
                                        </p>
                                    </div>

                                    <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-white/10 pt-5">
                                        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5">
                                            <span className="font-sans text-[10px] text-azure uppercase tracking-wider block">
                                                Total Pengurus
                                            </span>
                                            <span className="font-serif text-xl font-bold text-white">
                                                {currentDivisionMembers.length} Fungsionaris
                                            </span>
                                        </div>
                                        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5">
                                            <span className="font-sans text-[10px] text-azure uppercase tracking-wider block">
                                                Status Kepengurusan
                                            </span>
                                            <span className="font-serif text-sm font-bold text-azure">
                                                Kabinet Gen XVI (Aktif)
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Search Bar Fungsionaris Divisi */}
                        <div className="mt-8 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                            <div className="relative flex-1">
                                <Search
                                    size={18}
                                    className="absolute top-1/2 left-3.5 -translate-y-1/2 text-azure/70"
                                />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={`Cari nama, jabatan, atau jurusan di divisi ${currentDivision.name}...`}
                                    className="w-full rounded-xl border border-white/10 bg-navy-dark/90 py-2.5 pr-10 pl-10 font-sans text-sm text-white placeholder-azure/50 transition focus:border-azure focus:outline-none focus:ring-1 focus:ring-azure"
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchQuery("")}
                                        className="absolute top-1/2 right-3 -translate-y-1/2 text-azure/70 hover:text-white"
                                        aria-label="Bersihkan pencarian"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>

                            <span className="hidden sm:inline font-sans text-xs text-azure/80 font-medium">
                                Menampilkan {filteredDivisionMembers.length} dari {currentDivisionMembers.length} pengurus
                            </span>
                        </div>

                        {/* Roster Kartu Pengurus */}
                        {filteredDivisionMembers.length > 0 ? (
                            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {filteredDivisionMembers.map((member) => (
                                    <MemberCard
                                        key={member.name}
                                        member={member}
                                        onSelect={(m) => setSelectedMemberModal(m)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur-md">
                                <p className="font-serif text-xl font-bold text-white">
                                    Tidak ada pengurus yang ditemukan
                                </p>
                                <p className="mt-2 font-sans text-sm text-concrete/70">
                                    Coba ubah kata kunci pencarian Anda untuk &ldquo;{searchQuery}&rdquo;.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery("")}
                                    className="mt-4 rounded-full border border-azure/40 bg-azure/10 px-5 py-2 font-sans text-xs font-semibold text-azure transition hover:bg-azure hover:text-navy-dark"
                                >
                                    Reset Pencarian
                                </button>
                            </div>
                        )}
                    </section>
                )}
            </main>

            {/* Modal Detail Pengurus 2 Kolom (Sisi Kiri Foto, Sisi Kanan Data Vertikal & Sosmed) */}
            <MemberDetailModal
                member={selectedMemberModal}
                onClose={() => setSelectedMemberModal(null)}
                divisionName={currentDivision?.fullname}
            />

            <Footer />
        </div>
    );
};
