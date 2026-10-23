"use client";

import React, { useState } from "react";
import { MemberRoster } from "@/components/MemberRoster";
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
            <MemberRoster members={members} onSelect={setSelectedMember} />

            <MemberDetailModal
                member={selectedMember}
                onClose={() => setSelectedMember(null)}
                divisionName={divisionName}
            />
        </>
    );
};
