"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
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

type SectionId = "proker" | "kegma" | "lainnya";

interface WorkItem {
    title: string;
    description: string;
    image: string;
    gradient: string;
}

const sectionData: Record<SectionId, WorkItem[]> = {
    proker: prokers,
    kegma: kegma,
    lainnya: lainnya,
};

const cardWidth = 428 + 40;

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
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        ).fromTo(
            descRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
            "<",
        );
    }, [activeSection]);

    // Fungsi geser desktop
    const slideTo = (targetDisplay: number) => {
        if (!carouselRef.current || isTransitioning) return;
        setIsTransitioning(true);

        gsap.to(carouselRef.current, {
            x: -cardWidth * targetDisplay,
            duration: 0.6,
            ease: "power3.inOut",
            onComplete: () => {
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
            duration: 0.4,
            onComplete: () => {
                setActiveSection(id);
                gsap.fromTo(
                    containerRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.4 },
                );
            },
        });
    };

    return (
        <section
            id={id}
            className={`relative flex min-h-screen w-full items-center justify-start font-mono md:px-12 ${className}`}
        >
            <div className="min-h-screen w-full justify-around md:flex">
                {/* Left Text Section */}
                <div className="relative mb-10 shrink-0 basis-1/3 self-center px-6 pt-10 pr-10 md:mb-0 md:h-80 md:px-0">
                    <h1
                        ref={titleRef}
                        className="text-start text-4xl font-bold drop-shadow-lg/30 md:text-6xl"
                    >
                        {(() => {
                            const activeSectionObj = subSections.find(
                                (s) => s.id === activeSection,
                            );
                            const activeTitle = activeSectionObj?.title || "";
                            if (!activeTitle) return null;

                            const words = activeTitle.split(" ");
                            if (words.length > 1) {
                                const mid = Math.ceil(words.length / 2);
                                return (
                                    <>
                                        {words.slice(0, mid).join(" ")} <br />
                                        {words.slice(mid).join(" ")}
                                    </>
                                );
                            }
                            return activeTitle;
                        })()}
                    </h1>
                    <p
                        ref={descRef}
                        className="text-foreground/70 mt-4 text-justify text-base md:text-lg"
                    >
                        {subSections.find((s) => s.id === activeSection)?.desc}
                    </p>

                    {/* Subsection Selector */}
                    <div className="-bottom-30 flex md:absolute">
                        <button
                            onClick={() => {
                                const currentIndex = subSections.findIndex(
                                    (s) => s.id === activeSection,
                                );
                                const nextIndex =
                                    (currentIndex + 1) % subSections.length;
                                changeSection(
                                    subSections[nextIndex].id as SectionId,
                                );
                            }}
                            className="border-accent hover:bg-accent/30 scale-75 cursor-pointer rounded-full border-4 px-6 py-2 text-sm font-bold drop-shadow-lg/30 transition"
                        >
                            <div className="flex flex-col items-center gap-1 px-1 py-2">
                                <ChevronUp className="text-accent scale-150 drop-shadow-lg" />
                                <ChevronDown className="text-accent scale-150 drop-shadow-lg" />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Carousel Section */}
                <div
                    ref={containerRef}
                    className="relative shrink-0 basis-2/3 self-center"
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
                                        className="relative flex aspect-[3/4] min-w-[200px] overflow-hidden rounded-2xl shadow-md"
                                        style={{
                                            backgroundImage: `url(${item.image})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                        }}
                                    >
                                        <div
                                            className={`absolute inset-0 ${item.gradient} opacity-70`}
                                        ></div>
                                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"></div>
                                        <div className="absolute bottom-0 z-10 w-full p-5 text-center text-white">
                                            <h2 className="text-background text-2xl font-semibold">
                                                {item.title}
                                            </h2>
                                            <p className="text-md text-background/60">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Mobile navigation */}
                        <div className="ml-5 flex justify-center gap-12 pt-10">
                            <button className="custom-prev bg-foreground text-background cursor-pointer rounded-full p-5 duration-300 hover:scale-105 hover:shadow-lg active:scale-90">
                                <ChevronLeft />
                            </button>
                            <button className="custom-next bg-foreground text-background cursor-pointer rounded-full p-5 duration-300 hover:scale-105 hover:shadow-lg active:scale-90">
                                <ChevronRight />
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
                                                    className="card relative flex aspect-[3/4] min-w-[200px] overflow-hidden rounded-2xl shadow-md/30 md:w-[428px]"
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
                                                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"></div>
                                                    <div className="absolute bottom-0 z-10 w-full p-5 text-center text-white">
                                                        <h2 className="text-background text-2xl font-semibold">
                                                            {item.title}
                                                        </h2>
                                                        <p className="text-md text-background/60">
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
                        <div className="ml-5 flex gap-12 pt-5">
                            <button
                                onClick={handlePrev}
                                disabled={isTransitioning}
                                className="bg-foreground text-background cursor-pointer rounded-full p-5 duration-300 hover:scale-105 hover:shadow-lg active:scale-90"
                            >
                                <ChevronLeft />
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={isTransitioning}
                                className="bg-foreground text-background cursor-pointer rounded-full p-5 duration-300 hover:scale-105 hover:shadow-lg active:scale-90"
                            >
                                <ChevronRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Work;
