import type { CSSProperties } from "react";

export type ValueId = "solid" | "innovative" | "collaborative" | "inclusive";

type Piece = {
    d?: string;
    rect?: [number, number, number, number];
    fill: string;
    use?: string;
};

const N = "var(--m-navy)";
const B = "var(--m-blue)";
const A = "var(--m-azure)";
const P = "var(--m-paper)";
const petal =
    "M358,320 C395,260 460,185 515,145 C535,132 546,145 534,172 C500,230 420,295 358,320 Z";

const geometry: Record<ValueId, Piece[]> = {
    solid: [
        { rect: [339, 85, 244, 245], fill: N },
        { rect: [419, 85, 164, 165], fill: P },
        { rect: [498, 85, 85, 85], fill: B },
        { rect: [216, 208, 123, 122], fill: A },
        { rect: [94, 330, 245, 245], fill: N },
        { rect: [94, 410, 165, 165], fill: P },
        { rect: [94, 489, 86, 86], fill: B },
        { rect: [339, 330, 123, 123], fill: A },
    ],
    innovative: [
        { d: "M198,182 L332,50 A94,94 0 0 1 198,182 Z", fill: N },
        { d: "M190,187 L322,322 A94,94 0 0 1 190,187 Z", fill: B },
        { d: "M65,323 L197,458 A94,94 0 0 0 65,323 Z", fill: A },
        { d: "M330,320 L467,190 A94,94 0 0 0 330,320 Z", fill: N },
        { d: "M480,205 L612,338 A94,94 0 0 1 480,205 Z", fill: A },
        { d: "M343,340 L473,472 A94,94 0 0 0 343,340 Z", fill: B },
        { d: "M197,470 L330,340 A94,94 0 0 1 197,470 Z", fill: N },
        { d: "M331,612 L467,480 A94,94 0 0 0 331,612 Z", fill: N },
    ],
    collaborative: [
        { d: "M114,110 H224 A115,115 0 0 1 339,225 V342 H114 Z", fill: N },
        { d: "M339,110 H564 V230 A112.5,112.5 0 0 1 339,230 Z", fill: A },
        { d: "M114,575 V455 A112.5,112.5 0 0 1 339,455 V575 Z", fill: A },
        { d: "M339,343 H564 V575 H452 A113,113 0 0 1 339,462 Z", fill: N },
    ],
    inclusive: [
        { d: petal, fill: A },
        { d: petal, fill: A, use: "translate(678,0) scale(-1,1)" },
        { d: petal, fill: A, use: "translate(0,668) scale(1,-1)" },
        { d: petal, fill: A, use: "translate(678,668) scale(-1,-1)" },
        {
            d: "M338,83 C346,150 348,240 342,280 Q345,318 392,331 C470,324 540,331 590,335 C540,339 470,344 392,340 Q345,350 342,388 C348,430 346,520 339,585 C332,520 330,430 336,388 Q333,350 286,340 C210,344 140,339 87,335 C140,330 210,324 286,328 Q333,318 336,280 C330,240 331,150 338,83 Z",
            fill: N,
        },
    ],
};

const seeds: Record<ValueId, number> = {
    solid: 3,
    innovative: 7,
    collaborative: 11,
    inclusive: 5,
};

// The four GSM supergraphics as separate pieces so they can assemble. Set --a on
// the <svg> (0 scattered, 1 assembled); pieces interpolate with transform only.
// Ported from bem-umn-gen-xvi-main (components/motifs/Motif.astro).
export default function Motif({
    name,
    spread = 1,
}: {
    name: ValueId;
    spread?: number;
}) {
    const seed = seeds[name];
    const pieces = geometry[name].map((p, i) => {
        const ang = ((i * 137.5 + seed * 29) % 360) * (Math.PI / 180);
        const dist = (150 + ((i * 53 + seed * 17) % 90)) * spread;
        const rot = (((i * 71 + seed * 13) % 70) - 35) * spread;
        return {
            ...p,
            dx: Math.round(Math.cos(ang) * dist),
            dy: Math.round(Math.sin(ang) * dist),
            r: Math.round(rot),
            i,
        };
    });
    return (
        <svg
            className={`motif motif--${name}`}
            viewBox="0 0 680 660"
            style={{ "--n": pieces.length - 1 } as CSSProperties}
            aria-hidden="true"
            focusable="false"
        >
            {pieces.map((p) => (
                <g
                    key={p.i}
                    className="m-piece"
                    style={
                        {
                            "--dx": p.dx,
                            "--dy": p.dy,
                            "--r": p.r,
                            "--i": p.i,
                        } as CSSProperties
                    }
                >
                    {p.rect ? (
                        <rect
                            x={p.rect[0]}
                            y={p.rect[1]}
                            width={p.rect[2]}
                            height={p.rect[3]}
                            fill={p.fill}
                        />
                    ) : (
                        <path d={p.d} fill={p.fill} transform={p.use} />
                    )}
                </g>
            ))}
        </svg>
    );
}
