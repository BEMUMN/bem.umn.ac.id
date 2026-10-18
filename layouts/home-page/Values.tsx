import React from "react";
import Image from "next/image";
import { Sparkles, Shield, Share2, Lightbulb, HeartHandshake } from "lucide-react";

type ValuesProps = {
    id: string;
    className?: string;
};

const Values = ({ id, className }: ValuesProps) => {
    return (
        <section
            id={id}
            className={`relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-24 sm:px-6 md:px-12 ${className}`}
        >
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
                {/* Section Header */}
                <div className="text-center max-w-3xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-azure/30 bg-blue-primary/40 px-4 py-1.5 font-sans text-xs font-semibold tracking-wider text-azure uppercase">
                        <Sparkles size={14} className="text-azure" />
                        <span>Pilar &amp; Filosofi Visual</span>
                    </div>

                    <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Nilai &amp; Identitas Kabinet
                    </h2>
                    <p className="mt-3 font-sans text-sm text-azure/90 md:text-base">
                        Empat motif supergrafik resmi yang menjadi kompas gerak BEM UMN Gen XVI
                        dalam menavigasi dinamika organisasi kemahasiswaan kampus.
                    </p>
                </div>

                {/* ASYMMETRICAL BENTO GRID */}
                <div className="mt-14 grid w-full grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
                    {/* BENTO CARD 1 (SPAN 2 KOLOM): INCLUSIVE — PILAR UTAMA */}
                    <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-azure/40 bg-gradient-to-br from-blue-primary/50 via-navy-dark to-navy-dark p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-azure md:col-span-2">
                        {/* Motif Supergrafik Background */}
                        <div className="pointer-events-none absolute -right-10 -bottom-10 opacity-20 transition-transform duration-700 ease-out group-hover:scale-115 group-hover:opacity-30">
                            <Image
                                src="/svgs/INCLUSIVE_supergrafik_2.svg"
                                alt="Supergrafik Inclusive"
                                width={320}
                                height={320}
                            />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between">
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-azure/40 bg-azure/10 px-3.5 py-1 font-sans text-xs font-semibold text-azure uppercase">
                                    <Sparkles size={13} />
                                    <span>Pilar Utama Tagline</span>
                                </span>
                                <span className="font-serif text-3xl font-bold text-azure/40 group-hover:text-azure transition-colors">
                                    01
                                </span>
                            </div>

                            <h3 className="mt-6 font-serif text-3xl font-bold tracking-wide text-white sm:text-4xl">
                                INCLUSIVE
                            </h3>
                            <p className="mt-1 font-sans text-sm font-semibold tracking-wider text-azure uppercase">
                                Merangkul Seluruh Keberagaman Potensi
                            </p>

                            <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-concrete/90 sm:text-base">
                                Menjunjung tinggi kesetaraan, keterbukaan, dan penerimaan tanpa diskriminasi.
                                Setiap mahasiswa UMN memiliki ruang dan kesempatan yang setara untuk didengar,
                                berpartisipasi aktif, serta memberikan kontribusi bermakna bagi almamater.
                            </p>
                        </div>

                        <div className="relative z-10 mt-8 flex items-center gap-3 border-t border-white/10 pt-4 font-sans text-xs text-azure/80">
                            <span className="font-bold text-white">Representasi Bentuk:</span>
                            <span>Kurva lingkaran terbuka yang menyatukan beragam sudut pandang.</span>
                        </div>
                    </div>

                    {/* BENTO CARD 2: INNOVATIVE */}
                    <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-steel-blue/30 via-navy-dark to-navy-dark p-8 shadow-xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-azure/50">
                        {/* Motif Supergrafik Background */}
                        <div className="pointer-events-none absolute -right-8 -bottom-8 opacity-20 transition-transform duration-700 ease-out group-hover:scale-115 group-hover:opacity-30">
                            <Image
                                src="/svgs/INNOVATIVE_supergrafik_3.svg"
                                alt="Supergrafik Innovative"
                                width={200}
                                height={200}
                            />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-azure shadow-md">
                                    <Lightbulb size={22} />
                                </div>
                                <span className="font-serif text-2xl font-bold text-azure/40 group-hover:text-azure transition-colors">
                                    02
                                </span>
                            </div>

                            <h3 className="mt-6 font-serif text-2xl font-bold tracking-wide text-white">
                                INNOVATIVE
                            </h3>
                            <p className="mt-1 font-sans text-xs font-semibold tracking-wider text-azure uppercase">
                                Gagasan Kreatif &amp; Berani Berubah
                            </p>

                            <p className="mt-4 font-sans text-xs leading-relaxed text-concrete/85 sm:text-sm">
                                Solusi besar lahir dari gagasan kreatif yang disatukan dengan tujuan mulia
                                untuk menjawab tantangan zaman dan memajukan peradaban kampus UMN.
                            </p>
                        </div>

                        <div className="relative z-10 mt-6 border-t border-white/10 pt-4 font-sans text-[11px] text-azure/70">
                            Garis lengkung gelombang adaptif terhadap kemajuan teknologi.
                        </div>
                    </div>

                    {/* BENTO CARD 3: SOLID */}
                    <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-blue-primary/40 via-navy-dark to-navy-dark p-8 shadow-xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-azure/50">
                        {/* Motif Supergrafik Background */}
                        <div className="pointer-events-none absolute -right-8 -bottom-8 opacity-20 transition-transform duration-700 ease-out group-hover:scale-115 group-hover:opacity-30">
                            <Image
                                src="/svgs/SOLID_supergrafik_4.svg"
                                alt="Supergrafik Solid"
                                width={200}
                                height={200}
                            />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-azure shadow-md">
                                    <Shield size={22} />
                                </div>
                                <span className="font-serif text-2xl font-bold text-azure/40 group-hover:text-azure transition-colors">
                                    03
                                </span>
                            </div>

                            <h3 className="mt-6 font-serif text-2xl font-bold tracking-wide text-white">
                                SOLID
                            </h3>
                            <p className="mt-1 font-sans text-xs font-semibold tracking-wider text-azure uppercase">
                                Fondasi Integritas &amp; Komitmen
                            </p>

                            <p className="mt-4 font-sans text-xs leading-relaxed text-concrete/85 sm:text-sm">
                                Berlandaskan komitmen dan integritas yang kokoh serta dapat diandalkan
                                dalam menavigasi tata kelola organisasi kemahasiswaan yang akuntabel.
                            </p>
                        </div>

                        <div className="relative z-10 mt-6 border-t border-white/10 pt-4 font-sans text-[11px] text-azure/70">
                            Modul persegi bertingkat yang kokoh saling menopang.
                        </div>
                    </div>

                    {/* BENTO CARD 4 (SPAN 2 KOLOM): COLLABORATIVE */}
                    <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-blue-primary/30 via-navy-dark to-navy-dark p-8 shadow-xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-azure/50 md:col-span-2">
                        {/* Motif Supergrafik Background */}
                        <div className="pointer-events-none absolute -right-10 -bottom-10 opacity-20 transition-transform duration-700 ease-out group-hover:scale-115 group-hover:opacity-30">
                            <Image
                                src="/svgs/COLLABORATIVE_supergrafik_1.svg"
                                alt="Supergrafik Collaborative"
                                width={260}
                                height={260}
                            />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-azure shadow-md">
                                    <Share2 size={22} />
                                </div>
                                <span className="font-serif text-2xl font-bold text-azure/40 group-hover:text-azure transition-colors">
                                    04
                                </span>
                            </div>

                            <h3 className="mt-6 font-serif text-2xl font-bold tracking-wide text-white sm:text-3xl">
                                COLLABORATIVE
                            </h3>
                            <p className="mt-1 font-sans text-xs font-semibold tracking-wider text-azure uppercase">
                                Sinergi Lintas Fakultas &amp; Organisasi
                            </p>

                            <p className="mt-3 max-w-xl font-sans text-xs leading-relaxed text-concrete/85 sm:text-sm">
                                Perbedaan keahlian, fakultas, dan latar belakang bukanlah sekat pemisah,
                                melainkan kekuatan yang saling melengkapi demi mencapai visi kebersamaan KBM UMN.
                            </p>
                        </div>

                        <div className="relative z-10 mt-6 flex items-center gap-3 border-t border-white/10 pt-4 font-sans text-xs text-azure/80">
                            <span className="font-bold text-white">Simbolisme:</span>
                            <span>Simpul anyaman yang menyatukan empat fakultas dalam satu harmoni.</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Values;
