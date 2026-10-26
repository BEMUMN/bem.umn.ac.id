import Motif, { type ValueId } from "./Motif";
import { GutterThread } from "@/components/GutterThread";

const values: { id: ValueId; name: string; body: string }[] = [
    {
        id: "solid",
        name: "Solid",
        body: "Kotak-kotak yang sama, disusun dari sudut berbeda, tetap membentuk struktur yang kokoh. Solid berarti kuat dan bisa diandalkan, apa pun posisinya.",
    },
    {
        id: "innovative",
        name: "Innovative",
        body: "Setiap setengah lingkaran adalah sepotong ide. Disatukan oleh tujuan, potongan kecil itu membentuk solusi yang lebih besar.",
    },
    {
        id: "collaborative",
        name: "Collaborative",
        body: "Sisi lengkung dan sisi tajam saling melengkapi. Perbedaan karakter, cara berpikir, dan keahlian bukan penghalang, melainkan bagian yang menyatukan.",
    },
    {
        id: "inclusive",
        name: "Inclusive",
        body: "Setiap elemen memancar dari pusat yang sama. Yang berbeda, ketika bersatu, menciptakan keseimbangan dan membentuk kilau.",
    },
];

// Two columns of two; reading order is down the left column, then the right.
const columns = [values.slice(0, 2), values.slice(2, 4)];

// "Yang besar lahir dari yang kecil." Ordinary flow: each value is its own flow
// act, and its --sc-p drives the Motif's --a, so the small pieces lock together.
export default function Nilai({ id }: { id: string }) {
    return (
        <section
            id={id}
            className="nilai ground-paper"
            aria-labelledby="nilai-title"
        >
            <div className="nilai__wrap">
                <header className="nilai__head" data-sc-in data-sc-stagger="80">
                    <h2 id="nilai-title" className="bem-display nilai__title">
                        Yang besar lahir dari yang kecil.
                    </h2>
                    <p className="bem-body nilai__lead">
                        Empat supergrafik BEM XVI disusun dari bentuk sederhana.
                        Masing-masing adalah satu nilai.
                    </p>
                </header>

                <div className="nilai__grid">
                    <GutterThread />
                    {columns.map((col, c) => (
                        <div
                            key={c}
                            className={`nilai__col nilai__col--${c + 1}`}
                        >
                            {col.map((v) => (
                                <article
                                    key={v.id}
                                    className={`val val--${v.id}`}
                                    data-sc-act="flow"
                                    aria-labelledby={`nilai-${v.id}`}
                                >
                                    <div className="val__fig">
                                        <Motif name={v.id} spread={0.6} />
                                    </div>
                                    <div
                                        className="val__txt"
                                        data-sc-in
                                        data-sc-stagger="70"
                                    >
                                        <h3
                                            className="val__name"
                                            id={`nilai-${v.id}`}
                                        >
                                            {v.name}
                                        </h3>
                                        <p className="bem-body val__body">
                                            {v.body}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
