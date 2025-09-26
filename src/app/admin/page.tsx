"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { DataManager } from "@/lib/dataManager";
import { LogOut, Save, Image, DollarSign, Package, Download, Upload, RotateCcw, ShoppingCart, Phone, MapPin, Calendar, User } from "lucide-react";
import { formatCurrency } from "@/lib/format";

export default function AdminPanel() {
  const { isAuthenticated, logout, isLoading } = useAdminAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("feminine");
  const [editedProducts, setEditedProducts] = useState(() => DataManager.getProducts());
  const [hasChanges, setHasChanges] = useState(false);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const loadOrders = async () => {
    setOrdersLoading(true);
    try {
      const response = await fetch('/api/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'orders') {
      loadOrders();
    }
  }, [activeTab]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
          <p>Зареждане...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const feminineProducts = editedProducts.filter(p => p.genderProfile === "Feminine");
  const masculineProducts = editedProducts.filter(p => p.genderProfile === "Masculine");

  const updateProduct = (productId: string, field: string, value: any) => {
    const updatedProducts = DataManager.updateProduct(productId, { [field]: value });
    setEditedProducts(updatedProducts);
    setHasChanges(true);
  };

  const updateVariant = (productId: string, variantId: string, field: string, value: any) => {
    const updatedProducts = DataManager.updateVariant(productId, variantId, { [field]: value });
    setEditedProducts(updatedProducts);
    setHasChanges(true);
  };

  const saveChanges = () => {
    DataManager.saveProducts(editedProducts);
    setHasChanges(false);
    alert("Промените са запазени в localStorage!");
  };

  const exportData = () => {
    const data = DataManager.exportProducts();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'luxe-parfum-products.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          if (DataManager.importProducts(content)) {
            setEditedProducts(DataManager.getProducts());
            alert('Продуктите са импортирани успешно!');
          } else {
            alert('Грешка при импортиране на файла!');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const resetToDefault = () => {
    if (confirm('Сигурни ли сте, че искате да върнете всички продукти към първоначалното им състояние?')) {
      const defaultProducts = DataManager.resetToDefault();
      setEditedProducts(defaultProducts);
      setHasChanges(false);
      alert('Продуктите са върнати към първоначалното им състояние!');
    }
  };

  const ProductCard = ({ product }: { product: any }) => (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
            <Image className="h-8 w-8 text-gray-400" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg">{product.name}</CardTitle>
            <p className="text-sm text-gray-600">{product.brand}</p>
            <Badge variant="secondary" className="mt-1">
              {product.genderProfile === "Feminine" ? "Женски" : "Мъжки"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`name-${product.id}`}>Име на продукта</Label>
            <Input
              id={`name-${product.id}`}
              value={product.name}
              onChange={(e) => updateProduct(product.id, "name", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`brand-${product.id}`}>Марка</Label>
            <Input
              id={`brand-${product.id}`}
              value={product.brand}
              onChange={(e) => updateProduct(product.id, "brand", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`image-${product.id}`}>URL на изображение</Label>
          <Input
            id={`image-${product.id}`}
            value={product.imageUrl}
            onChange={(e) => updateProduct(product.id, "imageUrl", e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`description-${product.id}`}>Описание</Label>
          <Textarea
            id={`description-${product.id}`}
            value={product.description}
            onChange={(e) => updateProduct(product.id, "description", e.target.value)}
            rows={3}
          />
        </div>

        {/* Variants */}
        <div className="space-y-4">
          <h4 className="font-semibold flex items-center gap-2">
            <Package className="h-4 w-4" />
            Варианти
          </h4>
          
          {product.variants.map((variant: any) => (
            <div key={variant.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="font-medium">{variant.volumeMl}ml - {variant.concentration}</h5>
                <Badge variant={variant.inStock ? "default" : "destructive"}>
                  {variant.inStock ? "Наличен" : "Изчерпан"}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`volume-${variant.id}`}>Обем (ml)</Label>
                  <Input
                    id={`volume-${variant.id}`}
                    type="number"
                    value={variant.volumeMl}
                    onChange={(e) => updateVariant(product.id, variant.id, "volumeMl", parseInt(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`concentration-${variant.id}`}>Концентрация</Label>
                  <Input
                    id={`concentration-${variant.id}`}
                    value={variant.concentration}
                    onChange={(e) => updateVariant(product.id, variant.id, "concentration", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`price-${variant.id}`}>Цена (лв.)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id={`price-${variant.id}`}
                      type="number"
                      value={variant.price}
                      onChange={(e) => updateVariant(product.id, variant.id, "price", parseFloat(e.target.value))}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Label htmlFor={`stock-${variant.id}`}>Наличност</Label>
                <input
                  id={`stock-${variant.id}`}
                  type="checkbox"
                  checked={variant.inStock}
                  onChange={(e) => updateVariant(product.id, variant.id, "inStock", e.target.checked)}
                  className="rounded"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Админ Панел</h1>
            <div className="flex items-center gap-2">
              {hasChanges && (
                <Badge variant="outline" className="text-orange-600">
                  Незапазени промени
                </Badge>
              )}
              
              <Button onClick={exportData} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Експорт
              </Button>
              
              <Button onClick={importData} variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Импорт
              </Button>
              
              <Button onClick={resetToDefault} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                Върни
              </Button>
              
              <Button onClick={saveChanges} disabled={!hasChanges}>
                <Save className="h-4 w-4 mr-2" />
                Запази
              </Button>
              
              <Button variant="outline" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Изход
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="feminine" className="flex items-center gap-2">
              <span className="text-pink-600">🌸</span>
              ЗА НЕЯ ({feminineProducts.length})
            </TabsTrigger>
            <TabsTrigger value="masculine" className="flex items-center gap-2">
              <span className="text-blue-600">👔</span>
              ЗА НЕГО ({masculineProducts.length})
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-green-600" />
              ПОРЪЧКИ ({orders.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="feminine" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-pink-600">Женски Аромати</h2>
              <Badge variant="outline">{feminineProducts.length} продукта</Badge>
            </div>
            
            {feminineProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </TabsContent>

          <TabsContent value="masculine" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-blue-600">Мъжки Аромати</h2>
              <Badge variant="outline">{masculineProducts.length} продукта</Badge>
            </div>
            
            {masculineProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-green-600">Поръчки за обработка</h2>
              <div className="flex items-center gap-2">
                <Button onClick={loadOrders} variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Обнови
                </Button>
                <Badge variant="outline">{orders.length} поръчки</Badge>
              </div>
            </div>

            {ordersLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p>Зареждане на поръчки...</p>
              </div>
            ) : orders.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Няма поръчки</h3>
                  <p className="text-gray-500">Все още няма направени поръчки.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {orders.map((order: any) => (
                  <Card key={order.id} className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <User className="h-5 w-5" />
                          {order.customer_first_name} {order.customer_middle_name && `${order.customer_middle_name} `}{order.customer_last_name}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={
                              order.status === 'pending' ? 'default' :
                              order.status === 'confirmed' ? 'secondary' :
                              order.status === 'processing' ? 'outline' :
                              order.status === 'shipped' ? 'default' :
                              'destructive'
                            }
                          >
                            {order.status === 'pending' ? 'Чака потвърждение' :
                             order.status === 'confirmed' ? 'Потвърдена' :
                             order.status === 'processing' ? 'Обработва се' :
                             order.status === 'shipped' ? 'Изпратена' :
                             order.status}
                          </Badge>
                          <span className="text-lg font-bold text-green-600">
                            {formatCurrency(order.total_price)}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Customer Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">{order.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>{order.city}, {order.municipality}</span>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-2">
                        <h4 className="font-semibold">Поръчани продукти:</h4>
                        <div className="space-y-2">
                          {order.items.map((item: any, index: number) => (
                            <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                              <div>
                                <span className="font-medium">{item.productName || 'Unknown Product'}</span>
                                <span className="text-sm text-gray-600 ml-2">
                                  {item.brand || ''} - {item.volumeMl || ''}ml
                                </span>
                              </div>
                              <div className="text-right">
                                <span className="font-medium">{item.quantity} бр.</span>
                                <span className="text-sm text-gray-600 ml-2">
                                  {formatCurrency(item.price * item.quantity)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Actions */}
                      <div className="flex items-center gap-2 pt-4 border-t">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Потвърди
                        </Button>
                        <Button size="sm" variant="outline">
                          Обработи
                        </Button>
                        <Button size="sm" variant="outline">
                          Изпрати
                        </Button>
                        <Button size="sm" variant="destructive">
                          Отмени
                        </Button>
                      </div>

                      {/* Order Date */}
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Поръчана на: {new Date(order.created_at).toLocaleString('bg-BG')}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
