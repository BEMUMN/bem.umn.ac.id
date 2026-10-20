"use client";

import { useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { subSections, prokers, kegma, lainnya } from "@/constants/workIndex";

type SectionId = "proker" | "kegma" | "organisasi";
const data = { proker: prokers, kegma, organisasi: lainnya };
export default function Work({
    id,
    className = "",
}: {
    id: string;
    className?: string;
}) {
    const [section, setSection] = useState<SectionId>("proker");
    const [index, setIndex] = useState(0);
    const touch = useRef<number | null>(null);
    const tabs = useRef<(HTMLButtonElement | null)[]>([]);
    const items = data[section];
    const item = items[index % items.length];
    const change = (next: SectionId) => {
        setSection(next);
        setIndex(0);
    };
    const move = (delta: number) =>
        setIndex((current) => (current + delta + items.length) % items.length);
    const keyboard = (event: KeyboardEvent, i: number) => {
        let next = i;
        if (event.key === "ArrowRight") next = (i + 1) % subSections.length;
        else if (event.key === "ArrowLeft")
            next = (i + subSections.length - 1) % subSections.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = subSections.length - 1;
        else return;
        event.preventDefault();
        change(subSections[next].id as SectionId);
        tabs.current[next]?.focus();
    };
    const endTouch = (event: TouchEvent) => {
        if (touch.current !== null) {
            const distance = touch.current - event.changedTouches[0].clientX;
            if (Math.abs(distance) > 60) move(distance > 0 ? 1 : -1);
        }
        touch.current = null;
    };
    return (
        <section
            id={id}
            className={`program-section section ${className}`}
            aria-labelledby="work-title"
        >
            <div className="container">
                <div className="section-head">
                    <h2 id="work-title">
                        Program &amp;
                        <br />
                        kegiatan.
                    </h2>
                    <p>{subSections.find((s) => s.id === section)?.desc}</p>
                </div>
                <div
                    className="tabs"
                    role="tablist"
                    aria-label="Pilih kategori program kerja dan kegiatan"
                >
                    {subSections.map((s, i) => (
                        <button
                            key={s.id}
                            ref={(el) => {
                                tabs.current[i] = el;
                            }}
                            id={`home-tab-${s.id}`}
                            className="tab"
                            type="button"
                            role="tab"
                            aria-selected={section === s.id}
                            aria-controls="home-program-panel"
                            tabIndex={section === s.id ? 0 : -1}
                            onClick={() => change(s.id as SectionId)}
                            onKeyDown={(event) => keyboard(event, i)}
                        >
                            {s.title}
                        </button>
                    ))}
                </div>
                <div
                    className="program-window"
                    id="home-program-panel"
                    role="tabpanel"
                    aria-labelledby={`home-tab-${section}`}
                    tabIndex={0}
                    onTouchStart={(event) => {
                        touch.current = event.touches[0].clientX;
                    }}
                    onTouchEnd={endTouch}
                >
                    <div
                        className="program-feature"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        <h3 className="program-name">{item.title}</h3>
                        <div className="program-detail">
                            <p>{item.description}</p>
                            <Link
                                href={
                                    section === "organisasi"
                                        ? "/tentang-kami"
                                        : `/kegiatan#${section === "kegma" ? "kegma-section" : "proker-section"}`
                                }
                                className="text-link"
                            >
                                {section === "organisasi"
                                    ? "Tentang naungan BEM UMN"
                                    : "Jelajahi seluruh kegiatan"}
                                <ArrowUpRight size={18} aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                    <div className="program-controls">
                        <span
                            className="small"
                            aria-label={`Item ${index + 1} dari ${items.length}`}
                        >
                            {index + 1} / {items.length}
                        </span>
                        <div className="program-control-buttons">
                            <button
                                className="icon-button"
                                type="button"
                                onClick={() => move(-1)}
                                aria-label="Item kegiatan sebelumnya"
                            >
                                <ArrowLeft size={20} aria-hidden="true" />
                            </button>
                            <button
                                className="icon-button"
                                type="button"
                                onClick={() => move(1)}
                                aria-label="Item kegiatan berikutnya"
                            >
                                <ArrowRight size={20} aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="program-title-list" aria-label="Pilih kegiatan">
                    {items.map((entry, i) => (
                        <button
                            type="button"
                            key={entry.id}
                            aria-current={i === index ? "true" : undefined}
                            onClick={() => setIndex(i)}
                        >
                            {entry.title}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
