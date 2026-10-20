"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navLinks } from "@/constants";

const labels: Record<string, string> = {
    beranda: "Beranda",
    "tentang-kami": "Tentang kami",
    divisi: "Divisi",
    kegiatan: "Kegiatan",
};

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const toggle = useRef<HTMLButtonElement>(null);
    const header = useRef<HTMLElement>(null);
    useEffect(() => {
        if (!open) return;
        const close = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpen(false);
                toggle.current?.focus();
            }
        };
        const outside = (e: PointerEvent) => {
            if (!header.current?.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("keydown", close);
        document.addEventListener("pointerdown", outside);
        return () => {
            document.removeEventListener("keydown", close);
            document.removeEventListener("pointerdown", outside);
        };
    }, [open]);
    const active = (href: string) =>
        href === "/" ? pathname === href : pathname.startsWith(href);
    return (
        <header className="site-header" ref={header}>
            <nav className="site-nav container" aria-label="Navigasi utama">
                <Link href="/" className="brand" onClick={() => setOpen(false)}>
                    <Image
                        className="brand-mark"
                        src="/images/bem-mark.webp"
                        alt=""
                        width={44}
                        height={44}
                        priority
                        unoptimized
                    />
                    <span>
                        <span className="brand-name">BEM UMN</span>
                        <span className="brand-caption">
                            Universitas Multimedia Nusantara
                        </span>
                    </span>
                </Link>
                <ul className="desktop-nav">
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <Link
                                className="nav-link"
                                href={link.href}
                                aria-current={
                                    active(link.href) ? "page" : undefined
                                }
                            >
                                {labels[link.id]}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <a className="button" href="#kontak">
                            Kontak <ArrowUpRight size={16} aria-hidden="true" />
                        </a>
                    </li>
                </ul>
                <button
                    className="menu-toggle"
                    ref={toggle}
                    onClick={() => setOpen(!open)}
                    aria-expanded={open}
                    aria-controls="mobile-navigation"
                    aria-label={
                        open ? "Tutup menu navigasi" : "Buka menu navigasi"
                    }
                >
                    <span>Menu</span>
                    {open ? (
                        <X size={24} aria-hidden="true" />
                    ) : (
                        <Menu size={24} aria-hidden="true" />
                    )}
                </button>
            </nav>
            {open && (
                <nav
                    id="mobile-navigation"
                    className="mobile-menu"
                    aria-label="Navigasi seluler"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.id}
                            href={link.href}
                            aria-current={
                                active(link.href) ? "page" : undefined
                            }
                            onClick={() => setOpen(false)}
                        >
                            {labels[link.id]}
                            <ArrowUpRight size={20} aria-hidden="true" />
                        </Link>
                    ))}
                    <a href="#kontak" onClick={() => setOpen(false)}>
                        Kontak
                        <ArrowUpRight size={20} aria-hidden="true" />
                    </a>
                </nav>
            )}
        </header>
    );
}
