"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createHomePeel } from "./homePeel";

gsap.registerPlugin(ScrollTrigger);

type HomeNarrativeProps = {
    readonly children: ReactNode;
};

export default function HomeNarrative({ children }: HomeNarrativeProps) {
    const root = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const hero = root.current?.querySelector<HTMLElement>(".home-hero-transition");
        const peelRoot = root.current?.querySelector<HTMLElement>("[data-home-peel]");
        const sheet = root.current?.querySelector<HTMLElement>("[data-home-hero-sheet]");
        const flap = root.current?.querySelector<SVGSVGElement>("[data-home-peel-flap]");
        const flapPaper = root.current?.querySelector<SVGPolygonElement>("[data-home-peel-flap-paper]");
        const flapShadowNear = root.current?.querySelector<SVGPolygonElement>("[data-home-peel-flap-shadow-near]");
        const flapShadowFar = root.current?.querySelector<SVGPolygonElement>("[data-home-peel-flap-shadow-far]");
        const flapGradient = root.current?.querySelector<SVGLinearGradientElement>("[data-home-peel-flap-gradient]");
        const cast = root.current?.querySelector<SVGSVGElement>("[data-home-peel-cast]");
        const castPolygon = root.current?.querySelector<SVGPolygonElement>("[data-home-peel-cast-polygon]");
        const castGradient = root.current?.querySelector<SVGLinearGradientElement>("[data-home-peel-cast-gradient]");
        const about = root.current?.querySelector<HTMLElement>(".home-about");

        if (!hero || !peelRoot || !sheet || !flap || !flapPaper || !flapShadowNear || !flapShadowFar || !flapGradient || !cast || !castPolygon || !castGradient || !about) {
            return;
        }

        const media = gsap.matchMedia();
        media.add("(prefers-reduced-motion: no-preference)", () => {
            const peel = createHomePeel({
                root: peelRoot,
                sheet,
                flap,
                flapPaper,
                flapShadowNear,
                flapShadowFar,
                flapGradient,
                cast,
                castPolygon,
                castGradient,
            });
            const foldTrigger = ScrollTrigger.create({
                trigger: hero,
                start: "top top",
                end: "bottom bottom",
                invalidateOnRefresh: true,
                onRefreshInit: peel.measure,
                onRefresh: (trigger) => peel.render(trigger.progress),
                onUpdate: (trigger) => peel.render(trigger.progress),
            });
            peel.render(foldTrigger.progress);

            const heading = about.querySelector("h2");
            const paragraphs = about.querySelectorAll(".home-about-copy p");
            const photo = about.querySelector(".home-about-photo figure");
            const cta = about.querySelector(".home-about-photo a");

            gsap.timeline({
                scrollTrigger: {
                    trigger: about,
                    start: "top 78%",
                    once: true,
                },
            })
                .from(heading, { opacity: 0, y: 24, duration: 0.7, ease: "power3.out" })
                .from(paragraphs, { opacity: 0, y: 16, duration: 0.55, stagger: 0.08, ease: "power3.out" }, "-=0.38")
                .from(photo, { opacity: 0, scale: 1.035, duration: 0.9, ease: "power3.out" }, "-=0.52")
                .from(cta, { opacity: 0, y: 12, duration: 0.5, ease: "power3.out" }, "-=0.42");

            return () => {
                foldTrigger.kill();
                peel.reset();
            };
        });

        return () => media.revert();
    }, { scope: root });

    return <div ref={root} className="home-narrative">{children}</div>;
}
