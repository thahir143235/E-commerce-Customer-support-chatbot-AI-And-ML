"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

type ProductModalProps = {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
};

export default function ProductModal({
  product,
  open,
  onClose,
  onAddToCart,
}: ProductModalProps) {
  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      {/* MODAL BOX */}
      <div className="bg-white rounded-lg max-w-3xl w-full mx-4 p-6 relative">
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* IMAGE */}
          <div className="relative aspect-square">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* DETAILS */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="text-gray-500">{product.category}</p>
            <p className="text-gray-700">{product.description}</p>

            <p className="text-2xl font-bold text-green-600">
              ₹{product.price.toLocaleString("en-IN")}
            </p>

            <ul className="list-disc pl-5 text-sm text-gray-600">
              <li>1 Year Warranty</li>
              <li>Free Delivery</li>
              <li>7 Days Replacement</li>
              <li>24/7 Customer Support</li>
            </ul>

            <Button
              className="w-full"
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
