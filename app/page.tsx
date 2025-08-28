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
import { supergraphics } from "@/constants/supergraphicIndex";
import Member from "@/layouts/home-page/Member";
import Work from "@/layouts/home-page/Work";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Home() {
    const main = useRef<HTMLDivElement>(null);
    const superRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Lenis Smooth Scroll
    useEffect(() => {
        const lenis = new Lenis({
            duration: 0.6,
            smoothWheel: true,
            syncTouch: true,
            gestureOrientation: "vertical",
            lerp: 1,
            wheelMultiplier: 0.4,
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

    // GSAP Animations
    useGSAP(
        () => {
            const sections = gsap.utils.toArray<HTMLElement>(".snap-section");

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
                    ease: "power1.inOut",
                },
            });

            // Intro animation
            const intro = gsap.timeline({
                defaults: { ease: "sine.inOut" },
                onComplete: () => {
                    initScrollTriggers();
                },
            });

            intro
                .to(superRefs.current[0], {
                    x: 480,
                    y: 80,
                    rotation: 15,
                    duration: 1,
                })
                .to(
                    superRefs.current[1],
                    { x: -500, y: 150, rotation: -25, duration: 1 },
                    "<",
                )
                .to(
                    superRefs.current[2],
                    { x: -525, rotation: 15, duration: 1 },
                    "<",
                )
                .to(
                    superRefs.current[3],
                    { x: 400, y: -100, rotation: -15, duration: 1 },
                    "<",
                )
                .to(
                    superRefs.current[4],
                    { x: -100, y: -250, rotation: -15, duration: 1 },
                    "<",
                );

            function initScrollTriggers() {
                // Hero → Gallery
                gsap.timeline({
                    scrollTrigger: {
                        trigger: "#hero",
                        start: "+=100 top",
                        endTrigger: "#gallery",
                        end: "bottom bottom",
                        scrub: true,
                    },
                    defaults: { ease: "sine.inOut" },
                })
                    .to(
                        superRefs.current[0],
                        { x: -400, y: -100, rotation: -50 },
                        ">",
                    )
                    .to(
                        superRefs.current[1],
                        { x: 500, y: -100, rotation: 50 },
                        "<",
                    )
                    .to(
                        superRefs.current[2],
                        { x: 350, y: 200, rotation: -50 },
                        "<",
                    )
                    .to(
                        superRefs.current[3],
                        { x: -400, y: 100, rotation: 50 },
                        "<",
                    )
                    .to(
                        superRefs.current[4],
                        { x: 300, y: -400, scale: 3.5 },
                        "<",
                    );

                // Gallery → Member
                gsap.timeline({
                    scrollTrigger: {
                        trigger: "#gallery",
                        start: "top top",
                        endTrigger: "#member",
                        end: "bottom bottom",
                        scrub: true,
                    },
                    defaults: { ease: "sine.inOut" },
                })
                    .to(superRefs.current[4], { x: 600, y: 50, scale: 1 }, ">")
                    .to(
                        superRefs.current[3],
                        { x: 500, y: -100, scale: 3.5, rotate: 15 },
                        ">",
                    );

                // Member → Work
                gsap.timeline({
                    scrollTrigger: {
                        trigger: "#member",
                        start: "top top",
                        endTrigger: "#work",
                        end: "bottom bottom",
                        scrub: true,
                    },
                    defaults: { ease: "sine.inOut" },
                })
                    .to(superRefs.current[3], { x: -600, y: 50, scale: 1 }, ">")
                    .to(
                        superRefs.current[2],
                        { x: -500, y: -150, scale: 3, rotate: 15 },
                        ">",
                    );
            }
        },
        { scope: main },
    );

    return (
        <main
            ref={main}
            className="relative min-h-screen w-full overflow-x-hidden"
        >
            {/* Background */}
            <div className="super-bg fixed inset-0 -z-10 bg-cover bg-center"></div>

            {/* Sections */}
            <Hero id="hero" className="snap-section" />
            <Gallery id="gallery" images={images} className="snap-section" />
            <Member id="member" className="snap-section" />
            <Work id="work" className="snap-section" />
            {/* <Footer /> */}

            {/* Background Decoration */}
            {/* <div className="fixed top-30 right-95 w-[500px] h-[500px] bg-secondary/30 blur-3xl rounded-full -z-10"></div>
			<div className="fixed bottom-30 left-90 w-[400px] h-[400px] bg-accent/20 blur-3xl rounded-full -z-10"></div> */}

            {/* Supergraphics */}
            {supergraphics.map((g, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        superRefs.current[i] = el;
                    }}
                    className={`fixed z-10 scale-50 sm:scale-75 md:scale-100 ${g.className}`}
                >
                    <Image
                        src={g.src}
                        alt={`Supergraphic-${i + 1}`}
                        width={g.w}
                        height={g.h}
                        className="drop-shadow-xl/30"
                    />
                </div>
            ))}
        </main>
    );
}
