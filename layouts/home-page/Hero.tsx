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
            <div className="text-accent absolute bottom-12 scale-120 animate-bounce">
                <ChevronDown />
            </div>
            <div className="max-w-5xl px-6 text-center">
                {/* Logo + Title */}
                <div className="flex items-center justify-center gap-4">
                    <h1 className="text-primary text-5xl font-bold md:text-6xl">
                        BEM UMN
                    </h1>
                    <Image
                        src="/svgs/gen-logo.svg"
                        alt="Hero Graphic"
                        width={200}
                        height={200}
                        className="pb-9 drop-shadow-lg"
                        priority
                    />
                </div>

                {/* Tagline */}
                <h1
                    className={`text-primary min-h-[80px] pb-6 font-mono text-4xl leading-tight font-semibold drop-shadow-lg/30 md:text-6xl md:leading-tight`}
                >
                    Commit<span className="text-secondary">.</span> Solid
                    <span className="text-secondary">.</span> Integrated
                    <span className="text-secondary">.</span>
                </h1>
                <h2
                    className={`text-accent drop-shadow-accent min-h-[60px] pb-10 font-serif text-2xl leading-snug tracking-wide drop-shadow-md/30 md:text-3xl`}
                >
                    Contribute to Collaborate
                </h2>

                {/* Description */}
                <p className="text-foreground/70 mx-auto max-w-3xl pb-14 text-lg leading-relaxed md:text-xl">
                    Badan Eksekutif Mahasiswa Universitas Multimedia Nusantara
                    merupakan organisasi kemahasiswaan resmi tingkat universitas
                    di bawah Rektorat Bidang Kemahasiswaan.
                </p>

                <Link href="https://bit.ly/DAFTARBEMUMN2025">
                    <button className="bg-secondary text-background cursor-pointer rounded-xl px-6 py-3 font-medium hover:shadow-lg/30 hover:scale-105 active:scale-95 duration-500 shadow-md/30 transition-500">
                        Join Now!
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default Hero;
