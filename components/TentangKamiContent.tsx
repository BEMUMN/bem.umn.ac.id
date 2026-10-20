import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";
import { divisions } from "@/constants/divisionIndex";

const missionList = [
    {
        no: "01",
        title: "Kolaborasi Internal yang Inklusif",
        desc: "Menciptakan iklim internal organisasi yang kolaboratif dengan senantiasa menjunjung tinggi nilai inklusivitas, integritas, dan standar profesionalitas kerja.",
        badge: "Inklusivitas & Soliditas",
        focus: "Budaya Kerja & Sinergi Internal",
    },
    {
        no: "02",
        title: "Komunikasi Terbuka Antarorganisator",
        desc: "Membangun dan mempererat sinergi harmonis antara BEM UMN dengan seluruh entitas himpunan, UKM, serta LSO melalui saluran komunikasi yang transparan dan setara.",
        badge: "Sinergi Multipihak",
        focus: "Harmonisasi Lintas Ormawa",
    },
    {
        no: "03",
        title: "Pengembangan Potensi & Inovasi Mahasiswa",
        desc: "Mendukung akselerasi gagasan solutif dan potensi karya mahasiswa UMN melalui inisiatif program kerja yang relevan, berdaya guna, dan berdampak nyata bagi kampus.",
        badge: "Inovasi Berdampak",
        focus: "Akselerasi Karya & Prestasi",
    },
];

const pillars = [
    {
        title: "SOLID",
        meaning:
            "Berlandaskan komitmen dan integritas yang kokoh serta dapat diandalkan dalam menavigasi dinamika organisasi kemahasiswaan.",
        symbolism:
            "Kombinasi bentuk persegi yang konsisten dan saling menopang di berbagai sudut pandang — merefleksikan kekuatan struktural yang stabil dan pantang goyah.",
        supergraphic: "/svgs/SOLID_supergrafik_4.svg",
        tag: "Komitmen & Integritas",
    },
    {
        title: "INNOVATIVE",
        meaning:
            "Solusi-solusi besar lahir dari gagasan kreatif yang disatukan dengan tujuan mulia untuk kemajuan civitas akademika UMN.",
        symbolism:
            "Setengah lingkaran yang bersatu membentuk komposisi geometris utuh — melambangkan gagasan kecil yang berkumpul menjadi dampak besar.",
        supergraphic: "/svgs/INNOVATIVE_supergrafik_3.svg",
        tag: "Gagasan Solutif",
    },
    {
        title: "COLLABORATIVE",
        meaning:
            "Perbedaan karakter, pola pikir, dan keahlian bukanlah batasan, melainkan elemen yang saling melengkapi demi mencapai tujuan bersama.",
        symbolism:
            "Harmoni kurva lengkung dan sudut tegas yang merefleksikan sinergi lintas karakter di lingkungan kampus Universitas Multimedia Nusantara.",
        supergraphic: "/svgs/COLLABORATIVE_supergrafik_1.svg",
        tag: "Sinergi Multikarakter",
    },
    {
        title: "INCLUSIVE",
        meaning:
            "Menjunjung tinggi kesetaraan dan keterbukaan bagi setiap aspirasi mahasiswa UMN untuk tumbuh, bersuara, dan berdaya bersama.",
        symbolism:
            "Pancaran empat titik kilau yang berakar dari satu pusat yang seimbang — melambangkan harmoni keberagaman dalam satu arah gerak.",
        supergraphic: "/svgs/INCLUSIVE_supergrafik_2.svg",
        tag: "Kesetaraan & Keterbukaan",
    },
];

const colors = [
    { name: "Dark Navy", hex: "#0F1E3F", token: "navy" },
    { name: "Blue Primary", hex: "#2F486D", token: "blue" },
    { name: "Azure Blue", hex: "#B3C3D1", token: "azure" },
    { name: "Camel Brown", hex: "#997953", token: "camel" },
    { name: "Pale Taupe", hex: "#D2C7B8", token: "taupe" },
];

export default function TentangKamiContent() {
    return <><Navbar /><main id="main-content" tabIndex={-1}>
        <div className="container page-intro">
            <div className="breadcrumb"><Link href="/">Beranda</Link><span aria-hidden="true">/</span><span>Tentang kami</span></div>
            <div className="page-intro-row"><div><h1>Tentang<br />BEM UMN.</h1><p>Mewadahi Gagasan, Menggerakkan Inovasi.</p></div><div className="stack"><p>Badan Eksekutif Mahasiswa Universitas Multimedia Nusantara hadir sebagai wadah pemersatu, pelindung aspirasi, dan inkubator inovasi yang berakar pada keberagaman seluruh civitas akademika kampus.</p><p className="small">Dokumen Profil Lembaga · Generasi XVI<br />Tahun Sidang 2026/2027</p><div className="actions"><a className="text-link" href="#sejarah-section">Sejarah lembaga <ArrowDown size={16} aria-hidden="true" /></a><a className="text-link" href="#visi-misi-section">Visi &amp; misi <ArrowDown size={16} aria-hidden="true" /></a></div></div></div>
        </div>
        <section className="container section profile-spread" id="sejarah-section">
            <div className="profile-stamp"><h2>17 November<br />2008.</h2><p>BEM UMN diresmikan sebagai entitas eksekutif tertinggi mahasiswa di bawah naungan <strong>Rektorat Bidang Kemahasiswaan</strong> Universitas Multimedia Nusantara.</p><p className="small">Fungsi Pokok Lembaga</p><p>Menyelaraskan koordinasi vertikal bersama rektorat serta membina hubungan horizontal yang setara dengan seluruh ormawa kampus.</p></div>
            <div className="stack"><h2>Sejarah &amp; landasan.</h2><h3>Menjembatani Dinamika Kemahasiswaan Sejak Awal Berdiri</h3><p>Sebagai pilar eksekutif kemahasiswaan di UMN, Badan Eksekutif Mahasiswa menjadi katalisator yang mewadahi dan mengalirkan aspirasi, kebutuhan, serta inisiatif mahasiswa. BEM UMN berperan aktif dalam menciptakan iklim kampus yang suportif, mendorong terciptanya karya-karya bermakna, serta mengawal keutuhan nilai kebersamaan.</p><p>Memasuki usia kepengurusan yang ke-16, Kabinet Generasi XVI mengusung semangat inklusivitas tanpa sekat untuk memastikan bahwa setiap suara mahasiswa—dari berbagai program studi dan latar belakang minat—memiliki ruang yang sama untuk bertumbuh dan berprestasi.</p><div className="profile-stats"><p className="small"><strong>16 Generasi</strong>Konsistensi Kepemimpinan</p><p className="small"><strong>10 Himpunan</strong>Di Bawah 4 Fakultas</p><p className="small"><strong>25+ Ormawa</strong>UKM &amp; LSO Terkoordinasi</p></div><p className="small">Menaungi 6 Divisi Manajerial, 6 Kegiatan Mahasiswa (KEGMA), serta koordinasi puluhan Himpunan Mahasiswa dan UKM/LSO di Universitas Multimedia Nusantara.</p><p className="small">Birokrasi Kemahasiswaan UMN — Badan hukum &amp; perwakilan resmi mahasiswa tingkat universitas.</p></div>
        </section>
        <section className="dark-field section" id="visi-misi-section"><div className="container"><div className="section-head"><h2>Visi &amp; misi.</h2><p>Pedoman resmi 2026/2027<br />Arah Perjuangan &amp; Haluan Kerja</p></div><blockquote className="profile-vision">“Menjadikan BEM UMN sebagai wadah kolaborasi yang inklusif dan inovatif untuk mendorong kontribusi positif serta memperkuat integritas bagi seluruh organisator dan mahasiswa.”</blockquote><p className="small mt-6">Dokumen Visi Resmi Sidang Umum · Universitas Multimedia Nusantara</p><div className="profile-missions">{missionList.map(m => <article className="profile-mission" key={m.no}><h3>{m.title}</h3><div><p>{m.desc}</p><p className="small mt-4">{m.badge} · {m.focus}</p></div></article>)}</div></div></section>
        <section className="container section"><div className="profile-spread"><div className="profile-logo"><Image src="/svgs/BEM_GEN_16_LOGO_LIGHT.svg" width={2519} height={1166} alt="Logo resmi BEM UMN Gen XVI — Inclusive for Innovation" /></div><div className="stack"><h2>Lipatan kertas XVI.</h2><p>Elemen lipatan kertas pada angka Romawi <strong>XVI</strong> melambangkan proses membuka lembaran baru—refleksi dari keterbukaan BEM XVI terhadap beragam aspirasi, perspektif, dan gagasan tanpa batas dari seluruh civitas akademika.</p><h3>Ruang Inklusif Tanpa Sekat</h3><p>Menjadi fondasi di mana inovasi dapat tumbuh subur melalui keberlimpahan gagasan dari mahasiswa lintas fakultas dan program studi.</p><h3>Dampak Solutif Nyata</h3><p>Mendorong lahirnya inisiatif yang memberi solusi nyata dan relevan bagi ekosistem Universitas Multimedia Nusantara.</p></div></div><div className="mt-12"><h3>Palet warna resmi GSM</h3><div className="palette">{colors.map(c => <div className="palette-item" key={c.name}><div className={`palette-swatch palette-swatch--${c.token}`} aria-hidden="true" /><p>{c.name}<br />{c.hex}</p></div>)}</div><p className="small mt-6">Tagline Resmi: <strong>#InclusiveForInnovation</strong> · Standard Graphic Manual GSM BEM XVI</p></div></section>
        <section className="section profile-values"><div className="container"><div className="section-head"><h2>Empat nilai kabinet.</h2><p>Berdasarkan Graphic Standard Manual (GSM), identitas visual BEM Gen XVI digerakkan oleh empat motif supergrafik yang mencerminkan karakter kepengurusan.</p></div><div className="values-list">{pillars.map(p => <article className="value-entry" key={p.title}><Image src={p.supergraphic} width={80} height={80} alt={`Supergrafik ${p.title}`} /><div><h3>{p.title.toLowerCase()}</h3><p><strong>{p.tag}</strong></p><p>{p.meaning}</p><p className="value-symbolism">{p.symbolism}</p></div></article>)}</div></div></section>
        <section className="container section"><div className="section-head"><h2>Enam divisi.</h2><p>Masing-masing divisi mengemban mandat manajerial khusus demi menjamin kelancaran operasional, pembinaan organisasi mahasiswa, dan relasi publik.</p></div><div className="profile-division-list">{divisions.map(d => <article key={d.id}><Link className="directory-link" href={`/divisi/${d.id.toLowerCase()}`}><strong>{d.name}</strong><span>{d.fullname}</span><ArrowUpRight size={20} aria-hidden="true" /></Link><p className="small">{d.description}</p></article>)}</div><Link className="text-link mt-6" href="/divisi">Buka direktori pengurus <ArrowUpRight size={18} aria-hidden="true" /></Link><div className="cta-panel"><div><h2>Ingin Meninjau Program Kerja &amp; KEGMA?</h2><p>Eksplorasi 6 Kegiatan Mahasiswa (KEGMA) serta rangkaian inisiatif BEM UMN Gen XVI.</p></div><Link className="button" href="/kegiatan">Tinjau kegiatan (KEGMA) <ArrowUpRight size={18} aria-hidden="true" /></Link></div></section>
    </main><Footer /></>;
}
