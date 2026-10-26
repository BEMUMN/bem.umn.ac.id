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

const icon = (id: string) => {
    if (id === "instagram") return <Instagram size={16} />;
    if (id === "linkedin") return <Linkedin size={16} />;
    if (id === "facebook") return <Facebook size={16} />;
    if (id === "tiktok") return <TikTokIcon className="h-4 w-4" />;
    if (id === "line") return <LineIcon className="h-4 w-4" />;
    if (id === "whatsapp") return <WhatsAppIcon className="h-4 w-4" />;
    return <Mail size={16} />;
};

// Socials and direct channels read as one list: what is live is a link, what
// is not yet is named once in a quiet line instead of a row of disabled pills.
const contacts = [
    ...contactConfig.socials.map((s) => ({ ...s, detail: s.handle })),
    ...contactConfig.channels.map((c) => ({
        ...c,
        href: c.href ?? "#",
        detail: c.value,
    })),
];
const live = contacts.filter((c) => !c.isPlaceholder && c.href !== "#");
const soon = contacts.filter((c) => !live.includes(c));
const invite = live.find((c) => c.id === "instagram") ?? live[0];

const heading =
    "text-pale-taupe font-sans text-[11px] font-semibold tracking-[0.22em] uppercase";
// One row height for every list, so the columns read across as a ruled sheet.
const row =
    "group flex min-h-14 items-center gap-3 border-b border-white/10 transition-colors duration-200 focus:outline-none";
const ring =
    "focus-visible:ring-azure focus-visible:ring-offset-navy-dark focus-visible:ring-2 focus-visible:ring-offset-2";

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
            <div className="via-azure/50 absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent" />

            <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                {/* Pernyataan + ajakan */}
                <div className="grid gap-10 py-14 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16 lg:py-20">
                    <div className="max-w-3xl">
                        <p className={heading}>{contactConfig.tagline}</p>
                        <h2 className="mt-5 font-serif text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-7xl">
                            Inclusive for{" "}
                            <em className="text-pale-taupe">Innovation</em>.
                        </h2>
                        <p className="text-concrete/75 mt-5 max-w-xl font-sans text-sm leading-7 sm:text-base">
                            {contactConfig.description}
                        </p>
                    </div>
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:flex-col lg:items-end">
                        <Image
                            src="/pngs/gen-xvi-light.webp"
                            alt="Gen XVI"
                            width={700}
                            height={248}
                            className="h-auto w-44 sm:w-56 lg:w-64"
                        />
                        {invite && (
                            <div className="lg:text-right">
                                <p className="text-concrete/70 font-sans text-sm">
                                    Punya ide atau aspirasi?
                                </p>
                                <a
                                    href={invite.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={invite.ariaLabel}
                                    className={`group bg-pale-taupe text-navy-dark mt-3 inline-flex min-h-12 items-center gap-2 rounded-full px-5 font-sans text-[13px] font-semibold whitespace-nowrap transition-colors duration-200 hover:bg-white focus:outline-none sm:gap-2.5 sm:px-6 sm:text-sm ${ring}`}
                                >
                                    {icon(invite.id)}
                                    Sampaikan lewat {invite.name}
                                    <ArrowUpRight
                                        size={16}
                                        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                    />
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Kolom */}
                <div className="grid gap-x-12 gap-y-12 border-t border-white/15 pt-12 pb-14 md:grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_1fr]">
                    {/* Sekretariat */}
                    <div className="md:row-span-2 lg:row-span-1">
                        <p className={heading}>Sekretariat</p>
                        <div className="mt-6 flex items-start gap-3 font-sans text-sm leading-6">
                            <MapPin
                                size={18}
                                className="text-azure mt-1 shrink-0"
                                aria-hidden="true"
                            />
                            <address className="text-concrete/80 not-italic">
                                <strong className="block font-medium text-white">
                                    {contactConfig.address.campus}
                                </strong>
                                {contactConfig.address.street}
                                <br />
                                {contactConfig.address.area}
                                <br />
                                {contactConfig.address.city}
                            </address>
                        </div>
                        <a
                            href={contactConfig.address.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group text-azure mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 font-sans text-xs font-semibold transition-colors duration-200 hover:border-white/40 hover:bg-white/10 hover:text-white focus:outline-none ${ring}`}
                        >
                            Buka di peta
                            <ArrowUpRight
                                size={14}
                                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                        </a>
                    </div>

                    {/* Jelajahi */}
                    <nav aria-label="Navigasi footer">
                        <p className={heading}>Jelajahi</p>
                        <ul className="mt-6 border-t border-white/10">
                            {navLinks.map((link, i) => (
                                <li key={link.id}>
                                    <Link
                                        href={link.href}
                                        className={`${row} hover:text-azure focus-visible:text-azure focus-visible:underline`}
                                    >
                                        <span className="text-pale-taupe/60 group-hover:text-pale-taupe font-sans text-[11px] tabular-nums transition-colors">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <span className="font-serif text-xl">
                                            {link.label.charAt(0) +
                                                link.label
                                                    .slice(1)
                                                    .toLowerCase()}
                                        </span>
                                        <ArrowRight
                                            size={15}
                                            aria-hidden="true"
                                            className="ml-auto -translate-x-1 opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Terhubung */}
                    <div>
                        <p className={heading}>Terhubung</p>
                        <ul className="mt-6 border-t border-white/10 font-sans text-sm">
                            {live.map((c) => (
                                <li key={c.id}>
                                    <a
                                        href={c.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={c.ariaLabel}
                                        className={`${row} hover:text-azure focus-visible:text-azure focus-visible:underline`}
                                    >
                                        <span className="text-azure">
                                            {icon(c.id)}
                                        </span>
                                        <span className="font-semibold">
                                            {c.name}
                                        </span>
                                        <span className="text-concrete/60 ml-auto text-xs">
                                            {c.detail}
                                        </span>
                                        <ArrowUpRight
                                            size={15}
                                            aria-hidden="true"
                                            className="text-azure/80 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                        />
                                    </a>
                                </li>
                            ))}
                        </ul>
                        {soon.length > 0 && (
                            <p className="text-concrete/60 mt-5 font-sans text-xs leading-6">
                                <span className="text-pale-taupe font-semibold">
                                    Segera hadir:
                                </span>{" "}
                                {soon.map((c) => c.name).join(" · ")}
                            </p>
                        )}
                    </div>
                </div>

                {/* Kolofon */}
                <div className="flex flex-col gap-5 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
                    <Link
                        href="/"
                        aria-label="Kembali ke Beranda BEM UMN"
                        className={`flex w-fit items-center gap-3 rounded-xl focus:outline-none ${ring}`}
                    >
                        <Image
                            src="/svgs/LOGO_BEM.svg"
                            alt=""
                            width={40}
                            height={40}
                            className="h-10 w-auto object-contain"
                        />
                        <span className="h-7 w-px bg-white/20" />
                        <Image
                            src="/svgs/LOGO_UMN_WHITE.svg"
                            alt=""
                            width={90}
                            height={32}
                            className="h-9 w-auto object-contain opacity-90"
                        />
                    </Link>
                    <div className="text-concrete/60 flex flex-col gap-1 font-sans text-xs sm:items-end">
                        <p>&copy; 2026 BEM UMN Gen XVI</p>
                        <p>
                            Dirancang &amp; dikembangkan oleh{" "}
                            <span className="text-pale-taupe">
                                BEM UMN Gen XVI
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
