"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { KegmaDetail } from "@/constants/workIndex";

type Props = { kegma: KegmaDetail; onClick: () => void };
export default function KegmaCard({ kegma, onClick }: Props) {
    const logo = `/images/${kegma.logo.split("/").pop()!.toLowerCase()}`;
    return (
        <button
            className="kegma-row"
            type="button"
            onClick={onClick}
            aria-haspopup="dialog"
            aria-label={`Buka rincian kegiatan ${kegma.title}`}
        >
            <Image
                src={logo}
                alt=""
                className="kegma-logo"
                width={128}
                height={128}
                unoptimized
            />
            <div>
                <h3>{kegma.title}</h3>
                <p>{kegma.description}</p>
                <p className="small">{kegma.category}</p>
            </div>
            <ArrowUpRight size={24} aria-hidden="true" />
        </button>
    );
}
