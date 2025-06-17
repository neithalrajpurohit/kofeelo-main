"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export const products = [
  {
    id: 1,
    name: "SPECIALITY INSTANT",
    tag: "Coffee Strong",
    image: "/assets/speciality.jpg",
    backgroundImage: "/assets/beige-bg.png",
    description:
      "Made from 100% Robusta Beans Perfect for Hot ,Cold & Espresso",
    price: 89,
    originalPrice: 100,
  },
  {
    id: 2,
    name: "COFFEE STRONG",
    tag: "Coffee Strong",
    image: "/assets/realCoffeStrong.jpg",
    backgroundImage: "/assets/blue-bg.png",
    description: "Instant Strong Granulated Coffee Chicory Mix",
    price: 89,
    originalPrice: 100,
  },
  {
    id: 3,
    name: "EXTRA BOLD",
    tag: "Coffee Strong",
    image: "/assets/newExtraBold.jpg",
    backgroundImage: "/assets/white-bg.png",
    description: "Instant Extra Bold Coffee Chicory Mix",
    price: 89,
    originalPrice: 100,
  },
  {
    id: 4,
    name: "COLD BREW",
    tag: "COLD BREW",
    image: "/assets/newcoldbrew.jpg",
    backgroundImage: "/assets/white-bg.png",
    description: "Smooth & Refreshing!",
    price: 89,
    originalPrice: 100,
  },
  {
    id: 5,
    name: "NOC",
    tag: "NOC",
    image: "/assets/noc.jpg",
    backgroundImage: "/assets/white-bg.png",
    description: "Fuel Up with Nitro Power Brewd slow. Hits Fast",
    price: 300,
    originalPrice: 100,
  },
];

export default function CoffeeProductsPage() {
  const [expandedInfo, setExpandedInfo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();
  // Create extended array for infinite scroll
  const extendedProducts = [...products, ...products, ...products];

  // Auto-slide effect
  useEffect(() => {
    if (!isAutoSliding) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setExpandedInfo(null);

      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % products.length;
        return nextIndex;
      });

      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }, 3000); // Slide every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoSliding, currentIndex]);

  const handleSlideTransition = (direction: any) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setExpandedInfo(null); // Close any expanded info when sliding

    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + direction;

      // Handle infinite loop
      if (nextIndex >= products.length) {
        nextIndex = 0;
      } else if (nextIndex < 0) {
        nextIndex = products.length - 1;
      }

      return nextIndex;
    });

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const toggleInfo = (id: any) => {
    setExpandedInfo(expandedInfo === id ? null : id);
  };

  const handlePrev = () => {
    setIsAutoSliding(false);
    handleSlideTransition(-1);
    setTimeout(() => setIsAutoSliding(true), 8000);
  };

  const handleNext = () => {
    setIsAutoSliding(false);
    handleSlideTransition(1);
    setTimeout(() => setIsAutoSliding(true), 8000);
  };

  const handleDotClick = (index: any) => {
    if (isTransitioning) return;
    setIsAutoSliding(false);
    setIsTransitioning(true);
    setExpandedInfo(null);
    setCurrentIndex(index);
    setTimeout(() => {
      setIsTransitioning(false);
      setIsAutoSliding(true);
    }, 500);
  };

  // Calculate the transform value for smooth sliding
  const cardWidth = 320; // 80 * 4 (w-80 = 320px)
  const gap = 25; // gap-6 = 24px
  const totalCardWidth = cardWidth + gap;

  // Start from the middle set to avoid showing seams
  const baseOffset = products.length * totalCardWidth;
  const currentOffset = currentIndex * totalCardWidth;
  const transformValue = -(baseOffset + currentOffset);

  return (
    <div
      className="bg-gradient-to-br from-[#f5e6d3] to-[#f0dcc7] min-h-screen py-8 flex flex-col items-center"
      id="products"
    >
      <h2 className="text-4xl font-bold mb-8 text-[#3a2a1a] text-center">
        Our Premium Coffee Collection
      </h2>

      {/* Container for Carousel and Arrows */}
      <div className="flex justify-center items-center w-full px-4 relative">
        {/* Left Arrow - Positioned close to carousel */}
        <button
          onClick={handlePrev}
          disabled={isTransitioning}
          className="mr-4 z-20 bg-[#f0e0c8]/90 backdrop-blur-sm hover:bg-white text-[#42281e] rounded-full w-12 h-12 flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-[#42281e]/10 hover:border-[#42281e]/30 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-110"
          aria-label="Previous products"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Carousel Viewport */}
        <div
          className="overflow-hidden rounded-2xl shadow-2xl bg-white/10 backdrop-blur-sm p-5"
          style={{ width: `${3 * cardWidth + 3 * gap}px` }}
        >
          {/* Container for the cards with smooth sliding animation */}
          <div
            className={`flex gap-6 items-stretch transition-transform duration-300 ease-out ${
              isTransitioning ? "transform-gpu" : ""
            }`}
            style={{
              transform: `translateX(${transformValue}px)`,
              width: `${extendedProducts.length * totalCardWidth}px`,
            }}
          >
            {/* Render extended products array for infinite scroll */}
            {extendedProducts.map((product, index) => {
              const actualProductId = product.id;
              const isExpanded = expandedInfo === actualProductId;

              return (
                <div
                  onClick={() => router.push(`/product/${product.id}`)}
                  key={`product-${product.id}-${index}`}
                  className={`border-2 border-[#42281e]/20 rounded-2xl overflow-hidden relative flex flex-col bg-[#f0e0c8] group w-80 flex-shrink-0 h-[600px] transition-all duration-500 shadow-lg hover:shadow-2xl hover:scale-105 transform-gpu ${
                    isTransitioning ? "blur-[0.5px]" : ""
                  }`}
                  style={{
                    boxShadow: "0 10px 40px rgba(66, 40, 30, 0.15)",
                  }}
                >
                  {/* Card Image */}
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#f5e6d3] to-[#e8d5c0] flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex flex-col flex-grow min-h-0">
                    {/* Tag */}
                    {/* <div className="mb-3 flex-shrink-0">
                      <span className="inline-block bg-gradient-to-r from-[#f8f3e6] to-[#f0e5d8] text-[#5a4a3a] px-4 py-1 rounded-full text-sm border border-[#d8c8b0] font-medium shadow-sm">
                        {product.tag}
                      </span>
                    </div> */}

                    {/* Name */}
                    <h3 className="text-xl font-bold text-[#3a2a1a] mb-3 group-hover:text-[#42281e] transition-colors flex-shrink-0">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-lg text-[#5a4a3a] mb-4 flex-grow overflow-hidden">
                      <span className="line-clamp-3">
                        {product.description}
                      </span>
                    </p>

                    {/* More Info Button */}
                    <button
                      onClick={() => toggleInfo(actualProductId)}
                      className="flex items-center text-[#8a7a6a] mb-4 border-2 border-[#d8c8b0] px-4 py-2 rounded-lg text-sm self-start hover:bg-[#e8d8c0] hover:border-[#c8b8a0] transition-all duration-300 font-medium group/btn flex-shrink-0"
                    >
                      <span>MORE INFO</span>
                      <svg
                        className={`ml-2 w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>

                    {/* Expanded Info Panel */}
                    <div
                      className={`overflow-hidden transition-all duration-300 flex-shrink-0 ${
                        isExpanded
                          ? "max-h-32 opacity-100 mb-4"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="bg-gradient-to-r from-[#e8d8c0] to-[#f0e0c8] p-4 rounded-lg text-sm text-[#5a4a3a] border border-[#d8c8b0]">
                        <p>More detailed information about {product.name}...</p>
                        <p className="mt-2 text-xs">
                          Perfect for morning brew and afternoon picks!
                        </p>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => {
                        router.push(`/product/${product.id}`);
                      }}
                      className="w-full bg-gradient-to-r from-[#42281e] to-[#2a1a12] text-white py-3 font-semibold rounded-xl hover:from-[#2a1a12] hover:to-[#1a0f08] transition-all duration-300 flex justify-between items-center px-4 text-base shadow-lg hover:shadow-xl transform hover:scale-105 flex-shrink-0 mt-auto"
                    >
                      <span>Add to Cart</span>
                      <div className="flex items-center">
                        <span className="text-lg font-bold">
                          ₹{product.price}
                        </span>
                        <span className="text-sm text-gray-300 line-through ml-2">
                          ₹{product.originalPrice}
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Arrow - Positioned close to carousel */}
        <button
          onClick={handleNext}
          disabled={isTransitioning}
          className="ml-4 z-20 bg-white/90 backdrop-blur-sm hover:bg-white text-[#42281e] rounded-full w-12 h-12 flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-[#42281e]/10 hover:border-[#42281e]/30 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-110"
          aria-label="Next products"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
