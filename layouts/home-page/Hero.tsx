"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const statement = "Commit. Solid. Integrated.";

export default function Hero({ id }: { id: string }) {
    const section = useRef<HTMLElement>(null);
    const [typed, setTyped] = useState(statement);
    const [typing, setTyping] = useState(false);

    useEffect(() => {
        const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
        let timer: ReturnType<typeof setTimeout>;
        let position = 0;
        const finish = () => {
            clearTimeout(timer);
            setTyped(statement);
            setTyping(false);
        };
        const tick = () => {
            position += 1;
            setTyped(statement.slice(0, position));
            if (position === statement.length) {
                setTyping(false);
                return;
            }
            timer = setTimeout(tick, statement[position - 1] === "." ? 750 : 85);
        };
        if (!preference.matches) {
            setTyped("");
            setTyping(true);
            timer = setTimeout(tick, 350);
        }
        const onPreferenceChange = () => { if (preference.matches) finish(); };
        preference.addEventListener("change", onPreferenceChange);
        return () => {
            clearTimeout(timer);
            preference.removeEventListener("change", onPreferenceChange);
        };
    }, []);

    useGSAP(() => {
        const media = gsap.matchMedia();
        media.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.fromTo(".home-hero-mark", { y: 14 }, { y: 0, duration: 1.1, ease: "power3.out" });
        });
        return () => media.revert();
    }, { scope: section });

    return (
        <section ref={section} id={id} className="home-hero-transition" aria-labelledby="home-title">
            <div className="home-hero-peel" data-home-peel>
                <svg className="home-peel-cast" data-home-peel-cast aria-hidden="true" focusable="false" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="home-peel-cast-gradient" data-home-peel-cast-gradient gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="var(--navy-dark)" stopOpacity="0.42" />
                            <stop offset="0.35" stopColor="var(--navy-dark)" stopOpacity="0.16" />
                            <stop offset="1" stopColor="var(--navy-dark)" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <polygon data-home-peel-cast-polygon fill="url(#home-peel-cast-gradient)" points="" />
                </svg>
                <div className="home-hero-sheet" data-home-hero-sheet>
                    <div className="home-brand-stamp">
                        <Image src="/svgs/WHITE_LOGO_BEM.svg" alt="" width={28} height={28} />
                        <span>BEM UMN <span>Gen XVI</span></span>
                    </div>
                    <Image className="home-motif home-motif-solid" src="/svgs/SOLID_supergrafik_4.svg" alt="" width={340} height={340} aria-hidden="true" />
                    <Image className="home-motif home-motif-collaborative" src="/svgs/COLLABORATIVE_supergrafik_1.svg" alt="" width={340} height={340} aria-hidden="true" />
                    <div className="home-hero-center">
                        <p className="home-typing">
                            <span className="sr-only">{statement}</span>
                            <span className="home-typing-space" aria-hidden="true">{statement}</span>
                            <span className="home-typing-ink" aria-hidden="true">{typed}<span className={typing ? "home-caret" : "home-caret home-caret-done"} /></span>
                        </p>
                        <h1 id="home-title" className="home-hero-mark">
                            <span className="sr-only">BEM UMN Generasi XVI</span>
                            <span className="home-hero-bem" aria-hidden="true">BEM</span>
                            <Image className="home-hero-gen" src="/pngs/gen-xvi-light.webp" alt="" width={700} height={248} priority />
                        </h1>
                        <p className="home-tagline">Inclusive for Innovation</p>
                    </div>
                    <div className="home-hero-colophon">
                        <p>Badan Eksekutif Mahasiswa Universitas Multimedia Nusantara</p>
                    </div>
                </div>
                <svg className="home-peel-flap" data-home-peel-flap aria-hidden="true" focusable="false" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="home-peel-flap-gradient" data-home-peel-flap-gradient gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="var(--camel-brown)" />
                            <stop offset="0.1" stopColor="var(--cream-linen)" />
                            <stop offset="0.45" stopColor="var(--white)" />
                            <stop offset="1" stopColor="var(--cream-linen)" />
                        </linearGradient>
                    </defs>
                    <polygon data-home-peel-flap-shadow-far fill="var(--navy-dark)" fillOpacity="0.07" points="" />
                    <polygon data-home-peel-flap-shadow-near fill="var(--navy-dark)" fillOpacity="0.12" points="" />
                    <polygon data-home-peel-flap-paper fill="url(#home-peel-flap-gradient)" stroke="var(--white)" strokeOpacity="0.55" strokeWidth="1" points="" />
                </svg>
            </div>
        </section>
    );
}
