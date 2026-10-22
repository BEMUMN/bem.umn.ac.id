"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ArrowUpRight } from "lucide-react";
import type { Member } from "@/constants/divisionMembers";

type Props = {
    member: Member | null;
    onClose: () => void;
    divisionName?: string;
};

export const MemberDetailModal = ({ member, ...props }: Props) =>
    member ? (
        <MemberDialog key={member.name} member={member} {...props} />
    ) : null;

function MemberDialog({
    member,
    onClose,
    divisionName,
}: Omit<Props, "member"> & { member: Member }) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [selected, setSelected] = useState(0);
    const photos = member.photos?.length
        ? member.photos
        : member.imageUrl
          ? [member.imageUrl]
          : [];
    const initials = member.name
        .split(" ")
        .slice(0, 2)
        .map((part) => part[0])
        .join("");
    useEffect(() => {
        const dialog = dialogRef.current;
        const opener = document.activeElement as HTMLElement | null;
        const overflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        dialog?.showModal();
        return () => {
            dialog?.close();
            document.body.style.overflow = overflow;
            opener?.focus({ preventScroll: true });
        };
    }, []);

    const links = [
        member.instagram && {
            label: "Instagram",
            url: member.instagram.startsWith("http")
                ? member.instagram
                : `https://instagram.com/${member.instagram.replace("@", "")}`,
        },
        member.linkedin && {
            label: "LinkedIn",
            url: member.linkedin.startsWith("http")
                ? member.linkedin
                : `https://linkedin.com/in/${member.linkedin}`,
        },
        member.email && { label: "Email", url: `mailto:${member.email}` },
    ].filter((item): item is { label: string; url: string } => Boolean(item));

    return (
        <dialog
            ref={dialogRef}
            aria-labelledby="modal-member-name"
            onKeyDown={(event) => {
                if (event.key !== "Tab") return;
                const targets = Array.from(
                    event.currentTarget.querySelectorAll<HTMLElement>(
                        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]',
                    ),
                );
                const first = targets[0];
                const last = targets[targets.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last?.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first?.focus();
                }
            }}
            onCancel={(event) => {
                event.preventDefault();
                onClose();
            }}
            onClick={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
            className="border-azure/30 bg-navy-dark m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-3xl border p-0 text-white shadow-2xl backdrop:bg-black/75 backdrop:backdrop-blur-sm"
        >
            <div>
                <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3">
                    <p className="text-azure text-xs leading-relaxed">
                        {divisionName || member.divisionId || "BEM UMN Gen XVI"}
                    </p>
                    <button
                        type="button"
                        autoFocus
                        onClick={onClose}
                        aria-label="Tutup jendela rincian pengurus"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 hover:bg-white/10"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="grid gap-6 p-5 sm:gap-8 sm:p-8 md:grid-cols-2">
                    <div>
                        <div className="bg-blue-primary/40 relative mx-auto aspect-[2/3] w-full max-w-[320px] overflow-hidden rounded-2xl">
                            {photos.length ? (
                                <Image
                                    key={photos[selected]}
                                    src={photos[selected]}
                                    alt={`Potret ${member.name}, foto ${selected + 1}`}
                                    fill
                                    sizes="(max-width: 767px) 80vw, 320px"
                                    className="object-contain"
                                    priority
                                />
                            ) : (
                                <div className="text-azure flex h-full flex-col items-center justify-center gap-3">
                                    <span
                                        aria-hidden="true"
                                        className="font-serif text-6xl"
                                    >
                                        {initials}
                                    </span>
                                    <span className="text-xs">
                                        Foto segera hadir
                                    </span>
                                </div>
                            )}
                        </div>
                        {photos.length > 1 && (
                            <div
                                className="mt-3 flex justify-center gap-2"
                                aria-label="Pilih foto pengurus"
                            >
                                {photos.map((photo, index) => (
                                    <button
                                        key={photo}
                                        type="button"
                                        onClick={() => setSelected(index)}
                                        aria-label={`Lihat foto ${index + 1} ${member.name}`}
                                        aria-pressed={selected === index}
                                        className={`relative h-16 w-12 overflow-hidden rounded-lg border-2 transition-colors ${selected === index ? "border-azure" : "border-transparent hover:border-white/50"}`}
                                    >
                                        <Image
                                            src={photo}
                                            alt=""
                                            fill
                                            sizes="48px"
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="text-azure text-[10px] font-semibold tracking-[0.18em] uppercase">
                            Kenali pengurus
                        </p>
                        <h2
                            id="modal-member-name"
                            className="mt-3 font-serif text-3xl leading-tight sm:text-4xl"
                        >
                            {member.name}
                        </h2>
                        <p className="text-cream mt-3 text-sm leading-relaxed">
                            {member.role}
                        </p>
                        <div className="text-concrete/80 mt-6 border-t border-white/10 pt-5 text-sm leading-relaxed">
                            <p>
                                {divisionName ||
                                    member.divisionId ||
                                    "Badan Eksekutif Mahasiswa"}
                            </p>
                            <p className="mt-1">
                                Universitas Multimedia Nusantara
                            </p>
                            {member.major && (
                                <p className="mt-3">{member.major}</p>
                            )}
                            {member.nim && (
                                <p className="mt-1">NIM: {member.nim}</p>
                            )}
                        </div>
                        {member.quote && (
                            <blockquote className="border-azure/50 text-cream mt-6 border-l-2 pl-4 font-serif text-xl italic">
                                “{member.quote}”
                            </blockquote>
                        )}
                        {links.length > 0 && (
                            <div className="mt-6 flex flex-wrap gap-2">
                                {links.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.url}
                                        target={
                                            link.label === "Email"
                                                ? undefined
                                                : "_blank"
                                        }
                                        rel="noopener noreferrer"
                                        className="text-azure inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-4 text-xs hover:bg-white/10"
                                    >
                                        {link.label}
                                        <ArrowUpRight size={15} />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </dialog>
    );
}
