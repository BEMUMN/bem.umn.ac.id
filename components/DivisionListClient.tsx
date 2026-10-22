"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";
import { DivisionCard, DivisionItem } from "@/components/DivisionCard";
import { MemberRoster } from "@/components/MemberRoster";
import { DivisionHeader } from "@/components/DivisionHeader";
import { MemberDetailModal } from "@/components/MemberDetailModal";
import { Member } from "@/constants/divisionMembers";
import { ArrowLeft, Calendar, Layers, Shield } from "lucide-react";

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
    const [activeDivisionId, setActiveDivisionId] = useState<string | null>(
        null,
    );
    const selectedSection = useRef<HTMLElement>(null);
    const divisionOpener = useRef<string | null>(null);
    useEffect(() => {
        if (!activeDivisionId) return;
        selectedSection.current?.focus({ preventScroll: true });
        selectedSection.current?.scrollIntoView({
            block: "start",
            behavior: "instant",
        });
    }, [activeDivisionId]);
    const [selectedMemberModal, setSelectedMemberModal] =
        useState<Member | null>(null);

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
                m.divisionId?.toUpperCase() === activeDivisionId.toUpperCase(),
        );
    }, [activeDivisionId, allMembers]);

    // Buka detail divisi
    const handleSelectDivision = (divisionId: string) => {
        divisionOpener.current = divisionId;
        setActiveDivisionId(divisionId);
    };

    // Kembali ke daftar 6 divisi
    const handleBackToDivisions = () => {
        setActiveDivisionId(null);
        requestAnimationFrame(() =>
            document
                .querySelector<HTMLElement>(
                    `[data-division-id="${divisionOpener.current}"]`,
                )
                ?.focus(),
        );
    };

    return (
        <div className="bg-navy-dark selection:bg-azure selection:text-navy-dark relative min-h-screen text-white">
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
                    <div className="text-azure flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-4 font-sans text-[11px] font-semibold tracking-[0.2em] uppercase">
                        <div className="flex items-center gap-2">
                            <span className="bg-azure inline-block h-2 w-2 animate-pulse rounded-full" />
                            <span>Direktori Struktural • BEM UMN Gen XVI</span>
                        </div>
                        <div className="text-concrete/70 flex items-center gap-4">
                            <span>Tahun Sidang 2026/2027</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="hidden sm:inline">
                                {divisions.length} Divisi • {allMembers.length}{" "}
                                Fungsionaris
                            </span>
                        </div>
                    </div>

                    {/* Headline Spread Asimetris */}
                    <div className="mx-auto mt-8 max-w-4xl text-center">
                        <span className="text-azure inline-block font-sans text-xs font-bold tracking-[0.25em] uppercase sm:text-sm">
                            Struktur &amp; Fungsionaris
                        </span>
                        <h1 className="mt-3 font-serif text-4xl leading-[1.08] font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
                            Enam Pilar Penggerak{" "}
                            <br className="hidden sm:inline" />
                            <span className="text-azure font-serif font-normal italic">
                                Kolaborasi
                            </span>{" "}
                            &amp; Inovasi.
                        </h1>
                        <p className="text-concrete/85 mx-auto mt-5 max-w-2xl font-sans text-sm leading-relaxed sm:text-base">
                            Mengenal jajaran pimpinan eksekutif dan supervisor
                            pengawas yang mendedikasikan dedikasi serta
                            integritas bagi kemajuan seluruh civitas akademika
                            Universitas Multimedia Nusantara.
                        </p>

                        {/* Pilihan Kepengurusan Capsule Selector */}
                        <div className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 p-1.5 backdrop-blur-md">
                            {generations.map((gen) => {
                                const isSelected =
                                    selectedGeneration === gen.id;
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
                                                ? "bg-azure text-navy-dark shadow-azure/25 scale-105 shadow-lg"
                                                : "text-white/80 hover:bg-white/10 hover:text-white"
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
                    <div className="mx-auto mt-14 max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
                        {/* ----------------------------------------------------
                            TIER 1: CORE EXECUTIVE (BPH) — FEATURED ANCHOR
                           ---------------------------------------------------- */}
                        {bphDivision && (
                            <section>
                                <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                                    <div className="text-pale-taupe flex items-center gap-2 font-sans text-xs font-bold tracking-widest uppercase">
                                        <Shield
                                            size={14}
                                            className="text-camel-brown"
                                        />
                                        <span>
                                            Tier 01 • Inti Pimpinan Eksekutif
                                        </span>
                                    </div>
                                    <span className="text-concrete/60 font-sans text-[11px]">
                                        Fokus Kebijakan, Legalitas, &amp;
                                        Finansial
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
                            <div className="mb-8 flex flex-col justify-between gap-2 border-b border-white/10 pb-4 sm:flex-row sm:items-end">
                                <div>
                                    <div className="text-pale-taupe flex items-center gap-2 font-sans text-xs font-bold tracking-widest uppercase">
                                        <Layers
                                            size={14}
                                            className="text-camel-brown"
                                        />
                                        <span>
                                            Tier 02 • Sayap Pengawasan &amp;
                                            Relasi Publik
                                        </span>
                                    </div>
                                    <h2 className="mt-2 font-serif text-2xl font-bold text-white sm:text-3xl">
                                        Lima Pilar Pelaksana Lembaga
                                    </h2>
                                    <p className="text-concrete/75 mt-1 font-sans text-xs sm:text-sm">
                                        Membina seluruh rumpun himpunan, UKM,
                                        LSO, kegiatan mahasiswa, dan diplomasi
                                        publik kampus secara setara.
                                    </p>
                                </div>
                                <span className="border-camel-brown/40 text-pale-taupe self-start rounded-full border bg-white/5 px-3 py-1 font-sans text-xs font-semibold sm:self-auto">
                                    5 Divisi Setara
                                </span>
                            </div>

                            {/* FORMASI HURUF "W" (3 Kartu di Baris Atas, 2 Kartu di Sela-Sela Bawah) */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6 lg:gap-8">
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
                                    <div className="md:col-span-1 lg:col-span-2 lg:col-start-2">
                                        <DivisionCard
                                            division={tier2Divisions[3]}
                                            indexNumber="05"
                                            onSelect={handleSelectDivision}
                                        />
                                    </div>
                                )}

                                {/* Baris Bawah Di Antara Kartu 2 & 3: 06. PR (lg:col-start-4 lg:col-span-2) */}
                                {tier2Divisions[4] && (
                                    <div className="w-full md:col-span-2 md:mx-auto md:max-w-md lg:col-span-2 lg:col-start-4 lg:mx-0 lg:max-w-none">
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
                    <section
                        ref={selectedSection}
                        tabIndex={-1}
                        aria-label="Pengurus divisi terpilih"
                        className="mx-auto mt-10 max-w-6xl px-4 sm:px-6 lg:px-8"
                    >
                        {/* Tombol Back Floating Capsule */}
                        <div className="mb-8">
                            <button
                                type="button"
                                onClick={handleBackToDivisions}
                                className="group border-azure/40 text-azure hover:bg-azure hover:text-navy-dark inline-flex cursor-pointer items-center gap-2 rounded-full border bg-white/10 px-6 py-2.5 font-sans text-xs font-bold shadow-md backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
                            >
                                <ArrowLeft
                                    size={16}
                                    className="transition-transform group-hover:-translate-x-1"
                                />
                                <span>Kembali ke Seluruh Divisi</span>
                            </button>
                        </div>

                        <DivisionHeader
                            division={currentDivision}
                            count={currentDivisionMembers.length}
                            heading="h2"
                        />
                        <div className="mt-10 border-b border-white/10 pb-4">
                            <h2 className="font-serif text-2xl text-white sm:text-3xl">
                                Susunan Anggota
                            </h2>
                            <p className="text-azure mt-1 text-sm">
                                Pilih pengurus untuk melihat profil dan foto
                                lainnya.
                            </p>
                        </div>
                        <MemberRoster
                            key={activeDivisionId}
                            members={currentDivisionMembers}
                            onSelect={setSelectedMemberModal}
                        />
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
