import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React, { PropsWithChildren, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CarouselProduct = ({ children }: PropsWithChildren) => {
  const ref = useRef<any>(null);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
  };

  return (
    <div className="relative">
      <Carousel
        transitionDuration={600}
        infinite
        ref={ref}
        arrows={false}
        responsive={responsive}
      >
        {children}
      </Carousel>
      <div className="flex absolute justify-center w-full gap-4 mt-8">
        <Button
          size="icon"
          variant="outline"
          className="rounded-full"
          onClick={() => {
            ref.current?.previous();
          }}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            ref.current?.next();
          }}
          className="rounded-full"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CarouselProduct;
