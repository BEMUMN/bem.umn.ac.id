"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { Expand, X, ArrowUpRight } from "lucide-react";
import { ContentDialog } from "@/components/ContentDialog";

// Display crops only: original files remain intact for the full-photo viewer.
const focus: Record<string, string> = {
    BPH: "50% 51%",
    SUKM: "50% 54%",
    SUFAK: "50% 59%",
    SULSO: "50% 65%",
    PR: "50% 53%",
    SUKMA: "50% 54%",
};

type Props = {
    division: { id: string; name: string; fullname: string; imageUrl: string };
    priority?: boolean;
    wide?: boolean;
};

export function DivisionPhoto({
    division,
    priority = false,
    wide = false,
}: Props) {
    const [open, setOpen] = useState(false);
    const titleId = useId();
    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                aria-haspopup="dialog"
                aria-label={`Perbesar foto ${division.fullname}`}
                className={`group/photo bg-navy-dark relative block w-full cursor-zoom-in overflow-hidden focus-visible:outline-offset-[-4px] ${wide ? "aspect-[4/3] sm:aspect-[16/9]" : "aspect-[4/3]"}`}
            >
                <Image
                    src={division.imageUrl}
                    alt={`Foto pengurus ${division.fullname}`}
                    fill
                    priority={priority}
                    sizes={
                        wide
                            ? "(max-width: 1152px) calc(100vw - 32px), 1088px"
                            : "(max-width: 767px) calc(100vw - 32px), (max-width: 1280px) 48vw, 592px"
                    }
                    className="object-cover"
                    style={{
                        objectPosition:
                            focus[division.id.toUpperCase()] || "50% 55%",
                        transform: ["SULSO", "SUKMA"].includes(division.id.toUpperCase())
                            ? "scale(1.18)"
                            : undefined,
                        transformOrigin: focus[division.id.toUpperCase()] || "50% 55%",
                    }}
                />
                <span className="bg-navy-dark/90 group-hover/photo:bg-navy-dark absolute right-3 bottom-3 flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 text-[11px] font-medium text-white backdrop-blur-sm transition-colors">
                    <Expand size={14} aria-hidden="true" />
                    Lihat foto utuh
                </span>
            </button>
            {open && (
                <ContentDialog
                    labelledBy={titleId}
                    onClose={() => setOpen(false)}
                >
                    <div className="flex max-h-[90dvh] flex-col">
                        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-4 py-3">
                            <h2
                                id={titleId}
                                className="text-sm font-semibold text-white"
                            >
                                Foto {division.name} · Gen XVI
                            </h2>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                aria-label="Tutup foto divisi"
                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 hover:bg-white/10"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="relative h-[65dvh] min-h-0 bg-black/30">
                            <Image
                                src={division.imageUrl}
                                alt={`Foto utuh pengurus ${division.fullname}`}
                                fill
                                sizes="(max-width: 767px) 90vw, 640px"
                                className="object-contain"
                                priority
                            />
                        </div>
                        <div className="flex shrink-0 justify-end border-t border-white/10 px-4 py-2">
                            <a
                                href={division.imageUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-azure inline-flex min-h-11 items-center gap-2 text-xs font-semibold"
                            >
                                Buka ukuran asli <ArrowUpRight size={16} />
                            </a>
                        </div>
                    </div>
                </ContentDialog>
            )}
        </>
    );
}
