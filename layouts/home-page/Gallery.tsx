"use client";

import Image from "next/image";
import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const shuffle = (array: string[]): string[] =>
	[...array].sort(() => Math.random() - 0.5);

const shadowColors = ["#eeae0b70", "#3e92cc70"];

const GalleryColumn = ({ images }: { images: string[] }) => {
	return (
		<div className="flex flex-col gap-4">
			{images.map((src, index) => {
				const randomColor =
					shadowColors[
						Math.floor(Math.random() * shadowColors.length)
					];

				return (
					<div
						key={index}
						className="w-full h-auto rounded-lg overflow-hidden"
						style={{
							boxShadow: `0 4px 15px ${randomColor}`,
						}}
					>
						<Image
							src={src}
							alt={`Gallery image ${index + 1}`}
							width={500}
							height={750}
							className="object-cover w-full h-auto"
							loading={index < 3 ? "eager" : "lazy"}
						/>
					</div>
				);
			})}

			{/* Duplicate untuk loop kedua */}
			{images.map((src, index) => {
				const randomColor =
					shadowColors[
						Math.floor(Math.random() * shadowColors.length)
					];

				return (
					<div
						key={`dup-${index}`}
						className="w-full h-auto rounded-lg overflow-hidden"
						style={{
							boxShadow: `0 4px 15px ${randomColor}`,
						}}
					>
						<Image
							src={src}
							alt={`Gallery image ${index + 1}`}
							width={500}
							height={750}
							className="object-cover w-full h-auto"
							loading="lazy"
						/>
					</div>
				);
			})}
		</div>
	);
};

type GalleryProps = {
	id: string;
	images: string[];
	className?: string;
	// ref: React.RefObject<HTMLDivElement>;
};

const Gallery = ({ id, images, className }: GalleryProps) => {
	const mainGalleryRef = useRef<HTMLDivElement | null>(null);
	const colRefs = useRef<(HTMLDivElement | null)[]>([]);

	const [shuffledImages, setShuffledImages] = useState<string[][]>([]);

	useEffect(() => {
		if (!images || images.length === 0) return;

		setShuffledImages([
			shuffle(images),
			shuffle(images.slice(0, 8)),
			shuffle(images),
			shuffle(images.slice(0, 9)),
		]);
	}, [images]);

	useLayoutEffect(() => {
		if (!shuffledImages.length) return;

		const ctx = gsap.context(() => {
			const speeds = [35, 45, 30, 50];

			const animations = colRefs.current
				.map((col, index) => {
					if (!col) return null;
					const idleSpeed = speeds[index];

					return index % 2 === 1
						? gsap.fromTo(
								col,
								{ y: "-50%" },
								{
									y: "0%",
									ease: "none",
									duration: idleSpeed,
									repeat: -1,
								}
						  )
						: gsap.to(col, {
								y: "-50%",
								ease: "none",
								duration: idleSpeed,
								repeat: -1,
						  });
				})
				.filter(Boolean) as gsap.core.Tween[];

			ScrollTrigger.create({
				trigger: mainGalleryRef.current,
				start: "top bottom",
				end: "bottom top",
				onUpdate: (self) => {
					const velocity = self.getVelocity();
					const clampedVelocity = gsap.utils.clamp(
						-1200,
						1200,
						velocity
					);
					const newTimeScale = 1 + Math.abs(clampedVelocity) / 500;

					gsap.to(animations, {
						timeScale: newTimeScale,
						duration: 0.5,
						ease: "power2.out",
					});
				},
			});
		}, mainGalleryRef);

		return () => ctx.revert();
	}, [shuffledImages]);

	if (!images || images.length === 0) return null;

	return (
		<section
			id={id}
			className={`relative h-screen max-h-screen w-full overflow-hidden flex items-center ${className}`}
		>
			<div
				ref={mainGalleryRef}
				className="gallery-column-fade w-1/2 h-full grid grid-cols-4 gap-4 p-4 md:col-span-4"
			>
				{shuffledImages.length > 0 &&
					shuffledImages.map((column, index) => (
						<div
							key={index}
							ref={(el) => {
								colRefs.current[index] = el;
							}}
						>
							<GalleryColumn images={column} />
						</div>
					))}
			</div>

			<div className="text-left p-12 min-h-screen max-w-[40%]">
				<h2 className="text-4xl lg:text-6xl font-bold leading-tight">
					Commit. Solid. Integrated.
				</h2>
				<p className="text-lg text-gray-500 mt-4">
					BEM UMN memiliki tagline organisasi &#39;Commit. Solid.
					Integrated.&#39; yang menegaskan bagaimana setiap anggota
					harus memiliki komitmen tinggi untuk melaksanakan tanggung
					jawabnya, solidaritas yang kuat antara sesama anggota, serta
					mampu berintegrasi dengan naungan serta kemahasiswaan.
				</p>
			</div>
		</section>
	);
};

export default Gallery;
