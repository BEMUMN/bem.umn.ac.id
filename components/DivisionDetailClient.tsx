"use client";

import React, { useState } from "react";
import { MemberCard } from "@/components/MemberCard";
import { MemberDetailModal } from "@/components/MemberDetailModal";
import type { Member } from "@/constants/divisionMembers";

interface DivisionDetailClientProps {
    members: Member[];
    divisionName: string;
}

export const DivisionDetailClient: React.FC<DivisionDetailClientProps> = ({
    members,
    divisionName,
}) => {
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);

    return (
        <>
            <div className="member-grid">
                {members.map((member) => (
                    <MemberCard
                        key={member.name}
                        member={member}
                        onSelect={(m) => setSelectedMember(m)}
                    />
                ))}
            </div>

            <MemberDetailModal
                member={selectedMember}
                onClose={() => setSelectedMember(null)}
                divisionName={divisionName}
            />
        </>
    );
};
