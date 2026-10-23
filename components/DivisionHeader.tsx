import { DivisionPhoto } from "@/components/DivisionPhoto";
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
        <div
            data-motion="soft"
            className="overflow-hidden rounded-3xl border border-white/15 bg-white/[0.04]"
        >
            <DivisionPhoto division={division} priority wide />
            <div className="p-6 sm:p-8 lg:p-10">
                <div>
                    <p className="text-azure text-xs font-semibold tracking-[0.16em] uppercase">
                        {division.name} · BEM UMN Gen XVI
                    </p>
                    <Heading className="mt-4 max-w-3xl font-serif text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
                        {division.fullname}
                    </Heading>
                    <p className="text-concrete/85 mt-5 max-w-3xl text-sm leading-7 sm:text-base">
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
            </div>
        </div>
    );
}
