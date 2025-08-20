"use client";

import { navLinks } from "@/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
    useGSAP(() => {
        const navTween = gsap.timeline({
            scrollTrigger: {
                trigger: "nav",
                start: "bottom top",
                scrub: true,
            },
        });

        navTween.fromTo(
            "nav",
            {
                backgroundColor: "transparent",
            },
            {
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                duration: 2,
                backdropFilter: "blur(10px)",
                ease: "power1.inOut",
            },
        );
    });

    return (
        <nav className="glass-blur fixed z-50 w-full overflow-x-hidden bg-transparent">
            <div className="responsive-padding-x-md flex items-center justify-between py-8">
                <div className="flex items-center gap-4">
                    <Image
                        src="/svgs/bem-logo.svg"
                        alt="BEM UMN Logo"
                        width={50}
                        height={50}
                    />

                    {/* <Image
						src="/svgs/gen-logo.svg"
						alt="GEN XV Logo"
						width={100}
						height={100}
					/> */}
                </div>

                <ul className="flex gap-8">
                    {navLinks.map((link) => (
                        <li key={link.id} className="mr-4 inline-block">
                            <Link href={`/${link.id}`} className="text-lg">
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
