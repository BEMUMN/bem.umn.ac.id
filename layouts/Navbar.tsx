"use client";

import { navLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
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
    const isVisible = visible || mobileMenuOpen;

    return (
        <header
            ref={headerRef}
            data-nav-visible={isVisible}
            onFocusCapture={() => setVisible(true)}
            className={`fixed top-0 left-0 z-50 w-full px-4 pt-4 transition-transform duration-300 ease-in-out motion-reduce:transition-none md:px-8 md:pt-6 ${
                isVisible
                    ? "translate-y-0"
                    : "pointer-events-none -translate-y-full"
            }`}
        >
            <nav
                id="navbar-capsule"
                aria-label="Navigasi Utama"
                className="from-dark-blue/80 via-blue-primary/70 to-dark-blue/80 mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/20 bg-gradient-to-r px-4 py-2.5 shadow-2xl backdrop-blur-xl transition-all duration-300 md:px-6 md:py-3"
            >
                {/* Logo & Identitas (Bisa dijadikan tombol Home) */}
                <Link
                    href="/"
                    aria-label="Kembali ke Beranda BEM UMN"
                    className="group flex min-w-0 items-center gap-2 transition-opacity hover:opacity-90 sm:gap-3"
                >
                    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 p-1 ring-1 ring-white/30 transition group-hover:scale-105 md:h-12 md:w-12">
                        <Image
                            src="/svgs/LOGO_BEM.svg"
                            alt="Logo BEM UMN"
                            width={44}
                            height={44}
                            className="h-full w-full object-contain"
                            priority
                        />
                    </div>
                    <div className="flex flex-col text-left font-sans">
                        <span className="text-[10px] font-bold tracking-wide text-white drop-shadow-sm sm:text-sm md:text-base">
                            Badan Eksekutif Mahasiswa
                        </span>
                        <span className="text-azure/90 text-[9px] font-medium tracking-wider sm:text-xs">
                            Universitas Multimedia Nusantara
                        </span>
                    </div>
                </Link>

                {/* Desktop Menu Capsule Buttons (Uniform Width w-32) */}
                <ul className="hidden items-center gap-2 lg:flex lg:gap-3">
                    {navLinks.map((link) => (
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
                                className="border-azure/30 bg-blue-primary/60 hover:bg-dark-blue inline-flex min-h-11 w-28 items-center justify-center rounded-full border py-2.5 font-sans text-xs font-semibold tracking-wider text-white shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white hover:shadow-md active:scale-95 xl:w-32"
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
                        className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 p-2 text-white transition hover:bg-white/20 active:scale-95"
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Dropdown Menu */}
            {mobileMenuOpen && (
                <div
                    id="mobile-navigation"
                    className="bg-dark-blue/95 mx-auto mt-2 max-w-sm rounded-3xl border border-white/20 p-4 shadow-2xl backdrop-blur-2xl lg:hidden"
                >
                    <ul className="flex flex-col gap-2">
                        {navLinks.map((link) => (
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
                                    className="border-azure/20 bg-blue-primary/40 hover:bg-blue-primary flex min-h-11 w-full items-center justify-center rounded-full border py-2.5 font-sans text-sm font-semibold tracking-wide text-white transition hover:text-white"
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
