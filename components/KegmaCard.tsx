"use client";

import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import type { KegmaDetail } from "@/constants/workIndex";

interface KegmaCardProps {
    kegma: KegmaDetail;
    onClick: () => void;
    indexNumber?: string;
}

export default function KegmaCard({ kegma, onClick, indexNumber }: KegmaCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="group relative flex aspect-[3/4] w-full flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-blue-primary/30 to-navy-dark/95 p-6 text-left shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-azure/70 hover:shadow-2xl hover:shadow-azure/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-azure active:scale-[0.98] cursor-pointer"
            aria-haspopup="dialog"
            aria-label={`Buka rincian kegiatan ${kegma.title}`}
        >
            {/* Background Texture & Collage Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={kegma.image}
                    alt={kegma.title}
                    fill
                    className="object-cover opacity-20 transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/85 to-navy-dark/60" />
            </div>

            {/* Top Header Card: Index Number & Category Badge */}
            <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {indexNumber && (
                        <span className="font-serif text-2xl font-bold text-azure/50 transition-colors group-hover:text-azure">
                            {indexNumber}
                        </span>
                    )}
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-camel-brown/40 bg-white/10 px-3 py-1 font-sans text-[11px] font-semibold tracking-wide text-pale-taupe backdrop-blur-md">
                        <Sparkles size={11} className="text-camel-brown animate-pulse" />
                        {kegma.category}
                    </span>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-azure backdrop-blur-sm transition-all duration-300 group-hover:border-azure group-hover:bg-azure group-hover:text-navy-dark group-hover:scale-105">
                    <ArrowUpRight size={16} />
                </div>
            </div>

            {/* Center Area: Event Logo with Dynamic Ambient Glow */}
            <div className="relative z-10 my-auto flex flex-col items-center justify-center py-4">
                <div className="relative flex h-36 w-36 items-center justify-center sm:h-40 sm:w-40 md:h-44 md:w-44">
                    {/* Radial Ambient Glow */}
                    <div className="absolute h-32 w-32 rounded-full bg-azure/15 blur-2xl transition-all duration-500 group-hover:scale-125 group-hover:bg-azure/30" />
                    <Image
                        src={kegma.logo}
                        alt={`Logo ${kegma.title}`}
                        fill
                        className="object-contain p-2 drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 160px, 200px"
                    />
                </div>
            </div>

            {/* Bottom Content Plate */}
            <div className="relative z-10 flex flex-col gap-1.5 rounded-2xl border border-white/10 bg-navy-dark/75 p-4 backdrop-blur-md transition-all duration-300 group-hover:border-azure/40 group-hover:bg-navy-dark/90">
                <div className="flex items-center justify-between">
                    <h3 className="font-serif text-xl font-bold tracking-wide text-white group-hover:text-azure transition-colors sm:text-2xl">
                        {kegma.title}
                    </h3>
                    <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-pale-taupe/90">
                        {kegma.supervisor.split(" ")[0]}
                    </span>
                </div>
                <p className="line-clamp-2 font-sans text-xs leading-relaxed text-concrete/80">
                    {kegma.description}
                </p>
                <div className="mt-2 flex items-center justify-between pt-2 border-t border-white/10 text-[11px] font-sans">
                    <span className="font-semibold text-azure group-hover:underline">
                        Buka Rincian &amp; Website Resmi ↗
                    </span>
                    <span className="text-concrete/50">
                        Naungan SUKMA
                    </span>
                </div>
            </div>
        </button>
    );
}
