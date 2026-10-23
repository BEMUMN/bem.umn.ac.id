import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ArrowUpRight } from "lucide-react";

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
                    className="object-cover object-center brightness-[0.55] contrast-105 saturate-70 filter"
                />
            </div>

            {/* Tekstur Kanvas Halus */}
            <div
                className="pointer-events-none absolute inset-0 -z-15 opacity-20"
                style={{
                    backgroundImage: `url('/pngs/texture/ASSET.webp')`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "220px",
                }}
            />

            {/* Gradient Overlays */}
            <div className="from-navy-dark/85 via-navy-dark/65 to-navy-dark/95 absolute inset-0 -z-10 bg-gradient-to-b" />

            {/* CENTER CONTENT */}
            <div className="hero-content scroll-reveal relative z-10 my-auto flex w-full max-w-5xl flex-col items-center text-center">
                {/* Floating Micro-Badge */}
                <div className="border-camel-brown/40 text-pale-taupe inline-flex items-center gap-2 rounded-full border bg-white/10 px-4 py-1.5 font-sans text-[10px] leading-relaxed font-semibold tracking-wider uppercase sm:text-xs">
                    <span>
                        Universitas Multimedia Nusantara • Kabinet Generasi XVI
                    </span>
                </div>

                {/* Label Nama Lembaga di Atas Logo (Diturunkan Lebih Rapat ke Logo) */}
                <p className="mt-8 mb-0 font-serif text-lg font-bold tracking-wide text-white italic drop-shadow-md sm:mt-9 sm:text-xl md:mt-10 md:text-2xl">
                    Badan Eksekutif Mahasiswa
                </p>

                {/* Centerpiece: Logo BEM Gen XVI — h1 untuk semantik halaman, tampilan identik */}
                <h1 className="relative mt-0.5 mb-4 flex items-center justify-center sm:mt-1 md:mt-1.5">
                    <span className="sr-only">
                        BEM UMN Generasi XVI — Inclusive for Innovation
                    </span>
                    <Image
                        src="/svgs/BEM_GEN_16_LOGO_LIGHT.svg"
                        alt=""
                        aria-hidden="true"
                        width={540}
                        height={250}
                        priority
                        className="hero-mark h-24 w-auto sm:h-32 md:h-36 lg:h-40"
                    />
                </h1>

                {/* Subtitle Deskripsi */}
                <p className="text-concrete/90 mx-auto mt-2 max-w-2xl font-sans text-sm leading-relaxed sm:text-base md:text-lg">
                    Lembaga eksekutif mahasiswa tertinggi di Universitas
                    Multimedia Nusantara. Merangkul keberagaman ide dan sudut
                    pandang untuk menciptakan inovasi yang berdampak nyata bagi
                    seluruh civitas akademika.
                </p>

                {/* Tagline Resmi Sebagai Hashtag di Bawah Deskripsi */}
                <div className="mt-3">
                    <span className="text-azure decoration-azure/40 font-serif text-base font-bold tracking-wider italic underline underline-offset-4 sm:text-lg md:text-xl">
                        #InclusiveforInnovation
                    </span>
                </div>

                {/* Action Button: Single Centered CTA */}
                <div className="hero-actions mt-7 flex w-full items-center justify-center">
                    <Link
                        href="/tentang-kami"
                        className="group border-azure bg-azure text-navy-dark focus-visible:ring-azure inline-flex items-center gap-2.5 rounded-full border px-8 py-3.5 font-sans text-xs font-bold shadow-lg transition-all duration-300 hover:bg-white focus:outline-none focus-visible:ring-2 active:scale-95 sm:text-sm"
                    >
                        <span>Kenali BEM Gen XVI</span>
                        <ArrowUpRight
                            size={17}
                            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                    </Link>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="scroll-reveal relative z-10 mt-8 mb-2 flex w-full justify-center">
                <a
                    href="#tentang"
                    aria-label="Scroll ke bagian Tentang Kami"
                    className="group text-azure/70 focus-visible:ring-azure inline-flex flex-col items-center gap-1 rounded-full p-2 transition-colors hover:text-white focus:outline-none focus-visible:ring-2"
                >
                    <span className="text-pale-taupe/80 group-hover:text-azure font-sans text-[10px] font-medium tracking-widest uppercase transition-colors">
                        Gulir
                    </span>
                    <ChevronDown
                        size={16}
                        className="text-azure animate-bounce"
                    />
                </a>
            </div>
        </section>
    );
};

export default Hero;
