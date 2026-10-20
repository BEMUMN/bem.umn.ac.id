import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Member } from "@/constants/divisionMembers";

type Props = { member: Member; onSelect?: (member: Member) => void };
export function MemberAvatar({ member }: { member: Member }) {
    const photo = member.imageUrl && !member.imageUrl.endsWith("tes_foto_anggota.webp");
    return photo ? <Image className="member-portrait" src={member.imageUrl!} alt={`Foto ${member.name}`} width={80} height={80} /> : <span className="member-initials" aria-hidden="true">{member.name.split(" ").slice(0, 2).map(part => part[0]).join("")}</span>;
}
export function MemberSocials({ member }: { member: Member }) {
    return <div className="actions small">
        {member.instagram && <a className="text-link" href={member.instagram.startsWith("http") ? member.instagram : `https://instagram.com/${member.instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer">Instagram <ArrowUpRight size={16} aria-hidden="true" /></a>}
        {member.linkedin && <a className="text-link" href={member.linkedin.startsWith("http") ? member.linkedin : `https://linkedin.com/in/${member.linkedin}`} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={16} aria-hidden="true" /></a>}
        {member.email && <a className="text-link" href={`mailto:${member.email}`}>Email <ArrowUpRight size={16} aria-hidden="true" /></a>}
    </div>;
}
export function MemberCard({ member, onSelect }: Props) {
    return <article className="member-card"><MemberAvatar member={member} /><div><h3>{member.name}</h3><p className="member-role">{member.role}</p>{member.nim && <p className="small">NIM: {member.nim}</p>}{member.major && <p className="small">{member.major}</p>}</div>{onSelect && <button className="text-link member-select" type="button" aria-haspopup="dialog" aria-label={`Lihat profil ${member.name}`} onClick={() => onSelect(member)}>Lihat profil <ArrowUpRight size={16} aria-hidden="true" /></button>}<MemberSocials member={member} /></article>;
}
