// src/components/Hero.js (or app/components/Hero.js, etc.)
"use client";

import React from "react";
import Image from "next/image";
import Slider from "react-slick";

// Import slick carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Hero() {
  const images = [
    { src: "/assets/hero1.jpg", alt: "Coffee beans and cup" },
    { src: "/assets/hero2.png", alt: "Pouring coffee into a cup" },
    // Add more images as needed:
    // { src: "/assets/another-image.jpg", alt: "Description of another image" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: false, // Changed from true to false to enable sliding animation
    cssEase: "ease", // Changed easing to standard ease for smooth sliding
    pauseOnHover: false,
    loop: true,
    arrows: true, // Show navigation arrows
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "25px",
          width: "100%",
          padding: "0 20px",
        }}
      >
        <ul style={{ margin: "0px", padding: "0px", textAlign: "center" }}>
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: "10px",
          height: "10px",
          background: "rgba(255, 255, 255, 0.5)",
          borderRadius: "50%",
          display: "inline-block",
          transition: "background 0.3s ease",
        }}
      ></div>
    ),
  };

  return (
    <div className="relative h-[600px] text-white overflow-hidden">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="relative h-[600px] w-full">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              style={{ objectFit: "cover" }}
              priority={index === 0}
              quality={85}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
