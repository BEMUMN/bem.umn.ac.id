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
            className={`relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden px-4 pt-28 pb-10 sm:px-6 md:pt-36 ${className}`}
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
            <div className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center my-auto">
                {/* Floating Micro-Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-azure/40 bg-white/10 px-4 py-1.5 font-sans text-xs font-semibold tracking-wider text-azure uppercase backdrop-blur-md shadow-lg">
                    <Sparkles size={14} className="text-azure animate-pulse" />
                    <span>Universitas Multimedia Nusantara • Kabinet Generasi XVI</span>
                </div>

                {/* PAIRING UTAMA: Teks "BEM" di Kiri + Logo Gen XVI di Kanan (Top & Bottom Perfectly Aligned) */}
                <div className="my-6 flex items-center justify-center gap-3 sm:gap-5 md:gap-8">
                    {/* Teks "BEM" Vektor Apple Garamond dengan baseline & cap-height identik */}
                    <div className="relative flex items-center justify-center">
                        <Image
                            src="/svgs/BEM_TEXT_LIGHT.svg"
                            alt="BEM"
                            width={318}
                            height={250}
                            priority
                            className="h-14 sm:h-20 md:h-28 lg:h-32 xl:h-36 w-auto drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]"
                        />
                    </div>

                    {/* Logo BEM Gen XVI Berdiri Berdampingan */}
                    <div className="relative flex items-center justify-center">
                        <Image
                            src="/svgs/BEM_GEN_16_LOGO_LIGHT.svg"
                            alt="BEM GEN XVI — Inclusive for Innovation"
                            width={540}
                            height={250}
                            priority
                            className="h-14 sm:h-20 md:h-28 lg:h-32 xl:h-36 w-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                        />
                    </div>
                </div>

                {/* Tagline Resmi */}
                <h1 className="font-sans text-xl font-semibold tracking-[0.2em] text-azure uppercase drop-shadow sm:text-2xl md:text-3xl">
                    Inclusive for Innovation
                </h1>

                {/* Subtitle Deskripsi */}
                <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-concrete/90 sm:text-base md:text-lg">
                    Lembaga eksekutif mahasiswa tertinggi di Universitas Multimedia Nusantara.
                    Merangkul keberagaman ide dan sudut pandang untuk menciptakan inovasi
                    yang berdampak nyata bagi seluruh civitas akademika.
                </p>

                {/* Action Button: Single Centered CTA */}
                <div className="mt-8 flex w-full items-center justify-center">
                    <Link
                        href="/tentang-kami"
                        className="group inline-flex items-center gap-2.5 rounded-full border border-azure bg-azure px-8 py-3.5 font-sans text-xs sm:text-sm font-bold text-navy-dark shadow-xl shadow-azure/25 transition-all duration-300 hover:scale-105 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-azure active:scale-95"
                    >
                        <span>Kenali BEM Gen XVI</span>
                        <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                </div>
            </div>

            {/* EXECUTIVE CREDIBILITY RIBBON */}
            <div className="relative z-10 mt-10 w-full max-w-5xl">
                <div className="grid grid-cols-2 gap-3 rounded-2xl border border-white/15 bg-navy-dark/70 p-3.5 backdrop-blur-xl sm:grid-cols-4 md:gap-4 md:p-4">
                    <div className="flex flex-col items-center justify-center border-r border-white/10 last:border-r-0 sm:border-r">
                        <span className="font-serif text-lg sm:text-xl font-bold text-white">17 Nov 2008</span>
                        <span className="font-sans text-[10px] sm:text-xs text-azure/80 text-center">Berdiri Resmi</span>
                    </div>
                    <div className="flex flex-col items-center justify-center border-r-0 sm:border-r border-white/10">
                        <span className="font-serif text-lg sm:text-xl font-bold text-azure">6 Kegiatan</span>
                        <span className="font-sans text-[10px] sm:text-xs text-concrete/80 text-center">Mahasiswa (KEGMA)</span>
                    </div>
                    <div className="flex flex-col items-center justify-center border-r border-white/10 last:border-r-0 sm:border-r">
                        <span className="font-serif text-lg sm:text-xl font-bold text-white">4 Fakultas</span>
                        <span className="font-sans text-[10px] sm:text-xs text-azure/80 text-center">10 Himpunan Program</span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <span className="font-serif text-lg sm:text-xl font-bold text-azure">25+ Ormawa</span>
                        <span className="font-sans text-[10px] sm:text-xs text-concrete/80 text-center">UKM &amp; LSO Bina Lembaga</span>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="mt-4 flex w-full justify-center">
                    <a
                        href="#tentang"
                        aria-label="Scroll ke bagian Tentang Kami"
                        className="flex items-center gap-1.5 text-azure/70 transition-colors hover:text-white"
                    >
                        <span className="font-sans text-[10px] font-medium tracking-widest uppercase">Gulir</span>
                        <ChevronDown size={14} className="animate-bounce" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
