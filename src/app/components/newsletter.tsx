import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  const testimonials = {
    id: 1,
    name: "Shalima Hayden",
    avatar: "/placeholder.svg?height=50&width=50",
    image: "/assets/united.jpg",
    text: "I Have Trusted Koffelo Coffee For Many Years. Really Amazing To See The Combination Was Very Good. One Thing Is To Serve Extraordinary Coffee With Caffeine. I Will Order From Caffeine For Any Of My Coffee Needs.",
    rating: 5,
  };
  return (
    <div className="bg-[#f5e6d3] py-16">
      <img
        src={testimonials.image}
        alt="product"
        className="w-90 h-full object-contain"
      />
    </div>
  );
}
