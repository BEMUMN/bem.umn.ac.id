import { DivisionKey, divisionMembers } from "@/constants/divisionMembers";
import { notFound } from "next/navigation";
import React from "react";

const Division = ({ params }: { params: { division: string } }) => {
    const divisionKey = params.division.toUpperCase() as DivisionKey;

    if (!(divisionKey in divisionMembers)) return notFound();

    const members = divisionMembers[divisionKey];

    return (
        <div>
            <h1>Division: {divisionKey}</h1>
            <ul>
                {members.map((member) => (
                    <li key={member.name}>
                        <img src={member.imageUrl} alt={member.name} />
                        <h2>{member.name}</h2>
                        <p>{member.role}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Division;
