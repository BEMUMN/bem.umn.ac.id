import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";
import ResponsivePhoto from "@/components/ResponsivePhoto";
import { DivisionDetailClient } from "@/components/DivisionDetailClient";
import { divisions } from "@/constants/divisionIndex";
import { divisionMembers, type DivisionKey } from "@/constants/divisionMembers";

type Props = { params: Promise<{ id: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const id = (await params).id.toUpperCase();
    const division = divisions.find((d) => d.id === id);
    if (!division) return { title: "Divisi Tidak Ditemukan | BEM UMN GEN XVI" };
    return {
        title: `${division.name} - ${division.fullname} | BEM UMN GEN XVI`,
        description: division.description,
        openGraph: {
            title: `${division.fullname} | BEM UMN GEN XVI`,
            description: division.description,
            images: [
                {
                    url: `/images/social/divisi-${id.toLowerCase()}.png`,
                    width: 1200,
                    height: 630,
                },
            ],
        },
    };
}
export default async function DivisionDetailPage({ params }: Props) {
    const id = (await params).id.toUpperCase() as DivisionKey;
    const division = divisions.find((d) => d.id === id);
    if (!division || !(id in divisionMembers)) notFound();
    const members = divisionMembers[id];
    return (
        <>
            <Navbar />
            <main id="main-content" tabIndex={-1}>
                <div className="page-intro container">
                    <div className="breadcrumb">
                        <Link href="/">Beranda</Link>
                        <span aria-hidden="true">/</span>
                        <Link href="/divisi">Divisi</Link>
                        <span aria-hidden="true">/</span>
                        <span>{division.name}</span>
                    </div>
                    <Link className="text-link" href="/divisi">
                        <ArrowLeft size={18} aria-hidden="true" />
                        Kembali ke seluruh divisi
                    </Link>
                    <section className="division-detail-hero mt-8">
                        <div>
                            <h1>{division.fullname}</h1>
                            <p>{division.description}</p>
                            <dl className="about-facts">
                                <div>
                                    <dt>Total anggota</dt>
                                    <dd>{members.length} orang</dd>
                                </div>
                                {members[0] && (
                                    <div>
                                        <dt>{members[0].role}</dt>
                                        <dd>{members[0].name}</dd>
                                    </div>
                                )}
                            </dl>
                            <p className="small mt-6">
                                {division.name} GEN XVI · Periode 2026
                            </p>
                        </div>
                        <div className="division-photo">
                            <ResponsivePhoto
                                name={`divisi-${id === "SULSO" ? "lso" : id.toLowerCase()}`}
                                alt={`Foto grup ${division.fullname}`}
                                width={1446}
                                height={2576}
                                eager
                            />
                        </div>
                    </section>
                </div>
                <section className="section container">
                    <div className="section-head">
                        <h2>Susunan anggota.</h2>
                        <p>
                            Pengurus yang bertugas di Divisi {division.name}{" "}
                            periode 2026. Klik untuk melihat detail profil.
                        </p>
                    </div>
                    <DivisionDetailClient
                        members={members}
                        divisionName={division.fullname}
                    />
                </section>
                <section className="page-body container">
                    <h2>Divisi lainnya.</h2>
                    <div className="directory-links">
                        {divisions
                            .filter((d) => d.id !== id)
                            .map((d) => (
                                <Link
                                    className="directory-link"
                                    key={d.id}
                                    href={`/divisi/${d.id.toLowerCase()}`}
                                >
                                    <strong>{d.name}</strong>
                                    <span>{d.fullname}</span>
                                    <ArrowUpRight
                                        size={20}
                                        aria-hidden="true"
                                    />
                                </Link>
                            ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
