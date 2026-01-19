"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { usePetStore } from "@/store/petStore";
import { dogEverydayData, catEverydayData } from "@/data/everyday";

export default function Everyday() {
  const petType = usePetStore((state) => state.petType);

  const data = petType === "dog" ? dogEverydayData : catEverydayData;

  return (
    <section className="w-full py-5">
      <h2 className="text-2xl font-bold text-center mb-8">
        Everyday Essentials
      </h2>

      <div className="max-w-7xl mx-auto px-4">
        <Swiper
          spaceBetween={16}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
            1280: { slidesPerView: 8 },
          }}
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center">
                <div className="bg-blue-50 rounded-xl p-4 flex items-center justify-center cursor-pointer hover:shadow-md transition">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-[140px] object-contain"
                  />
                </div>
                <p className="text-sm font-medium text-center pt-2">
                  {item.title}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
