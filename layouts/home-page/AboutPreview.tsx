import LocalImage from "@/components/LocalImage";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const missionPoints = [
    {
        num: "01",
        title: "Internal Kolaboratif & Profesional",
        desc: "Menciptakan internal organisasi yang kolaboratif dengan menjunjung tinggi inklusifitas dan profesionalitas.",
    },
    {
        num: "02",
        title: "Komunikasi Terbuka Antarorganisator",
        desc: "Meningkatkan hubungan antar BEM UMN dan organisator agar dapat bekerja sama melalui komunikasi secara terbuka.",
    },
    {
        num: "03",
        title: "Pengembangan Inovasi & Potensi",
        desc: "Mendukung pengembangan inovasi dan potensi mahasiswa melalui kegiatan yang positif dan berdampak nyata.",
    },
];

export default function AboutPreview({ id }: { id: string }) {
    return (
        <section id={id} className="section">
            <div className="container">
                <div className="section-head">
                    <h2>Tentang kami.</h2>
                    <Link className="text-link" href="/tentang-kami">
                        Pelajari visi, misi &amp; filosofi{" "}
                        <ArrowUpRight size={18} aria-hidden="true" />
                    </Link>
                </div>
                <div className="about-layout">
                    <aside className="about-aside">
                        <blockquote className="about-statement">
                            “Wadah kolaborasi yang merangkul setiap perbedaan
                            ide dan sudut pandang, mentransformasikannya menjadi
                            inovasi nyata bagi KBM UMN.”
                        </blockquote>
                        <LocalImage
                            src="/svgs/COLLABORATIVE_supergrafik_1.svg"
                            width={128}
                            height={128}
                            alt=""
                        />
                        <p className="small">Komitmen Kabinet Generasi XVI</p>
                        <dl className="about-facts">
                            <div>
                                <dt>Naungan</dt>
                                <dd>Rektorat Kemahasiswaan</dd>
                            </div>
                            <div>
                                <dt>Arah gerak</dt>
                                <dd>Inklusif &amp; Kolaboratif</dd>
                            </div>
                        </dl>
                    </aside>
                    <div>
                        <h3>
                            Mewadahi Aspirasi Mahasiswa, Mendorong Inovasi
                            Berkelanjutan
                        </h3>
                        <p className="mt-6">
                            Badan Eksekutif Mahasiswa Universitas Multimedia
                            Nusantara (BEM UMN) adalah lembaga eksekutif
                            tertinggi di tingkat universitas. Sebagai episentrum
                            dinamika kemahasiswaan, BEM UMN menaungi Himpunan
                            Mahasiswa, UKM, LSO, serta 6 Kegiatan Mahasiswa
                            (KEGMA).
                        </p>
                        <div className="mission-list">
                            {missionPoints.map((m) => (
                                <div key={m.num}>
                                    <h3>{m.title}</h3>
                                    <p>{m.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
