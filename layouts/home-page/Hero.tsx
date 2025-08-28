import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type HeroProps = {
    id: string;
    className?: string;
};

const Hero = ({ id, className }: HeroProps) => {
    return (
        <section
            id={id}
            className={`text-foreground relative flex min-h-screen w-full items-center justify-center overflow-hidden ${className} font-monospace`}
        >
            <div className="relative max-w-5xl px-4 text-center sm:px-6">
                {/* Logo + Title */}
                <div className="pl-6 flex items-baseline justify-center gap-2 pb-5 md:pl-0 md:gap-4 md:pb-6">
                    <h1 className="text-primary text-start text-3xl font-bold text-balance sm:text-4xl md:block md:text-center md:text-6xl">
                        BEM UMN
                    </h1>
                    <Image
                        src="/svgs/gen-logo.svg"
                        alt="Hero Graphic"
                        width={210}
                        height={210}
                        className="w-28 drop-shadow-lg sm:w-40 md:w-[210px]"
                        priority
                    />
                </div>

                {/* Tagline */}
                <h1
                    className={`text-primary sfont-mono min-h-[50px] text-2xl leading-tight font-semibold text-balance drop-shadow-lg/30 sm:text-3xl md:min-h-[80px] md:pb-6 md:text-6xl md:leading-tight`}
                >
                    Commit<span className="text-secondary">.</span> Solid
                    <span className="text-secondary">.</span> Integrated
                    <span className="text-secondary">.</span>
                </h1>
                <h2
                    className={`text-accent drop-shadow-accent min-h-[50px] pb-3 font-serif text-lg leading-snug tracking-wide drop-shadow-md/30 sm:text-xl md:min-h-[60px] md:pb-10 md:text-3xl`}
                >
                    Contribute to Collaborate
                </h2>

                {/* Description */}
                <p className="text-foreground/70 mx-auto max-w-3xl px-2 pb-6 text-sm leading-5 sm:text-base md:pb-14 md:text-xl md:leading-relaxed">
                    Badan Eksekutif Mahasiswa Universitas Multimedia Nusantara
                    merupakan organisasi kemahasiswaan resmi tingkat universitas
                    di bawah Rektorat Bidang Kemahasiswaan.
                </p>

                <Link href="https://bit.ly/DAFTARBEMUMN2025">
                    <button className="bg-secondary text-background transition-500 cursor-pointer rounded-xl px-4 py-2 text-sm font-normal shadow-md/30 duration-500 hover:scale-105 hover:shadow-lg/30 active:scale-95 sm:px-5 sm:py-2.5 sm:text-base md:px-6 md:py-3 md:text-lg md:font-medium">
                        Join Now!
                    </button>
                </Link>
            </div>
            <div className="text-accent absolute bottom-24 left-0 flex w-full justify-center py-5 md:bottom-0">
                <ChevronDown className="scale-125 animate-bounce" />
            </div>
        </section>
    );
};

export default Hero;
