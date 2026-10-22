import React from "react";
import Image from "next/image";
import { Sparkles, Shield, Share2, Lightbulb } from "lucide-react";

type ValuesProps = {
    id: string;
    className?: string;
};

const Values = ({ id, className }: ValuesProps) => {
    return (
        <section
            id={id}
            className={`relative flex w-full flex-col items-center justify-center px-4 py-12 sm:px-6 md:px-12 lg:py-16 ${className}`}
        >
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
                {/* Section Header */}
                <div className="scroll-reveal max-w-3xl text-center">
                    <div className="border-camel-brown/40 text-pale-taupe inline-flex items-center gap-2 rounded-full border bg-white/5 px-3.5 py-1 font-sans text-xs font-semibold tracking-wider uppercase">
                        <Sparkles size={13} className="text-camel-brown" />
                        <span>02 // Nilai &amp; Filosofi Visual</span>
                    </div>

                    <h2 className="mt-2.5 font-serif text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                        Nilai &amp; Identitas Kabinet
                    </h2>
                    <p className="text-azure/90 mt-2 font-sans text-xs sm:text-sm md:text-base">
                        Empat motif supergrafik resmi yang menjadi kompas gerak
                        BEM UMN Gen XVI dalam menavigasi dinamika organisasi
                        kemahasiswaan kampus.
                    </p>
                </div>

                {/* ASYMMETRICAL BENTO GRID — COMPACT SINGLE-VIEWPORT FIT */}
                <div className="mt-6 grid w-full grid-cols-1 gap-4 sm:mt-8 sm:gap-5 md:grid-cols-3 lg:gap-6">
                    {/* BENTO CARD 1 (SPAN 2 KOLOM): INCLUSIVE — PILAR UTAMA */}
                    <div className="scroll-reveal group border-azure/40 from-blue-primary/50 via-navy-dark to-navy-dark hover:border-azure relative flex flex-col justify-between overflow-hidden rounded-3xl border bg-gradient-to-br p-5 shadow-lg backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 sm:p-6 md:col-span-2 lg:p-7">
                        {/* Tekstur Kanvas Halus GSM */}
                        <div
                            className="pointer-events-none absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: `url('/pngs/texture/ASSET.webp')`,
                                backgroundRepeat: "repeat",
                                backgroundSize: "220px auto",
                            }}
                            aria-hidden="true"
                        />

                        {/* Motif Supergrafik Background */}
                        <div className="pointer-events-none absolute -right-8 -bottom-8 opacity-20 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-30">
                            <Image
                                src="/svgs/INCLUSIVE_supergrafik_2.svg"
                                alt="Supergrafik Inclusive"
                                width={280}
                                height={280}
                            />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between">
                                <span className="border-camel-brown/40 bg-camel-brown/10 text-pale-taupe inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 font-sans text-[11px] font-semibold uppercase">
                                    <Sparkles
                                        size={12}
                                        className="text-camel-brown"
                                    />
                                    <span>Pilar Utama Tagline</span>
                                </span>
                                <span className="text-azure/40 group-hover:text-azure font-serif text-2xl font-bold transition-colors sm:text-3xl">
                                    01
                                </span>
                            </div>

                            <h3 className="mt-3.5 font-serif text-2xl font-bold tracking-wide text-white sm:text-3xl">
                                INCLUSIVE
                            </h3>
                            <p className="text-pale-taupe mt-0.5 font-sans text-xs font-semibold tracking-wider uppercase sm:text-[13px]">
                                Merangkul Seluruh Keberagaman Potensi
                            </p>

                            <p className="text-concrete/90 mt-2.5 max-w-xl font-sans text-xs leading-relaxed sm:text-[13px]">
                                Menjunjung tinggi kesetaraan, keterbukaan, dan
                                penerimaan tanpa diskriminasi. Setiap mahasiswa
                                UMN memiliki ruang dan kesempatan yang setara
                                untuk didengar, berpartisipasi aktif, serta
                                memberikan kontribusi bermakna bagi almamater.
                            </p>
                        </div>

                        <div className="text-pale-taupe/90 relative z-10 mt-4 flex items-center gap-2.5 border-t border-white/10 pt-3 font-sans text-[11px] sm:text-xs">
                            <span className="text-cream font-bold">
                                Representasi Bentuk:
                            </span>
                            <span>
                                Kurva lingkaran terbuka yang menyatukan beragam
                                sudut pandang.
                            </span>
                        </div>
                    </div>

                    {/* BENTO CARD 2: INNOVATIVE */}
                    <div className="scroll-reveal group from-steel-blue/30 via-navy-dark to-navy-dark hover:border-azure/50 relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br p-5 shadow-sm backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 sm:p-6">
                        {/* Tekstur Kanvas Halus GSM */}
                        <div
                            className="pointer-events-none absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: `url('/pngs/texture/ASSET.webp')`,
                                backgroundRepeat: "repeat",
                                backgroundSize: "220px auto",
                            }}
                            aria-hidden="true"
                        />

                        {/* Motif Supergrafik Background */}
                        <div className="pointer-events-none absolute -right-6 -bottom-6 opacity-20 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-30">
                            <Image
                                src="/svgs/INNOVATIVE_supergrafik_3.svg"
                                alt="Supergrafik Innovative"
                                width={180}
                                height={180}
                            />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="text-azure flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 shadow-md">
                                    <Lightbulb size={18} />
                                </div>
                                <span className="text-azure/40 group-hover:text-azure font-serif text-xl font-bold transition-colors sm:text-2xl">
                                    02
                                </span>
                            </div>

                            <h3 className="mt-3.5 font-serif text-xl font-bold tracking-wide text-white sm:text-2xl">
                                INNOVATIVE
                            </h3>
                            <p className="text-pale-taupe mt-0.5 font-sans text-[11px] font-semibold tracking-wider uppercase">
                                Gagasan Kreatif &amp; Berani Berubah
                            </p>

                            <p className="text-concrete/85 mt-2 font-sans text-xs leading-relaxed sm:text-[13px]">
                                Solusi besar lahir dari gagasan kreatif yang
                                disatukan dengan tujuan mulia untuk menjawab
                                tantangan zaman dan memajukan peradaban kampus
                                UMN.
                            </p>
                        </div>

                        <div className="text-pale-taupe/80 relative z-10 mt-4 border-t border-white/10 pt-3 font-sans text-[10px] sm:text-[11px]">
                            Garis lengkung gelombang adaptif terhadap kemajuan
                            teknologi.
                        </div>
                    </div>

                    {/* BENTO CARD 3: SOLID */}
                    <div className="scroll-reveal group from-blue-primary/40 via-navy-dark to-navy-dark hover:border-azure/50 relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br p-5 shadow-sm backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 sm:p-6">
                        {/* Tekstur Kanvas Halus GSM */}
                        <div
                            className="pointer-events-none absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: `url('/pngs/texture/ASSET.webp')`,
                                backgroundRepeat: "repeat",
                                backgroundSize: "220px auto",
                            }}
                            aria-hidden="true"
                        />

                        {/* Motif Supergrafik Background */}
                        <div className="pointer-events-none absolute -right-6 -bottom-6 opacity-20 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-30">
                            <Image
                                src="/svgs/SOLID_supergrafik_4.svg"
                                alt="Supergrafik Solid"
                                width={180}
                                height={180}
                            />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="text-azure flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 shadow-md">
                                    <Shield size={18} />
                                </div>
                                <span className="text-azure/40 group-hover:text-azure font-serif text-xl font-bold transition-colors sm:text-2xl">
                                    03
                                </span>
                            </div>

                            <h3 className="mt-3.5 font-serif text-xl font-bold tracking-wide text-white sm:text-2xl">
                                SOLID
                            </h3>
                            <p className="text-pale-taupe mt-0.5 font-sans text-[11px] font-semibold tracking-wider uppercase">
                                Fondasi Integritas &amp; Komitmen
                            </p>

                            <p className="text-concrete/85 mt-2 font-sans text-xs leading-relaxed sm:text-[13px]">
                                Berlandaskan komitmen dan integritas yang kokoh
                                serta dapat diandalkan dalam menavigasi tata
                                kelola organisasi kemahasiswaan yang akuntabel.
                            </p>
                        </div>

                        <div className="text-pale-taupe/80 relative z-10 mt-4 border-t border-white/10 pt-3 font-sans text-[10px] sm:text-[11px]">
                            Modul persegi bertingkat yang kokoh saling menopang.
                        </div>
                    </div>

                    {/* BENTO CARD 4 (SPAN 2 KOLOM): COLLABORATIVE */}
                    <div className="scroll-reveal group from-blue-primary/30 via-navy-dark to-navy-dark hover:border-azure/50 relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br p-5 shadow-sm backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 sm:p-6 md:col-span-2 lg:p-7">
                        {/* Tekstur Kanvas Halus GSM */}
                        <div
                            className="pointer-events-none absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: `url('/pngs/texture/ASSET.webp')`,
                                backgroundRepeat: "repeat",
                                backgroundSize: "220px auto",
                            }}
                            aria-hidden="true"
                        />

                        {/* Motif Supergrafik Background */}
                        <div className="pointer-events-none absolute -right-8 -bottom-8 opacity-20 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-30">
                            <Image
                                src="/svgs/COLLABORATIVE_supergrafik_1.svg"
                                alt="Supergrafik Collaborative"
                                width={240}
                                height={240}
                            />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="text-azure flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 shadow-md">
                                    <Share2 size={18} />
                                </div>
                                <span className="text-azure/40 group-hover:text-azure font-serif text-xl font-bold transition-colors sm:text-2xl">
                                    04
                                </span>
                            </div>

                            <h3 className="mt-3.5 font-serif text-xl font-bold tracking-wide text-white sm:text-2xl">
                                COLLABORATIVE
                            </h3>
                            <p className="text-pale-taupe mt-0.5 font-sans text-xs font-semibold tracking-wider uppercase sm:text-[13px]">
                                Sinergi Lintas Fakultas &amp; Organisasi
                            </p>

                            <p className="text-concrete/85 mt-2 max-w-xl font-sans text-xs leading-relaxed sm:text-[13px]">
                                Perbedaan keahlian, fakultas, dan latar belakang
                                bukanlah sekat pemisah, melainkan kekuatan yang
                                saling melengkapi demi mencapai visi kebersamaan
                                KBM UMN.
                            </p>
                        </div>

                        <div className="text-pale-taupe/90 relative z-10 mt-4 flex items-center gap-2.5 border-t border-white/10 pt-3 font-sans text-[11px] sm:text-xs">
                            <span className="text-cream font-bold">
                                Simbolisme:
                            </span>
                            <span>
                                Simpul anyaman yang menyatukan empat fakultas
                                dalam satu harmoni.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Values;
