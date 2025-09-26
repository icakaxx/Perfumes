"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/hooks/useDatabaseProducts";
import { formatCurrency } from "@/lib/format";
import { ShoppingCart, Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const { addItem } = useCart();

  // Get images array - support both old single image and new multiple images
  const images = product.imageUrls && product.imageUrls.length > 0 
    ? product.imageUrls 
    : product.imageUrl 
      ? [product.imageUrl] 
      : ['/placeholder-perfume.jpg'];


  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

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
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg w-full">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={images[currentImageIndex]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            console.log('Image failed to load:', images[currentImageIndex]);
            // Try to load next image if current fails
            if (images.length > 1) {
              const nextIndex = (currentImageIndex + 1) % images.length;
              setCurrentImageIndex(nextIndex);
            }
          }}
        />
        
        {/* Navigation arrows - only show if multiple images */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={prevImage}
              className="absolute left-1 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 shadow-lg h-6 w-6 sm:h-8 sm:w-8 p-0 z-10"
            >
              <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextImage}
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 shadow-lg h-6 w-6 sm:h-8 sm:w-8 p-0 z-10"
            >
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </>
        )}
        
        {/* Image indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 bg-black/20 px-2 py-1 rounded-full">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentImageIndex 
                    ? 'bg-white' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
        
        <div className="absolute top-1 left-1 sm:top-2 sm:left-2">
          <Badge variant="secondary" className="bg-white/90 text-black text-xs px-1 py-0.5 sm:px-2 sm:py-1">
            {product.genderProfile === "Feminine" ? "Женски" : 
             product.genderProfile === "Masculine" ? "Мъжки" : "Унисекс"}
          </Badge>
        </div>
        {availableVariants.length === 0 && (
          <div className="absolute top-1 right-1 sm:top-2 sm:right-2">
            <Badge variant="destructive" className="text-xs px-1 py-0.5 sm:px-2 sm:py-1">
              Изчерпан
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-3 sm:p-4">
        <div className="space-y-2 sm:space-y-3">
          {/* Product Name */}
          <div>
            <h3 className="font-semibold text-base sm:text-lg leading-tight">{product.name}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">{product.brand}</p>
          </div>
          
          {/* Description */}
          <div className="text-xs sm:text-sm text-muted-foreground">
            <p className={isDescriptionExpanded ? "" : "line-clamp-2"}>
              {product.description}
            </p>
            {product.description.length > 100 && (
              <button
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="text-accent hover:text-accent/80 text-xs mt-1 font-medium"
              >
                {isDescriptionExpanded ? "Виж по-малко" : "Виж още"}
              </button>
            )}
          </div>
          
          {/* Price and Volume */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg sm:text-xl font-bold text-accent">
                {formatCurrency(cheapestVariant.price)}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {cheapestVariant.volumeMl}ml
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-3 sm:p-4 pt-0">
        {availableVariants.length > 0 ? (
          <>
            {/* Mobile Layout - DEBUG VERSION */}
            <div className="flex flex-col md:hidden gap-2 border-2 border-green-500 bg-green-100 p-2">
              {/* DEBUG INFO */}
              <div className="text-xs text-green-600 font-bold text-center">
                MOBILE ADD TO CART - iPhone Debug
              </div>
              
              {/* Quantity Selector */}
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="h-8 w-8 p-0 border-2 border-blue-500 bg-blue-100"
                >
                  <span className="text-sm font-bold">-</span>
                </Button>
                <span className="text-sm font-medium min-w-[20px] text-center bg-yellow-100 px-2 py-1 rounded">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-8 w-8 p-0 border-2 border-blue-500 bg-blue-100"
                >
                  <span className="text-sm font-bold">+</span>
                </Button>
              </div>
              
              {/* Add to Cart Button - SUPER OBVIOUS */}
              <Button
                onClick={handleAddToCart}
                size="sm"
                className="w-full bg-green-600 hover:bg-green-700 text-white text-sm h-10 border-2 border-green-800 font-bold shadow-lg"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                🛒 ДОБАВИ В КОЛИЧКАТА 🛒
              </Button>
              
              {/* DEBUG INFO */}
              <div className="text-xs text-green-600 text-center">
                Available variants: {availableVariants.length}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex gap-2 w-full">
              {/* Quantity Selector */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 text-gray-700 h-8 w-8 flex items-center justify-center"
                >
                  <span className="text-sm font-bold">-</span>
                </Button>
                <span className="text-sm font-medium min-w-[20px] text-center text-gray-700">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 text-gray-700 h-8 w-8 flex items-center justify-center"
                >
                  <span className="text-sm font-bold">+</span>
                </Button>
              </div>
              
              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                size="sm"
                className="flex-1 bg-accent hover:bg-accent/90 text-white text-sm h-9"
              >
                <ShoppingCart className="h-3 w-3 mr-1" />
                Добави
              </Button>
            </div>
          </>
        ) : (
          <Button
            disabled
            className="w-full h-9"
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
