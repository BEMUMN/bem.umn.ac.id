import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ArrowUpRight, Sparkles } from "lucide-react";

type HeroProps = {
    id: string;
    className?: string;
};

const Hero = ({ id, className }: HeroProps) => {
    return (
        <section
            id={id}
            className={`relative isolate flex min-h-screen w-full flex-col items-center justify-between overflow-hidden px-4 pt-28 pb-10 sm:px-6 md:pt-36 ${className}`}
        >
            {/* Latar Belakang Pelantikan dengan Gradasi & Tekstur */}
            <div className="absolute inset-0 -z-20">
                <Image
                    src="/pngs/gallery/background.webp"
                    alt="Pelantikan Organisasi BEM UMN GEN XVI"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center filter brightness-[0.35] contrast-125 saturate-60"
                />
            </div>

            {/* Tekstur Kanvas Halus */}
            <div
                className="absolute inset-0 -z-15 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `url('/pngs/texture/ASSET.webp')`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "220px",
                }}
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-dark/85 via-navy-dark/65 to-navy-dark/95" />
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(47,72,109,0.35)_0%,rgba(15,30,63,0.9)_100%)]" />

            {/* CENTER CONTENT */}
            <div className="scroll-reveal relative z-10 my-auto flex w-full max-w-5xl flex-col items-center text-center">
                {/* Floating Micro-Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-camel-brown/40 bg-white/10 px-4 py-1.5 font-sans text-[10px] leading-relaxed sm:text-xs font-semibold tracking-wider text-pale-taupe uppercase shadow-lg backdrop-blur-md">
                    <Sparkles size={14} className="animate-pulse text-camel-brown" />
                    <span>Universitas Multimedia Nusantara • Kabinet Generasi XVI</span>
                </div>

                {/* Label Nama Lembaga di Atas Logo (Diturunkan Lebih Rapat ke Logo) */}
                <p className="mt-8 font-serif text-lg font-bold italic tracking-wide text-white drop-shadow-md sm:mt-9 sm:text-xl md:mt-10 md:text-2xl mb-0">
                    Badan Eksekutif Mahasiswa
                </p>

                {/* Centerpiece: Logo BEM Gen XVI — h1 untuk semantik halaman, tampilan identik */}
                <h1 className="relative mt-0.5 mb-4 sm:mt-1 md:mt-1.5 flex items-center justify-center">
                    <span className="sr-only">BEM UMN Generasi XVI — Inclusive for Innovation</span>
                    <Image
                        src="/svgs/BEM_GEN_16_LOGO_LIGHT.svg"
                        alt=""
                        aria-hidden="true"
                        width={540}
                        height={250}
                        priority
                        className="h-20 w-auto drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)] sm:h-28 md:h-36 lg:h-40 xl:h-44"
                    />
                </h1>

                {/* Subtitle Deskripsi */}
                <p className="mx-auto mt-2 max-w-2xl font-sans text-sm leading-relaxed text-concrete/90 sm:text-base md:text-lg">
                    Lembaga eksekutif mahasiswa tertinggi di Universitas Multimedia Nusantara.
                    Merangkul keberagaman ide dan sudut pandang untuk menciptakan inovasi
                    yang berdampak nyata bagi seluruh civitas akademika.
                </p>

                {/* Tagline Resmi Sebagai Hashtag di Bawah Deskripsi */}
                <div className="mt-3">
                    <span className="font-serif text-base font-bold italic tracking-wider text-azure underline decoration-azure/40 underline-offset-4 sm:text-lg md:text-xl">
                        #InclusiveforInnovation
                    </span>
                </div>

                {/* Action Button: Single Centered CTA */}
                <div className="mt-8 flex w-full items-center justify-center">
                    <Link
                        href="/tentang-kami"
                        className="group inline-flex items-center gap-2.5 rounded-full border border-azure bg-azure px-8 py-3.5 font-sans text-xs font-bold text-navy-dark shadow-xl shadow-azure/25 transition-all duration-300 hover:scale-105 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-azure active:scale-95 sm:text-sm"
                    >
                        <span>Kenali BEM Gen XVI</span>
                        <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="scroll-reveal relative z-10 mt-8 mb-2 flex w-full justify-center">
                <a
                    href="#tentang"
                    aria-label="Scroll ke bagian Tentang Kami"
                    className="group inline-flex flex-col items-center gap-1 text-azure/70 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-azure rounded-full p-2"
                >
                    <span className="font-sans text-[10px] font-medium tracking-widest uppercase text-pale-taupe/80 group-hover:text-azure transition-colors">
                        Gulir
                    </span>
                    <ChevronDown size={16} className="animate-bounce text-azure" />
                </a>
            </div>
        </section>
    );
};

export default Hero;
