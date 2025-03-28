"use client"; // Necessary for using hooks like useState and event handlers

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiSearch,
  FiUser,
  FiMinus,
  FiPlus,
  FiTrash2,
  FiTruck,
  FiTag,
  // Using react-icons/fa for stars
  // Using react-icons/fa for empty stars
} from "react-icons/fi"; // Make sure FaStar/FaRegStar are imported if used

// --- Component Start ---

export default function CartPage() {
  // --- Sample Data ---
  const sampleCartItemsData = [
    {
      id: "1",
      name: "SUPER PREMIUM",
      image: "/assets/goldpack.png",
      price: 89,
      rating: 4,
      reviews: 10,
      quantity: 1,
    },
    {
      id: "2",
      name: "COFFEE STRONG",
      image: "/assets/coffeestrong.png",
      price: 89,
      rating: 4,
      reviews: 10,
      quantity: 1,
    },
  ];

  const sampleSuggestionsData = [
    {
      id: "3",
      name: "SUPER PREMIUM",
      image: "/assets/goldpack.png",
      price: 89,
      originalPrice: 100,
      rating: 4,
      reviews: 10,
    },
    {
      id: "4",
      name: "COFFEE STRONG",
      image: "/assets/coffeestrong.png",
      price: 89,
      originalPrice: 100,
      rating: 4,
      reviews: 10,
    },
    {
      id: "5",
      name: "SUPER PREMIUM",
      image: "/assets/redcoffee.png",
      price: 89,
      originalPrice: 100,
      rating: 4,
      reviews: 10,
    },
  ];
  // --- End Sample Data ---

  // --- State ---
  const [cartItems, setCartItems] = useState(sampleCartItemsData);
  const [couponCode, setCouponCode] = useState("ENJOYKOFFELO");
  const [couponApplied, setCouponApplied] = useState(true);
  const [discountPercent] = useState(0.1); // 10% discount

  // --- Calculations ---
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost: number = 0; // Example: Free shipping
  const discountAmount = couponApplied ? subtotal * discountPercent : 0;
  const total = subtotal + shippingCost - discountAmount;

  // --- Handlers ---
  const handleQuantityChange = (id: string, change: number) => {
    setCartItems(
      (currentItems) =>
        currentItems
          .map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(1, item.quantity + change) } // Ensure quantity doesn't go below 1
              : item
          )
          .filter((item) => item.quantity > 0) // Optionally remove if quantity becomes 0 (e.g., if using a remove button in quantity selector)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
    // Recalculate discount if needed, or maybe remove coupon if cart becomes empty
    if (cartItems.length === 1) {
      setCouponApplied(false);
    }
  };

  const handleApplyCoupon = () => {
    // Basic validation - replace with actual API call/logic
    if (couponCode.toUpperCase() === "ENJOYKOFFELO" && cartItems.length > 0) {
      setCouponApplied(true);
    } else {
      setCouponApplied(false);
      alert("Invalid coupon code or empty cart."); // Simple feedback
    }
  };

  // --- Helper Components (Inline for single file requirement) ---

  // Rating Stars Component Logic (Inline)
  const RatingStars = ({
    rating,
    maxRating = 5,
    size = 16,
  }: {
    rating: number;
    maxRating?: number;
    size?: number;
  }) => {
    const fullStars = Math.floor(rating);
    const emptyStars = maxRating - fullStars;
    return (
      // <div className="flex items-center text-yellow-500">
      //   {[...Array(fullStars)].map((_, i) => (
      //     // @ts-ignore - react-icons types might clash slightly depending on import, ignore if needed
      //     // <FaStar key={`full-${i}`} size={size} />
      //   ))}
      //   {[...Array(emptyStars)].map((_, i) => (
      //     // @ts-ignore
      //     <FaRegStar key={`empty-${i}`} size={size} />
      //   ))}
      // </div>
      <div />
    );
  };

  // --- Main JSX ---
  return (
    <div className="min-h-screen bg-[#F8F1E9]">
      {" "}
      {/* Using hex code for specific background */}
      {/* Header */}
      <header className="bg-[#F8F1E9] py-4 px-6 md:px-12 lg:px-24 flex justify-between items-center sticky top-0 z-10 border-b border-[#D4B996]/50">
        <Link href="/">
          {/* Use your actual logo */}
          <Image
            src="/assets/logo.png"
            alt="Koffelo Logo"
            width={100}
            height={40}
          />
        </Link>
        <nav className="hidden md:flex items-center space-x-8 text-[#8B5E3C] font-medium">
          <Link href="/" className="hover:text-[#D4B996]">
            Home
          </Link>
          <Link href="/products" className="hover:text-[#D4B996]">
            Products
          </Link>
          <Link href="/about" className="hover:text-[#D4B996]">
            About us
          </Link>
          <Link href="/contact" className="hover:text-[#D4B996]">
            Contact
          </Link>
        </nav>
        <div className="flex items-center space-x-4 text-[#8B5E3C]">
          <button className="hover:text-[#D4B996]">
            <FiSearch size={20} />
          </button>
          <button className="hover:text-[#D4B996] relative">
            <FiUser size={20} />
            {/* Optional cart count badge */}
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cartItems.reduce((count, item) => count + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </header>
      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Progress Bar */}
        <div className="flex justify-center items-center my-8 md:my-12">
          {["Cart", "Checkout", "Payment"].map((step, index, arr) => {
            const isActive = step === "Cart"; // Hardcoded for this specific step
            return (
              <div
                key={step}
                className={`flex items-center ${
                  index < arr.length - 1 ? "flex-1" : ""
                }`}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white ${
                      isActive ? "bg-[#8B5E3C]" : "bg-[#D4B996]"
                    }`}
                  >
                    {/* Icon placeholder */}
                  </div>
                  <span
                    className={`mt-2 text-sm md:text-base ${
                      isActive
                        ? "text-[#8B5E3C] font-semibold"
                        : "text-gray-500"
                    }`}
                  >
                    {step}
                  </span>
                </div>
                {/* Connector Line */}
                {index < arr.length - 1 && (
                  <div className="flex-1 h-0.5 bg-[#D4B996] mx-2 md:mx-4 max-w-[100px] md:max-w-[150px]"></div>
                )}
              </div>
            );
          })}
        </div>
        {/* Cart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column: Cart Items & Coupon */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-semibold text-[#4A4A4A] mb-6">
              Shopping Cart
            </h1>

            {/* Cart Items List */}
            <div className="mb-6">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-gray-200 py-6 space-y-4 md:space-y-0"
                  >
                    <div className="flex items-start space-x-4 w-full">
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        defaultChecked
                        className="mt-1 accent-[#8B5E3C] flex-shrink-0"
                      />
                      {/* Image */}
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="object-cover rounded flex-shrink-0"
                      />
                      {/* Details */}
                      <div className="flex flex-col space-y-1 flex-grow">
                        <h3 className="text-lg font-semibold text-[#4A4A4A]">
                          {item.name}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <RatingStars rating={item.rating} />
                          <span>({item.reviews} Reviews)</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-green-600">
                          <FiTruck size={16} />
                          <span>Free Shipping</span>
                        </div>
                        {/* Actions Row */}
                        <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 pt-2">
                          {/* Quantity Selector */}
                          <div className="flex items-center border border-gray-300 rounded">
                            {/* Remove Button (optional inside selector) */}
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-gray-500 hover:text-red-500 p-1.5 border-r border-gray-300"
                            >
                              <FiTrash2 size={14} />
                            </button>
                            <button
                              onClick={() => handleQuantityChange(item.id, -1)}
                              disabled={item.quantity <= 1}
                              className="text-gray-600 hover:text-black disabled:text-gray-300 disabled:cursor-not-allowed p-1.5"
                            >
                              <FiMinus size={14} />
                            </button>
                            <span className="text-sm font-medium w-5 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.id, 1)}
                              className="text-gray-600 hover:text-black p-1.5"
                            >
                              <FiPlus size={14} />
                            </button>
                          </div>
                          {/* Links */}
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="hover:text-[#8B5E3C]"
                          >
                            Remove
                          </button>
                          <span className="text-gray-300 hidden md:inline">
                            |
                          </span>
                          <Link href="#" className="hover:text-[#8B5E3C]">
                            See more like this
                          </Link>
                          <span className="text-gray-300 hidden md:inline">
                            |
                          </span>
                          <button className="hover:text-[#8B5E3C]">
                            Save for Later
                          </button>
                        </div>
                      </div>
                      {/* Price */}
                      <div className="text-lg font-semibold text-[#4A4A4A] self-start md:self-center flex-shrink-0 pl-4 md:pl-0">
                        ₹{item.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-10">
                  Your shopping cart is empty.
                </p>
              )}
            </div>

            {/* Subtotal for Cart Items (Only if items exist) */}
            {cartItems.length > 0 && (
              <div className="text-right text-xl font-semibold text-[#4A4A4A] py-4 border-t border-gray-300">
                Subtotal (
                {cartItems.reduce((count, item) => count + item.quantity, 0)}{" "}
                items): ₹{subtotal.toFixed(2)}
              </div>
            )}

            {/* Coupon Code Section */}
            {cartItems.length > 0 && ( // Only show coupon if cart has items
              <div className="mt-6 p-4 border border-gray-200 rounded-md bg-white">
                <label
                  htmlFor="couponCode"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Coupon Code
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    id="couponCode"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-[#8B5E3C] focus:border-[#8B5E3C]"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-[#8B5E3C] text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition whitespace-nowrap"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <p className="mt-3 text-sm text-[#3FA94E] font-medium flex items-center">
                    <FiTag className="mr-1" />{" "}
                    {(discountPercent * 100).toFixed(0)}% Discount applied to
                    your purchase -₹{discountAmount.toFixed(1)}
                  </p>
                )}
              </div>
            )}
          </div>
          {/* Right Column: Summary & Suggestions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Summary (Only if items exist) */}
            {cartItems.length > 0 && (
              <div className="p-6 border border-gray-200 rounded-md shadow-sm bg-white">
                <h2 className="text-xl font-semibold text-[#4A4A4A] mb-4 pb-2 border-b">
                  Order Summary
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping:</span>
                    <span>
                      {shippingCost === 0
                        ? "Free"
                        : `₹${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  {couponApplied && discountAmount > 0 && (
                    <div className="flex justify-between text-[#3FA94E]">
                      <span>
                        Discount ({(discountPercent * 100).toFixed(0)}%):
                      </span>
                      <span>-₹{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-semibold text-[#4A4A4A] pt-3 border-t mt-3">
                    <span>Total:</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
                {couponApplied && (
                  <div className="mt-4 p-2 bg-green-50 border border-green-200 rounded text-center text-xs text-[#3FA94E] font-medium flex items-center justify-center">
                    <FiTag className="mr-1" size={14} /> YOUR COUPON HAS BEEN
                    APPLIED
                  </div>
                )}
                <button className="mt-6 w-full bg-[#8B5E3C] text-white py-3 rounded-md hover:bg-opacity-90 transition font-semibold flex justify-between items-center px-4 text-lg">
                  <span>Proceed to Checkout</span>
                  <span>₹{total.toFixed(1)}</span>
                </button>
              </div>
            )}

            {/* You might also like */}
            <div className="p-6 border border-gray-200 rounded-md shadow-sm bg-white">
              <h2 className="text-xl font-semibold text-[#4A4A4A] mb-4 pb-2 border-b">
                You might also like
              </h2>
              <div className="space-y-4">
                {sampleSuggestionsData.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center space-x-4 py-4 border-b border-gray-200 last:border-b-0"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={70}
                      height={70}
                      className="object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      {" "}
                      {/* Added min-w-0 for text truncation if needed */}
                      <h4 className="text-sm font-medium text-[#4A4A4A] truncate">
                        {product.name}
                      </h4>
                      <div className="flex items-center space-x-1 text-xs text-gray-500 my-1">
                        <RatingStars rating={product.rating} size={12} />
                        <span>({product.reviews} Reviews)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-[#4A4A4A]">
                          ₹{product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            ₹{product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                    <button className="bg-[#8B5E3C] text-white text-xs px-3 py-1.5 rounded hover:bg-opacity-90 whitespace-nowrap ml-2">
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>{" "}
          {/* End Right Column */}
        </div>{" "}
        {/* End Cart Grid */}
      </div>{" "}
      {/* End Container */}
    </div> // End Page Wrapper
  );
}
// --- Component End ---
