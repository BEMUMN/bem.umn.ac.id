"use client";

import { divisions } from "@/constants/divisionIndex";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import MemberSwiper from "@/components/MemberSwiper";
import Link from "next/link";
import { ArrowRight, Grid } from "lucide-react";

type MemberProps = {
    id: string;
    className?: string;
};

const Member = ({ id, className }: MemberProps) => {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

    useEffect(() => {
        cardRefs.current.forEach((card) => {
            if (!card) return;
            const randomRotate = gsap.utils.random(-4, 4);
            gsap.set(card, {
                rotate: randomRotate,
                transformStyle: "preserve-3d",
            });
        });
    }, []);

    const handleFlip = (index: number) => {
        const prevIndex = flippedIndex;

        if (prevIndex !== null && prevIndex !== index) {
            const prevCard = cardRefs.current[prevIndex];
            if (prevCard) {
                gsap.to(prevCard, {
                    rotateY: 0,
                    duration: 0.6,
                    ease: "power3.inOut",
                });
            }
        }

        if (prevIndex === index) {
            gsap.to(cardRefs.current[index], {
                rotateY: 0,
                duration: 0.6,
                ease: "power3.inOut",
            });
            setFlippedIndex(null);
        } else {
            gsap.to(cardRefs.current[index], {
                rotateY: 180,
                duration: 0.6,
                ease: "power3.inOut",
            });
            setFlippedIndex(index);
        }
    };

    return (
        <section
            id={id}
            className={`relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-20 font-sans md:px-12 ${className}`}
        >
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
                {/* Header Section */}
                <div className="flex w-full flex-col items-center justify-between gap-6 md:flex-row md:items-end">
                    <div className="text-center md:text-left">
                        <div className="inline-flex items-center gap-2 rounded-full border border-azure/30 bg-blue-primary/40 px-4 py-1.5 text-xs font-semibold tracking-wider text-azure uppercase">
                            <Grid size={14} />
                            <span>Struktur Organisasi</span>
                        </div>
                        <h2 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                            Divisi BEM UMN Gen XVI
                        </h2>
                        <p className="mt-2 max-w-2xl text-sm text-azure/90 md:text-base">
                            Enam divisi utama yang berdedikasi menggerakkan roda organisasi dan menaungi aspirasi seluruh mahasiswa UMN.
                        </p>
                    </div>

                    <Link
                        href="/divisi"
                        className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-blue-primary/80 px-5 py-2.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-dark-blue sm:text-sm"
                    >
                        <span>Lihat Seluruh Anggota & Divisi</span>
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Desktop Grid 6 Divisi */}
                <div className="mt-12 hidden w-full md:block">
                    <div
                        className="grid grid-cols-2 gap-8 lg:grid-cols-3"
                        style={{ perspective: "2000px" }}
                    >
                        {divisions.map((division, index) => (
                            <div
                                key={division.id}
                                ref={(el) => {
                                    cardRefs.current[index] = el;
                                }}
                                onClick={() => handleFlip(index)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        handleFlip(index);
                                    }
                                }}
                                aria-label={`Detail divisi ${division.fullname}`}
                                className="relative h-[360px] w-full cursor-pointer rounded-2xl border border-white/20 bg-transparent p-0 shadow-2xl [transform-style:preserve-3d] transition-shadow duration-300 hover:shadow-cyan-900/30 focus:outline-none"
                            >
                                {/* Front Side */}
                                <div className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-dark-blue/90 via-blue-primary/50 to-dark-blue/90 p-5 shadow-xl [backface-visibility:hidden]">
                                    <div className="relative h-[200px] w-full overflow-hidden rounded-xl border border-white/10">
                                        <Image
                                            src={division.imageUrl}
                                            alt={division.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 380px"
                                            className="object-cover object-center transition-transform duration-500 hover:scale-105"
                                        />
                                        <div className="absolute top-2 right-2 rounded-full bg-dark-blue/80 px-2.5 py-1 text-[10px] font-bold text-azure backdrop-blur-sm">
                                            GEN XVI
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <h3 className="font-serif text-xl font-bold text-white">
                                            {division.name}
                                        </h3>
                                        <p className="text-xs font-medium text-azure">
                                            {division.fullname}
                                        </p>
                                    </div>

                                    <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-[11px] text-concrete/70">
                                        <span>Klik untuk membalik kartu</span>
                                        <span className="font-semibold text-azure">Balik &rarr;</span>
                                    </div>
                                </div>

                                {/* Back Side */}
                                <div className="absolute inset-0 flex [transform:rotateY(180deg)] flex-col justify-between rounded-2xl border border-azure/30 bg-gradient-to-b from-dark-blue via-blue-primary to-dark-blue p-6 shadow-2xl [backface-visibility:hidden]">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <span className="rounded-full bg-white/10 px-3 py-1 font-serif text-xs font-bold text-cream">
                                                {division.name}
                                            </span>
                                            <span className="text-[11px] text-azure">Divisi Resmi</span>
                                        </div>

                                        <h3 className="mt-4 font-serif text-lg font-bold text-white">
                                            {division.fullname}
                                        </h3>
                                        <p className="mt-3 text-xs leading-relaxed text-concrete/90">
                                            {division.description}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-white/15">
                                        <Link
                                            href={`/members/${division.id}`}
                                            onClick={(e) => e.stopPropagation()}
                                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-azure py-2.5 font-sans text-xs font-bold text-dark-blue shadow-lg transition-all hover:bg-white hover:shadow-xl active:scale-95"
                                        >
                                            <span>Lihat Susunan Pengurus</span>
                                            <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Carousel */}
                <div className="mt-8 block w-full md:hidden">
                    <MemberSwiper divisions={divisions} />
                </div>
            </div>
        </section>
    );
};

export default Member;
