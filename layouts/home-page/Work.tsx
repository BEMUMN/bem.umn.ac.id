"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { subSections, prokers, kegma, lainnya } from "@/constants/workIndex";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { A11y, Keyboard } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";

type SectionId = "proker" | "kegma" | "organisasi" | "lainnya";

interface WorkItem {
    title: string;
    description: string;
    image: string;
    gradient: string;
}

const sectionData: Record<SectionId, WorkItem[]> = {
    proker: prokers,
    kegma: kegma,
    organisasi: lainnya,
    lainnya: lainnya,
};

const Work = ({ id, className }: { id: string; className?: string }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeSection, setActiveSection] = useState<SectionId>("proker");
    const [currentIndex, setCurrentIndex] = useState(1);
    const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
    const [paused, setPaused] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(true);
    const items = sectionData[activeSection];
    useEffect(() => {
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setReducedMotion(media.matches);
        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, []);
    useEffect(() => {
        if (!swiper || reducedMotion || paused) return;
        let visible = false;
        const observer = new IntersectionObserver(
            ([entry]) => {
                visible = entry.isIntersecting;
            },
            { threshold: 0.25 },
        );
        if (containerRef.current) observer.observe(containerRef.current);
        const timer = window.setInterval(() => {
            if (
                visible &&
                !document.hidden &&
                !swiper.destroyed &&
                !swiper.animating
            )
                swiper.slideNext();
        }, 3450);
        return () => {
            window.clearInterval(timer);
            observer.disconnect();
        };
    }, [swiper, reducedMotion, paused]);
    const changeSection = (section: SectionId) => {
        setActiveSection(section);
        setCurrentIndex(1);
    };

    return (
        <section
            id={id}
            className={`relative flex w-full items-center justify-start font-sans md:px-12 ${className}`}
        >
            <div className="w-full justify-around md:flex md:min-h-[42rem] md:gap-5">
                {/* Left Text Section */}
                <div className="scroll-reveal relative mb-10 shrink-0 basis-1/3 self-center px-6 pt-10 pr-10 md:mb-0 md:min-w-0 md:px-0">
                    <div className="border-navy-dark/30 text-blue-primary bg-navy-dark/5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-sans text-xs font-semibold tracking-wider uppercase">
                        <span>03 · Program &amp; Kegiatan</span>
                    </div>

                    <h2 className="text-navy-dark mt-3 text-start font-serif text-3xl font-bold sm:text-4xl md:text-5xl">
                        {(() => {
                            const activeSectionObj = subSections.find(
                                (s) => s.id === activeSection,
                            );
                            return (
                                activeSectionObj?.title || "Kegiatan Mahasiswa"
                            );
                        })()}
                    </h2>
                    <p className="text-navy-dark/80 mt-4 font-sans text-sm leading-relaxed md:text-base">
                        {subSections.find((s) => s.id === activeSection)?.desc}
                    </p>

                    {/* Direct Segmented Category Tabs */}
                    <div
                        className="mt-6 flex flex-wrap items-center gap-2"
                        role="group"
                        aria-label="Pilih kategori program kerja dan kegiatan"
                    >
                        {subSections.map((s) => {
                            const isActive = s.id === activeSection;
                            return (
                                <button
                                    key={s.id}
                                    type="button"
                                    aria-pressed={isActive}
                                    onClick={() =>
                                        changeSection(s.id as SectionId)
                                    }
                                    className={`focus-visible:ring-navy-dark min-h-11 rounded-full px-3.5 py-1.5 font-sans text-xs font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 active:scale-95 ${
                                        isActive
                                            ? "bg-navy-dark text-cream border-navy-dark border font-bold shadow-md"
                                            : "text-navy-dark border-navy-dark/25 bg-navy-dark/5 hover:bg-navy-dark/10 border"
                                    }`}
                                >
                                    {s.title}
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <Link
                            href="/kegiatan"
                            className="border-navy-dark bg-navy-dark text-cream focus-visible:ring-navy-dark hover:bg-blue-primary inline-flex items-center gap-2 rounded-full border px-6 py-3 font-sans text-xs font-bold shadow-xl transition-all duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:outline-none active:scale-95 sm:text-sm"
                        >
                            <span>Jelajahi Seluruh Kegiatan</span>
                        </Link>
                    </div>
                </div>

                <div
                    ref={containerRef}
                    role="region"
                    aria-roledescription="carousel"
                    aria-label="Sorotan program dan kegiatan"
                    className="relative min-w-0 shrink-0 basis-2/3 self-center"
                >
                    <Swiper
                        key={activeSection}
                        className="work-carousel"
                        modules={[A11y, Keyboard]}
                        slidesPerView="auto"
                        spaceBetween={12}
                        centeredSlides
                        loop={items.length > 2}
                        speed={reducedMotion ? 0 : 850}
                        keyboard={{ enabled: true, onlyInViewport: true }}
                        a11y={{
                            prevSlideMessage: "Kegiatan sebelumnya",
                            nextSlideMessage: "Kegiatan berikutnya",
                            slideLabelMessage:
                                "{{index}} dari {{slidesLength}}",
                        }}
                        breakpoints={{
                            768: { spaceBetween: 20, centeredSlides: false },
                        }}
                        onSwiper={(instance) => {
                            setSwiper(instance);
                            setCurrentIndex(1);
                        }}
                        onSlideChange={(instance) =>
                            setCurrentIndex(instance.realIndex + 1)
                        }
                    >
                        {items.map((item) => (
                            <SwiperSlide key={item.title}>
                                <article className="work-carousel-card bg-navy-dark relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/15 shadow-xl">
                                    <div
                                        className="work-carousel-image absolute inset-0 bg-cover bg-center"
                                        style={{
                                            backgroundImage: `url(${item.image})`,
                                        }}
                                    />
                                    <div
                                        className={`absolute inset-0 ${item.gradient} opacity-70`}
                                    />
                                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
                                    <div className="absolute inset-x-0 bottom-0 p-5 text-center text-white md:p-6">
                                        <h3 className="font-serif text-2xl font-bold tracking-wide lg:text-3xl">
                                            {item.title}
                                        </h3>
                                        <p className="text-concrete/90 mt-2 text-xs leading-relaxed sm:text-sm">
                                            {item.description}
                                        </p>
                                    </div>
                                </article>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="flex items-center gap-3 px-6 pt-2 md:px-5">
                        <button
                            type="button"
                            onClick={() => swiper?.slidePrev()}
                            aria-label="Item kegiatan sebelumnya"
                            className="border-navy-dark/30 bg-navy-dark/5 text-navy-dark hover:bg-navy-dark/10 flex h-11 w-11 items-center justify-center rounded-full border"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            type="button"
                            onClick={() => swiper?.slideNext()}
                            aria-label="Item kegiatan berikutnya"
                            className="border-navy-dark/30 bg-navy-dark/5 text-navy-dark hover:bg-navy-dark/10 flex h-11 w-11 items-center justify-center rounded-full border"
                        >
                            <ChevronRight size={20} />
                        </button>
                        <span className="text-blue-primary ml-2 text-xs tabular-nums">
                            {String(currentIndex).padStart(2, "0")}{" "}
                            <span className="mx-1 opacity-50">·</span>{" "}
                            {String(items.length).padStart(2, "0")}
                        </span>
                        <button
                            type="button"
                            onClick={() => setPaused((value) => !value)}
                            aria-label={
                                paused
                                    ? "Putar carousel kegiatan"
                                    : "Jeda carousel kegiatan"
                            }
                            aria-pressed={paused}
                            className="text-navy-dark border-navy-dark/30 hover:bg-navy-dark/10 ml-auto flex h-11 w-11 items-center justify-center rounded-full border motion-reduce:hidden"
                        >
                            {paused ? <Play size={17} /> : <Pause size={17} />}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Work;
