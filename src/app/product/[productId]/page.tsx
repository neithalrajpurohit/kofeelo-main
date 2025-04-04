import { notFound } from "next/navigation";
import ProductDetail from "../../components/ProductDetails";

const products = [
  {
    id: 1,
    name: "SPECIALITY INSTANT",
    // Making image an array consistently for the slider
    image: [
      "/assets/50gmGold.png",
      "/assets/50gmGold-2.png", // Added placeholder for demo
      "/assets/goldpack.png", // Added placeholder for demo
    ],
    // Using lowercase 'price' for consistency if possible, otherwise adapt component
    price: 85, // Assuming this is the default price for the default label
    label: "50gm", // Default selected quantity label
    details: [
      { icon: "/assets/premiumbadge.png", label: "Premium Taste" },
      { icon: "/assets/beans.png", label: "Finest Beans" },
      { icon: "/assets/handpicked.png", label: "Handpicked" },
    ],
    description:
      "Taste Premium ,Smell Local! Experience the rich flavor of our instant Pure Granulated Coffee,crafted from the finest beans,handpicked from renowned Indian coffee regions.Every cup delivers exceptional quality.Enjoy coffee in its purrst form ",
    quantity: [
      {
        label: "1.1gm/pcs (50pcs)",
        images: "/assets/speciality1gm.png",
        price: 100,
      }, // Use lowercase price
      { label: "50gm", images: "/assets/speciality50gm.png", price: 85 },
      {
        label: "100gm",

        images: "/assets/speciality100gm.png",
        price: 169,
      },
    ],
    // Add missing fields (optional, provide defaults otherwise)
    rating: 4.5,
    reviewCount: 15,
    category: "Premium Coffee", // Added category
    originalPriceFactor: 1.2, // Example: Original price is 20% higher
  },
  {
    id: 2,
    name: "Coffee Strong",
    image: [
      // Ensure image is an array for the slider
      "/assets/50gmSilver.png",
      "/assets/50gmSilver-2.png", // Placeholder
      "/assets/50gmSilver-3.png", // Placeholder
    ],
    price: 85,
    label: "50gm",
    details: [
      { icon: "/assets/premiumbadge.png", label: "Premium Taste" },
      { icon: "/assets/beans.png", label: "Finest Beans" },
      { icon: "/assets/handpicked.png", label: "Handpicked" },
    ],
    description:
      "Wake Up to a Chicory Twist! Rich, Strong , and infused with Chicory Goodness,Try our Instant Strong Chicory Coffee for a robust, well-balanced brew.This instant coffee has a sophisticated flavor that is healthy and smooth ,thanks to the natural richness of chicory",
    quantity: [
      {
        label: "1.1gm/pcs (50pcs)",
        images: "/assets/2GmSilver.png",
        price: 100,
      },
      { label: "50gm", images: "/assets/50gmSilver.png", price: 85 },
      {
        label: "100gm",
        images: "/assets/newStrongCoffee100gm.png",
        price: 169,
      },
    ],
    // Add missing fields
    rating: 4,
    reviewCount: 10,
    category: "Strong Coffee",
    originalPriceFactor: 1.18, // Example: Original price ~18% higher
  },
  {
    id: 3,
    name: "Extra Bold",
    price: 85,
    label: "50gm",
    details: [
      { icon: "/assets/premiumbadge.png", label: "Premium Taste" },
      { icon: "/assets/beans.png", label: "Finest Beans" },
      { icon: "/assets/handpicked.png", label: "Handpicked" },
    ],
    image: [
      // Ensure image is an array
      "/assets/50gmCopper.png",
      "/assets/50gmCopper-2.png", // Placeholder
      "/assets/50gmCopper-3.png", // Placeholder
    ],
    description:
      "A rich and bold mix of coffee and chicory that delivers adeep,satisfying strength. Expertly designed for those who seek apowerful,full-bodied coffee experience. Embrace instant boldness with every sip.",
    quantity: [
      {
        label: "1.1gm/pcs (50pcs)",
        images: "/assets/2Gmcopper.png",
        price: 100,
      },
      { label: "50gm", images: "/assets/extraBold50gram.png", price: 85 },
      { label: "100gm", images: "/assets/newextrabold100gm.png", price: 169 },
    ],
    // Add missing fields
    rating: 5,
    reviewCount: 25,
    category: "Bold Coffee",
    originalPriceFactor: 1.25,
  },
  {
    id: 4,
    name: "COLD BREW",
    price: 85,
    label: "50gm",
    details: [
      { icon: "/assets/premiumbadge.png", label: "Premium Taste" },
      { icon: "/assets/beans.png", label: "Finest Beans" },
      { icon: "/assets/handpicked.png", label: "Handpicked" },
    ],
    // image: [
    //   // Ensure image is an array
    //   "/assets/50gmCopper.png",
    //   "/assets/50gmCopper-2.png", // Placeholder
    //   "/assets/50gmCopper-3.png", // Placeholder
    // ],
    description:
      "Smooth, Bold & Refreshing!Expertly crafted from the finest beans and slow-brewed for a rich, smooth flavour with lower acidity. Enjoy it black, with milk, or your way – the perfect refreshing caffeine boost!",
    quantity: [{ label: "20gm", images: "/assets/coldbrew.png", price: 85 }],
    // Add missing fields
    rating: 5,
    reviewCount: 25,
    category: "Bold Coffee",
    originalPriceFactor: 1.25,
  },
  {
    id: 5,
    name: "NOC",
    price: 300,
    label: "50gm",
    details: [
      // { icon: "/assets/premiumbadge.png", label: "Premium Taste" },
      // { icon: "/assets/beans.png", label: "Finest Beans" },
      // { icon: "/assets/handpicked.png", label: "Handpicked" },
    ],
    // image: [
    //   // Ensure image is an array
    //   "/assets/50gmCopper.png",
    //   "/assets/50gmCopper-2.png", // Placeholder
    //   "/assets/50gmCopper-3.png", // Placeholder
    // ],
    description:
      "Nitrogen-infused coffee is a cold brew infused with nitrogen gas, creating a smooth, creamy texture and a rich, velvety mouthfeel. It has a naturally sweet taste with a cascading effect similar to draft beer.The perfect refreshing caffeine boost!",
    quantity: [{ label: "20ml", images: "/assets/nocinside.png", price: 300 }],
    // Add missing fields
    rating: 5,
    reviewCount: 25,
    category: "Bold Coffee",
    originalPriceFactor: 1.25,
  },
];
// --- End Product Data ---

export default function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const product = products.find((p) => p.id === parseInt(params.productId));

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
