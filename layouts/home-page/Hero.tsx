import Image from "next/image";

const Hero = ({ id }: { id: string }) => {
	return (
		<section
			id={id}
			className="w-full super-bg border-2 border-red-500 min-h-screen flex justify-center items-center"
		>
			<div className="text-center items-center ">
				<div className="flex items-baseline gap-3 justify-center pb-6">
					<h1 className="text-5xl font-mono">BEM UMN</h1>
					<Image
						src="/svgs/gen-logo.svg"
						alt="Hero Graphic"
						width={170}
						height={170}
					/>
				</div>
				<h1 className="text-7xl pb-6 font-mono font-medium drop-shadow-md/30">
					Commit. Solid. Integrated.
				</h1>
				<h2 className="text-5xl font-serif text-accent pb-10 drop-shadow-md/15">
					Contribute to Collaborate
				</h2>

				<p className="text-2xl max-w-[70%] text-primary/70 mx-auto">
					Badan Eksekutif Mahasiswa Universitas Multimedia Nusantara
					merupakan organisasi kemahasiswaan resmi tingkat universitas
					di bawah Rektorat Bidang Kemahasiswaan.
				</p>
			</div>
		</section>
	);
};

export default Hero;
