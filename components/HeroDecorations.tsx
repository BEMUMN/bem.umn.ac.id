"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const motifs = [
    {
        src: "/svgs/COLLABORATIVE_supergrafik_1.svg",
        position: "top-[16%] -left-8",
        exit: "-translate-x-[140%]",
    },
    {
        src: "/svgs/INCLUSIVE_supergrafik_2.svg",
        position: "top-[16%] -right-8",
        exit: "translate-x-[140%]",
    },
    {
        src: "/svgs/INNOVATIVE_supergrafik_3.svg",
        position: "bottom-[12%] -left-8",
        exit: "-translate-x-[140%]",
    },
    {
        src: "/svgs/SOLID_supergrafik_4.svg",
        position: "bottom-[12%] -right-8",
        exit: "translate-x-[140%]",
    },
];

export function HeroDecorations() {
    const [dismissed, setDismissed] = useState(false);
    useEffect(() => {
        const dismiss = () => {
            if (window.scrollY <= 80) return;
            setDismissed(true);
            window.removeEventListener("scroll", dismiss);
        };
        dismiss();
        if (window.scrollY <= 80)
            window.addEventListener("scroll", dismiss, { passive: true });
        return () => window.removeEventListener("scroll", dismiss);
    }, []);
    return (
        <div
            aria-hidden="true"
            data-hero-decorations
            data-dismissed={dismissed}
            className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden md:block"
        >
            {motifs.map((motif) => (
                <div
                    key={motif.src}
                    className={`absolute h-36 w-36 transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none lg:h-44 lg:w-44 ${motif.position} ${dismissed ? `${motif.exit} opacity-0` : "translate-x-0 opacity-[0.12]"}`}
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
