import Image from "next/image";
import { Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProductCard({ product, onSelect }: any) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-48 mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-md object-cover"
          />
        </div>
        <p className="text-sm text-gray-600 mb-2">{product.description}</p>
        <p className="font-semibold">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onSelect}>
          View Details
        </Button>
        <Button>
          <Coffee className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
