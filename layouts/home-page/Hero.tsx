import Image from "next/image";
import { Roboto_Mono, Playfair_Display } from "next/font/google";

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
			className={`w-full min-h-screen flex justify-center items-center text-foreground relative overflow-hidden ${className}`}
		>
			<div className="text-center px-6 max-w-5xl">
				{/* Logo + Title */}
				<div className="flex items-center gap-4 justify-center pb-8">
					<Image
						src="/svgs/gen-logo.svg"
						alt="Hero Graphic"
						width={110}
						height={110}
						className="drop-shadow-lg"
						priority
					/>
					<h1 className="text-5xl md:text-6xl font-semibold text-primary">
						BEM UMN
					</h1>
				</div>

				{/* Tagline */}
				<h1
					className={`font-mono text-4xl md:text-6xl font-semibold pb-6 text-primary drop-shadow-lg/30 leading-tight md:leading-tight min-h-[80px]`}
				>
					Commit. Solid. Integrated.
				</h1>
				<h2
					className={`font-serif text-2xl md:text-3xl text-accent pb-10 tracking-wide leading-snug min-h-[60px] drop-shadow-md/30 drop-shadow-accent`}
				>
					Contribute to Collaborate
				</h2>

				{/* Description */}
				<p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
					Badan Eksekutif Mahasiswa Universitas Multimedia Nusantara
					merupakan organisasi kemahasiswaan resmi tingkat universitas
					di bawah Rektorat Bidang Kemahasiswaan.
				</p>

				{/* CTA */}
				<div className="mt-10 flex justify-center gap-4">
					<button className="px-6 py-3 cursor-pointer rounded-xl bg-secondary text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition">
						Join Us
					</button>
				</div>
			</div>
		</section>
	);
};

export default Hero;
