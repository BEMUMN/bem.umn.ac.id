"use client";

import type { Member } from "@/constants/divisionMembers";
import Dialog from "@/components/Dialog";
import { MemberAvatar, MemberSocials } from "@/components/MemberCard";

type Props = { member: Member | null; onClose: () => void; divisionName?: string };
export function MemberDetailModal({ member, onClose, divisionName }: Props) {
    return <Dialog open={!!member} title={member?.name ?? "Profil pengurus"} id="modal-member-name" onClose={onClose}>{member && <div className="stack"><MemberAvatar member={member} /><p className="member-role">{member.role}</p><dl>{divisionName && <><dt>Divisi</dt><dd>{divisionName}</dd></>}{member.nim && <><dt>NIM</dt><dd>{member.nim}</dd></>}{member.major && <><dt>Program studi</dt><dd>{member.major}</dd></>}</dl>{member.quote && <blockquote className="about-statement">“{member.quote}”</blockquote>}<MemberSocials member={member} /><button className="button button--quiet" type="button" onClick={onClose}>Tutup profil</button></div>}</Dialog>;
}
