"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const products = [
  {
    id: 1,
    name: "SPECIALITY INSTANT",
    tag: "Coffee Strong",
    image: "/assets/speciality.jpg",
    backgroundImage: "/assets/beige-bg.png",
    description:
      "Taste Premium, Smell Local! Experience the rich flavor of our Instant Pure Granulated Coffee, crafted from the finest beans, hand...",
    price: 89,
    originalPrice: 100,
  },
  {
    id: 2,
    name: "COFFEE STRONG",
    tag: "Coffee Strong",
    image: "/assets/realCoffeStrong.jpg",
    backgroundImage: "/assets/blue-bg.png",
    description:
      "Taste Premium, Smell Local! Experience the rich flavor of our Instant Pure Granulated Coffee, crafted from the finest beans, hand...",
    price: 89,
    originalPrice: 100,
  },
  {
    id: 3,
    name: "EXTRA BOLD",
    tag: "Coffee Strong",
    image: "/assets/newExtraBold.jpg",
    backgroundImage: "/assets/white-bg.png",
    description:
      "Taste Premium, Smell Local! Experience the rich flavor of our Instant Pure Granulated Coffee, crafted from the finest beans, hand...",
    price: 89,
    originalPrice: 100,
  },
  {
    id: 4,
    name: "COLD BREW",
    tag: "COLD BREW",
    image: "/assets/newcoldbrew.jpg",
    backgroundImage: "/assets/white-bg.png",
    description:
      "Smooth, Bold & Refreshing!Expertly crafted from the finest beans and slow-brewed for a rich, smooth flavour with lower acidity.",
    //  Enjoy it black, with milk, or your way – the perfect refreshing caffeine boost!",
    price: 89,
    originalPrice: 100,
  },
  {
    id: 5,
    name: "NOC",
    tag: "NOC",
    image: "/assets/noc.jpg",
    backgroundImage: "/assets/white-bg.png",
    description:
      "Nitrogen-infused coffee is a cold brew infused with nitrogen gas, creating a smooth, creamy texture and a rich, velvety mouthfeel.",
    //  It has a naturally sweet taste with a cascading effect similar to draft beer.The perfect refreshing caffeine boost!",
    price: 300,
    originalPrice: 100,
  },
];

export default function CoffeeProductsPage() {
  const [expandedInfo, setExpandedInfo] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const toggleInfo = (id: number) => {
    console.log("Clicked product ID:", id); // Debug log
    console.log("Current expanded:", expandedInfo); // Debug log
    setExpandedInfo(expandedInfo === id ? null : id);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  // Calculate indices for the 3 visible products, handling wrap-around
  const visibleProductIndices = [
    currentIndex % products.length,
    (currentIndex + 1) % products.length,
    (currentIndex + 2) % products.length,
  ];
  const visibleProducts = visibleProductIndices.map((index) => products[index]);

  console.log(
    "Visible products:",
    visibleProducts.map((p) => ({ id: p.id, name: p.name }))
  ); // Debug log
  console.log("Current expanded ID:", expandedInfo); // Debug log

  return (
    <div
      className="bg-[#f5e6d3] min-h-screen py-8 flex flex-col items-center"
      id="products"
    >
      <h2 className="text-3xl font-bold mb-8 text-[#3a2a1a]">Products</h2>
      {/* Container for Carousel and Arrows */}
      <div className="w-full max-w-6xl mx-auto px-4 relative">
        {/* Left Arrow - Adjusted position */}
        <button
          onClick={handlePrev}
          className="absolute -left-8 top-1/2 -translate-y-1/2 z-10 bg-[#42281e] bg-opacity-60 hover:bg-opacity-80 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:bg-[#2a1a12] transition-all"
          aria-label="Previous products"
          disabled={products.length <= 3}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        {/* Right Arrow - Adjusted position */}
        <button
          onClick={handleNext}
          className="absolute -right-8 top-1/2 -translate-y-1/2 z-10 bg-[#42281e] bg-opacity-60 hover:bg-opacity-80 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:bg-[#2a1a12] transition-all"
          aria-label="Next products"
          disabled={products.length <= 3}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        {/* Carousel Viewport */}
        <div className="overflow-hidden">
          {/* Container for the cards */}
          <div className="flex justify-center gap-6 items-start">
            {/* Map over only the calculated visible products */}
            {visibleProducts.map((product, cardIndex) => {
              const isExpanded = expandedInfo === product.id;
              console.log(
                `Card ${cardIndex} - Product ID: ${product.id}, IsExpanded: ${isExpanded}`
              ); // Debug log

              return (
                <div
                  key={`card-${cardIndex}-product-${product.id}`}
                  className="border border-black rounded-xl overflow-hidden relative flex flex-col bg-[#f0e0c8] group w-80 flex-shrink-0 self-start"
                >
                  {/* Debug info - remove this after testing */}
                  {/* <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-50">
                    ID: {product.id}
                  </div> */}
                  {/* Card Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-300 group-hover:scale-105"
                      sizes="320px"
                    />
                  </div>
                  {/* Card Content */}
                  <div className="p-3 md:p-4 flex flex-col flex-grow">
                    {/* Tag */}
                    <div className="mb-2">
                      <span className="inline-block bg-[#f8f3e6] text-[#5a4a3a] px-3 py-1 rounded-full text-xs md:text-sm border border-[#d8c8b0]">
                        {product.tag}
                      </span>
                    </div>
                    {/* Name */}
                    <h3 className="text-lg md:text-xl font-bold text-[#3a2a1a] mb-1 md:mb-2">
                      {product.name}
                    </h3>
                    {/* Description */}
                    <p className="text-sm text-[#5a4a3a] mb-3">
                      {product.description}
                    </p>

                    {/* Spacer */}
                    <div className="flex-grow"></div>

                    {/* More Info Button */}
                    <button
                      onClick={() => {
                        console.log(`Button clicked for product ${product.id}`); // Debug log
                        toggleInfo(product.id);
                      }}
                      className="flex items-center text-[#8a7a6a] mb-3 border border-[#d8c8b0] px-3 py-1 rounded-md text-sm self-start hover:bg-[#e8d8c0] transition-colors"
                    >
                      <span>MORE INFO</span>
                      {/* <span>MORE INFO (ID: {product.id})</span> */}

                      <svg
                        className={`ml-2 w-4 h-4 transition-transform ${
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
                    {isExpanded && (
                      <div className="bg-[#e8d8c0] p-2 md:p-3 rounded-md mb-3 text-xs md:text-sm text-[#5a4a3a]">
                        <p>
                          {/* More detailed information about {product.name} (ID:{" "}
                          {product.id})... */}
                          More detailed information about {product.name}...
                          {/* Full product description and details would go here.
                          Information about origin, flavor profile, brewing
                          recommendations, etc. */}
                        </p>
                      </div>
                    )}

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => router.push(`/product/${product.id}`)}
                      className="w-full bg-[#42281e] text-white py-2 md:py-3 font-medium rounded-md hover:bg-[#2a1a12] transition-colors flex justify-between items-center px-3 md:px-4 text-sm md:text-base"
                    >
                      <span>Add to Cart </span>
                      <div className="flex items-center">
                        <span className="text-base md:text-lg">
                          ₹{product.price}
                        </span>
                        <span className="text-xs md:text-sm text-gray-400 line-through ml-1 md:ml-2">
                          ₹{product.originalPrice}
                        </span>
                      </div>
                    </button>
                  </div>{" "}
                  {/* End Card Content */}
                </div> // End Card
              );
            })}
          </div>{" "}
          {/* End Card Container */}
        </div>{" "}
        {/* End Carousel Viewport */}
      </div>{" "}
      {/* End Container for Carousel and Arrows */}
    </div>
  );
}
