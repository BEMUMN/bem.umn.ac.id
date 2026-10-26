import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DivisionHeader } from "@/components/DivisionHeader";
import Link from "next/link";
import Navbar from "@/layouts/Navbar";
import "../../home-scroll.css";
import { ChapterTabs } from "@/components/ChapterTabs";
import { PageTurn } from "@/components/PageTurn";
import Footer from "@/layouts/Footer";
import { DivisionDetailClient } from "@/components/DivisionDetailClient";
import { divisions } from "@/constants/divisionIndex";
import { divisionMembers, DivisionKey } from "@/constants/divisionMembers";
import { ArrowLeft, ChevronRight } from "lucide-react";

type PageProps = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
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
    const next =
        divisions[
            (divisions.findIndex((d) => d.id.toUpperCase() === divisionId) +
                1) %
                divisions.length
        ];
    const nextKey = next.id.toUpperCase() as DivisionKey;
    const otherDivisions = divisions.filter(
        (d) => d.id.toUpperCase() !== divisionId,
    );

    return (
        <div className="bg-dark-blue selection:bg-azure selection:text-dark-blue relative min-h-screen text-white">
            {/* Tekstur Global */}
            <div className="super-bg fixed inset-0 -z-30 scale-125 bg-cover bg-center opacity-40"></div>

            <Navbar compact />
            <ChapterTabs sub />

            <main className="relative z-10 pt-28 pb-16 md:pt-36">
                {/* Breadcrumbs & Navigation */}
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="text-azure/80 flex flex-wrap items-center gap-2 font-sans text-xs">
                        <Link
                            href="/"
                            className="inline-flex min-h-11 items-center transition hover:text-white"
                        >
                            Beranda
                        </Link>
                        <ChevronRight size={12} />
                        <Link
                            href="/#divisi"
                            className="inline-flex min-h-11 items-center transition hover:text-white"
                        >
                            Divisi
                        </Link>
                        <ChevronRight size={12} />
                        <span className="font-semibold text-white">
                            {division.name}
                        </span>
                    </div>

                    <div className="mt-4">
                        <Link
                            href="/#divisi"
                            className="text-azure inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 font-sans text-xs font-semibold transition hover:bg-white/20 hover:text-white"
                        >
                            <ArrowLeft size={14} />
                            <span>Kembali ke Seluruh Divisi</span>
                        </Link>
                    </div>
                </div>

                {/* Hero / Header Divisi */}
                <section className="mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
                    <DivisionHeader
                        division={division}
                        count={members.length}
                        leader={leader}
                    />
                </section>

                {/* Daftar Anggota Divisi */}
                <section className="mx-auto mt-14 max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div>
                            <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
                                Susunan Anggota ({members.length})
                            </h2>
                            <p className="text-azure font-sans text-xs sm:text-sm">
                                Pengurus yang bertugas di Divisi {division.name}{" "}
                                periode 2026. Klik untuk melihat detail profil.
                            </p>
                        </div>
                    </div>

                    <DivisionDetailClient
                        members={members}
                        divisionName={division.fullname}
                    />
                </section>

                <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6 lg:px-8">
                    <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
                        Eksplorasi Divisi Lainnya
                    </h2>
                    <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                        {otherDivisions.map((other) => (
                            <Link
                                key={other.id}
                                href={`/divisi/${other.id.toLowerCase()}`}
                                className="group hover:border-azure/40 flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:bg-white/10 sm:p-6"
                            >
                                <span className="group-hover:text-azure font-serif text-2xl font-bold text-white transition">
                                    {other.name}
                                </span>
                                <span className="text-concrete/80 mt-3 line-clamp-2 font-sans text-sm leading-5">
                                    {other.fullname}
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>

            {/* The footer scrolls in, then a copy over its last screen pins
                and folds back onto the next division. */}
            <div className="turn-end">
                <Footer />
                <PageTurn
                    // a long pull, so turning to the next division is never by accident
                    span={5}
                    href={`/divisi/${next.id.toLowerCase()}`}
                    label={`Lanjut ke divisi ${next.name}`}
                    sheet={<Footer />}
                    under={
                        <div className="bg-dark-blue relative h-full overflow-hidden pt-28 md:pt-36">
                            <div className="super-bg absolute inset-0 scale-125 bg-cover bg-center opacity-40" />
                            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                                <div className="text-azure/80 flex flex-wrap items-center gap-2 font-sans text-xs">
                                    <span className="inline-flex min-h-11 items-center">
                                        Beranda
                                    </span>
                                    <ChevronRight size={12} />
                                    <span className="inline-flex min-h-11 items-center">
                                        Divisi
                                    </span>
                                    <ChevronRight size={12} />
                                    <span className="font-semibold text-white">
                                        {next.name}
                                    </span>
                                </div>
                                <div className="text-azure mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 font-sans text-xs font-semibold">
                                    <ArrowLeft size={14} />
                                    <span>Kembali ke Seluruh Divisi</span>
                                </div>
                                <div className="mt-8">
                                    <DivisionHeader
                                        division={next}
                                        count={divisionMembers[nextKey].length}
                                        leader={divisionMembers[nextKey][0]}
                                    />
                                </div>
                            </div>
                        </div>
                    }
                />
            </div>
        </div>
    );
}
