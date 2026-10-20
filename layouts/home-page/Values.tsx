import LocalImage from "@/components/LocalImage";

const values = [
    {
        name: "Inclusive",
        image: "INCLUSIVE_supergrafik_2",
        subtitle: "Merangkul Seluruh Keberagaman Potensi",
        description:
            "Menjunjung tinggi kesetaraan, keterbukaan, dan penerimaan tanpa diskriminasi. Setiap mahasiswa UMN memiliki ruang dan kesempatan yang setara untuk didengar, berpartisipasi aktif, serta memberikan kontribusi bermakna bagi almamater.",
        symbolism:
            "Kurva lingkaran terbuka yang menyatukan beragam sudut pandang.",
    },
    {
        name: "Innovative",
        image: "INNOVATIVE_supergrafik_3",
        subtitle: "Gagasan Kreatif & Berani Berubah",
        description:
            "Solusi besar lahir dari gagasan kreatif yang disatukan dengan tujuan mulia untuk menjawab tantangan zaman dan memajukan peradaban kampus UMN.",
        symbolism:
            "Garis lengkung gelombang adaptif terhadap kemajuan teknologi.",
    },
    {
        name: "Solid",
        image: "SOLID_supergrafik_4",
        subtitle: "Fondasi Integritas & Komitmen",
        description:
            "Berlandaskan komitmen dan integritas yang kokoh serta dapat diandalkan dalam menavigasi tata kelola organisasi kemahasiswaan yang akuntabel.",
        symbolism: "Modul persegi bertingkat yang kokoh saling menopang.",
    },
    {
        name: "Collaborative",
        image: "COLLABORATIVE_supergrafik_1",
        subtitle: "Sinergi Lintas Fakultas & Organisasi",
        description:
            "Perbedaan keahlian, fakultas, dan latar belakang bukanlah sekat pemisah, melainkan kekuatan yang saling melengkapi demi mencapai visi kebersamaan KBM UMN.",
        symbolism:
            "Simpul anyaman yang menyatukan empat fakultas dalam satu harmoni.",
    },
];
export default function Values({ id }: { id: string }) {
    return (
        <section className="section" id={id}>
            <div className="container">
                <div className="section-head">
                    <h2>Nilai &amp; identitas kabinet.</h2>
                    <p>
                        Empat motif supergrafik resmi yang menjadi kompas gerak
                        BEM UMN Gen XVI dalam menavigasi dinamika organisasi
                        kemahasiswaan kampus.
                    </p>
                </div>
                <div className="values-list">
                    {values.map((value) => (
                        <article className="value-entry" key={value.name}>
                            <LocalImage
                                src={`/svgs/${value.image}.svg`}
                                alt={`Supergrafik ${value.name}`}
                                width={80}
                                height={80}
                            />
                            <div>
                                <h3>{value.name}</h3>
                                <p>
                                    <strong>{value.subtitle}</strong>
                                </p>
                                <p>{value.description}</p>
                                <p className="value-symbolism">
                                    {value.symbolism}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
