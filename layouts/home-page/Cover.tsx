import type { CSSProperties } from "react";
import Image from "next/image";
import Motif from "./Motif";

const art = [
    { cls: "art--solid", motif: "solid", rate: 0.7 },
    { cls: "art--inclusive", motif: "inclusive", rate: 1.2 },
    { cls: "art--collab", motif: "collaborative", rate: 0.9 },
] as const;

// The manual's cover: a printed title page, the sheet that peels away.
// `still` is the copy shown at the end of the page: the art holds where the
// engine parks it at the very top (p = 0), so looping back lands without a jump.
export default function Cover({ still = false }: { still?: boolean }) {
    return (
        <div className="cover ground-paper">
            <div className="cover__art" aria-hidden="true">
                {art.map((a) => (
                    <div
                        key={a.cls}
                        className={`art ${a.cls}${still ? "art--still" : ""}`}
                        data-sc-parallax={still ? undefined : a.rate}
                        style={
                            still
                                ? ({
                                      "--rest-y": `${a.rate * -50}px`,
                                  } as CSSProperties)
                                : undefined
                        }
                    >
                        <Motif name={a.motif} />
                    </div>
                ))}
            </div>

            <div className="cover__title">
                <p className="cover__kicker">Commit. Solid. Integrated.</p>
                <h1 className="cover__h1 bem-display">
                    BEM{" "}
                    <Image
                        className="cover__gen"
                        src="/pngs/gen-xvi-dark.webp"
                        alt="Gen XVI"
                        width={700}
                        height={248}
                        priority
                    />
                </h1>
                <p className="bem-pill cover__pill">Inclusive for Innovation</p>
            </div>

            <div className="cover__colophon">
                <p className="cover__org">
                    Badan Eksekutif Mahasiswa Universitas Multimedia Nusantara
                </p>
            </div>
        </div>
    );
}
