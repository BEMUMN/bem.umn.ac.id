"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const motifs = [
    {
        src: "/svgs/COLLABORATIVE_supergrafik_1.svg",
        position: "top-[16%] -left-8",
    },
    {
        src: "/svgs/INCLUSIVE_supergrafik_2.svg",
        position: "top-[16%] -right-8",
    },
    {
        src: "/svgs/INNOVATIVE_supergrafik_3.svg",
        position: "bottom-[12%] -left-8",
    },
    {
        src: "/svgs/SOLID_supergrafik_4.svg",
        position: "bottom-[12%] -right-8",
    },
];

export function HeroDecorations() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dismissed, setDismissed] = useState<number[]>([]);
    useEffect(() => {
        const exited = new Set<number>();
        const checkVisibility = () => {
            const elements = containerRef.current?.children;
            if (!elements) return;
            let changed = false;
            Array.from(elements).forEach((element, index) => {
                const rect = element.getBoundingClientRect();
                if (!exited.has(index) && rect.width > 0 && rect.bottom <= 0) {
                    exited.add(index);
                    changed = true;
                }
            });
            if (changed) setDismissed([...exited]);
        };
        checkVisibility();
        window.addEventListener("scroll", checkVisibility, { passive: true });
        window.addEventListener("resize", checkVisibility);
        return () => {
            window.removeEventListener("scroll", checkVisibility);
            window.removeEventListener("resize", checkVisibility);
        };
    }, []);
    return (
        <div
            ref={containerRef}
            aria-hidden="true"
            data-hero-decorations
            data-dismissed={dismissed.length === motifs.length}
            className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden md:block"
        >
            {motifs.map((motif, index) => (
                <div
                    key={motif.src}
                    className={`absolute h-36 w-36 lg:h-44 lg:w-44 ${motif.position} ${dismissed.includes(index) ? "invisible" : "opacity-[0.12]"}`}
                >
                    <Image
                        src={motif.src}
                        alt=""
                        fill
                        sizes="176px"
                        className="object-contain"
                    />
                </div>
            ))}
        </div>
    );
}
