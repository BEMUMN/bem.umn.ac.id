"use client";

import Image from "next/image";
import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type GalleryProps = {
	id: string;
	images: string[];
};

const shuffle = (array: string[]): string[] =>
	[...array].sort(() => Math.random() - 0.5);

const GalleryColumn = ({ images }: { images: string[] }) => {
	return (
		<div className="flex flex-col gap-4">
			{images.map((src, index) => (
				<div
					key={index}
					className="w-full h-auto rounded-lg overflow-hidden shadow-lg/30"
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
			))}
			{images.map((src, index) => (
				<div
					key={`dup-${index}`}
					className="w-full h-auto rounded-lg overflow-hidden shadow-lg/30"
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
			))}
		</div>
	);
};

const Gallery = ({ id, images }: GalleryProps) => {
	const mainRef = useRef<HTMLDivElement | null>(null);
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
				trigger: mainRef.current,
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
		}, mainRef);

		return () => ctx.revert();
	}, [shuffledImages]);

	if (!images || images.length === 0) return null;

	return (
		<section
			id={id}
			className="relative bg-stone-100 h-screen max-h-screen w-full overflow-hidden flex items-center"
		>
			<div
				ref={mainRef}
				className="w-3/4 h-full grid grid-cols-4 gap-4 p-4 md:col-span-4"
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

			<div className="text-left p-12 min-h-screen">
				<h2 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight">
					A Showcase of Our Cherished Moments
				</h2>
				<p className="text-lg text-gray-500 mt-4">
					Each frame tells a story, a captured moment in time that we
					hold dear.
				</p>
			</div>
		</section>
	);
};

export default Gallery;
