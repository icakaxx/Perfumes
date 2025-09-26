"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/data/products";
import { formatCurrency } from "@/lib/format";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { CartPopup } from "@/components/CartPopup";

interface PerfumeCardProps {
  product: Product;
}

export function PerfumeCard({ product }: PerfumeCardProps) {
  const cheapestVariant = product.variants.reduce((min, variant) => 
    variant.price < min.price ? variant : min
  );
  
  const availableVariants = product.variants.filter(v => v.inStock);
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (availableVariants.length > 0) {
      addItem({
        productId: product.id,
        variantId: cheapestVariant.id,
        quantity: quantity,
      });
      
      // Show smooth popup
      setShowPopup(true);
      
      // Reset quantity to 1 after adding
      setQuantity(1);
    }
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="bg-white/90 text-black text-xs">
            {product.genderProfile === "Feminine" ? "Женски" : 
             product.genderProfile === "Masculine" ? "Мъжки" : "Унисекс"}
          </Badge>
        </div>
        {availableVariants.length === 0 && (
          <div className="absolute top-2 right-2">
            <Badge variant="destructive" className="text-xs">
              Изчерпан
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Product Name */}
          <div>
            <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{product.brand}</p>
          </div>
          
          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          
          {/* Price and Volume */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold text-accent">
                {formatCurrency(cheapestVariant.price)}
              </p>
              <p className="text-sm text-muted-foreground">
                {cheapestVariant.volumeMl}ml
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        {availableVariants.length > 0 ? (
          <div className="flex gap-2 w-full">
            {/* Quantity Selector */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 text-gray-700"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="text-sm font-medium min-w-[20px] text-center text-gray-700">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
                className="border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 text-gray-700"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            
            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              size="sm"
              className="flex-1 bg-accent hover:bg-accent/90 text-white text-xs"
            >
              <ShoppingCart className="h-3 w-3 mr-1" />
              Добави
            </Button>
          </div>
        ) : (
          <Button
            disabled
            className="w-full"
            variant="outline"
          >
            Изчерпан
          </Button>
        )}
      </CardFooter>
      
      {/* Smooth Popup */}
      <CartPopup
        isVisible={showPopup}
        productName={product.name}
        quantity={quantity}
        volume={cheapestVariant.volumeMl}
        onClose={() => setShowPopup(false)}
      />
    </Card>
  );
}
