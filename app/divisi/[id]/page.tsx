import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";
import { DivisionDetailClient } from "@/components/DivisionDetailClient";
import { divisions } from "@/constants/divisionIndex";
import { divisionMembers, DivisionKey } from "@/constants/divisionMembers";
import { ArrowLeft, Building2, ChevronRight } from "lucide-react";


type PageProps = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const divisionId = resolvedParams.id.toUpperCase();
    const division = divisions.find((d) => d.id.toUpperCase() === divisionId);

    if (!division) {
        return {
            title: "Divisi Tidak Ditemukan | BEM UMN GEN XVI",
        };
    }

    return {
        title: `${division.name} - ${division.fullname} | BEM UMN GEN XVI`,
        description: division.description,
    };
}

export default async function DivisionDetailPage({ params }: PageProps) {
    const resolvedParams = await params;
    const divisionId = resolvedParams.id.toUpperCase() as DivisionKey;

    const division = divisions.find((d) => d.id.toUpperCase() === divisionId);
    if (!division || !(divisionId in divisionMembers)) {
        return notFound();
    }

    const members = divisionMembers[divisionId];
    const leader = members[0];
    const otherDivisions = divisions.filter((d) => d.id.toUpperCase() !== divisionId);

    return (
        <div className="relative min-h-screen bg-dark-blue text-white selection:bg-azure selection:text-dark-blue">
            {/* Tekstur Global */}
            <div className="super-bg fixed inset-0 -z-30 scale-125 bg-cover bg-center opacity-40"></div>

            <Navbar />

            <main className="relative z-10 pt-28 pb-16 md:pt-36">
                {/* Breadcrumbs & Navigation */}
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-sans text-azure/80">
                        <Link href="/" className="hover:text-white transition">
                            Beranda
                        </Link>
                        <ChevronRight size={12} />
                        <Link href="/divisi" className="hover:text-white transition">
                            Divisi
                        </Link>
                        <ChevronRight size={12} />
                        <span className="font-semibold text-white">{division.name}</span>
                    </div>

                    <div className="mt-4">
                        <Link
                            href="/divisi"
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 font-sans text-xs font-semibold text-azure transition hover:bg-white/20 hover:text-white"
                        >
                            <ArrowLeft size={14} />
                            <span>Kembali ke Seluruh Divisi</span>
                        </Link>
                    </div>
                </div>

                {/* Hero / Header Divisi */}
                <section className="mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-blue-primary/40 via-dark-blue to-dark-blue p-6 shadow-2xl backdrop-blur-xl sm:p-10">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
                            {/* Teks Informasi Divisi */}
                            <div className="lg:col-span-7">
                                <div className="inline-flex items-center gap-2 rounded-full border border-azure/30 bg-blue-primary/60 px-3.5 py-1 font-sans text-xs font-bold text-cream uppercase">
                                    <Building2 size={13} />
                                    <span>Divisi Resmi BEM UMN Gen XVI</span>
                                </div>

                                <h1 className="mt-4 font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                                    {division.fullname} ({division.name})
                                </h1>

                                <p className="mt-4 font-sans text-sm leading-relaxed text-concrete/90 sm:text-base">
                                    {division.description}
                                </p>

                                <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6 text-xs font-sans">
                                    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2">
                                        <span className="text-azure">Total Anggota:</span>{" "}
                                        <strong className="text-white">{members.length} Orang</strong>
                                    </div>
                                    {leader && (
                                        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2">
                                            <span className="text-azure">{leader.role}:</span>{" "}
                                            <strong className="text-white">{leader.name}</strong>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Foto Grup Representatif */}
                            <div className="lg:col-span-5">
                                <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-white/20 bg-dark-blue/80 shadow-2xl sm:h-72">
                                    <Image
                                        src={division.imageUrl}
                                        alt={`Foto grup ${division.fullname}`}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 420px"
                                        className="object-cover object-center"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/60 via-transparent to-transparent"></div>
                                    <span className="absolute bottom-3 left-3 rounded-full bg-dark-blue/80 px-3 py-1 font-serif text-xs font-bold text-cream backdrop-blur-sm">
                                        {division.name} GEN XVI
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Daftar Anggota Divisi */}
                <section className="mx-auto mt-14 max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div>
                            <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
                                Susunan Anggota ({members.length})
                            </h2>
                            <p className="font-sans text-xs text-azure sm:text-sm">
                                Pengurus yang bertugas di Divisi {division.name} periode 2026. Klik untuk melihat detail profil.
                            </p>
                        </div>
                    </div>

                    <DivisionDetailClient
                        members={members}
                        divisionName={division.fullname}
                    />
                </section>

                {/* Divisi Lainnya */}
                <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6 lg:px-8">
                    <h3 className="font-serif text-xl font-bold text-white">
                        Eksplorasi Divisi Lainnya
                    </h3>
                    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                        {otherDivisions.map((other) => (
                            <Link
                                key={other.id}
                                href={`/divisi/${other.id.toLowerCase()}`}
                                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-300 hover:border-azure/40 hover:bg-white/10"
                            >
                                <span className="font-serif text-sm font-bold text-white group-hover:text-azure transition">
                                    {other.name}
                                </span>
                                <span className="mt-2 text-[11px] font-sans text-concrete/70 line-clamp-1">
                                    {other.fullname}
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
