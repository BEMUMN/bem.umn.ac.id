import Image from "next/image";
import type { Member } from "@/constants/divisionMembers";
import { ArrowUpRight, Mail, Instagram, Linkedin } from "lucide-react";

type MemberCardProps = {
    member: Member;
    onSelect?: (member: Member) => void;
};

export const MemberCard = ({ member, onSelect }: MemberCardProps) => {
    const initials = member.name
        .split(" ")
        .slice(0, 2)
        .map((part) => part[0])
        .join("");
    const hasContact = member.instagram || member.linkedin || member.email;
    return (
        <article
            data-motion="rise"
            className="group hover:border-azure/50 flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-colors duration-300"
        >
            <button
                type="button"
                disabled={!onSelect}
                onClick={() => onSelect?.(member)}
                aria-label={`Lihat profil ${member.name}`}
                className="flex flex-1 cursor-pointer flex-col text-left focus-visible:outline-offset-[-4px] disabled:cursor-default"
            >
                <div className="bg-blue-primary/40 relative aspect-[4/5] w-full overflow-hidden">
                    {member.imageUrl ? (
                        <Image
                            src={member.imageUrl}
                            alt={`Potret ${member.name}`}
                            fill
                            sizes="(max-width: 639px) calc(100vw - 48px), (max-width: 1023px) 45vw, 320px"
                            className="object-cover object-[center_35%] transition-transform duration-500 motion-safe:group-hover:scale-[1.025]"
                        />
                    ) : (
                        <div className="text-azure flex h-full flex-col items-center justify-center gap-3">
                            <span
                                aria-hidden="true"
                                className="font-serif text-6xl"
                            >
                                {initials}
                            </span>
                            <span className="text-xs">Foto segera hadir</span>
                        </div>
                    )}
                </div>
                <div className="flex w-full flex-1 flex-col p-5">
                    <span className="text-azure text-[10px] font-semibold tracking-[0.16em] uppercase">
                        BEM UMN · Gen XVI
                    </span>
                    <h3 className="mt-2 font-serif text-2xl leading-tight text-white">
                        {member.name}
                    </h3>
                    <p className="text-cream mt-2 text-xs leading-relaxed">
                        {member.role}
                    </p>
                    {member.major && (
                        <p className="text-concrete/70 mt-2 text-xs">
                            {member.major}
                        </p>
                    )}
                    {onSelect && (
                        <span className="text-azure mt-auto flex items-center justify-between gap-3 pt-5 text-xs font-semibold">
                            Lihat profil{" "}
                            <ArrowUpRight size={17} aria-hidden="true" />
                        </span>
                    )}
                </div>
            </button>
            {hasContact && (
                <div className="text-azure flex gap-2 border-t border-white/10 px-4 py-2">
                    {member.instagram && (
                        <a
                            className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10"
                            href={
                                member.instagram.startsWith("http")
                                    ? member.instagram
                                    : `https://instagram.com/${member.instagram.replace("@", "")}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Instagram ${member.name}`}
                        >
                            <Instagram size={18} />
                        </a>
                    )}
                    {member.linkedin && (
                        <a
                            className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10"
                            href={
                                member.linkedin.startsWith("http")
                                    ? member.linkedin
                                    : `https://linkedin.com/in/${member.linkedin}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`LinkedIn ${member.name}`}
                        >
                            <Linkedin size={18} />
                        </a>
                    )}
                    {member.email && (
                        <a
                            className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10"
                            href={`mailto:${member.email}`}
                            aria-label={`Email ${member.name}`}
                        >
                            <Mail size={18} />
                        </a>
                    )}
                </div>
            )}
        </article>
    );
};
