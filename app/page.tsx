"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Lenis from "lenis";

import Navbar from "@/layouts/Navbar";
import Hero from "@/layouts/home-page/Hero";
import AboutPreview from "@/layouts/home-page/AboutPreview";
import Values from "@/layouts/home-page/Values";
import Work from "@/layouts/home-page/Work";
import Footer from "@/layouts/Footer";
import { supergraphics } from "@/constants/supergraphicIndex";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Home() {
    const main = useRef<HTMLDivElement>(null);
    const superRefs = useRef<(HTMLDivElement | null)[]>([]);
    const bgRef = useRef<HTMLDivElement>(null);

    // Lenis Smooth Scroll Setup
    useEffect(() => {
        const lenis = new Lenis({
            duration: 0.8,
            smoothWheel: true,
            syncTouch: true,
            gestureOrientation: "vertical",
            lerp: 0.1,
            wheelMultiplier: 0.6,
        });

        function update(time: number) {
            lenis.raf(time * 1000);
        }

        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(update);
            lenis.destroy();
        };
    }, []);

    // GSAP Animations (Orkestrasi 4 Supergrafik Resmi GEN XVI)
    useGSAP(
        () => {
            const sections = gsap.utils.toArray<HTMLElement>(".snap-section");

            // Parallax latar belakang
            gsap.to(bgRef.current, {
                yPercent: -30,
                ease: "none",
                scrollTrigger: {
                    trigger: main.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true,
                },
            });

            // ScrollTrigger snap halus antar-section
            ScrollTrigger.create({
                trigger: main.current,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                snap: {
                    snapTo: () => {
                        let maxVisibility = 0;
                        let snapIndex = 0;

                        sections.forEach((section, i) => {
                            const bounds = section.getBoundingClientRect();
                            const visible =
                                Math.min(window.innerHeight, bounds.bottom) -
                                Math.max(0, bounds.top);

                            if (visible > maxVisibility) {
                                maxVisibility = visible;
                                snapIndex = i;
                            }
                        });

                        return snapIndex / (sections.length - 1);
                    },
                    duration: 0.6,
                    ease: "power2.inOut",
                },
            });

            // Intro animation untuk 4 motif supergrafik
            const intro = gsap.timeline({
                defaults: { ease: "sine.inOut" },
                onComplete: () => {
                    initScrollTriggers();
                },
            });

            intro
                .to(superRefs.current[0], {
                    x: 350,
                    y: 60,
                    rotation: 15,
                    duration: 1.2,
                })
                .to(
                    superRefs.current[1],
                    { x: -380, y: 120, rotation: -20, duration: 1.2 },
                    "<",
                )
                .to(
                    superRefs.current[2],
                    { x: -400, rotation: 15, duration: 1.2 },
                    "<",
                )
                .to(
                    superRefs.current[3],
                    { x: 300, y: -80, rotation: -15, duration: 1.2 },
                    "<",
                );

            function initScrollTriggers() {
                // Hero → Tentang Kami
                gsap.timeline({
                    scrollTrigger: {
                        trigger: "#hero",
                        start: "+=100 top",
                        endTrigger: "#tentang",
                        end: "bottom bottom",
                        scrub: true,
                    },
                    defaults: { ease: "sine.inOut" },
                })
                    .to(
                        superRefs.current[0],
                        { x: -320, y: -80, rotation: -40 },
                        ">",
                    )
                    .to(
                        superRefs.current[1],
                        { x: 380, y: -80, rotation: 40 },
                        "<",
                    )
                    .to(
                        superRefs.current[2],
                        { x: 280, y: 160, rotation: -40 },
                        "<",
                    )
                    .to(
                        superRefs.current[3],
                        { x: -320, y: 80, rotation: 40 },
                        "<",
                    );

                // Tentang Kami → Nilai Kabinet
                gsap.timeline({
                    scrollTrigger: {
                        trigger: "#tentang",
                        start: "top top",
                        endTrigger: "#nilai",
                        end: "bottom bottom",
                        scrub: true,
                    },
                    defaults: { ease: "sine.inOut" },
                })
                    .to(superRefs.current[3], { x: 400, y: 50, scale: 1.2 }, ">")
                    .to(
                        superRefs.current[2],
                        { x: -420, y: -60, scale: 1.4, rotate: 20 },
                        "<",
                    );

                // Nilai Kabinet → Kegiatan Mahasiswa (KEGMA)
                gsap.timeline({
                    scrollTrigger: {
                        trigger: "#nilai",
                        start: "top top",
                        endTrigger: "#kegiatan",
                        end: "bottom bottom",
                        scrub: true,
                    },
                    defaults: { ease: "sine.inOut" },
                })
                    .to(superRefs.current[1], { x: -350, y: 40, scale: 1 }, ">")
                    .to(
                        superRefs.current[0],
                        { x: 350, y: -120, scale: 1.3, rotate: 15 },
                        "<",
                    )
                    .to(superRefs.current[2], { x: -480, y: 60, scale: 1 }, ">")
                    .to(
                        superRefs.current[3],
                        { x: 380, y: -140, scale: 1.2, rotate: -25 },
                        "<",
                    );
            }
        },
        { scope: main },
    );

    return (
        <main
            ref={main}
            className="relative min-h-screen w-full overflow-x-hidden bg-navy-dark text-white selection:bg-azure selection:text-navy-dark"
        >
            {/* Texture Background Layer */}
            <div
                ref={bgRef}
                className="super-bg fixed inset-0 -z-30 scale-125 bg-cover bg-center opacity-30"
            />

            {/* Navbar Floating Pill */}
            <Navbar />

            {/* 1. HERO SECTION (Centerpiece Identity) */}
            <Hero id="hero" className="snap-section" />

            {/* 2. SEKILAS TENTANG KAMI & VISI MISI (Editorial Magazine) */}
            <AboutPreview id="tentang" className="snap-section" />

            {/* 3. NILAI ATAU IDENTITAS KABINET (Bento Grid 4 Supergrafik) */}
            <Values id="nilai" className="snap-section" />

            {/* 4. HIGHLIGHT KEGIATAN MAHASISWA & PROKER */}
            <Work id="kegiatan" className="snap-section" />

            {/* 5. FOOTER INSTITUSIONAL */}
            <Footer />

            {/* 4 Motif Supergrafik BEM UMN GEN XVI (Decorative Layer) */}
            {supergraphics.map((g, i) => (
                <div
                    key={g.name}
                    ref={(el) => {
                        superRefs.current[i] = el;
                    }}
                    className={`pointer-events-none fixed z-10 scale-50 opacity-20 sm:scale-75 md:scale-90 lg:opacity-30 ${g.className} hidden md:block`}
                    aria-hidden="true"
                >
                    <Image
                        src={g.src}
                        alt={`Supergrafik ${g.name}`}
                        width={g.w}
                        height={g.h}
                        className="drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                    />
                </div>
            ))}
        </main>
    );
}
