"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const products = [
  {
    id: 1,
    name: "SPEACIALITY INSTANT",
    tag: "Coffee Strong",
    image: "/assets/goldpack.png",
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
    image: "/assets/coffeestrong.png",
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
    image: "/assets/red-extra-bold.png",
    backgroundImage: "/assets/white-bg.png",
    description:
      "Taste Premium, Smell Local! Experience the rich flavor of our Instant Pure Granulated Coffee, crafted from the finest beans, hand...",
    price: 89,
    originalPrice: 100,
  },
  {
    id: 4,
    name: "EXTRA BOLD",
    tag: "Coffee Strong",
    image: "/assets/coffee.png",
    backgroundImage: "/assets/beige-bg.png",
    description:
      "Taste Premium, Smell Local! Experience the rich flavor of our Instant Pure Granulated Coffee, crafted from the finest beans, hand...",
    price: 89,
    originalPrice: 100,
  },
  {
    id: 5,
    name: "SUPER PREMIUM",
    tag: "Coffee Strong",
    image: "/assets/yellow.png",
    backgroundImage: "/assets/gold-bg.png",
    description:
      "Taste Premium, Smell Local! Experience the rich flavor of our Instant Pure Granulated Coffee, crafted from the finest beans, hand...",
    price: 89,
    originalPrice: 100,
  },
  {
    id: 6,
    name: "COFFEE STRONG",
    tag: "Coffee Strong",
    image: "/assets/redcoffee.png",
    backgroundImage: "/assets/beige-bg.png",
    description:
      "Taste Premium, Smell Local! Experience the rich flavor of our Instant Pure Granulated Coffee, crafted from the finest beans, hand...",
    price: 89,
    originalPrice: 100,
  },
];

export default function CoffeeProductsPage() {
  const [expandedInfo, setExpandedInfo] = useState(null);
  const route = useRouter();
  const toggleInfo = (id: any) => {
    if (expandedInfo === id) {
      setExpandedInfo(null);
    } else {
      setExpandedInfo(id);
    }
  };

  return (
    <div className="bg-[#f5e6d3] min-h-screen py-8 px-4 " id="products">
      <div className="container mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  ">
          {products.map((product) => (
            <div
              key={product.id}
              className="border border-black rounded-xl overflow-hidden relative"
            >
              <div className="relative aspect-square">
                <div className="absolute inset-0 w-full h-full">
                  {/* Product background image */}
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${product.backgroundImage})`,
                    }}
                  ></div>
                </div>
                <div className="relative w-[1/3]  flex justify-center items-center h-full overflow-hidden">
                  {/* Product image */}

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[800px] h-[450px] object-cover"
                  />
                </div>
              </div>

              <div className="bg-[#f0e0c8] p-4">
                {/* Tag */}
                <div className="mb-2">
                  <span className="inline-block bg-[#f8f3e6] text-[#5a4a3a] px-4 py-1 rounded-full text-sm border border-[#d8c8b0]">
                    {product.tag}
                  </span>
                </div>

                {/* Product name */}
                <h3 className="text-2xl font-bold text-[#3a2a1a] mb-2">
                  {product.name}
                </h3>

                {/* Product description */}
                <p className="text-sm text-[#5a4a3a] mb-4">
                  {product.description}
                </p>

                {/* Info button */}
                <button
                  onClick={() => toggleInfo(product.id)}
                  className="flex items-center text-[#8a7a6a] mb-4 border border-[#d8c8b0] px-4 py-1 rounded-md"
                >
                  <span>MORE INFO</span>
                  <svg
                    className={`ml-2 w-4 h-4 transition-transform ${
                      expandedInfo === product.id ? "rotate-180" : ""
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

                {/* Expanded info panel */}
                {expandedInfo === product.id && (
                  <div className="bg-[#e8d8c0] p-3 rounded-md mb-4 text-sm text-[#5a4a3a]">
                    <p>
                      Full product description and details would go here.
                      Information about origin, flavor profile, brewing
                      recommendations, etc.
                    </p>
                  </div>
                )}

                {/* Add to cart button */}
                <button
                  key={product.id}
                  onClick={() => route.push(`/product/${product.id}`)}
                  className="w-full bg-[#42281e] text-white py-3 font-medium rounded-md hover:bg-[#2a1a12] transition-colors flex justify-between items-center px-4"
                >
                  <span>Add to Cart</span>
                  <div className="flex items-center">
                    <span className="text-xl">₹{product.price}</span>
                    <span className="text-sm text-gray-400 line-through ml-2">
                      ₹{product.originalPrice}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
