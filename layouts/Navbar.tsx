"use client";

import { navLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

const tones = ["bg-concrete", "bg-cream", "bg-azure", "bg-pale-taupe"];
const linkTone =
    "aria-[current=page]:bg-navy-dark aria-[current=page]:text-cream aria-[current=page]:border-navy-dark";

const Navbar = ({ compact = false }: { compact?: boolean }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const lastScrollY = useRef(0);
    const headerRef = useRef<HTMLElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        if (!mobileMenuOpen) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setMobileMenuOpen(false);
                toggleRef.current?.focus();
            }
        };
        const onPointer = (event: PointerEvent) => {
            if (!headerRef.current?.contains(event.target as Node))
                setMobileMenuOpen(false);
        };
        document.addEventListener("keydown", onKey);
        document.addEventListener("pointerdown", onPointer);
        return () => {
            document.removeEventListener("keydown", onKey);
            document.removeEventListener("pointerdown", onPointer);
        };
    }, [mobileMenuOpen]);

    // Deteksi arah scroll untuk slide-out saat scroll ke bawah dan slide-in saat scroll ke atas
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = Math.max(0, window.scrollY);

            if (
                headerRef.current?.contains(document.activeElement) &&
                document.activeElement?.matches(":focus-visible")
            ) {
                setVisible(true);
                lastScrollY.current = currentScrollY;
                return;
            }
            // Selalu tampilkan jika berada di dekat puncak halaman
            if (currentScrollY <= 60) {
                setVisible(true);
                lastScrollY.current = currentScrollY;
                return;
            }

            const delta = currentScrollY - lastScrollY.current;

            // Threshold 6px mencegah getaran visual pada micro-scroll
            if (Math.abs(delta) > 6) {
                if (delta > 0) {
                    // Scroll ke bawah: sembunyikan header
                    setVisible(false);
                } else {
                    // Scroll ke atas: tampilkan header kembali
                    setVisible(true);
                }
                lastScrollY.current = currentScrollY;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Pertahankan header tetap tampak jika menu mobile sedang dibuka
    const isVisible = compact || visible || mobileMenuOpen;

    return (
        <header
            ref={headerRef}
            data-nav-visible={isVisible}
            onFocusCapture={() => setVisible(true)}
            className={`theme-ink fixed top-0 left-0 z-50 w-full px-4 pt-4 transition-transform duration-300 ease-in-out motion-reduce:transition-none md:px-8 md:pt-6 ${compact ? "lg:px-[clamp(1.25rem,5vw,5.5rem)] lg:pt-2.5" : ""} ${
                isVisible
                    ? "translate-y-0"
                    : "pointer-events-none -translate-y-full"
            }`}
        >
            <nav
                id="navbar-capsule"
                aria-label="Navigasi Utama"
                className={`bg-concrete/90 border-navy-dark/15 flex items-center justify-between rounded-full border px-4 py-2.5 shadow-md backdrop-blur-sm transition-all duration-300 md:px-6 md:py-3 ${compact ? "lg:min-h-11 lg:w-fit lg:gap-6 lg:py-1 lg:pr-4 lg:pl-1.5" : "mx-auto max-w-7xl"}`}
            >
                {/* Logo & Identitas (Bisa dijadikan tombol Home) */}
                <Link
                    href="/"
                    aria-label="Kembali ke Beranda BEM UMN"
                    className="group flex min-w-0 items-center gap-2 transition-opacity hover:opacity-90 sm:gap-3"
                >
                    <div
                        className={`relative flex shrink-0 items-center justify-center transition group-hover:scale-105 ${compact ? "h-[30px] w-[30px]" : "h-10 w-10 md:h-11 md:w-11"}`}
                    >
                        <Image
                            src="/svgs/bem-logo-xvi.svg"
                            alt="Logo BEM UMN"
                            width={44}
                            height={44}
                            className="h-full w-full object-contain"
                            priority
                        />
                    </div>
                    <div
                        className={`flex flex-col text-left font-sans ${compact ? "hidden" : ""}`}
                    >
                        <span className="text-navy-dark text-[10px] font-bold tracking-wide sm:text-sm md:text-base">
                            Badan Eksekutif Mahasiswa
                        </span>
                        <span className="text-blue-primary text-[9px] font-medium tracking-wider sm:text-xs">
                            Universitas Multimedia Nusantara
                        </span>
                    </div>
                    {compact && (
                        <div className="text-navy-dark flex items-baseline gap-2 pr-1 whitespace-nowrap">
                            <span className="font-sans text-[0.95rem] font-bold tracking-[0.02em]">
                                BEM UMN
                            </span>
                            <span className="text-blue-primary font-serif text-[1.05rem] italic">
                                Gen XVI
                            </span>
                        </div>
                    )}
                </Link>

                {/* Desktop Menu Capsule Buttons (Uniform Width w-32) */}
                <ul
                    className={`hidden items-center gap-2 lg:gap-3 ${compact ? "" : "lg:flex"}`}
                >
                    {navLinks.map((link, i) => (
                        <li key={link.id}>
                            <Link
                                href={link.href}
                                aria-current={
                                    pathname === link.href ||
                                    (link.href !== "/" &&
                                        pathname.startsWith(`${link.href}/`))
                                        ? "page"
                                        : undefined
                                }
                                className={`${tones[i % tones.length]} ${linkTone} border-navy-dark/25 text-navy-dark inline-flex min-h-11 w-28 items-center justify-center rounded-full border py-2.5 font-sans text-xs font-semibold tracking-wider shadow-sm transition-all duration-300 hover:scale-105 hover:brightness-95 active:scale-95 xl:w-32`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Hamburger Toggle */}
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        ref={toggleRef}
                        aria-expanded={mobileMenuOpen}
                        aria-controls="mobile-navigation"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={
                            mobileMenuOpen
                                ? "Tutup menu navigasi"
                                : "Buka menu navigasi"
                        }
                        className="border-navy-dark/25 bg-concrete text-navy-dark hover:bg-pale-taupe flex min-h-11 min-w-11 items-center justify-center rounded-full border p-2 transition active:scale-95"
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Dropdown Menu */}
            {mobileMenuOpen && (
                <div
                    id="mobile-navigation"
                    className="bg-cream border-navy-dark/20 mx-auto mt-2 max-w-sm rounded-3xl border p-4 shadow-2xl lg:hidden"
                >
                    <ul className="flex flex-col gap-2">
                        {navLinks.map((link, i) => (
                            <li key={link.id}>
                                <Link
                                    href={link.href}
                                    aria-current={
                                        pathname === link.href ||
                                        (link.href !== "/" &&
                                            pathname.startsWith(
                                                `${link.href}/`,
                                            ))
                                            ? "page"
                                            : undefined
                                    }
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`${tones[i % tones.length]} ${linkTone} border-navy-dark/25 text-navy-dark flex min-h-11 w-full items-center justify-center rounded-full border py-2.5 font-sans text-sm font-semibold tracking-wide transition hover:brightness-95`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Navbar;
