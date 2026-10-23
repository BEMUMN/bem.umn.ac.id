"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { supergraphics } from "@/constants/supergraphicIndex";

gsap.registerPlugin(ScrollTrigger);

export function HeroDecorations() {
    const superRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [pastActivities, setPastActivities] = useState(false);

    useEffect(() => {
        const activities = document.getElementById("kegiatan");
        if (!activities) return;
        const updateVisibility = () => {
            setPastActivities(
                activities.getBoundingClientRect().top < window.innerHeight,
            );
        };
        updateVisibility();
        window.addEventListener("scroll", updateVisibility, { passive: true });
        window.addEventListener("resize", updateVisibility);
        return () => {
            window.removeEventListener("scroll", updateVisibility);
            window.removeEventListener("resize", updateVisibility);
        };
    }, []);

    // GSAP Animations (Orkestrasi 4 Supergrafik Resmi GEN XVI)
    useGSAP(() => {
        const prefersReducedMotion =
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion) {
            // Tampilan statis tenang tanpa animasi gerak berlebih
            gsap.set(superRefs.current[0], { x: 300, y: 50, opacity: 0.2 });
            gsap.set(superRefs.current[1], {
                x: -300,
                y: 80,
                opacity: 0.2,
            });
            gsap.set(superRefs.current[2], { x: -350, opacity: 0.2 });
            gsap.set(superRefs.current[3], {
                x: 250,
                y: -60,
                opacity: 0.2,
            });
            return;
        }

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
                .to(superRefs.current[1], { x: 380, y: -80, rotation: 40 }, "<")
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
    });

    return (
        <div
            data-hero-decorations
            className="contents"
            style={{ visibility: pastActivities ? "hidden" : "visible" }}
        >
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
        </div>
    );
}
