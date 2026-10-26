import Image from "next/image";
import Peel from "@/components/Peel";

const W = 2576;
const H = 1448;

// The peak: an almost empty navy page (authored silence), then the sheet peels
// off and the whole cabinet is standing there.
export default function Kabinet({ id }: { id: string }) {
    return (
        <section
            id={id}
            data-chapter="kabinet"
            className="kabinet"
            data-sc-act="pin"
            data-sc-span="3.2"
            data-span-mobile="3.6"
            style={{ "--ar": (W / H).toFixed(4) } as React.CSSProperties}
        >
            <div data-sc-stage>
                <Peel
                    name="kabinet"
                    from={0.26}
                    to={0.74}
                    lift={0.72}
                    sheet={
                        <div className="kabinet__sheet">
                            <p className="kabinet__silence">
                                Halaman tidak membuka dirinya sendiri.
                            </p>
                        </div>
                    }
                    under={
                        <div className="kabinet__under">
                            <div className="kabinet__photo">
                                <Image
                                    src="/pngs/gallery/background.webp"
                                    alt="Fungsionaris BEM UMN Gen XVI berdiri bersama di panggung Pelantikan Organisator."
                                    width={W}
                                    height={H}
                                    sizes="(max-aspect-ratio: 1/1) 178vh, 100vw"
                                    priority
                                />
                            </div>
                            <div
                                className="kabinet__scrim"
                                aria-hidden="true"
                            />
                            <div
                                className="kabinet__copy"
                                data-sc-cue="0.68 1 0.1 0"
                                data-sc-rise="0"
                            >
                                <h2 className="kabinet__title">
                                    Generasi XVI.
                                </h2>
                                <p className="kabinet__caption">
                                    Fungsionaris BEM UMN Gen XVI pada Pelantikan
                                    Organisator.
                                </p>
                            </div>
                        </div>
                    }
                />
            </div>
        </section>
    );
}
