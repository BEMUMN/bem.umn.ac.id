"use client";

import { useEffect, useState } from "react";

const chapters = [
    { id: "sampul", tab: "Sampul" },
    { id: "nilai", tab: "Nilai" },
    { id: "kabinet", tab: "Kabinet" },
    { id: "divisi", tab: "Divisi" },
    { id: "kegiatan", tab: "Kegiatan" },
];
const tones = ["concrete", "linen", "azure", "taupe", "linen"];

// Binder index tabs on the right edge (desktop). The tab for the chapter that
// crosses the middle of the viewport is pulled out.
export function ChapterTabs({ sub = false }: { sub?: boolean }) {
    const [active, setActive] = useState(sub ? "" : "sampul");

    useEffect(() => {
        if (sub) return; // inner pages: tabs link back to the home chapters
        const io = new IntersectionObserver(
            (entries) => {
                for (const e of entries)
                    if (e.isIntersecting)
                        setActive((e.target as HTMLElement).id);
            },
            { rootMargin: "-48% 0px -48% 0px" },
        );
        chapters.forEach((c) => {
            const el = document.getElementById(c.id);
            if (el) io.observe(el);
        });
        return () => io.disconnect();
    }, [sub]);

    return (
        <nav className="chapter-tabs" aria-label="Bab">
            <ol>
                {chapters.map((c, i) => (
                    <li key={c.id}>
                        <a
                            className={`chapter-tab chapter-tab--${tones[i]}`}
                            href={sub ? `/#${c.id}` : `#${c.id}`}
                            aria-current={
                                active === c.id ? "location" : undefined
                            }
                        >
                            <span>{c.tab}</span>
                        </a>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
