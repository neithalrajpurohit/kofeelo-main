import Link from "next/link";

import Image from "next/image";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between p-4 bg-[#c4a484] text-black">
      <Link href="/" className="text-2xl font-bold">
        <div className="">
          <Image
            src="/assets/logo.png"
            alt="logo"
            width={80}
            height={50}
            className="mr-4"
          />
        </div>
      </Link>
      <div className="flex items-center space-x-9 px-10">
        <Link href="/" className="hover:text-[#c4a484]">
          Home
        </Link>
        <Link href="#products" className="hover:text-[#c4a484]">
          Products
        </Link>
        <Link href="#ourphillosophy" className="hover:text-[#c4a484] ">
          About Us
        </Link>
        <Link href="#contact" className="hover:text-[#c4a484] ">
          Contact
        </Link>

        {/* <Link href="/locations" className="hover:text-[#c4a484]">
          Locations
        </Link>
        <Button variant="ghost" className="text-black hover:text-[#c4a484]">
          Sign In
        </Button> */}
        {/* <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
        </Button> */}
      </div>
    </nav>
  );
}
