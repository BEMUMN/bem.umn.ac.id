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

    // Setup carousel setiap kali section berubah
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
            className={`relative flex max-h-screen min-h-screen w-full items-center justify-start px-12 font-mono ${className}`}
        >
            <div className="flex min-h-screen w-full justify-around">
                {/* Left Text Section */}
                <div className="relative min-h-[300px] shrink-0 basis-1/3 self-center pr-10">
                    <h1
                        ref={titleRef}
                        className="text-start text-6xl font-bold drop-shadow-lg/30"
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
                        className="text-foreground/70 mt-4 text-justify text-lg"
                    >
                        {subSections.find((s) => s.id === activeSection)?.desc}
                    </p>

                    {/* Subsection Selector */}
                    <div className="absolute -bottom-24 mt-6 flex">
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
                            className="text-background border-accent hover:bg-accent/30 scale-75 cursor-pointer rounded-full border-4 px-6 py-2 text-sm font-bold transition"
                        >
                            <div className="flex flex-col items-center gap-1 px-1 py-2">
                                <ChevronUp className="text-accent scale-150" />
                                <ChevronDown className="text-accent scale-150" />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Carousel Section */}
                <div
                    ref={containerRef}
                    className="relative shrink-0 basis-2/3 self-center"
                >
                    <div className="overflow-hidden p-5">
                        <div
                            ref={carouselRef}
                            className="carousel-wrapper flex flex-nowrap gap-10"
                        >
                            {Array.from({ length: totalItems }).map((_, i) => {
                                const item = items[i % originalItems]; // item punya title, description, image, gradient
                                return (
                                    <div className="carousel-item" key={i}>
                                        <div
                                            className="card relative flex aspect-[3/4] w-[428px] min-w-[200px] overflow-hidden rounded-2xl shadow-md/30"
                                            style={{
                                                backgroundImage: `url(${item.image})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                            }}
                                        >
                                            {/* Overlay gradient (custom dari data) */}
                                            <div
                                                className={`absolute inset-0 ${item.gradient} opacity-70`}
                                            ></div>

                                            {/* Fade hitam bawah */}
                                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"></div>

                                            {/* Content */}
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
                            })}
                        </div>
                    </div>

                    {/* Navigator Buttons */}
                    <div className="ml-5 flex gap-12 pt-5">
                        <button
                            onClick={handlePrev}
                            disabled={isTransitioning}
                            className="bg-foreground text-background cursor-pointer rounded-full p-5 drop-shadow-md/30 duration-300 hover:scale-105 hover:shadow-lg/20 active:scale-90"
                        >
                            <ChevronLeft />
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={isTransitioning}
                            className="bg-foreground text-background cursor-pointer rounded-full p-5 drop-shadow-md/30 duration-300 hover:scale-105 hover:shadow-lg/20 active:scale-90"
                        >
                            <ChevronRight />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Work;
