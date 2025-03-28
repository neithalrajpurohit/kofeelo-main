"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

// const products = [
//   {
//     id: 1,
//     name: "Premium",
//     image: "/assets/50gmGold.png",
//     label: "50gm",
//     description:
//       "Taste Premium ,Smell Local! Experience the rich flavor of our instant Pure Granulated Coffee,crafted from the finest beans,handpicked from renowned Indian coffee regions.Every cup delivers exceptional quality.Enjoy coffee in its purrst form ",
//     quantity: [
//       { label: "1.1gm/pcs (50pcs)", images: "/assets/2GmGold.png", Price: 100 },
//       { label: "50gm", images: "/assets/50gmGold.png", Price: 85 },
//       { label: "100gm", images: "/assets/100gmGold.png", Price: 169 },
//     ],
//   },
//   {
//     id: 2,
//     name: "Coffee Strong",
//     image: "/assets/50gmSilver.png",
//     label: "50gm",
//     description:
//       "Wake Up to a Chicory Twist! Rich, Strong , and infused with Chicory Goodness,Try our Instant Strong Chicory Coffee for a robust, well-balanced brew.This instant coffee has a sophisticated flavor that is healthy and smooth ,thanks to the natural richness of chicory",
//     quantity: [
//       {
//         label: "1.1gm/pcs (50pcs)",
//         images: "/assets/2GmSilver.png",
//         Price: 100,
//       },
//       { label: "50gm", images: "/assets/50gmSilver.png", Price: 85 },
//       { label: "100gm", images: "/assets/100gmSilver.png", Price: 169 },
//     ],
//   },
//   {
//     id: 3,
//     name: "Extra Bold",
//     image: "/assets/50gmCopper.png",
//     label: "50gm",
//     description:
//       "A rich and bold mix of coffee and chicory that delivers adeep,satisfying strength. Expertly designed for those who seek apowerful,full-bodied coffee experience. Embrace instant boldness with every sip.",
//     quantity: [
//       {
//         label: "1.1gm/pcs (50pcs)",
//         images: "/assets/2Gmcopper.png",
//         Price: 100,
//       },
//       { label: "50gm", images: "/assets/50gmCopper.png", Price: 85 },
//       { label: "100gm", images: "/assets/100gmCopper.png", Price: 169 },
//     ],
//   },
// ];
const products = {
  id: 1,
  name: "Premium",
  image: "/assets/philosophy.jpg",
  label: "50gm",
};
export default function BestSelling() {
  const route = useRouter();

  return (
    <div className="bg-[#f5e6d3] py-16 items-center justify-center flex">
      <img
        src={products.image}
        alt="product"
        className="w-90 h-full object-contain"
      />
    </div>
  );
}
