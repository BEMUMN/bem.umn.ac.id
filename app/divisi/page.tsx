import type { Metadata } from "next";
import { divisions } from "@/constants/divisionIndex";
import { divisionMembers, DivisionKey } from "@/constants/divisionMembers";
import { DivisionListClient } from "@/components/DivisionListClient";

export const metadata: Metadata = {
    title: "Divisi & Anggota | BEM UMN GEN XVI",
    description:
        "Daftar lengkap 6 divisi dan profil anggota kepengurusan BEM UMN Generasi XVI — Inclusive for Innovation.",
};

export default function DivisiPage() {
    const enrichedDivisions = divisions.map((d) => {
        const key = d.id as DivisionKey;
        const members = divisionMembers[key] || [];
        const leader = members[0]?.name;

        return {
            ...d,
            memberCount: members.length,
            leaderName: leader,
        };
    });

    const allMembers = Object.entries(divisionMembers).flatMap(
        ([divKey, members]) => {
            return members.map((m, idx) => ({
                ...m,
                id: `${divKey}-${idx}`,
                divisionId: divKey as DivisionKey,
                divisionName: divisions.find((d) => d.id === divKey)?.fullname,
            }));
        },
    );

    return (
        <DivisionListClient
            divisions={enrichedDivisions}
            allMembers={allMembers}
        />
    );
}
