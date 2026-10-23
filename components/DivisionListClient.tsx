"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";
import { DivisionCard, DivisionItem } from "@/components/DivisionCard";
import { MemberRoster } from "@/components/MemberRoster";
import { DivisionHeader } from "@/components/DivisionHeader";
import { MemberDetailModal } from "@/components/MemberDetailModal";
import { Member } from "@/constants/divisionMembers";
import { ArrowLeft, Calendar } from "lucide-react";

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
                <section
                    data-motion="rise"
                    className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
                >
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
                    <section
                        className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8"
                        aria-label="Daftar divisi BEM UMN"
                    >
                        <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-white/10 pb-4">
                            <h2 className="font-serif text-2xl text-white sm:text-3xl">
                                Kenali Divisi Kami
                            </h2>
                            <p className="text-azure text-xs">
                                Pilih foto untuk memperbesar, atau buka daftar
                                pengurus.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
                            {[bphDivision, ...tier2Divisions]
                                .filter((division): division is DivisionItem =>
                                    Boolean(division),
                                )
                                .map((division, index) => (
                                    <DivisionCard
                                        key={division.id}
                                        division={division}
                                        variant={
                                            index === 0
                                                ? "featured"
                                                : "standard"
                                        }
                                        indexNumber={String(index + 1).padStart(
                                            2,
                                            "0",
                                        )}
                                        clusterBadge={
                                            index === 0
                                                ? "Inti Pimpinan Eksekutif"
                                                : undefined
                                        }
                                        onSelect={handleSelectDivision}
                                    />
                                ))}
                        </div>
                    </section>
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
