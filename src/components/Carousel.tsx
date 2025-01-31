"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const images = [
  "/india_rasthrapati.jpg", "/NE_Preview1.png", "/Indian_Flag_).jpg", "/redfort.jpg", "/tajmahal.jpg",
];

export default function Carousel() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        modules={[Autoplay]}
        className="w-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <img src={src} alt={`Slide ${index}`} className="w-full h-64 object-centre rounded-lg shadow-md" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}



