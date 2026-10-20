"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import KegmaCard from "@/components/KegmaCard";
import Dialog from "@/components/Dialog";
import type { KegmaDetail, ProkerDetail } from "@/constants/workIndex";

type TabType = "all" | "kegma" | "proker";
type Props = { kegmaList: KegmaDetail[]; prokerList: ProkerDetail[] };
export default function KegiatanClient({ kegmaList, prokerList }: Props) {
    const [tab, setTab] = useState<TabType>("all");
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState<KegmaDetail | null>(null);
    const tabs = useRef<(HTMLButtonElement | null)[]>([]);
    const categories = [{ id: "all" as const, label: "Semua agenda", count: kegmaList.length + prokerList.length }, { id: "kegma" as const, label: "KEGMA", count: kegmaList.length }, { id: "proker" as const, label: "Program kerja", count: prokerList.length }];
    const filteredKegma = useMemo(() => { const q = query.trim().toLowerCase(); return kegmaList.filter(k => [k.title, k.fullName, k.tagline, k.description, k.supervisor, k.category].some(value => value.toLowerCase().includes(q))); }, [query, kegmaList]);
    const filteredProker = useMemo(() => { const q = query.trim().toLowerCase(); return prokerList.filter(p => [p.title, p.subtitle, p.division, p.description, p.fullDescription].some(value => value.toLowerCase().includes(q))); }, [query, prokerList]);
    const showKegma = tab !== "proker";
    const showProker = tab !== "kegma";
    const count = (showKegma ? filteredKegma.length : 0) + (showProker ? filteredProker.length : 0);
    useEffect(() => {
        const jump = () => {
            const hash = location.hash;
            if (hash !== "#proker-section" && hash !== "#kegma-section") return;
            setTab(hash === "#proker-section" ? "proker" : "kegma"); setQuery("");
            requestAnimationFrame(() => requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView()));
        };
        jump(); window.addEventListener("hashchange", jump);
        return () => window.removeEventListener("hashchange", jump);
    }, []);
    const keyboard = (event: KeyboardEvent, index: number) => {
        const next = event.key === "ArrowRight" ? (index + 1) % 3 : event.key === "ArrowLeft" ? (index + 2) % 3 : event.key === "Home" ? 0 : event.key === "End" ? 2 : -1;
        if (next < 0) return;
        event.preventDefault(); setTab(categories[next].id); tabs.current[next]?.focus();
    };
    return <div className="container page-body">
        <div className="search-controls"><div className="tabs light-tabs" role="tablist" aria-label="Kategori kegiatan dan program kerja">{categories.map((category, index) => <button className="tab" ref={el => { tabs.current[index] = el; }} key={category.id} id={`catalog-tab-${category.id}`} type="button" role="tab" aria-selected={tab === category.id} aria-controls="catalog-panel" tabIndex={tab === category.id ? 0 : -1} onClick={() => setTab(category.id)} onKeyDown={event => keyboard(event, index)}>{category.label} ({category.count})</button>)}</div><label className="search-field"><Search size={18} aria-hidden="true" /><span className="sr-only">Cari agenda, divisi, atau kata kunci</span><input id="search-kegiatan" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Cari agenda, divisi, atau kata kunci…" />{query && <button className="icon-button" type="button" aria-label="Bersihkan pencarian" onClick={() => setQuery("")}><X size={18} aria-hidden="true" /></button>}</label></div>
        <p className="small mb-8" role="status">Menampilkan {count} kegiatan dan program kerja</p>
        <div id="catalog-panel" role="tabpanel" aria-labelledby={`catalog-tab-${tab}`} tabIndex={0}>
            {!count && <div className="empty-state"><h2 className="program-name">Tidak ada hasil.</h2><p>Coba kata kunci lain atau tampilkan semua agenda.</p><button className="button" type="button" onClick={() => { setTab("all"); setQuery(""); }}>Reset pencarian</button></div>}
            {showKegma && filteredKegma.length > 0 && <section className="catalog-section" id="kegma-section"><h2>Kegiatan mahasiswa.</h2><div className="catalog-list">{filteredKegma.map(k => <KegmaCard key={k.id} kegma={k} onClick={() => setSelected(k)} />)}</div></section>}
            {showProker && filteredProker.length > 0 && <section className="catalog-section" id="proker-section"><h2>Program kerja divisi.</h2>{filteredProker.map(p => <article className="proker-entry" key={p.id}><div><h3>{p.title}</h3><p className="mt-4">{p.subtitle}</p><p className="small mt-4">{p.division}</p></div><div><p>{p.description}</p><details><summary>Rincian &amp; tujuan program</summary><p>{p.fullDescription}</p><ul>{p.objectives.map(objective => <li key={objective}>{objective}</li>)}</ul></details></div></article>)}</section>}
        </div>
        <Dialog open={!!selected} title={selected?.title ?? "Rincian kegiatan"} id="modal-kegma-title" onClose={() => setSelected(null)}>{selected && <div className="stack"><div><h3>{selected.fullName}</h3><p className="mt-4">“{selected.tagline}”</p></div><div><h3>Tentang kegiatan</h3><p className="mt-4">{selected.fullDescription}</p></div><div><h3>Sorotan &amp; nilai utama</h3><ul>{selected.highlights.map(point => <li key={point}>{point}</li>)}</ul></div><dl><dt>Supervisor BEM</dt><dd>{selected.supervisor}</dd><dt>Divisi pengawas</dt><dd>{selected.division}</dd><dt>Kategori</dt><dd>{selected.category}</dd></dl><div className="actions"><a className="button" href={selected.websiteUrl} target="_blank" rel="noopener noreferrer">Kunjungi website resmi <ArrowUpRight size={18} aria-hidden="true" /></a><button type="button" className="button button--quiet" onClick={() => setSelected(null)}>Tutup</button></div></div>}</Dialog>
    </div>;
}
