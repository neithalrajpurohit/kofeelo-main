// src/components/Hero.js (or app/components/Hero.js, etc.)

// ---- VERY IMPORTANT for Next.js App Router ----
// If you are using the `app` directory, uncomment the line below.
// If you are using the `pages` directory, you can leave it commented out or remove it.
"use client";
// ----------------------------------------------

import React from "react";
import Image from "next/image";
import Slider from "react-slick";

// Import slick carousel CSS (ensure these files are accessible)
// You might prefer importing these globally in _app.js/tsx or layout.js/tsx
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// --- Optional: Custom Arrows (Example - same as before) ---
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  // Added !right-5 for Tailwind specificity, and z-10
  return (
    <div
      className={`${className} !right-5 z-10`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  // Added !left-5 for Tailwind specificity, and z-10
  return (
    <div
      className={`${className} !left-5 z-10`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}
// --- End Optional Custom Arrows ---

export default function Hero() {
  const images = [
    { src: "/assets/Banner.jpg", alt: "Coffee beans and cup" }, // Add descriptive alt text
    { src: "/assets/up.jpg", alt: "Pouring coffee into a cup" },
    // Add more images as needed:
    // { src: "/assets/another-image.jpg", alt: "Description of another image" },
  ];

  const settings = {
    dots: true, // Show navigation dots below the slider
    infinite: true, // Enable looping of slides
    speed: 500, // Transition speed in milliseconds
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Automatically change slides
    autoplaySpeed: 4000, // Delay between slides in milliseconds
    fade: true, // Use fade transition instead of slide
    cssEase: "cubic-bezier(0.7, 0, 0.3, 1)", // Smoother fade easing
    pauseOnHover: true, // Pause autoplay when mouse is over the slider
    // Use custom arrows (optional)
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
    // Customize dot positioning (optional)
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "25px", // Adjust vertical position
          width: "100%",
          padding: "0 20px", // Add some padding if needed
        }}
      >
        <ul style={{ margin: "0px", padding: "0px", textAlign: "center" }}>
          {" "}
          {dots}{" "}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: "10px",
          height: "10px",
          background: "rgba(255, 255, 255, 0.5)", // Semi-transparent white dots
          borderRadius: "50%",
          display: "inline-block", // Needed for customPaging
          transition: "background 0.3s ease",
        }}
      ></div>
    ),
  };

  return (
    // Main container: relative position is needed for absolute positioning inside (like dots/arrows)
    // h-[600px] sets the height, overflow-hidden clips anything outside
    <div className="relative h-[600px] text-white overflow-hidden">
      <Slider {...settings}>
        {images.map((image, index) => (
          // Each slide container
          <div key={index} className="relative h-[600px] w-full">
            {" "}
            {/* Ensure key, relative, and full height */}
            <Image
              src={image.src}
              alt={image.alt} // Use descriptive alt text from the array
              fill // Replaces layout="fill", objectFit="cover" in newer Next.js (v13+)
              // For older Next.js: use layout="fill" objectFit="cover"
              style={{ objectFit: "cover" }} // Explicitly set objectFit (good practice with fill)
              priority={index === 0} // Prioritize loading the first image for LCP
              quality={85} // Optional: Adjust image quality (default is 75)
            />
            {/* Optional: Overlay per slide */}
            {/* <div className="absolute inset-0 bg-black/30 z-[5]"></div> */}
            {/* Optional: Content per slide */}
            {/* <div className="absolute inset-0 z-[5] flex flex-col items-center justify-center text-center p-4">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Slide {index + 1} Title</h2>
                <p className="text-lg md:text-xl">Some description for this slide.</p>
             </div> */}
          </div>
        ))}
      </Slider>

      {/* Optional: Static overlay for all slides (e.g., gradient) */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-[8] pointer-events-none"></div> */}
    </div>
  );
}

// --- Installation Reminder ---
// 1. Install libraries:
//    npm install react-slick slick-carousel
//    # or
//    yarn add react-slick slick-carousel
//
// 2. Ensure CSS is imported (globally or in this component as shown).
//
// 3. If using Next.js App Router (`app` dir), make sure `"use client";` is at the top.
// --- --------------------- ---
