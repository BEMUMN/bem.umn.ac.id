import Image from "next/image";

// The first page of chapter 2, printed on the page underneath the cover.
// Revealed by the fold, so it carries no scroll cues of its own.
export default function HalamanBaru() {
    return (
        <div className="under ground-navy">
            <div className="under__copy">
                <h2 className="under__title bem-display">
                    Setiap generasi membuka halaman baru.
                </h2>
                <p className="under__lead">
                    Lipatan kertas pada angka XVI adalah halaman yang sedang
                    dibuka: keterbukaan BEM XVI pada aspirasi yang beragam dan
                    ide yang tak terbatas.
                </p>
            </div>
            <Image
                className="under__logo"
                src="/pngs/gen-xvi-light.webp"
                alt=""
                width={700}
                height={248}
            />
        </div>
    );
}
