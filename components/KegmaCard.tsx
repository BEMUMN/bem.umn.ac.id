"use client";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { KegmaDetail } from "@/constants/workIndex";

interface KegmaCardProps {
    kegma: KegmaDetail;
    onClick: () => void;
    indexNumber?: string;
}
export default function KegmaCard({
    kegma,
    onClick,
    indexNumber,
}: KegmaCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-haspopup="dialog"
            aria-label={`Buka rincian kegiatan ${kegma.title}`}
            className="group hover:border-azure/60 flex h-full w-full cursor-pointer flex-col rounded-3xl border border-white/15 bg-white/[0.04] p-6 text-left transition-colors hover:bg-white/[0.07] sm:p-7"
        >
            <span className="text-azure flex w-full items-center justify-between gap-3 text-[11px] tracking-wide">
                <span>{kegma.category}</span>
                <span aria-hidden="true">{indexNumber}</span>
            </span>
            <span className="relative mx-auto my-7 block h-36 w-36">
                <Image
                    src={kegma.logo}
                    alt={`Logo ${kegma.title}`}
                    fill
                    sizes="144px"
                    className="object-contain transition-transform duration-300 motion-safe:group-hover:scale-105"
                />
            </span>
            <h3 className="font-serif text-2xl leading-tight text-white sm:text-3xl">
                {kegma.title}
            </h3>
            <p className="text-concrete/80 mt-3 line-clamp-3 text-sm leading-6">
                {kegma.description}
            </p>
            <span className="text-azure mt-auto flex w-full items-center justify-between gap-3 pt-7 text-xs font-semibold">
                Lihat rincian <ArrowUpRight size={18} aria-hidden="true" />
            </span>
        </button>
    );
}
