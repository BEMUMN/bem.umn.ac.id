import type { ReactNode } from "react";

type PeelProps = {
    /** unique per page; namespaces the SVG gradient ids */
    name: string;
    sheet: ReactNode;
    under: ReactNode;
    from?: number;
    to?: number;
    rest?: number;
    lift?: number;
    hover?: boolean;
    /** the under page is only a preview of where the turn leads */
    inertUnder?: boolean;
};

// The sheet folds back from the bottom-right corner (the XVI dog-ear) as the
// parent [data-sc-act] scrolls; lib/peel.ts drives it from --sc-p.
// Place it as the only child of a pinned act's [data-sc-stage].
export default function Peel({
    name,
    sheet,
    under,
    from = 0.1,
    to = 0.8,
    rest = 0,
    lift = 0.6,
    hover = false,
    inertUnder = false,
}: PeelProps) {
    return (
        <div
            className="peel"
            data-peel
            data-peel-from={from}
            data-peel-to={to}
            data-peel-rest={rest}
            data-peel-lift={lift}
            data-peel-hover={hover ? "" : undefined}
        >
            <div className="peel__under" inert={inertUnder}>
                {under}
            </div>
            <svg
                className="peel__fx peel__cast"
                aria-hidden="true"
                focusable="false"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient
                        id={`${name}-c`}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop
                            offset="0"
                            stopColor="#0F1E3F"
                            stopOpacity="0.42"
                        />
                        <stop
                            offset="0.35"
                            stopColor="#0F1E3F"
                            stopOpacity="0.16"
                        />
                        <stop offset="1" stopColor="#0F1E3F" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <polygon fill={`url(#${name}-c)`} points="" />
            </svg>
            <div className="peel__sheet">{sheet}</div>
            <svg
                className="peel__fx peel__flap"
                aria-hidden="true"
                focusable="false"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient
                        id={`${name}-f`}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0" stopColor="#C9BBA5" />
                        <stop offset="0.07" stopColor="#E4D9C8" />
                        <stop offset="0.3" stopColor="#F7F1E7" />
                        <stop offset="0.72" stopColor="#EEE5D9" />
                        <stop offset="1" stopColor="#DCCFBC" />
                    </linearGradient>
                </defs>
                <polygon
                    className="peel__flap-shadow-b"
                    fill="#0F1E3F"
                    fillOpacity="0.07"
                    points=""
                />
                <polygon
                    className="peel__flap-shadow-a"
                    fill="#0F1E3F"
                    fillOpacity="0.1"
                    points=""
                />
                <polygon
                    className="peel__flap-paper"
                    fill={`url(#${name}-f)`}
                    stroke="#FFFFFF"
                    strokeOpacity="0.55"
                    strokeWidth="1"
                    points=""
                />
            </svg>
        </div>
    );
}
