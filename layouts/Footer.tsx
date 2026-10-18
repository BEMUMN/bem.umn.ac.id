import React from "react";
import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/constants";

const Footer = () => {
    return (
        <footer className="relative mt-20 w-full border-t border-white/10 bg-dark-blue/95 py-12 text-white">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 md:flex-row md:items-start">
                {/* Brand Column */}
                <div className="flex flex-col items-center text-center md:items-start md:text-left">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/svgs/LOGO_BEM.svg"
                            alt="Logo BEM UMN"
                            width={42}
                            height={42}
                            className="object-contain"
                        />
                        <div>
                            <span className="font-serif text-sm font-bold tracking-wide text-white">
                                BEM UMN GEN XVI
                            </span>
                            <p className="font-sans text-[11px] text-azure">
                                #InclusiveForInnovation
                            </p>
                        </div>
                    </div>
                    <p className="mt-3 max-w-sm font-sans text-xs leading-relaxed text-concrete/70">
                        Badan Eksekutif Mahasiswa Universitas Multimedia Nusantara.
                        Lembaga eksekutif mahasiswa tertinggi tingkat universitas.
                    </p>
                </div>

                {/* Quick Links Column */}
                <div className="flex flex-col items-center md:items-start">
                    <span className="font-serif text-xs font-semibold tracking-wider text-azure uppercase">
                        Navigasi Utama
                    </span>
                    <ul className="mt-3 flex flex-wrap justify-center gap-4 text-xs font-sans text-concrete/80 md:flex-col md:gap-2">
                        {navLinks.map((link) => (
                            <li key={link.id}>
                                <Link
                                    href={link.href}
                                    className="transition hover:text-white hover:underline"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Campus & Credential Column */}
                <div className="flex flex-col items-center text-center md:items-end md:text-right">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/svgs/Logo_UMN.svg"
                            alt="Universitas Multimedia Nusantara"
                            width={100}
                            height={32}
                            className="h-8 w-auto object-contain brightness-0 invert"
                        />
                    </div>
                    <p className="mt-3 font-sans text-[11px] text-azure/70">
                        Jl. Scientia Boulevard, Gading Serpong, Tangerang, Banten
                    </p>
                    <p className="mt-4 font-sans text-[11px] text-concrete/50">
                        &copy; 2026 BEM UMN GEN XVI. Hak Cipta Dilindungi.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
