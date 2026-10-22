import React from "react";
import Image from "next/image";
import { Member } from "@/constants/divisionMembers";
import { Mail, Instagram, Linkedin, User as UserIcon } from "lucide-react";

type MemberCardProps = {
    member: Member;
    onSelect?: (member: Member) => void;
};

export const MemberCard = ({ member, onSelect }: MemberCardProps) => {
    return (
        <div
            tabIndex={onSelect ? 0 : undefined}
            role={onSelect ? "button" : undefined}
            onClick={() => onSelect && onSelect(member)}
            onKeyDown={(e) => {
                if (onSelect && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    onSelect(member);
                }
            }}
            className={`group relative flex flex-col items-center justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 text-center shadow-lg backdrop-blur-md transition-all duration-300 hover:border-azure/40 hover:bg-white/10 hover:shadow-xl ${
                onSelect ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-azure" : ""
            }`}
        >
            <div className="flex flex-col items-center w-full">
                {/* Foto Profil dengan Fallback */}
                <div className="relative h-36 w-36 overflow-hidden rounded-full border-2 border-azure/40 bg-dark-blue/80 shadow-inner ring-4 ring-white/5 transition-transform duration-300 group-hover:scale-105">
                    {member.imageUrl ? (
                        <Image
                            src={member.imageUrl}
                            alt={`Foto profil ${member.name}`}
                            fill
                            sizes="144px"
                            className="object-cover object-center"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-blue-primary/40 text-azure">
                            <UserIcon size={48} />
                        </div>
                    )}
                </div>

                {/* Nama & Jabatan */}
                <h3 className="mt-4 font-serif text-lg font-bold text-white transition-colors group-hover:text-azure">
                    {member.name}
                </h3>

                <p className="mt-1 inline-block rounded-full bg-blue-primary/60 px-3 py-0.5 font-sans text-xs font-semibold text-cream">
                    {member.role}
                </p>

                {/* Info Tambahan (Jika Tersedia) */}
                {(member.nim || member.major) && (
                    <div className="mt-3 flex flex-col gap-0.5 font-sans text-xs text-concrete/70">
                        {member.nim && <span>NIM: {member.nim}</span>}
                        {member.major && <span>{member.major}</span>}
                    </div>
                )}
            </div>

            {/* Social & Contact Icons */}
            <div className="mt-5 flex items-center justify-center gap-3 border-t border-white/10 pt-4 w-full text-azure">
                {member.instagram ? (
                    <a
                        href={member.instagram.startsWith("http") ? member.instagram : `https://instagram.com/${member.instagram.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Instagram ${member.name}`}
                        className="rounded-full bg-white/5 p-2 transition-colors hover:bg-white/20 hover:text-white"
                    >
                        <Instagram size={15} />
                    </a>
                ) : (
                    <span className="p-2 text-concrete/30 cursor-not-allowed" title="Instagram tidak tersedia">
                        <Instagram size={15} />
                    </span>
                )}

                {member.linkedin ? (
                    <a
                        href={member.linkedin.startsWith("http") ? member.linkedin : `https://linkedin.com/in/${member.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`LinkedIn ${member.name}`}
                        className="rounded-full bg-white/5 p-2 transition-colors hover:bg-white/20 hover:text-white"
                    >
                        <Linkedin size={15} />
                    </a>
                ) : (
                    <span className="p-2 text-concrete/30 cursor-not-allowed" title="LinkedIn tidak tersedia">
                        <Linkedin size={15} />
                    </span>
                )}

                {member.email ? (
                    <a
                        href={`mailto:${member.email}`}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Email ${member.name}`}
                        className="rounded-full bg-white/5 p-2 transition-colors hover:bg-white/20 hover:text-white"
                    >
                        <Mail size={15} />
                    </a>
                ) : (
                    <span className="p-2 text-concrete/30 cursor-not-allowed" title="Email tidak tersedia">
                        <Mail size={15} />
                    </span>
                )}
            </div>
        </div>
    );
};
