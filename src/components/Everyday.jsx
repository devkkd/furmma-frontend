"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { usePetStore } from "@/store/petStore";
import { fetchMainCategories } from "@/lib/api";
import { dogEverydayData, catEverydayData } from "@/data/everyday";

function titleToCategory(title) {
  const slug = (title || "").toLowerCase().trim();
  if (slug === "medicine") return "health";
  return slug;
}

export default function Everyday() {
  const petType = usePetStore((state) => state.petType);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories from API
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchMainCategories({ section: "everyday", petType })
      .then((data) => {
        if (!cancelled) {
          setCategories(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          // Fallback to static data
          const fallbackData = petType === "cat" ? catEverydayData : dogEverydayData;
          setCategories(fallbackData);
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [petType]);

  // Use API data if available, otherwise fallback to static
  const data = categories.length > 0 ? categories : (petType === "cat" ? catEverydayData : dogEverydayData);

  if (loading && categories.length === 0) {
    return (
      <section className="w-full py-5">
        <h2 className="text-2xl font-bold text-center mb-8">
          Everyday Essentials
        </h2>
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          Loading...
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-5">
      <h2 className="text-2xl font-bold text-center mb-8">
        Everyday Essentials
      </h2>

      <div className="max-w-7xl mx-auto px-4">
        {data.length > 0 ? (
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
            {data.map((item, index) => {
              const title = item.name || item.title;
              const image = item.image || item.img;
              const categorySlug = item.slug || titleToCategory(title);
              return (
                <SwiperSlide key={item._id || item.id || index}>
                  <Link
                    href={`/shop?category=${categorySlug}${petType ? `&petType=${petType}` : ""}`}
                    className="flex flex-col items-center block"
                  >
                    <div className="bg-blue-50 rounded-xl p-4 flex items-center justify-center cursor-pointer hover:shadow-md transition">
                      <img
                        src={image}
                        alt={title}
                        className="h-[140px] object-contain"
                      />
                    </div>
                    <p className="text-sm font-medium text-center pt-2">
                      {title}
                    </p>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <div className="text-center text-gray-500">No categories available</div>
        )}
      </div>
    </section>
  );
}
