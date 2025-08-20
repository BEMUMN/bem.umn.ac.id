"use client";

import { divisions } from "@/constants/divisionIndex";
import Image from "next/image";
import React, { useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

type MemberProps = {
	id: string;
	className?: string;
};

const overlayColors = ["var(--secondary)", "var(--accent)"];

const animateText = (el: HTMLElement, newText: string) => {
	if (!el) return;

	gsap.to(el, {
		duration: 1,
		text: { value: newText, delimiter: "" },
		ease: "power2.out",
	});
};

const Member = ({ id, className }: MemberProps) => {
	const textRefs = useRef<(HTMLHeadingElement | null)[]>([]);
	if (textRefs.current.length !== divisions.length) {
		textRefs.current = Array(divisions.length).fill(null);
	}

	return (
		<section
			id={id}
			className={`relative w-full h-screen flex items-center justify-end py-20 sm:py-28 ${className}`}
		>
			<div className="w-full max-w-7xl px-6 lg:px-12 flex flex-col items-end">
				<h2 className="text-4xl lg:text-6xl font-extrabold leading-tight text-right">
					Divisi BEM UMN
				</h2>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pt-16 justify-items-end">
					{divisions.map((division, index) => {
						const overlayColor =
							overlayColors[index % overlayColors.length];

						const handleMouseEnter = () => {
							const ref = textRefs.current[index];
							if (ref) {
								animateText(
									ref,
									division.fullName || division.name
								);
							}
						};

						const handleMouseLeave = () => {
							const ref = textRefs.current[index];
							if (ref) {
								animateText(ref, division.name);
							}
						};

						return (
							<div
								key={division.id}
								className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl 
									transition-all duration-500 ease-in-out cursor-pointer
									w-[320px] h-[320px]"
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}
							>
								{/* Background Image */}
								<div className="absolute inset-0 w-full h-full overflow-hidden">
									<Image
										src={
											division.imageUrl ||
											"/placeholder.png"
										}
										alt={division.name}
										fill
										sizes="320px"
										className="object-cover transition-transform duration-700 group-hover:scale-110 saturate-[80%]"
									/>
								</div>

								{/* Overlay warna acak */}
								<div
									className="absolute inset-0 opacity-50 group-hover:opacity-80 transition-all duration-500"
									style={{ backgroundColor: overlayColor }}
								></div>

								{/* Content */}
								<div className="relative h-full flex flex-col justify-end p-6">
									<h3
										ref={(el) => {
											textRefs.current[index] = el;
											if (el && !el.textContent) {
												el.textContent = division.name;
											}
										}}
										className="text-2xl font-bold mb-2 tracking-wide text-background"
									></h3>
									<p className="text-sm opacity-90 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2 text-background">
										{division.description}
									</p>
									<span className="mt-3 text-xs text-background">
										{division.memberCount} anggota
									</span>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default Member;
