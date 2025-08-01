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
      "A Cup of Pure Indulgence Savor the velvety-smooth richness of our pure Speciaility Instant Coffee,crafted from handpicked beans of India's most celebrated coffee regions.Each sip delivers a creamy body , a refreshing finish, and an aroma that lingers-offering you an effortlessly luxurious coffee experience. ",
    Points:
      "Crafted from 100% Indian-origin Robusta beans,perfect for hot,cold,and espresso preparations.Indulge in velvety, creamy-smooth flavors of specialty coffee effortlessly instant  for a truly luxurious coffee experience ",

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
      "Wake Up to a Chicory Twist! Rich, Strong , and infused with Chicory Goodness,Try our Instant Strong Chicory Coffee for a robust, well-balanced brew.Koffelo has a sophisticated flavor that is healthy and smooth ,thanks to the natural richness of Chicory.",
    quantity: [
      {
        label: "8gm",
        images: "/assets/8GmSilver.png",
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
      "A rich and bold mix of coffee and chicory that delivers a deep,satisfying strength. Expertly designed for those who seek a powerful,full-bodied coffee experience. Embrace instant boldness with every sip.",
    quantity: [
      {
        label: "8gm",
        images: "/assets/extrabold8gm.png",
        price: 100,
      },
      { label: "50gm", images: "/assets/ExtraBold50gramFront.png", price: 85 },
      {
        label: "100gm",
        images: "/assets/ExtraBold100gramfront.png",
        price: 169,
      },
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
    image: [
      // Ensure image is an array
      "/assets/50gmCopper.png",
      "/assets/50gmCopper-2.png", // Placeholder
      "/assets/50gmCopper-3.png", // Placeholder
    ],
    description:
      "Smooth & Refreshing! Experience the deep ,rich flaovr of cold brew in seconds.Koffelo Cold Brew Instant Coffee is crafted from 100% premium Arabica beans using a slow cold brewing process for a naturally smooth,low-acidity taste. Freeze-dried to lock in freshness, just mix with cold or hot water / Milk-no brewing,no waiting.",
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
    image: [
      // Ensure image is an array
      "/assets/50gmCopper.png",
      "/assets/50gmCopper-2.png", // Placeholder
      "/assets/50gmCopper-3.png", // Placeholder
    ],
    description:
      "A cosmic blend of Brazilian & Ethiopian roasts. Our Nitro Cold Brew delivers bold coffee flavor, naturally amped with smooth nitrogen infusion-no crash,no sugar, just clean energy.Take it to the gym, office, or your next hustle. Cold,creamy, and ready when you are.",
    quantity: [{ label: "20ml", images: "/assets/noc.png", price: 300 }],
    // Add missing fields
    rating: 5,
    reviewCount: 25,
    category: "Bold Coffee",
    originalPriceFactor: 1.25,
  },
];
// --- End Product Data ---
export async function generateStaticParams() {
  // Replace with your real product IDs (or fetch them from a CMS or DB)

  return products.map((product) => ({
    productId: product.id.toString(),
  }));
}

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
