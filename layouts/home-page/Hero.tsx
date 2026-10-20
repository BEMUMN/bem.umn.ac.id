import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import ResponsivePhoto from "@/components/ResponsivePhoto";

type HeroProps = { id: string; className?: string };
export default function Hero({ id, className = "" }: HeroProps) {
    return (
        <section id={id} className={`hero ${className}`}>
            <link
                rel="preload"
                as="image"
                type="image/avif"
                imageSrcSet="/images/pelantikan-480.avif 480w, /images/pelantikan-960.avif 960w, /images/pelantikan-1600.avif 1600w"
                imageSizes="(max-width: 639px) 90vw, 45vw"
                fetchPriority="high"
            />
            <div className="container">
                <div className="hero-top small">
                    <p>Badan Eksekutif Mahasiswa</p>
                    <p>#InclusiveForInnovation</p>
                </div>
                <div className="hero-layout">
                    <div>
                        <h1 className="hero-title">
                            <span>BEM UMN</span>
                            <span>Generasi XVI</span>
                        </h1>
                        <div className="hero-copy">
                            <p>
                                Lembaga eksekutif mahasiswa tertinggi di
                                Universitas Multimedia Nusantara. Merangkul
                                keberagaman ide dan sudut pandang untuk
                                menciptakan inovasi yang berdampak nyata bagi
                                seluruh civitas akademika.
                            </p>
                            <Link
                                className="button"
                                href="/tentang-kami"
                                prefetch={false}
                            >
                                Kenali BEM Gen XVI{" "}
                                <ArrowUpRight size={18} aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                    <figure className="hero-visual">
                        <ResponsivePhoto
                            className="hero-fold"
                            name="shared-sheets"
                            width={1536}
                            height={1024}
                            sizes="(max-width: 639px) 70vw, 35vw"
                            alt=""
                        />
                        <div className="hero-photo">
                            <ResponsivePhoto
                                name="pelantikan"
                                alt="Pelantikan Organisasi BEM UMN GEN XVI"
                                width={2576}
                                height={1448}
                                eager
                            />
                        </div>
                        <figcaption className="hero-caption">
                            <span>
                                Pelantikan Organisasi
                                <br />
                                BEM UMN GEN XVI
                            </span>
                            <Image
                                src="/images/cabinet-mark.webp"
                                unoptimized
                                className="hero-logo"
                                width={2442}
                                height={1130}
                                alt="Logo resmi Generasi XVI"
                            />
                        </figcaption>
                    </figure>
                </div>
                <div className="hero-bottom">
                    <div className="hero-shortcuts">
                        <a className="text-link" href="#kegiatan">
                            Program &amp; kegiatan{" "}
                            <ArrowDown size={16} aria-hidden="true" />
                        </a>
                        <Link
                            href="/divisi"
                            className="text-link"
                            prefetch={false}
                        >
                            Divisi &amp; anggota{" "}
                            <ArrowUpRight size={16} aria-hidden="true" />
                        </Link>
                    </div>
                    <p>Commit. Solid. Integrated.</p>
                </div>
            </div>
        </section>
    );
}
