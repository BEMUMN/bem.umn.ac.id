"use client";
import { useId, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { MemberCard } from "@/components/MemberCard";
import type { Member } from "@/constants/divisionMembers";

export function MemberRoster({
    members,
    onSelect,
}: {
    members: Member[];
    onSelect: (member: Member) => void;
}) {
    const [query, setQuery] = useState("");
    const id = useId();
    const filtered = useMemo(() => {
        const q = query.trim().toLocaleLowerCase("id");
        return members.filter((member) =>
            [member.name, member.role, member.major].some((value) =>
                value?.toLocaleLowerCase("id").includes(q),
            ),
        );
    }, [members, query]);
    return (
        <div className="mt-6">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="w-full sm:max-w-md">
                    <label
                        htmlFor={id}
                        className="text-azure mb-2 block text-xs font-semibold"
                    >
                        Cari pengurus
                    </label>
                    <div className="relative">
                        <Search
                            aria-hidden="true"
                            size={17}
                            className="text-azure pointer-events-none absolute top-1/2 left-4 -translate-y-1/2"
                        />
                        <input
                            id={id}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Nama, jabatan, atau jurusan"
                            className="placeholder:text-azure/70 focus:border-azure min-h-12 w-full rounded-xl border border-white/20 bg-white/5 pr-12 pl-11 text-sm text-white"
                        />
                        {query && (
                            <button
                                type="button"
                                onClick={() => setQuery("")}
                                aria-label="Bersihkan pencarian pengurus"
                                className="text-azure absolute top-1 right-1 flex h-10 w-10 items-center justify-center rounded-lg hover:bg-white/10"
                            >
                                <X size={17} />
                            </button>
                        )}
                    </div>
                </div>
                <p role="status" className="text-azure text-xs sm:pb-4">
                    {filtered.length} dari {members.length} pengurus
                </p>
            </div>
            {filtered.length ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filtered.map((member) => (
                        <MemberCard
                            key={member.name}
                            member={member}
                            onSelect={onSelect}
                        />
                    ))}
                </div>
            ) : (
                <div className="rounded-2xl border border-dashed border-white/20 px-5 py-12 text-center">
                    <h3 className="font-serif text-2xl text-white">
                        Pengurus tidak ditemukan
                    </h3>
                    <p className="text-azure mt-2 text-sm">
                        Coba nama, jabatan, atau jurusan lainnya.
                    </p>
                    <button
                        type="button"
                        onClick={() => setQuery("")}
                        className="border-azure/40 text-azure mt-5 min-h-11 rounded-full border px-5 text-xs font-semibold hover:bg-white/10"
                    >
                        Reset pencarian
                    </button>
                </div>
            )}
        </div>
    );
}
