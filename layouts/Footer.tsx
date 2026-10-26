import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Instagram,
    Linkedin,
    Facebook,
    Mail,
    MapPin,
    ArrowUpRight,
    ArrowRight,
} from "lucide-react";
import { navLinks } from "@/constants";
import { contactConfig } from "@/constants/contactIndex";

// Pixel-perfect SVG untuk TikTok (Standard 24x24)
const TikTokIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-hidden="true"
    >
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.46 6.27 6.27 0 0 0 1.86-4.46V8.78a8.18 8.18 0 0 0 4.91 1.62V6.95a4.85 4.85 0 0 1-1-.26z" />
    </svg>
);

// Pixel-perfect SVG untuk LINE (Standard 24x24)
const LineIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-hidden="true"
    >
        <path d="M19.365 9.864c0-4.043-4.195-7.332-9.365-7.332S.635 5.821.635 9.864c0 3.621 3.226 6.657 7.588 7.218.295.064.697.195.798.448.092.23.06.59.03.822-.057.447-.263 1.745-.3 1.99-.044.256-.197.998.428.544.625-.453 3.376-2.029 4.608-2.822.427-.275.986-.414 1.488-.414 2.859 0 4.09-1.632 4.09-3.786z" />
    </svg>
);

// Pixel-perfect SVG untuk WhatsApp (Standard 24x24)
const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-hidden="true"
    >
        <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.477-.15-.678.15-.2.301-.778.98-.954 1.18-.176.2-.351.226-.653.075-.301-.151-1.272-.469-2.423-1.496-.895-.799-1.5-1.786-1.676-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.301-.502.101-.2.05-.376-.025-.526-.075-.151-.678-1.634-.929-2.237-.245-.588-.493-.508-.678-.517-.176-.009-.376-.01-.577-.01-.201 0-.527.075-.803.376s-1.054 1.03-1.054 2.512c0 1.482 1.08 2.912 1.23 3.113.151.2 2.126 3.245 5.15 4.551.719.31 1.28.496 1.718.635.722.23 1.378.197 1.898.12.58-.087 1.78-.727 2.03-1.43.251-.703.251-1.305.176-1.43-.075-.126-.276-.201-.577-.351zM12.042 21.848h-.008a9.845 9.845 0 0 1-5.016-1.378l-.36-.214-3.731.978.995-3.638-.235-.374a9.86 9.86 0 0 1-1.51-5.26c0-5.445 4.432-9.876 9.882-9.876 2.636 0 5.114 1.028 6.977 2.894 1.862 1.866 2.887 4.346 2.885 6.983 0 5.446-4.432 9.885-9.874 9.885zM12.042 0C5.393 0 0 5.393 0 12.042c0 2.124.555 4.198 1.609 6.024L.067 24l6.103-1.601a12.003 12.003 0 0 0 5.872 1.517h.005c6.648 0 12.042-5.394 12.042-12.042 0-3.218-1.253-6.242-3.529-8.52A12.01 12.01 0 0 0 12.042 0z" />
    </svg>
);

const socialIcon = (id: string) => {
    if (id === "instagram") return <Instagram size={16} />;
    if (id === "linkedin") return <Linkedin size={16} />;
    if (id === "facebook") return <Facebook size={16} />;
    if (id === "tiktok") return <TikTokIcon className="h-4 w-4" />;
    return null;
};

const channelIcon = (id: string) => {
    if (id === "line") return <LineIcon className="h-4 w-4" />;
    if (id === "whatsapp") return <WhatsAppIcon className="h-4 w-4" />;
    return <Mail size={16} />;
};

const heading =
    "text-pale-taupe font-sans text-[11px] font-semibold tracking-[0.22em] uppercase";

const Footer = () => {
    return (
        <footer className="theme-ink relative mt-24 w-full overflow-hidden bg-[#0a1530] text-white">
            <div
                className="pointer-events-none absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `url('/pngs/texture/ASSET.webp')`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "280px auto",
                }}
                aria-hidden="true"
            />
            <div className="via-azure/60 absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Ajakan utama */}
                <div className="grid gap-12 border-b border-white/10 py-16 lg:grid-cols-12 lg:items-end lg:py-24">
                    <div className="lg:col-span-8">
                        <p className={heading}>{contactConfig.tagline}</p>
                        <h2 className="mt-5 font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-7xl">
                            Jelajahi seluruh{" "}
                            <em className="text-pale-taupe">kegiatan</em> BEM
                            UMN.
                        </h2>
                        <p className="text-concrete/80 mt-6 max-w-xl font-sans text-sm leading-7 sm:text-base">
                            {contactConfig.description}
                        </p>
                        <div className="mt-9 flex flex-wrap gap-3">
                            <Link
                                href="/kegiatan"
                                className="group bg-pale-taupe text-navy-dark focus-visible:ring-azure inline-flex min-h-12 items-center gap-2 rounded-full px-7 font-sans text-sm font-bold transition hover:bg-white focus:outline-none focus-visible:ring-2 active:scale-95"
                            >
                                Jelajahi seluruh kegiatan
                                <ArrowRight
                                    size={16}
                                    className="transition-transform group-hover:translate-x-1"
                                />
                            </Link>
                            <Link
                                href="/divisi"
                                className="focus-visible:ring-azure inline-flex min-h-12 items-center rounded-full border border-white/25 px-7 font-sans text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 active:scale-95"
                            >
                                Kenali divisi
                            </Link>
                        </div>
                    </div>
                    <div className="lg:col-span-4 lg:flex lg:justify-end">
                        <Image
                            src="/pngs/gen-xvi-light.webp"
                            alt=""
                            width={700}
                            height={248}
                            className="h-auto w-56 sm:w-64 lg:w-72"
                        />
                    </div>
                </div>

                {/* Tautan */}
                <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
                    <div className="lg:col-span-4">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/"
                                aria-label="Kembali ke Beranda BEM UMN"
                                className="focus-visible:ring-azure flex items-center gap-3 rounded-xl focus:outline-none focus-visible:ring-2"
                            >
                                <Image
                                    src="/svgs/LOGO_BEM.svg"
                                    alt="Logo BEM UMN"
                                    width={44}
                                    height={44}
                                    className="h-11 w-auto object-contain"
                                />
                                <span className="flex flex-col">
                                    <span className="font-serif text-base tracking-wider">
                                        BEM UMN
                                    </span>
                                    <span className="text-azure font-sans text-[10px] font-bold tracking-widest uppercase">
                                        Gen XVI
                                    </span>
                                </span>
                            </Link>
                            <span className="h-8 w-px bg-white/20" />
                            <Image
                                src="/svgs/LOGO_UMN_WHITE.svg"
                                alt="Universitas Multimedia Nusantara"
                                width={90}
                                height={32}
                                className="h-8 w-auto object-contain opacity-90"
                            />
                        </div>
                        <a
                            href={contactConfig.address.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-concrete/80 hover:text-azure mt-6 flex items-start gap-3 font-sans text-xs leading-relaxed transition-colors"
                        >
                            <MapPin
                                size={16}
                                className="text-azure mt-0.5 shrink-0"
                            />
                            <span>
                                <strong className="block font-medium text-white">
                                    {contactConfig.address.campus}
                                </strong>
                                {contactConfig.address.street},{" "}
                                {contactConfig.address.area},{" "}
                                {contactConfig.address.city}
                            </span>
                        </a>
                    </div>

                    <nav aria-label="Navigasi footer" className="lg:col-span-2">
                        <p className={heading}>Navigasi</p>
                        <ul className="mt-4 space-y-1">
                            {navLinks.map((link) => (
                                <li key={link.id}>
                                    <Link
                                        href={link.href}
                                        className="hover:text-azure focus-visible:text-azure inline-flex min-h-11 items-center font-serif text-lg transition-colors focus:outline-none focus-visible:underline"
                                    >
                                        {link.label.charAt(0) +
                                            link.label.slice(1).toLowerCase()}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="lg:col-span-3">
                        <p className={heading}>Kontak</p>
                        <ul className="mt-4 space-y-3 font-sans text-xs">
                            {contactConfig.channels.map((ch) => (
                                <li
                                    key={ch.id}
                                    className="flex items-center justify-between gap-3 border-b border-white/10 pb-3"
                                >
                                    <span className="text-concrete/80 flex items-center gap-2.5">
                                        <span className="text-azure">
                                            {channelIcon(ch.id)}
                                        </span>
                                        {ch.name}
                                    </span>
                                    <span className="text-pale-taupe/90 text-[11px]">
                                        {ch.value}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-3">
                        <p className={heading}>Media sosial</p>
                        <ul className="mt-4 space-y-3 font-sans text-xs">
                            {contactConfig.socials.map((sc) => {
                                const live = !sc.isPlaceholder && sc.href !== "#";
                                const row = (
                                    <>
                                        <span className="text-azure">
                                            {socialIcon(sc.id)}
                                        </span>
                                        <span className="font-semibold text-white">
                                            {sc.name}
                                        </span>
                                        {live ? (
                                            <ArrowUpRight
                                                size={14}
                                                className="text-azure/80 ml-auto transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                            />
                                        ) : (
                                            <span className="text-pale-taupe/70 ml-auto text-[10px]">
                                                Segera hadir
                                            </span>
                                        )}
                                    </>
                                );
                                return (
                                    <li
                                        key={sc.id}
                                        className="border-b border-white/10 pb-3"
                                    >
                                        {live ? (
                                            <a
                                                href={sc.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={sc.ariaLabel}
                                                className="group hover:text-azure focus-visible:ring-azure flex items-center gap-2.5 rounded focus:outline-none focus-visible:ring-2"
                                            >
                                                {row}
                                            </a>
                                        ) : (
                                            <div
                                                aria-label={sc.ariaLabel}
                                                className="flex items-center gap-2.5 opacity-70"
                                            >
                                                {row}
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                <div className="text-concrete/70 flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 font-sans text-xs sm:flex-row">
                    <p>Copyright &copy; 2026 BEM Gen XVI</p>
                    <p className="text-pale-taupe font-medium">
                        Design &amp; Develop by BEM Gen XVI
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
