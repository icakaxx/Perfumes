"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Package, Home, ShoppingBag } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { products } from "@/data/products";

interface OrderSummary {
  firstName: string;
  middleName: string;
  lastName: string;
  address: string;
  phone: string;
  productId: string;
  variantId: string;
  quantity: number;
  totalPrice: number;
  timestamp: string;
  orderId: string;
}

export default function SuccessPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<OrderSummary | null>(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem("lastOrder");
    if (savedOrder) {
      setOrderData(JSON.parse(savedOrder));
    } else {
      router.push("/");
    }
  }, [router]);

  if (!orderData) {
    return (
      <div className="container py-16 text-center">
        <p className="text-muted-foreground">Loading order details...</p>
      </div>
    );
  }

  const product = products.find(p => p.id === orderData.productId);
  const variant = product?.variants.find(v => v.id === orderData.variantId);

  return (
    <div className="container py-8 max-w-2xl">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="font-serif text-3xl font-bold mb-2">
          Order Confirmed!
        </h1>
        <p className="text-muted-foreground">
          Thank you for your order. We'll process it shortly.
        </p>
      </div>

      {/* Order Details Card */}
      <Card className="p-6 mb-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Order ID</p>
            <p className="font-mono font-semibold">{orderData.orderId}</p>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-3">Customer Information</p>
            <div className="space-y-1">
              <p className="font-medium">
                {orderData.firstName} {orderData.middleName} {orderData.lastName}
              </p>
              <p className="text-sm text-muted-foreground">{orderData.phone}</p>
              <p className="text-sm text-muted-foreground">{orderData.address}</p>
            </div>
          </div>

          {product && variant && (
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-3">Product Details</p>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {product.brand} • {variant.volumeMl}ml • Qty: {orderData.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-accent">
                    {formatCurrency(orderData.totalPrice)}
                  </p>
                  <p className="text-xs text-muted-foreground">incl. VAT</p>
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 border-t">
            <div className="flex items-center gap-2 text-sm">
              <Package className="h-4 w-4 text-muted-foreground" />
              <p>
                Estimated delivery: <span className="font-medium">3-5 business days</span>
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* What's Next */}
      <Card className="p-6 mb-6 bg-accent/5 border-accent/20">
        <h2 className="font-semibold mb-3">What happens next?</h2>
        <ol className="space-y-2 text-sm">
          <li className="flex gap-2">
            <span className="text-accent font-bold">1.</span>
            You'll receive an order confirmation email shortly
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">2.</span>
            We'll carefully package your perfume with our signature gift wrapping
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">3.</span>
            You'll get a tracking number once your order ships
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">4.</span>
            Your fragrance will arrive within 3-5 business days
          </li>
        </ol>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Link href="/" className="flex-1">
          <Button variant="outline" className="w-full">
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <Link href="/shop" className="flex-1">
          <Button className="w-full bg-accent hover:bg-accent/90 text-white">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}

