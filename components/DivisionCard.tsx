"use client";
import { ArrowUpRight, Users } from "lucide-react";
import { DivisionPhoto } from "@/components/DivisionPhoto";

export type DivisionItem = {
    id: string;
    name: string;
    fullname: string;
    description: string;
    imageUrl: string;
    memberCount?: number;
    leaderName?: string;
};

type DivisionCardProps = {
    division: DivisionItem;
    onSelect?: (divisionId: string) => void;
    variant?: "featured" | "standard";
    indexNumber?: string;
    clusterBadge?: string;
    className?: string;
};

export const DivisionCard = ({
    division,
    onSelect,
    variant = "standard",
    indexNumber,
    clusterBadge,
    className = "",
}: DivisionCardProps) => (
    <article
        data-motion="rise"
        className={`flex h-full flex-col overflow-hidden rounded-3xl border bg-white/[0.04] ${variant === "featured" ? "border-camel-brown/50" : "border-white/15"} ${className}`}
    >
        <DivisionPhoto division={division} priority={variant === "featured"} />
        <div className="flex flex-1 flex-col p-5 sm:p-7">
            <div className="text-azure flex flex-wrap items-center justify-between gap-2 text-[11px]">
                <span className="font-semibold tracking-[0.14em] uppercase">
                    {indexNumber ? `${indexNumber} / ` : ""}
                    {division.name}
                </span>
                {division.memberCount !== undefined && (
                    <span className="inline-flex items-center gap-1.5">
                        <Users size={14} aria-hidden="true" />
                        {division.memberCount} pengurus
                    </span>
                )}
            </div>
            {clusterBadge && (
                <p className="text-pale-taupe mt-3 text-[10px] font-semibold tracking-wide uppercase">
                    {clusterBadge}
                </p>
            )}
            <h3 className="mt-3 font-serif text-2xl leading-tight text-white sm:text-3xl">
                {division.fullname}
            </h3>
            <p className="text-concrete/80 mt-3 max-w-xl text-sm leading-6">
                {division.description}
            </p>
            <div className="mt-auto pt-6">
                <button
                    type="button"
                    data-division-id={division.id}
                    onClick={() => onSelect?.(division.id)}
                    aria-label={`${variant === "featured" ? "Buka direktori pimpinan" : "Buka direktori pengurus divisi"} ${division.fullname}`}
                    className="text-azure flex min-h-12 w-full items-center justify-between gap-3 border-t border-white/15 pt-4 text-left text-xs font-semibold hover:text-white"
                >
                    Lihat pengurus {division.name}
                    <ArrowUpRight size={18} aria-hidden="true" />
                </button>
            </div>
        </div>
    </article>
);
