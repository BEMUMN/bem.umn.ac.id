"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper"; // ✅ import the Swiper type
import "swiper/css";
import "swiper/css/effect-cards";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Divisions = {
    id: string;
    name: string;
    fullname: string;
    description: string;
    imageUrl: string;
};

type MemberSwiperProps = {
    divisions: Divisions[];
};

const MemberSwiper = ({ divisions }: MemberSwiperProps) => {
    const swiperRef = useRef<SwiperClass | null>(null); // ✅ correct type

    return (
        <div className="flex flex-col items-center">
            <Swiper
                spaceBetween={100}
                slidesPerView={1}
                modules={[EffectCards]}
                effect="cards"
                speed={500}
                allowTouchMove={false}
                cardsEffect={{ slideShadows: false }}
                className="min-h-[400px] w-full"
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
            >
                {divisions.map((division, index) => (
                    <SwiperSlide
                        key={division.id || index}
                        className="flex min-h-[400px] items-center justify-center"
                    >
                        <div className="mx-auto my-5 flex max-w-[300px] flex-col items-center justify-center rounded-xl bg-stone-200 p-3 pt-0 shadow-lg/30 duration-300">
                            <div className="relative h-[260px] w-full overflow-hidden rounded-sm">
                                <Image
                                    src={division.imageUrl}
                                    alt={division.name}
                                    fill
                                    sizes="280px"
                                    className="scale-105 object-cover"
                                    unoptimized
                                />
                            </div>
                            <p className="text-secondary mt-2 text-xl font-semibold">
                                {division.name}
                            </p>

                            {/* <p className="text-foreground/70 mt-2 text-sm font-normal">
                                Click Me !
                            </p> */}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Navigation Buttons */}
            <div className="mt-4 flex gap-8">
                <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="border-accent text-accent active:bg-accent/30 rounded-full border-2 p-3 drop-shadow-md/20 duration-100 active:scale-105"
                >
                    <ChevronLeft size={30} />
                </button>
                <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="border-accent text-accent active:bg-accent/30 rounded-full border-2 p-3 drop-shadow-md/20 duration-100 active:scale-105"
                >
                    <ChevronRight size={30} />
                </button>
            </div>
        </div>
    );
};

export default MemberSwiper;
