"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
} from "lucide-react";
import { subSections, prokers, kegma, lainnya } from "@/constants/workIndex";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

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

const cardWidth = 428 + 40;
const motionDuration = (seconds: number) =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : seconds;

const Work = ({ id, className }: { id: string; className?: string }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const carouselRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLDivElement | null>(null);
    const descRef = useRef<HTMLDivElement | null>(null);
    const displayRef = useRef<number>(0);

    const [activeSection, setActiveSection] = useState<SectionId>("proker");
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const items = sectionData[activeSection] || [];
    const originalItems = items.length;
    const totalItems = originalItems * 3;

    // Setup carousel setiap kali section berubah (desktop)
    useEffect(() => {
        if (!carouselRef.current) return;
        const startDisplay = originalItems;
        gsap.set(carouselRef.current, { x: -cardWidth * startDisplay });
        displayRef.current = startDisplay;
        setCurrentIndex(1);
    }, [activeSection, originalItems]);

    // Animasi teks saat section berubah
    useEffect(() => {
        if (!titleRef.current || !descRef.current) return;

        const tl = gsap.timeline();
        tl.fromTo(
            titleRef.current,
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: motionDuration(0.6),
                ease: "power3.out",
            },
        ).fromTo(
            descRef.current,
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: motionDuration(0.6),
                ease: "power3.out",
            },
            "<",
        );
    }, [activeSection]);

    // Fungsi geser desktop
    const slideTo = (targetDisplay: number) => {
        if (!carouselRef.current || isTransitioning || originalItems === 0)
            return;
        setIsTransitioning(true);

        gsap.to(carouselRef.current, {
            x: -cardWidth * targetDisplay,
            duration: motionDuration(0.6),
            ease: "power3.inOut",
            onComplete: () => {
                if (originalItems === 0) {
                    setIsTransitioning(false);
                    return;
                }
                const modulo = targetDisplay % originalItems;
                const logical = modulo + 1;
                setCurrentIndex(logical);

                if (
                    targetDisplay >= originalItems * 2 ||
                    targetDisplay < originalItems
                ) {
                    const resetDisplay = originalItems + (logical - 1);
                    gsap.set(carouselRef.current, {
                        x: -cardWidth * resetDisplay,
                    });
                    displayRef.current = resetDisplay;
                } else {
                    displayRef.current = targetDisplay;
                }

                setIsTransitioning(false);
            },
        });
    };

    const handleNext = () => slideTo(displayRef.current + 1);
    const handlePrev = () => slideTo(displayRef.current - 1);

    const changeSection = (id: SectionId) => {
        if (!containerRef.current || id === activeSection) return;

        gsap.to(containerRef.current, {
            opacity: 0,
            duration: motionDuration(0.4),
            onComplete: () => {
                setActiveSection(id);
                gsap.fromTo(
                    containerRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: motionDuration(0.4) },
                );
            },
        });
    };

    return (
        <section
            id={id}
            className={`relative flex w-full items-center justify-start font-sans md:px-12 ${className}`}
        >
            <div className="w-full justify-around md:flex md:min-h-[42rem]">
                {/* Left Text Section */}
                <div className="scroll-reveal relative mb-10 shrink-0 basis-1/3 self-center px-6 pt-10 pr-10 md:mb-0 md:h-80 md:px-0">
                    <div className="border-camel-brown/40 text-pale-taupe inline-flex items-center gap-2 rounded-full border bg-white/5 px-4 py-1.5 font-sans text-xs font-semibold tracking-wider uppercase">
                        <span>03 · Program &amp; Kegiatan</span>
                    </div>

                    <h2
                        ref={titleRef}
                        className="mt-3 text-start font-serif text-3xl font-bold text-white drop-shadow sm:text-4xl md:text-5xl"
                    >
                        {(() => {
                            const activeSectionObj = subSections.find(
                                (s) => s.id === activeSection,
                            );
                            return (
                                activeSectionObj?.title || "Kegiatan Mahasiswa"
                            );
                        })()}
                    </h2>
                    <p
                        ref={descRef}
                        className="text-concrete/90 mt-4 font-sans text-sm leading-relaxed md:text-base"
                    >
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
                                    className={`focus-visible:ring-azure min-h-11 rounded-full px-3.5 py-1.5 font-sans text-xs font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 active:scale-95 ${
                                        isActive
                                            ? "bg-azure text-navy-dark shadow-azure/20 border-azure border font-bold shadow-md"
                                            : "text-pale-taupe border border-white/15 bg-white/5 hover:bg-white/10 hover:text-white"
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
                            className="border-azure/50 bg-azure text-navy-dark focus-visible:ring-azure inline-flex items-center gap-2 rounded-full border px-6 py-3 font-sans text-xs font-bold shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white focus-visible:ring-2 focus-visible:outline-none active:scale-95 sm:text-sm"
                        >
                            <span>Jelajahi Seluruh Kegiatan</span>
                        </Link>
                    </div>
                </div>

                {/* Carousel Section */}
                <div
                    ref={containerRef}
                    className="scroll-reveal relative shrink-0 basis-2/3 self-center"
                >
                    {/* Mobile pakai Swiper */}
                    <div className="block md:hidden">
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={14}
                            slidesPerView={1.2}
                            centeredSlides
                            navigation={{
                                prevEl: ".custom-prev",
                                nextEl: ".custom-next",
                            }}
                        >
                            {items.map((item, i) => (
                                <SwiperSlide key={i}>
                                    <div
                                        className="relative flex aspect-[3/4] min-w-[200px] overflow-hidden rounded-2xl border border-white/10 shadow-lg"
                                        style={{
                                            backgroundImage: `url(${item.image})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                        }}
                                    >
                                        <div
                                            className={`absolute inset-0 ${item.gradient} opacity-70`}
                                        ></div>
                                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                                        <div className="absolute bottom-0 z-10 w-full p-5 text-center text-white">
                                            <h3 className="font-serif text-2xl font-bold text-white drop-shadow-md">
                                                {item.title}
                                            </h3>
                                            <p className="text-concrete/90 mt-1 font-sans text-xs leading-relaxed drop-shadow">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Mobile navigation */}
                        <div className="ml-5 flex justify-center gap-8 pt-8">
                            <button
                                type="button"
                                aria-label="Item kegiatan sebelumnya"
                                className="custom-prev border-azure/30 focus-visible:ring-azure cursor-pointer rounded-full border bg-white/10 p-4 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white/20 focus-visible:ring-2 focus-visible:outline-none active:scale-90"
                            >
                                <ChevronLeft size={22} />
                            </button>
                            <button
                                type="button"
                                aria-label="Item kegiatan berikutnya"
                                className="custom-next border-azure/30 focus-visible:ring-azure cursor-pointer rounded-full border bg-white/10 p-4 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white/20 focus-visible:ring-2 focus-visible:outline-none active:scale-90"
                            >
                                <ChevronRight size={22} />
                            </button>
                        </div>
                    </div>

                    {/* Desktop pakai GSAP carousel */}
                    <div className="hidden md:block">
                        <div className="overflow-hidden p-5">
                            <div
                                ref={carouselRef}
                                className="carousel-wrapper flex flex-nowrap gap-10"
                            >
                                {Array.from({ length: totalItems }).map(
                                    (_, i) => {
                                        const item = items[i % originalItems];
                                        return (
                                            <div
                                                className="carousel-item"
                                                key={i}
                                            >
                                                <div
                                                    className="card hover:border-azure/40 relative flex aspect-[3/4] min-w-[200px] overflow-hidden rounded-2xl border border-white/10 shadow-xl transition-all duration-500 hover:-translate-y-1.5 md:w-[428px]"
                                                    style={{
                                                        backgroundImage: `url(${item.image})`,
                                                        backgroundSize: "cover",
                                                        backgroundPosition:
                                                            "center",
                                                    }}
                                                >
                                                    <div
                                                        className={`absolute inset-0 ${item.gradient} opacity-70`}
                                                    ></div>
                                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                                                    <div className="absolute bottom-0 z-10 w-full p-6 text-center text-white">
                                                        <h3 className="font-serif text-2xl font-bold tracking-wide text-white drop-shadow-md lg:text-3xl">
                                                            {item.title}
                                                        </h3>
                                                        <p className="text-concrete/90 mt-2 font-sans text-xs leading-relaxed drop-shadow sm:text-sm">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    },
                                )}
                            </div>
                        </div>

                        {/* Desktop Navigator Buttons */}
                        <div className="ml-5 flex gap-6 pt-5">
                            <button
                                type="button"
                                onClick={handlePrev}
                                disabled={isTransitioning}
                                aria-label="Item kegiatan sebelumnya"
                                className="border-azure/30 focus-visible:ring-azure cursor-pointer rounded-full border bg-white/10 p-4 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white/20 focus-visible:ring-2 focus-visible:outline-none active:scale-90 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ChevronLeft size={22} />
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                disabled={isTransitioning}
                                aria-label="Item kegiatan berikutnya"
                                className="border-azure/30 focus-visible:ring-azure cursor-pointer rounded-full border bg-white/10 p-4 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white/20 focus-visible:ring-2 focus-visible:outline-none active:scale-90 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ChevronRight size={22} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Work;
