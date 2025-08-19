"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Lenis from "lenis";

import Hero from "@/layouts/home-page/Hero";
import Gallery from "@/layouts/home-page/Gallery";
import { images } from "@/constants/galleryIndex";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Home() {
	const main = useRef<HTMLDivElement>(null);

	const superGraphics = {
		g1: useRef<HTMLDivElement>(null),
		g2: useRef<HTMLDivElement>(null),
		g3: useRef<HTMLDivElement>(null),
		g4: useRef<HTMLDivElement>(null),
		g5: useRef<HTMLDivElement>(null),
	};

	useEffect(() => {
		const lenis = new Lenis({
			duration: 3,
			lerp: 0.07,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothWheel: true,
		});

		lenis.on("scroll", ScrollTrigger.update);

		const ticker = gsap.ticker.add((time: number) => {
			lenis.raf(time * 1000);
		});

		gsap.ticker.add(ticker);
		gsap.ticker.lagSmoothing(0);

		return () => {
			lenis.destroy();
			gsap.ticker.remove(ticker);
		};
	}, []);

	useGSAP(
		() => {
			ScrollTrigger.create({
				trigger: main.current,
				start: "top top",
				end: "bottom bottom",
				snap: {
					snapTo: [0, 0.5, 1],
					duration: { min: 0.0, max: 0.5 },
					ease: "none",
				},
			});

			startIntroAnim();
		},
		{ scope: main }
	);

	const startIntroAnim = () => {
		const intro = gsap.timeline({
			onComplete: initScrollTrigger,
			defaults: { ease: "power1.inOut" },
		});

		intro
			.to(superGraphics.g1.current, {
				duration: 1,
				y: 80,
				x: 480,
				rotation: 15,
			})
			.to(
				superGraphics.g2.current,
				{
					duration: 1,
					y: 150,
					x: -500,
					rotation: -25,
				},
				"<"
			)
			.to(
				superGraphics.g3.current,
				{
					duration: 1,
					x: -525,
					rotation: 15,
				},
				"<"
			)
			.to(
				superGraphics.g4.current,
				{
					duration: 1,
					y: -100,
					x: 400,
					rotation: -15,
				},
				"<"
			)
			.to(
				superGraphics.g5.current,
				{
					duration: 1,
					y: -250,
					x: -100,
					rotation: -15,
				},
				"<"
			);
	};

	const initScrollTrigger = () => {
		gsap.timeline({
			scrollTrigger: {
				trigger: main.current,
				start: "top top",
				endTrigger: "#gallery",
				end: "bottom bottom",
				scrub: true,
			},
			defaults: {
				ease: "none",
			},
		})
			.to(
				superGraphics.g1.current,
				{
					y: -100,
					x: -400,
					rotation: -50,
				},
				">"
			)
			.to(
				superGraphics.g2.current,
				{
					y: -100,
					x: 500,
					rotation: 50,
				},
				"<"
			)
			.to(
				superGraphics.g3.current,
				{
					y: 200,
					x: 350,
					rotation: -50,
				},
				"<"
			)
			.to(
				superGraphics.g4.current,
				{
					y: 100,
					x: -400,
					rotation: 50,
				},
				"<"
			)
			.to(
				superGraphics.g5.current,
				{
					y: -400,
					x: 300,
					scale: 4,
				},
				"<"
			);

		// gsap.timeline({
		// 	scrollTrigger: {
		// 		trigger: "#gallery",
		// 		start: "top top",
		// 		endTrigger: "#about-2",
		// 		end: "bottom bottom",
		// 		scrub: true,
		// 	},
		// 	defaults: {
		// 		ease: "none",
		// 	},
		// })
		// 	.to(
		// 		superGraphics.g5.current,
		// 		{
		// 			y: 50,
		// 			x: 600,
		// 			scale: 1,
		// 		},
		// 		">"
		// 	)

		// 	.to(
		// 		superGraphics.g4.current,
		// 		{
		// 			y: -200,
		// 			x: 550,
		// 			scale: 3.5,
		// 			rotate: 15,
		// 		},
		// 		">"
		// 	);
	};

	return (
		<main
			ref={main}
			className="w-full min-h-screen relative overflow-x-hidden"
		>
			<Hero id="hero" />
			<Gallery id="gallery" images={images} />
			{/* <Gallery id="about-2" /> */}
			{/* Supergraphics */}
			<div
				ref={superGraphics.g1}
				className="fixed top-[-5%] left-[-15%] rotate-[-50deg] md:scale-100 sm:scale-75 scale-50"
			>
				<Image
					src="/svgs/Supergraphic-1.svg"
					alt="Supergraphic"
					width={200}
					height={200}
					className="drop-shadow-xl/30"
				/>
			</div>
			<div
				ref={superGraphics.g2}
				className="fixed top-[-5%] right-[-15%] rotate-[50deg] md:scale-100 sm:scale-75 scale-50"
			>
				<Image
					src="/svgs/Supergraphic-2.svg"
					alt="Supergraphic"
					width={175}
					height={175}
					className="drop-shadow-xl/30"
				/>
			</div>
			<div
				ref={superGraphics.g3}
				className="fixed top-[50%] right-[-30%] rotate-[-50deg] md:scale-100 sm:scale-75 scale-50"
			>
				<Image
					src="/svgs/Supergraphic-3.svg"
					alt="Supergraphic"
					width={225}
					height={225}
					className="drop-shadow-xl/30"
				/>
			</div>
			<div
				ref={superGraphics.g4}
				className="fixed top-[75%] left-[-20%] rotate-[50deg] md:scale-100 sm:scale-75 scale-50"
			>
				<Image
					src="/svgs/Supergraphic-4.svg"
					alt="Supergraphic"
					width={225}
					height={225}
					className="drop-shadow-xl/30"
				/>
			</div>
			<div
				ref={superGraphics.g5}
				className="fixed top-[112%] right-[20%] rotate-[50deg] md:scale-100 sm:scale-75 scale-50"
			>
				<Image
					src="/svgs/Supergraphic-5.svg"
					alt="Supergraphic"
					width={200}
					height={200}
					className="drop-shadow-xl/30"
				/>
			</div>
		</main>
	);
}
