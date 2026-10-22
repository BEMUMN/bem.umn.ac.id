import Image from "next/image";
import type { DivisionItem } from "@/components/DivisionCard";
import type { Member } from "@/constants/divisionMembers";

export function DivisionHeader({
    division,
    count,
    heading = "h1",
    leader,
}: {
    division: DivisionItem;
    count: number;
    heading?: "h1" | "h2";
    leader?: Member;
}) {
    const Heading = heading;
    return (
        <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/[0.04]">
            <div className="grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12 lg:p-10">
                <div>
                    <p className="text-azure text-xs font-semibold tracking-[0.16em] uppercase">
                        {division.name} · BEM UMN Gen XVI
                    </p>
                    <Heading className="mt-4 max-w-xl font-serif text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
                        {division.fullname}
                    </Heading>
                    <p className="text-concrete/85 mt-5 max-w-xl text-sm leading-7 sm:text-base">
                        {division.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-5 text-xs leading-relaxed">
                        <p className="text-azure">
                            <strong className="text-white">{count}</strong>{" "}
                            pengurus
                        </p>
                        {leader && (
                            <p className="text-azure">
                                {leader.role}:{" "}
                                <strong className="font-medium text-white">
                                    {leader.name}
                                </strong>
                            </p>
                        )}
                    </div>
                </div>
                <figure className="mx-auto w-full max-w-[280px] lg:max-w-[300px]">
                    <Image
                        src={division.imageUrl}
                        alt={`Foto grup ${division.fullname}`}
                        width={1446}
                        height={2576}
                        sizes="(max-width: 639px) 250px, 300px"
                        priority
                        className="h-auto w-full rounded-2xl border border-white/10"
                    />
                    <figcaption className="text-azure mt-3 text-center text-[11px] tracking-wide">
                        {division.name} · Generasi XVI
                    </figcaption>
                </figure>
            </div>
        </div>
    );
}
