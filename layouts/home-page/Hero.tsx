import Image from "next/image";
import { Roboto_Mono, Playfair_Display } from "next/font/google";
import Link from "next/link";

// Preload font
const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: ["500", "600"] });
const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "700"],
});

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
            <div className="max-w-5xl px-6 text-center">
                {/* Logo + Title */}
                <div className="flex items-center justify-center gap-4 pb-8">
                    <Image
                        src="/svgs/gen-logo.svg"
                        alt="Hero Graphic"
                        width={110}
                        height={110}
                        className="drop-shadow-lg"
                        priority
                    />
                    <h1 className="text-primary text-5xl font-bold md:text-6xl">
                        BEM UMN
                    </h1>
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
                <p className="text-foreground/70 mx-auto max-w-3xl text-lg leading-relaxed md:text-xl">
                    Badan Eksekutif Mahasiswa Universitas Multimedia Nusantara
                    merupakan organisasi kemahasiswaan resmi tingkat universitas
                    di bawah Rektorat Bidang Kemahasiswaan.
                </p>

                {/* CTA */}
                <div className="mt-10 flex justify-center gap-4">
                    <div className="group relative">
                        <button
                            disabled
                            className="bg-secondary disabled:cursor-default rounded-xl px-6 py-3 font-medium text-background opacity-70 shadow-md/30 transition"
                        >
                            Join Us !
                        </button>

                        {/* Tooltip */}
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 rounded-lg bg-gray-800 px-4 py-1 text-sm text-white shadow-md transition-all group-hover:scale-100">
                            Coming soon!
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
