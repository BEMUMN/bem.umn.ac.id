"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import {
    X,
    User as UserIcon,
    Instagram,
    Linkedin,
    Mail,
    ExternalLink,
    Quote,
    GraduationCap,
    Hash,
    Briefcase,
    Building2,
} from "lucide-react";
import type { Member } from "@/constants/divisionMembers";

interface MemberDetailModalProps {
    member: Member | null;
    onClose: () => void;
    divisionName?: string;
}

export const MemberDetailModal: React.FC<MemberDetailModalProps> = ({
    member,
    onClose,
    divisionName,
}) => {
    // Keyboard accessibility: ESC to close
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        },
        [onClose],
    );

    useEffect(() => {
        if (member) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [member, handleKeyDown]);

    if (!member) return null;

    const instagramUrl = member.instagram
        ? member.instagram.startsWith("http")
            ? member.instagram
            : `https://instagram.com/${member.instagram.replace("@", "")}`
        : null;

    const linkedinUrl = member.linkedin
        ? member.linkedin.startsWith("http")
            ? member.linkedin
            : `https://linkedin.com/in/${member.linkedin}`
        : null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-member-name"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200"
        >
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal Dialog Window */}
            <div
                className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-azure/40 bg-navy-dark shadow-2xl transition-all duration-300 animate-in zoom-in-95"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header Bar */}
                <div className="relative flex items-center justify-between border-b border-white/10 bg-blue-primary/40 px-6 py-4 backdrop-blur-md sm:px-8">
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-azure/30 bg-azure/10 px-3 py-1 font-sans text-xs font-semibold tracking-wide text-azure uppercase">
                            <Building2 size={13} />
                            <span>{divisionName || member.divisionId || "BEM UMN Gen XVI"}</span>
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full border border-white/20 bg-white/10 p-2 text-white/80 transition-colors hover:border-azure hover:bg-white/20 hover:text-white"
                        aria-label="Tutup jendela rincian pengurus"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Modal Body: 2 Kolom (Foto di Kiri, Data List di Kanan) */}
                <div className="overflow-y-auto p-6 sm:p-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start">
                        {/* SISI KIRI: Foto Pengurus */}
                        <div className="flex flex-col items-center md:col-span-5">
                            <div className="relative aspect-[3/4] w-full max-w-[240px] overflow-hidden rounded-2xl border-2 border-azure/40 bg-dark-blue shadow-xl ring-4 ring-white/5 sm:max-w-[260px]">
                                {member.imageUrl ? (
                                    <Image
                                        src={member.imageUrl}
                                        alt={`Foto profil ${member.name}`}
                                        fill
                                        sizes="(max-width: 768px) 240px, 280px"
                                        className="object-cover object-center"
                                        priority
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-blue-primary/30 text-azure">
                                        <UserIcon size={64} />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                <div className="absolute bottom-3 inset-x-3 text-center">
                                    <span className="rounded-full bg-dark-blue/90 px-3 py-1 font-sans text-[11px] font-semibold text-azure backdrop-blur-md border border-azure/30">
                                        Fungsionaris Aktif
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* SISI KANAN: Data List ke Bawah */}
                        <div className="flex flex-col md:col-span-7">
                            {/* Nama Pengurus & Jabatan */}
                            <div>
                                <h3
                                    id="modal-member-name"
                                    className="font-serif text-2xl font-bold tracking-tight text-white sm:text-3xl"
                                >
                                    {member.name}
                                </h3>
                                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-azure/40 bg-blue-primary/60 px-3.5 py-1 font-sans text-xs font-semibold text-cream">
                                    <Briefcase size={13} />
                                    <span>{member.role}</span>
                                </div>
                            </div>

                            {/* List Informasi Vertikal */}
                            <div className="mt-6 flex flex-col gap-3 font-sans text-xs sm:text-sm">
                                {/* NIM */}
                                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-2.5">
                                    <span className="flex items-center gap-2 text-azure/80">
                                        <Hash size={15} className="text-azure shrink-0" />
                                        NIM:
                                    </span>
                                    <span className="font-semibold text-white">
                                        {member.nim || "Tersedia secara internal"}
                                    </span>
                                </div>

                                {/* Program Studi / Jurusan */}
                                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-2.5">
                                    <span className="flex items-center gap-2 text-azure/80">
                                        <GraduationCap size={15} className="text-azure shrink-0" />
                                        Program Studi:
                                    </span>
                                    <span className="font-semibold text-white text-right">
                                        {member.major || "Universitas Multimedia Nusantara"}
                                    </span>
                                </div>

                                {/* Jabatan */}
                                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-2.5">
                                    <span className="flex items-center gap-2 text-azure/80">
                                        <Briefcase size={15} className="text-azure shrink-0" />
                                        Jabatan:
                                    </span>
                                    <span className="font-semibold text-white">
                                        {member.role}
                                    </span>
                                </div>

                                {/* Quotes / Pesan-pesan */}
                                <div className="mt-1 rounded-2xl border border-white/10 bg-navy-dark/90 p-4">
                                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-azure">
                                        <Quote size={14} className="text-azure" />
                                        <span>Quotes &amp; Pesan</span>
                                    </div>
                                    <p className="mt-2 font-serif text-sm italic leading-relaxed text-concrete/90 sm:text-base">
                                        &ldquo;{member.quote || "Melayani dengan integritas, berinovasi untuk kemajuan bersama civitas akademika UMN."}&rdquo;
                                    </p>
                                </div>
                            </div>

                            {/* List Link Media Sosial (Vertikal ke Bawah) */}
                            <div className="mt-6 border-t border-white/10 pt-4">
                                <p className="font-sans text-xs font-semibold uppercase tracking-wider text-azure">
                                    Tautan &amp; Media Sosial:
                                </p>

                                <div className="mt-3 flex flex-col gap-2.5">
                                    {/* Link Instagram */}
                                    {instagramUrl ? (
                                        <a
                                            href={instagramUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 font-sans text-xs text-white transition-all hover:border-azure/50 hover:bg-white/15 hover:text-azure"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-pink-500/20 text-pink-400 group-hover:scale-105 transition-transform">
                                                    <Instagram size={16} />
                                                </div>
                                                <span className="font-medium">
                                                    {member.instagram?.startsWith("@") ? member.instagram : `@${member.instagram || member.name.toLowerCase().replace(/\s+/g, '')}`}
                                                </span>
                                            </div>
                                            <ExternalLink size={14} className="text-azure/60 group-hover:text-azure" />
                                        </a>
                                    ) : (
                                        <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-2.5 font-sans text-xs text-concrete/50">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-concrete/40">
                                                    <Instagram size={16} />
                                                </div>
                                                <span>Instagram (Belum dicantumkan)</span>
                                            </div>
                                            <span className="text-[10px] text-concrete/40">Privat</span>
                                        </div>
                                    )}

                                    {/* Link LinkedIn */}
                                    {linkedinUrl ? (
                                        <a
                                            href={linkedinUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 font-sans text-xs text-white transition-all hover:border-azure/50 hover:bg-white/15 hover:text-azure"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 group-hover:scale-105 transition-transform">
                                                    <Linkedin size={16} />
                                                </div>
                                                <span className="font-medium">
                                                    LinkedIn Profil
                                                </span>
                                            </div>
                                            <ExternalLink size={14} className="text-azure/60 group-hover:text-azure" />
                                        </a>
                                    ) : (
                                        <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-2.5 font-sans text-xs text-concrete/50">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-concrete/40">
                                                    <Linkedin size={16} />
                                                </div>
                                                <span>LinkedIn (Belum dicantumkan)</span>
                                            </div>
                                            <span className="text-[10px] text-concrete/40">Privat</span>
                                        </div>
                                    )}

                                    {/* Link Email jika ada */}
                                    {member.email && (
                                        <a
                                            href={`mailto:${member.email}`}
                                            className="group flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 font-sans text-xs text-white transition-all hover:border-azure/50 hover:bg-white/15 hover:text-azure"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 group-hover:scale-105 transition-transform">
                                                    <Mail size={16} />
                                                </div>
                                                <span className="font-medium">{member.email}</span>
                                            </div>
                                            <ExternalLink size={14} className="text-azure/60 group-hover:text-azure" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Footer Bar */}
                <div className="flex justify-end border-t border-white/10 bg-blue-primary/20 px-6 py-4 sm:px-8">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl border border-white/20 bg-white/10 px-6 py-2.5 font-sans text-xs font-semibold text-white transition hover:bg-white/20"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
};
