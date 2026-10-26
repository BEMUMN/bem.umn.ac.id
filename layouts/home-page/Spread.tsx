const body = [
    "Kami percaya inklusivitas adalah akar inovasi. Dari ruang yang terbuka, ide tumbuh dari banyak sudut pandang, lalu menjadi solusi yang relevan dan berdampak nyata bagi lingkungan kampus.",
    "Karena itu halaman ini tidak kami tulis sendirian.",
];

// "Halaman Baru": the editorial spread after the pinned cover. Same navy paper,
// so the un-pin is seamless. One kinetic line; everything else reveals once.
export default function Spread() {
    return (
        <section
            className="spread ground-navy"
            data-sc-act="flow"
            aria-label="Halaman Baru"
        >
            <div className="spread__wrap">
                <div className="spread__left">
                    <p
                        className="spread__pull bem-display"
                        data-sc-cue="0.08 1 0.2 0.04"
                        data-sc-kinetic="lines"
                    >
                        Inklusivitas adalah akar inovasi.
                    </p>
                </div>

                <div className="spread__right" data-sc-in data-sc-stagger="60">
                    {body.map((p) => (
                        <p key={p} className="bem-body spread__body">
                            {p}
                        </p>
                    ))}
                    <p className="spread__you bem-display">
                        Ide kamu juga punya halaman di sini.
                    </p>
                </div>
            </div>
        </section>
    );
}
