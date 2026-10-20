import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ResponsivePhoto from "@/components/ResponsivePhoto";

export type DivisionItem = { id: string; name: string; fullname: string; description: string; imageUrl: string; memberCount?: number; leaderName?: string };
type Props = { division: DivisionItem; onSelect?: (id: string) => void; variant?: "featured" | "standard"; className?: string };

export const divisionSupergraphics: Record<string, string> = {
    BPH: "/svgs/SOLID_supergrafik_4.svg",
    SUKM: "/svgs/INCLUSIVE_supergrafik_2.svg",
    SUFAK: "/svgs/INNOVATIVE_supergrafik_3.svg",
    SULSO: "/svgs/INCLUSIVE_supergrafik_2.svg",
    SUKMA: "/svgs/INNOVATIVE_supergrafik_3.svg",
    PR: "/svgs/COLLABORATIVE_supergrafik_1.svg",
};

const divisionFocusMap: Record<string, string> = {
    BPH: "Kebijakan Strategis, Administrasi & Keuangan",
    SUKM: "Pembinaan & Advokasi Unit Kegiatan Mahasiswa",
    SUFAK: "Sinergi Lintas Fakultas & Himpunan Mahasiswa",
    SULSO: "Pengawasan & Tata Kelola Lembaga Semi Otonom",
    SUKMA: "Supervisi 6 Kegiatan Akbar Mahasiswa Kampus",
    PR: "Kanal Komunikasi, Branding & Diplomasi Publik",
};

export function DivisionCard({ division, onSelect, variant = "standard", className = "" }: Props) {
    const name = `divisi-${division.id === "SULSO" ? "lso" : division.id.toLowerCase()}`;
    const photo = <div className="division-photo"><ResponsivePhoto name={name} alt={`Foto grup ${division.fullname}`} width={1446} height={2576} /></div>;
    return <article className={`division-card ${variant === "featured" ? "directory-feature" : ""} ${className}`}>
        {onSelect ? <button type="button" className="division-card-button" onClick={() => onSelect(division.id)} aria-label={`Buka direktori ${division.fullname}`}>{photo}</button> : <Link href={`/divisi/${division.id.toLowerCase()}`}>{photo}</Link>}
        <div className="division-copy"><h2>{division.fullname}</h2><p className="small">{division.name} · {division.memberCount ?? ""} {division.memberCount !== undefined ? "pengurus" : ""}</p><p>{division.description}</p><p className="small">{divisionFocusMap[division.id]}</p>{division.leaderName && <p className="small">{division.leaderName}</p>}<div className="actions">{onSelect && <button type="button" className="text-link member-select" onClick={() => onSelect(division.id)}>Lihat pengurus <ArrowUpRight size={18} aria-hidden="true" /></button>}<Link href={`/divisi/${division.id.toLowerCase()}`} className="text-link">Halaman divisi <ArrowUpRight size={18} aria-hidden="true" /></Link></div></div>
    </article>;
}
