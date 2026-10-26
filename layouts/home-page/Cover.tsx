import Image from "next/image";
import Motif from "./Motif";

// The manual's cover: a printed title page, the sheet that peels away.
export default function Cover() {
    return (
        <div className="cover ground-paper">
            <div className="cover__art" aria-hidden="true">
                <div className="art art--solid" data-sc-parallax="0.7">
                    <Motif name="solid" />
                </div>
                <div className="art art--inclusive" data-sc-parallax="1.2">
                    <Motif name="inclusive" />
                </div>
                <div className="art art--collab" data-sc-parallax="0.9">
                    <Motif name="collaborative" />
                </div>
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
