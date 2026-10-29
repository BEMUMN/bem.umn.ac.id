import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function AboutPreview({ id }: { id: string }) {
    return (
        <section id={id} className="home-about home-frame" aria-labelledby="home-about-title">
            <div className="home-about-copy">
                <h2 id="home-about-title">BEM Gen XVI</h2>
                <p>Badan Eksekutif Mahasiswa Universitas Multimedia Nusantara adalah lembaga eksekutif mahasiswa tertinggi di tingkat universitas. Kami menjadi wadah pengembangan potensi dan kontribusi mahasiswa, baik di dalam maupun di luar ruang akademik.</p>
                <p>Melalui semangat <em>Inclusive for Innovation</em>, kami merangkul keberagaman ide, sudut pandang, dan latar belakang untuk menghadirkan kegiatan yang positif dan berdampak bagi mahasiswa UMN.</p>
                <p className="home-about-signature">Beragam ide. Satu ruang untuk bertumbuh.</p>
            </div>
            <div className="home-about-photo">
                <figure>
                    <Image src="/pngs/gallery/bem-gen-xvi.webp" alt="Pengurus BEM UMN Generasi XVI duduk bersama di auditorium" width={5775} height={3242} sizes="(max-width: 900px) 100vw, 46vw" />
                </figure>
                <Link href="/tentang-kami" className="home-button">Kenali BEM lebih jauh<ArrowUpRight size={18} aria-hidden="true" /></Link>
            </div>
        </section>
    );
}
