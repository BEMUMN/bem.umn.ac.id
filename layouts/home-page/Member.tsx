"use client";

import { divisions } from "@/constants/divisionIndex";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

type MemberProps = {
    id: string;
    className?: string;
};

const Member = ({ id, className }: MemberProps) => {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const lightRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

    useEffect(() => {
        cardRefs.current.forEach((card) => {
            if (!card) return;
            const randomRotate = gsap.utils.random(-10, 10);
            gsap.set(card, {
                rotate: randomRotate,
                transformStyle: "preserve-3d",
            });
        });
    }, []);

    const handleEnter = (index: number) => {
        const card = cardRefs.current[index];
        const light = lightRefs.current[index];
        if (!card) return;

        gsap.to(card, {
            duration: 0.8,
            scale: 1.1,
            ease: "power4.out",
        });

        if (light) {
            gsap.to(light, {
                opacity: 0.35,
                duration: 0.6,
                ease: "power2.out",
            });
        }
    };

    const handleLeave = (index: number) => {
        const card = cardRefs.current[index];
        const light = lightRefs.current[index];
        if (!card) return;

        gsap.to(card, {
            duration: 0.8,
            scale: 1,
            rotateX: 0,
            rotateY: flippedIndex === index ? 180 : 0,
            rotate: gsap.utils.random(-10, 10),
            ease: "power4.inOut",
        });

        if (light) {
            gsap.to(light, {
                opacity: 0,
                duration: 0.6,
                ease: "power2.inOut",
            });
        }
    };

    const handleMove = (e: React.MouseEvent, index: number) => {
        const card = cardRefs.current[index];
        const light = lightRefs.current[index];
        if (!card || !light) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * 12;
        const rotateY = ((x - centerX) / centerX) * 12;

        gsap.to(card, {
            rotateX: -rotateX,
            rotateY: (flippedIndex === index ? 180 : 0) + rotateY / 2,
            transformPerspective: 1200,
            transformOrigin: "center",
            duration: 0.5,
            ease: "power2.out",
        });

        gsap.to(light, {
            x: (x - centerX) / 4,
            y: (y - centerY) / 4,
            ease: "power2.out",
            duration: 0.3,
        });
    };

    const handleFlip = (index: number) => {
        const prevIndex = flippedIndex;

        // Flip back previous card if any
        if (prevIndex !== null && prevIndex !== index) {
            const prevCard = cardRefs.current[prevIndex];
            if (prevCard) {
                gsap.to(prevCard, {
                    rotateY: 0,
                    duration: 0.8,
                    ease: "power3.inOut",
                });
            }
        }

        // Flip card
        if (prevIndex === index) {
            gsap.to(cardRefs.current[index], {
                rotateY: 0,
                duration: 0.8,
                ease: "power3.inOut",
            });
            setFlippedIndex(null);
        } else {
            gsap.to(cardRefs.current[index], {
                rotateY: 180,
                duration: 0.8,
                ease: "power3.inOut",
            });
            setFlippedIndex(index);
        }
    };

    return (
        <section
            id={id}
            className={`relative flex max-h-screen min-h-screen w-full items-center justify-end px-12 font-mono ${className}`}
        >
            <div className="items-top h-screen max-w-2xl p-20 pr-0">
                <h2 className="text-start text-6xl font-bold drop-shadow-lg/30">
                    Divisi BEM UMN
                </h2>
                <p className="text-foreground/70 mt-4 text-justify text-lg">
                    BEM UMN memiliki 6 divisi yang masing-masing memiliki peran
                    dan tanggung jawab yang berbeda. Setiap divisi berkontribusi
                    untuk mencapai tujuan bersama dan memastikan kelancaran
                    organisasi.
                </p>
            </div>
            <div className="w-full max-w-7xl px-12">
                <div
                    className="grid grid-cols-3 justify-items-end gap-10"
                    style={{ perspective: "2000px" }}
                >
                    {divisions.map((division, index) => (
                        <div
                            key={division.id}
                            ref={(el) => {
                                cardRefs.current[index] = el;
                            }}
                            onMouseEnter={() => handleEnter(index)}
                            onMouseLeave={() => handleLeave(index)}
                            onMouseMove={(e) => handleMove(e, index)}
                            onClick={() => handleFlip(index)}
                            className="relative h-[340px] w-[280px] cursor-pointer rounded-xl shadow-xl [transform-style:preserve-3d]"
                            role="button"
                            tabIndex={0}
                        >
                            {/* Lighting Overlay */}
                            <div
                                ref={(el) => {
                                    lightRefs.current[index] = el;
                                }}
                                className="from-background/60 pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-tr to-transparent opacity-0"
                            />

                            {/* Front Side */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-stone-200 p-3 pt-0 shadow-md/20 duration-300 [backface-visibility:hidden]">
                                <div className="relative h-[260px] w-full overflow-hidden rounded-sm">
                                    <Image
                                        src={division.imageUrl}
                                        alt={division.name}
                                        fill
                                        sizes="280px"
                                        className="scale-105 object-cover"
                                        unoptimized
                                    />
                                </div>
                                <p className="text-secondary mt-2 text-xl font-semibold">
                                    {division.name}
                                </p>
                                <p className="text-foreground/70 mt-2 text-sm font-normal">
                                    Click Me !
                                </p>
                            </div>

                            {/* Back Side */}
                            <div className="absolute inset-0 flex [transform:rotateY(180deg)] flex-col items-center justify-center rounded-xl bg-stone-200 p-4 shadow-md [backface-visibility:hidden]">
                                <h3 className="mb-2 text-center text-lg font-bold text-gray-800">
                                    {division.fullName || division.name}
                                </h3>

                                <div className="group relative">
                                    <button
                                        disabled
                                        className="text-background hover:bg-accent/90 disabled:bg-accent/30 disabled:hover:n bg-accent cursor-pointer rounded-md px-4 py-2 shadow transition hover:scale-105 hover:shadow-lg/20 active:scale-90 disabled:shadow-none disabled:hover:scale-100 disabled:active:scale-100"
                                    >
                                        View Members
                                    </button>

                                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 rounded-lg bg-gray-800 px-4 py-1 text-sm text-background text-center shadow-md transition-all group-hover:scale-100">
                                        Coming Soon!
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Member;
