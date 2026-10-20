"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Search, X } from "lucide-react";
import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";
import { DivisionCard, type DivisionItem } from "@/components/DivisionCard";
import { MemberCard } from "@/components/MemberCard";
import { MemberDetailModal } from "@/components/MemberDetailModal";
import type { Member } from "@/constants/divisionMembers";

type Props = { divisions: DivisionItem[]; allMembers: Member[] };
export function DivisionListClient({ divisions, allMembers }: Props) {
    const [activeId, setActiveId] = useState<string | null>(null);
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState<Member | null>(null);
    const roster = useRef<HTMLElement>(null);
    const directory = useRef<HTMLDivElement>(null);
    const opener = useRef<HTMLElement | null>(null);
    const current = divisions.find(d => d.id === activeId);
    const members = useMemo(() => allMembers.filter(m => m.divisionId === activeId), [allMembers, activeId]);
    const filtered = useMemo(() => members.filter(m => `${m.name} ${m.role} ${m.major ?? ""}`.toLowerCase().includes(query.trim().toLowerCase())), [members, query]);
    const selectDivision = (id: string) => {
        opener.current = document.activeElement as HTMLElement;
        setActiveId(id); setQuery("");
        requestAnimationFrame(() => { roster.current?.focus({ preventScroll: true }); roster.current?.scrollIntoView({ block: "start" }); });
    };
    const back = () => { setActiveId(null); setQuery(""); requestAnimationFrame(() => { if (opener.current?.isConnected) opener.current.focus(); else directory.current?.focus(); }); };
    const bph = divisions.find(d => d.id === "BPH");
    return <><Navbar /><main id="main-content" tabIndex={-1}>
        <div className="container page-intro"><div className="breadcrumb"><Link href="/">Beranda</Link><span aria-hidden="true">/</span><span>Divisi &amp; anggota</span></div><div className="page-intro-row"><div><h1>Divisi &amp;<br />anggota.</h1><p>Enam Pilar Penggerak Kolaborasi &amp; Inovasi.</p></div><div className="stack"><p>Mengenal jajaran pimpinan eksekutif dan supervisor pengawas yang mendedikasikan dedikasi serta integritas bagi kemajuan seluruh civitas akademika UMN.</p><button type="button" className="button button--quiet" onClick={back}>Generasi XVI (2026/2027) · Aktif</button></div></div></div>
        <div className="container page-body">
            {!current ? <div ref={directory} tabIndex={-1}>{bph && <DivisionCard division={bph} onSelect={selectDivision} variant="featured" />}<div className="division-grid">{divisions.filter(d => d.id !== "BPH").map(d => <DivisionCard key={d.id} division={d} onSelect={selectDivision} />)}</div></div> : <section ref={roster} tabIndex={-1} aria-labelledby="roster-heading"><button type="button" className="text-link member-select" onClick={back}><ArrowLeft size={18} aria-hidden="true" />Kembali ke seluruh divisi</button><div className="section-head mt-8"><div><h2 id="roster-heading">{current.fullname}</h2><p className="mt-6">{current.description}</p></div><Link className="text-link" href={`/divisi/${current.id.toLowerCase()}`}>Halaman divisi <ArrowUpRight size={18} aria-hidden="true" /></Link></div><div className="search-controls"><label className="search-field"><Search size={18} aria-hidden="true" /><span className="sr-only">Cari nama, jabatan, atau jurusan</span><input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Cari nama, jabatan, atau jurusan…" />{query && <button className="icon-button" type="button" aria-label="Bersihkan pencarian" onClick={() => setQuery("")}><X size={18} aria-hidden="true" /></button>}</label><p className="small" role="status">Menampilkan {filtered.length} dari {members.length} pengurus</p></div>{filtered.length ? <div className="member-grid">{filtered.map(member => <MemberCard key={member.id ?? member.name} member={member} onSelect={setSelected} />)}</div> : <div className="empty-state"><h3>Tidak ada pengurus yang ditemukan</h3><p>Coba ubah kata kunci pencarian Anda untuk “{query}”.</p><button className="button" type="button" onClick={() => setQuery("")}>Reset pencarian</button></div>}</section>}
        </div>
    </main><MemberDetailModal member={selected} onClose={() => setSelected(null)} divisionName={current?.fullname} /><Footer /></>;
}
