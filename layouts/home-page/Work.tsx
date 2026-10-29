"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { kegmaList } from "@/constants/workIndex";

gsap.registerPlugin(ScrollTrigger);

const homepageLabels: Readonly<Record<string, string>> = {
    "umn-next": "OMB / UMN NEXT",
};

export default function Work({ id }: { readonly id: string }) {
    const section = useRef<HTMLElement>(null);

    useGSAP(() => {
        const stage = section.current?.querySelector<HTMLElement>("[data-kegma-stage]");
        const center = section.current?.querySelector<HTMLElement>("[data-kegma-center]");
        const logos = gsap.utils.toArray<HTMLElement>("[data-kegma-logo]", section.current);

        if (!stage || !center || logos.length === 0) {
            return;
        }

        const media = gsap.matchMedia();
        media.add("(prefers-reduced-motion: no-preference)", () => {
            const artwork = logos.flatMap((logo) => {
                const element = logo.querySelector<HTMLElement>("[data-kegma-logo-art]");
                return element ? [element] : [];
            });

            const setCenterOrigin = () => {
                gsap.set(logos, { x: 0, y: 0, rotation: 0, opacity: 1 });
                const centerBox = center.getBoundingClientRect();
                const centerX = centerBox.left + centerBox.width / 2;
                const centerY = centerBox.top + centerBox.height / 2;

                logos.forEach((logo, index) => {
                    const box = logo.getBoundingClientRect();
                    gsap.set(logo, {
                        x: centerX - (box.left + box.width / 2),
                        y: centerY - (box.top + box.height / 2),
                        opacity: 0.28,
                        rotation: index < 3 ? -4 : 4,
                    });
                });
            };

            setCenterOrigin();
            gsap.timeline({
                scrollTrigger: {
                    trigger: stage,
                    start: "top 76%",
                    end: "top 30%",
                    scrub: 0.35,
                    invalidateOnRefresh: true,
                    onRefreshInit: setCenterOrigin,
                },
            }).to(logos, {
                x: 0,
                y: 0,
                rotation: 0,
                opacity: 1,
                ease: "none",
                stagger: 0.035,
            });

            const drift = artwork.map((logo, index) => gsap.to(logo, {
                y: index % 2 === 0 ? -3 : 3,
                rotation: index < 3 ? -0.55 : 0.55,
                duration: 8 + index * 0.35,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                paused: true,
            }));

            const driftTrigger = ScrollTrigger.create({
                trigger: stage,
                start: "top 34%",
                end: "bottom top",
                onEnter: () => drift.forEach((animation) => animation.play()),
                onEnterBack: () => drift.forEach((animation) => animation.play()),
                onLeave: () => drift.forEach((animation) => animation.pause()),
                onLeaveBack: () => drift.forEach((animation) => animation.pause(0)),
            });

            return () => {
                driftTrigger.kill();
                drift.forEach((animation) => animation.kill());
            };
        });

        return () => media.revert();
    }, { scope: section });

    return (
        <section ref={section} id={id} className="home-work home-frame" aria-labelledby="home-work-title">
            <div className="home-kegma-stage" data-kegma-stage>
                <ul className="home-kegma-logos" aria-label="Enam Kegiatan Mahasiswa BEM UMN">
                    {kegmaList.map((item) => {
                        const label = homepageLabels[item.id] ?? item.title;

                        return (
                            <li key={item.id} className="home-kegma-logo" data-kegma-logo>
                                <span className="home-kegma-logo-art" data-kegma-logo-art>
                                    <Image src={item.logo} alt={`Logo ${label}`} width={180} height={180} sizes="(max-width: 700px) 30vw, (max-width: 1024px) 16vw, 11rem" />
                                </span>
                                <span>{label}</span>
                            </li>
                        );
                    })}
                </ul>
                <div className="home-kegma-center" data-kegma-center>
                    <h2 id="home-work-title">Kegiatan Mahasiswa</h2>
                    <p>Enam ruang untuk menemukan minat, bertemu, dan berkarya bersama.</p>
                    <Link href="/kegiatan" className="home-button">Jelajahi kegiatan<ArrowUpRight size={18} aria-hidden="true" /></Link>
                </div>
            </div>
        </section>
    );
}
