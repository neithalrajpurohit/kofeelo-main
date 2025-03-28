import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative h-[600px]  text-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0  z-10" />
        <Image
          src="/assets/Banner.jpg"
          alt="Coffee splash"
          height={200}
          width={600}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
