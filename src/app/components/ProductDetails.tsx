"use client";

import React, { useState, useMemo } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // <-- 1. Import useRouter
import {
  RiPercentLine,
  RiStarSFill,
  RiStarLine,
  RiSearchLine,
  RiShoppingBagLine,
  RiSubtractLine,
  RiAddLine,
} from "react-icons/ri";

// --- Type Definitions ---
interface QuantityOption {
  label: string;
  images?: string | StaticImageData;
  price: number;
}
interface ProductDetailItem {
  icon: string | StaticImageData;
  label: string;
}
interface Product {
  id: number;
  name: string;
  image: (string | StaticImageData)[] | string | StaticImageData;
  price?: number;
  label?: string;
  details: ProductDetailItem[];
  description: string;
  quantity: QuantityOption[];
  rating?: number;
  reviewCount?: number;
  category?: string;
  originalPriceFactor?: number;
}
interface CartItem {
  id: string;
  productId: number;
  label: string;
  price: number;
  quantity: number;
  image?: string | StaticImageData;
  name?: string;
}
interface ProductPageProps {
  product: Product;
}
// --- End Type Definitions ---

// --- Reusable Components ---
const ProductOfferCard: React.FC = () => {
  const timer = { hours: "04", minutes: "57", seconds: "59" };

  return (
    <div className="bg-brand-offer-bg border border-brand-offer-border rounded-lg p-4 my-6 shadow-sm">
      <div className="flex items-center mb-2">
        <div className="bg-brand-offer-btn p-2 rounded-full mr-3">
          <RiPercentLine size={20} className="text-white" />
        </div>
        <span className="text-base md:text-lg font-bold text-brand-dark">
          GET EXTRA 12% OFF
        </span>
      </div>
      <hr className="border-t border-brand-offer-border my-3" />
      <div className="flex justify-between items-center">
        <span className="text-xs md:text-sm text-gray-600">
          Ends In {timer.hours}h : {timer.minutes}m : {timer.seconds}s
        </span>
        <button className="bg-brand-offer-btn text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-brand-dark transition-colors duration-200">
          Claim offer
        </button>
      </div>
    </div>
  );
};

interface StarRatingProps {
  rating?: number;
  reviewCount?: number;
}
const StarRating: React.FC<StarRatingProps> = ({
  rating = 0,
  reviewCount = 0,
}) => {
  const totalStars = 5;
  if (rating <= 0) return null;
  return (
    <div className="flex items-center space-x-1 my-2">
      {[...Array(totalStars)].map((_, index) =>
        index < Math.floor(rating) ? (
          <RiStarSFill key={index} className="text-yellow-500" size={20} />
        ) : (
          <RiStarLine key={index} className="text-gray-400" size={20} />
        )
      )}
      {reviewCount > 0 && (
        <span className="text-gray-600 text-sm ml-2">
          ({reviewCount} Reviews)
        </span>
      )}
    </div>
  );
};

interface FeatureIconProps {
  iconSrc: string | StaticImageData;
  text: string;
}
const FeatureIcon: React.FC<FeatureIconProps> = ({ iconSrc, text }) => (
  <div className="flex items-center space-x-2 text-sm text-gray-700">
    <Image
      src={iconSrc}
      alt=""
      width={24}
      height={24}
      className="object-contain"
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = "none";
      }}
    />
    <span>{text}</span>
  </div>
);

interface FooterFeatureProps {
  text: string;
}
const FooterFeature: React.FC<FooterFeatureProps> = ({ text }) => (
  <div className="flex items-center space-x-2 text-sm md:text-base text-brand-dark font-semibold">
    <span className="inline-block w-6 h-6 bg-brand-offer-btn rounded text-xs flex items-center justify-center text-white">
      ?
    </span>
    <span className="uppercase">{text}</span>
  </div>
);
// --- End Reusable Components ---

// ==============================================
// --- Main Product Page Component Definition ---
// ==============================================
const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  const [quantityImage, setQuantityImage] = useState(
    product.quantity[0].images
  );

  // --- Router Instantiation ---
  const router = useRouter(); // <-- 2. Instantiate the router

  // --- State Management ---
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedQuantityLabel, setSelectedQuantityLabel] = useState<string>(
    product?.label || product?.quantity?.[0]?.label || ""
  );
  // --- End State Management ---

  // --- Derived Data Calculation (useMemo) ---
  const currentQuantityData = useMemo<QuantityOption | undefined>(() => {
    return product?.quantity?.find((q) => q.label === selectedQuantityLabel);
  }, [product?.quantity, selectedQuantityLabel]);

  const currentCartId = useMemo<string | null>(() => {
    if (!product || !currentQuantityData) return null;
    return `${product.id}_${currentQuantityData.label}`;
  }, [product, currentQuantityData]);

  const currentItemInCart = useMemo<CartItem | undefined>(() => {
    if (!currentCartId) return undefined;
    return cartItems.find((item) => item.id === currentCartId);
  }, [cartItems, currentCartId]);

  const totalCartQuantity = useMemo<number>(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const currentPrice = currentQuantityData?.price || product?.price || 0;
  const originalPrice = useMemo<number>(() => {
    if (currentQuantityData?.price && product?.originalPriceFactor) {
      return Math.round(
        currentQuantityData.price * product.originalPriceFactor
      );
    }
    return Math.round(currentPrice * 1.15) + 5; // Default fallback
  }, [currentQuantityData, product?.originalPriceFactor, currentPrice]);

  const productDisplayImage = useMemo<
    string | StaticImageData | undefined
  >(() => {
    if (!product?.image) return undefined;
    return Array.isArray(product.image) ? product.image[0] : product.image;
  }, [product?.image]);
  // --- End Derived Data ---

  // --- Navigation Handler ---
  const handleNavigateToCart = (): void => {
    router.push("/cart"); // <-- 3. Define the handler using router.push
  };
  // --- End Navigation Handler ---

  // --- Cart Action Handlers ---
  const handleAddToCart = (): void => {
    if (!currentQuantityData || !currentCartId) return;

    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === currentCartId);
      if (existingItem) {
        // If item exists, maybe just update quantity to 1 or based on logic
        return prevCart.map(
          (item) =>
            item.id === currentCartId
              ? { ...item, quantity: item.quantity + 1 }
              : item // Example: Increment if exists
        );
      } else {
        const newItem: CartItem = {
          id: currentCartId,
          productId: product.id,
          label: currentQuantityData.label,
          price: currentQuantityData.price,
          quantity: 1,
          image: currentQuantityData.images || productDisplayImage,
          name: product.name,
        };
        return [...prevCart, newItem];
      }
    });
    // Optionally navigate to cart immediately after adding
    // handleNavigateToCart();
  };

  const handleUpdateQuantity = (cartId: string, change: number): void => {
    // const item = setQuantityImage();
    setCartItems((prevCart) => {
      const itemIndex = prevCart.findIndex((item) => item.id === cartId);
      if (itemIndex === -1) return prevCart;
      const currentItem = prevCart[itemIndex];
      const newQuantity = currentItem.quantity + change;
      if (newQuantity <= 0) {
        return prevCart.filter((item) => item.id !== cartId);
      } else {
        return prevCart.map((item, index) =>
          index === itemIndex ? { ...item, quantity: newQuantity } : item
        );
      }
    });
  };
  // --- End Cart Action Handlers ---

  // --- Conditional Rendering & Fallbacks ---
  if (!product || !product.quantity || !product.details) {
    return (
      <div className="container mx-auto p-10 text-center">
        Product data is missing or invalid.
      </div>
    );
  }

  return (
    <div className="bg-brand-bg min-h-screen font-sans">
      {/* --- Header --- */}
      <header className="bg-brand-nav shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="text-xl font-bold text-brand-dark">
            <Image
              src="/assets/logo.png" // Make sure this path is correct
              alt="Koffelo Logo"
              width={120}
              height={40}
              priority
            />
          </div>
          {/* Nav */}
          <nav className="hidden md:flex space-x-6 text-gray-700">
            <Link href="/" className="hover:text-brand-dark">
              Home
            </Link>
            <Link href="/" className="hover:text-brand-dark">
              Products
            </Link>
            <Link href="/" className="hover:text-brand-dark">
              About us
            </Link>
            <Link href="/" className="hover:text-brand-dark">
              Contact
            </Link>

            {/* <a href="#" className="hover:text-brand-dark">
              Cart
            </a> */}
          </nav>
          {/* Header Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-brand-dark">
              <RiSearchLine size={24} />
            </button>
            <button
              className="relative text-gray-600 hover:text-brand-dark"
              onClick={handleNavigateToCart} // <-- 4. Attach handler to onClick
              aria-label="View shopping cart" // Added accessibility label
            >
              <RiShoppingBagLine size={24} />
              {totalCartQuantity > 0 && ( // Conditionally render badge
                <span className="absolute -top-2 -right-2 bg-brand-offer-btn text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {totalCartQuantity}
                </span>
              )}
            </button>
            {/* <Link
              href="/cart" // Navigate to /cart
              className="relative text-gray-600 hover:text-brand-dark" // Apply styling to Link
              aria-label="View shopping cart"
            >
              <RiShoppingBagLine size={24} />
              {totalCartQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-offer-btn text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {totalCartQuantity}
                </span>
              )}
            </Link> */}
          </div>
        </div>
      </header>
      {/* --- End Header --- */}

      {/* --- Main Content --- */}
      <main className="container mx-auto px-4 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* === Left Column: Product Details === */}
        <div className="lg:pr-8 flex flex-col">
          {/* Product Info */}
          <span className="inline-block self-start bg-brand-offer-btn text-white text-sm font-medium px-4 py-1 rounded-full mb-3">
            {product.category || product.name}
          </span>
          <h1 className="text-xs md:text-4xl font-bold text-zinc-900 mb-1">
            {product.name}
          </h1>
          <StarRating
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
          <p className="text-gray-600 leading-relaxed my-4 text-sm md:text-base">
            {product.description}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 my-4">
            {product.details.map((detail) => (
              <FeatureIcon
                key={detail.label}
                iconSrc={detail.icon}
                text={detail.label}
              />
            ))}
          </div>
          <ProductOfferCard />

          {/* Quantity Selection Buttons */}
          <div className="flex justify-start gap-3 mb-6">
            {product.quantity.map((quantityItem) => (
              <button
                key={quantityItem.label}
                onClick={() => {
                  setSelectedQuantityLabel(quantityItem.label);
                  setQuantityImage(quantityItem.images);
                }}
                className={`
                    px-4 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent whitespace-nowrap
                    ${
                      selectedQuantityLabel === quantityItem.label &&
                      quantityItem.label === "50gm"
                        ? "bg-brand-nav border-2 border-brand-offer-btn text-brand-dark font-semibold" // Example: Special style for 50gm selected
                        : selectedQuantityLabel === quantityItem.label
                        ? "bg-brand-offer-btn text-white"
                        : quantityItem.label === "100gm"
                        ? "bg-brand-offer-btn text-white opacity-70 hover:opacity-100" // Example: Style for 100gm unselected
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }
                `}
              >
                {quantityItem.label}
              </button>
            ))}
          </div>

          {/* --- Add to Cart / Quantity Control Container --- */}
          <div className="w-full bg-brand-dark text-white rounded-lg p-3 md:p-4 flex justify-between items-center hover:bg-brand-darker transition-colors duration-200 shadow-md mt-auto">
            {currentItemInCart && currentCartId ? (
              // --- State 2: Quantity Controls Visible ---
              <>
                <div className="flex items-center gap-3">
                  <button
                    title="Decrease quantity"
                    aria-label="Decrease quantity"
                    onClick={() => handleUpdateQuantity(currentCartId, -1)}
                    className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <RiSubtractLine className="w-5 h-5 text-white" />
                  </button>
                  <span className="text-xl font-semibold w-10 text-center">
                    {currentItemInCart.quantity}
                  </span>
                  <button
                    title="Increase quantity"
                    aria-label="Increase quantity"
                    onClick={() => handleUpdateQuantity(currentCartId, 1)}
                    className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <RiAddLine className="w-5 h-5 text-white" />
                  </button>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg md:text-xl font-bold">
                    ₹{currentItemInCart.price * currentItemInCart.quantity}
                  </span>
                </div>
              </>
            ) : (
              // --- State 1: Add to Cart Button Visible ---
              <button
                onClick={handleAddToCart}
                className="w-full flex justify-between items-center"
                aria-label={`Add ${product.name} - ${currentQuantityData?.label} to cart`}
                disabled={!currentQuantityData}
              >
                <span className="text-lg md:text-xl font-bold">
                  Add to Cart
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg md:text-xl font-bold">
                    ₹{currentPrice}
                  </span>
                  {originalPrice > currentPrice && (
                    <span className="text-sm md:text-base text-amber-200 line-through">
                      ₹{originalPrice}
                    </span>
                  )}
                </div>
              </button>
            )}
          </div>
          {/* --- End Add to Cart / Quantity Control Container --- */}
        </div>
        {/* === End Left Column === */}

        {/* === Right Column: Single Image Display === */}
        <div className="bg-brand-slider-bg p-4 md:p-6 rounded-lg flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-[500px]">
          <div className="w-full max-w-md mx-auto relative">
            {/* Display single product image */}
            {quantityImage ? (
              <Image
                src={quantityImage}
                alt={`${product.name} - Primary View`}
                width={500}
                height={600}
                priority
                className="object-contain w-full h-auto max-h-[65vh] mx-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <div className="text-center text-white p-10">
                No Image Available
              </div>
            )}
          </div>
        </div>
        {/* === End Right Column === */}
      </main>
      {/* --- End Main Content --- */}

      {/* --- Footer --- */}
      <Image src="/assets/liner.png" alt="liner" height={250} width={1500} />
      {/* <footer className="bg-brand-nav py-6 mt-12">
        <div className="container mx-auto px-4 flex flex-wrap justify-center md:justify-between items-center gap-x-8 gap-y-4">
          {footerFeatures.map((feature) => (
            <FooterFeature key={feature} text={feature} />
          ))}
        </div>
      </footer> */}
      {/* --- End Footer --- */}
    </div> // End Page Wrapper
  );
};

export default ProductPage;
