import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";
import KegiatanClient from "@/components/KegiatanClient";
import { kegmaList, prokerList } from "@/constants/workIndex";

export const metadata: Metadata = {
    title: "Kegiatan & Program Kerja | BEM UMN GEN XVI",
    description: "Eksplorasi 6 Kegiatan Mahasiswa (KEGMA) di bawah naungan BEM UMN dan rangkaian Program Kerja BEM UMN Generasi XVI 'Inclusive for Innovation'.",
    openGraph: { title: "Kegiatan & Program Kerja | BEM UMN GEN XVI", images: [{ url: "/images/social/kegiatan.png", width: 1200, height: 630 }] },
};
export default function KegiatanPage() {
    return <><Navbar /><main id="main-content" tabIndex={-1}><div className="container page-intro"><div className="breadcrumb"><Link href="/">Beranda</Link><span aria-hidden="true">/</span><span>Kegiatan</span></div><div className="page-intro-row"><div><h1>Kegiatan &amp;<br />program kerja.</h1><p>Arsip Agenda &amp; Portofolio Karya · BEM UMN Gen XVI<br />Tahun Sidang 2026/2027</p></div><div className="stack"><p>Mewadahi antusiasme, kreativitas, dan inovasi civitas akademika UMN. Dari perhelatan akbar 6 Kegiatan Mahasiswa hingga inisiatif program kerja internal yang berdampak nyata bagi seluruh mahasiswa.</p><div className="actions"><a className="text-link" href="#kegma-section">Kegiatan mahasiswa <ArrowDown size={16} aria-hidden="true" /></a><a className="text-link" href="#proker-section">Program kerja <ArrowDown size={16} aria-hidden="true" /></a></div></div></div></div><KegiatanClient kegmaList={kegmaList} prokerList={prokerList} /><section className="container page-body"><div className="cta-panel"><div><h2>Ingin Berkolaborasi Bersama BEM UMN?</h2><p>Kenali seluruh struktur fungsionaris di balik setiap divisi dan program kerja, serta mari ciptakan dampak positif bersama bagi Universitas Multimedia Nusantara.</p></div><div className="stack"><Link className="button" href="/divisi">Buka direktori divisi BEM <ArrowUpRight size={18} aria-hidden="true" /></Link><Link className="text-link" href="/tentang-kami">Pelajari profil BEM Gen XVI <ArrowUpRight size={18} aria-hidden="true" /></Link></div></div></section></main><Footer /></>;
}
