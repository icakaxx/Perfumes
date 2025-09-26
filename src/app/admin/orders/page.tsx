'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Trash2, RefreshCw, Eye, Package, Calendar, User, MapPin, Phone, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/format';

interface OrderItem {
  productId: string;
  variantId: string;
  productName: string;
  brand: string;
  volumeMl: number;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  customer_first_name: string;
  customer_middle_name?: string;
  customer_last_name: string;
  address: string;
  phone: string;
  municipality: string;
  city: string;
  country: string;
  items: OrderItem[];
  total_price: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at: string;
}

const ORDER_STATUSES = [
  { value: 'pending', label: 'Изчакваща', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'confirmed', label: 'Потвърдена', color: 'bg-blue-100 text-blue-800' },
  { value: 'shipped', label: 'Изпратена', color: 'bg-purple-100 text-purple-800' },
  { value: 'delivered', label: 'Доставена', color: 'bg-green-100 text-green-800' },
  { value: 'cancelled', label: 'Отказана', color: 'bg-red-100 text-red-800' },
];

export default function OrdersAdmin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/orders');

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders?id=${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      await fetchOrders();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update order');
    }
  };

  const handleDelete = async (orderId: string) => {
    if (!confirm('Сигурни ли сте, че искате да изтриете тази поръчка?')) {
      return;
    }

    try {
      const response = await fetch(`/api/orders?id=${orderId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete order');
      }

      await fetchOrders();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete order');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = ORDER_STATUSES.find(s => s.value === status);
    return statusConfig || ORDER_STATUSES[0];
  };

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  if (loading) {
    return (
      <div className="container mx-auto p-3 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Управление на поръчки</h1>
        <div className="text-center text-sm sm:text-base">Зареждане на поръчки...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-3 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Управление на поръчки</h1>
        <div className="text-red-600 text-sm sm:text-base">Грешка: {error}</div>
        <Button onClick={fetchOrders} className="mt-3 sm:mt-4 text-sm sm:text-base">
          <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
          Опитай отново
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-3 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/admin/perfumes">
            <Button variant="outline" size="sm" className="text-xs sm:text-sm">
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Парфюми
            </Button>
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold">Поръчки</h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48 text-sm sm:text-base">
              <SelectValue placeholder="Филтриране по статус" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Всички поръчки</SelectItem>
              {ORDER_STATUSES.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={fetchOrders} variant="outline" className="text-sm sm:text-base h-9 sm:h-10">
            <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            Обнови
          </Button>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">
              {statusFilter === 'all' ? 'Няма поръчки' : 'Няма поръчки с този статус'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onStatusUpdate={handleStatusUpdate}
              onDelete={handleDelete}
              onView={setViewingOrder}
              onEdit={setEditingOrder}
            />
          ))}
        </div>
      )}

      {/* View Order Modal */}
      {viewingOrder && (
        <OrderViewModal 
          order={viewingOrder} 
          onClose={() => setViewingOrder(null)} 
        />
      )}

      {/* Edit Order Modal */}
      {editingOrder && (
        <OrderEditModal 
          order={editingOrder} 
          onClose={() => setEditingOrder(null)}
          onSave={fetchOrders}
        />
      )}
    </div>
  );
}

interface OrderCardProps {
  order: Order;
  onStatusUpdate: (orderId: string, status: string) => void;
  onDelete: (orderId: string) => void;
  onView: (order: Order) => void;
  onEdit: (order: Order) => void;
}

function OrderCard({ order, onStatusUpdate, onDelete, onView, onEdit }: OrderCardProps) {
  const statusConfig = ORDER_STATUSES.find(s => s.value === order.status) || ORDER_STATUSES[0];

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-3 sm:p-6">
        {/* Mobile Layout */}
        <div className="block sm:hidden space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-sm">#{order.id.slice(-8)}</p>
              <p className="text-xs text-gray-600">
                {order.customer_first_name} {order.customer_last_name}
              </p>
            </div>
            <Badge className={`text-xs ${statusConfig.color}`}>
              {statusConfig.label}
            </Badge>
          </div>
          
          <div className="text-xs text-gray-500 space-y-1">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(order.created_at).toLocaleDateString('bg-BG')}
            </div>
            <div className="flex items-center gap-1">
              <Package className="h-3 w-3" />
              {order.items.length} продукта
            </div>
            <div className="font-semibold text-sm text-black">
              {formatCurrency(order.total_price)}
            </div>
          </div>
          
          <div className="flex gap-1">
            <Button size="sm" variant="outline" onClick={() => onView(order)} className="flex-1 text-xs">
              <Eye className="h-3 w-3 mr-1" />
              Виж
            </Button>
            <Button size="sm" variant="outline" onClick={() => onEdit(order)} className="flex-1 text-xs">
              <Edit className="h-3 w-3 mr-1" />
              Редактирай
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => onDelete(order.id)}
              className="text-red-600 hover:text-red-700 px-2"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
          
          <Select value={order.status} onValueChange={(value) => onStatusUpdate(order.id, value)}>
            <SelectTrigger className="w-full text-xs h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ORDER_STATUSES.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <p className="font-semibold">#{order.id.slice(-8)}</p>
              <p className="text-sm text-gray-600">
                {order.customer_first_name} {order.customer_last_name}
              </p>
            </div>
            <div className="text-sm text-gray-500">
              <div className="flex items-center gap-1 mb-1">
                <Calendar className="h-4 w-4" />
                {new Date(order.created_at).toLocaleDateString('bg-BG')}
              </div>
              <div className="flex items-center gap-1">
                <Package className="h-4 w-4" />
                {order.items.length} продукта
              </div>
            </div>
            <div>
              <p className="font-semibold text-lg">{formatCurrency(order.total_price)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge className={statusConfig.color}>
              {statusConfig.label}
            </Badge>
            <Select value={order.status} onValueChange={(value) => onStatusUpdate(order.id, value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ORDER_STATUSES.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button size="sm" variant="outline" onClick={() => onView(order)}>
              <Eye className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={() => onEdit(order)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => onDelete(order.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface OrderViewModalProps {
  order: Order;
  onClose: () => void;
}

function OrderViewModal({ order, onClose }: OrderViewModalProps) {
  const statusConfig = ORDER_STATUSES.find(s => s.value === order.status) || ORDER_STATUSES[0];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-3 sm:p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[95vh] overflow-y-auto">
        <CardHeader className="pb-3 sm:pb-6">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg sm:text-xl">Поръчка #{order.id.slice(-8)}</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
          {/* Customer Info */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">
              <User className="h-4 w-4" />
              Информация за клиента
            </h3>
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg text-sm sm:text-base">
              <p><strong>Име:</strong> {order.customer_first_name} {order.customer_middle_name} {order.customer_last_name}</p>
              <p><strong>Телефон:</strong> {order.phone}</p>
              <div className="flex items-start gap-1 mt-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <div>
                  <p>{order.address}</p>
                  <p>{order.municipality}, {order.city}</p>
                  <p>{order.country}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Status */}
          <div>
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Статус</h3>
            <Badge className={statusConfig.color}>
              {statusConfig.label}
            </Badge>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Продукти</h3>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <div className="flex justify-between items-start text-sm sm:text-base">
                    <div>
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-gray-600">{item.brand} - {item.volumeMl}ml</p>
                      <p className="text-sm text-gray-500">Количество: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                      <p className="text-sm text-gray-500">{formatCurrency(item.price)} x {item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Total */}
          <div className="border-t pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Общо:</span>
              <span>{formatCurrency(order.total_price)}</span>
            </div>
          </div>

          {/* Order Dates */}
          <div className="text-sm text-gray-500 border-t pt-4">
            <p><strong>Създадена:</strong> {new Date(order.created_at).toLocaleString('bg-BG')}</p>
            <p><strong>Последна промяна:</strong> {new Date(order.updated_at).toLocaleString('bg-BG')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface OrderEditModalProps {
  order: Order;
  onClose: () => void;
  onSave: () => void;
}

function OrderEditModal({ order, onClose, onSave }: OrderEditModalProps) {
  const [formData, setFormData] = useState({
    customer_first_name: order.customer_first_name,
    customer_middle_name: order.customer_middle_name || '',
    customer_last_name: order.customer_last_name,
    phone: order.phone,
    address: order.address,
    municipality: order.municipality,
    city: order.city,
    country: order.country,
    status: order.status,
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await fetch(`/api/orders?id=${order.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update order');
      }

      onSave();
      onClose();
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to update order:', err);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-3 sm:p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[95vh] overflow-y-auto">
        <CardHeader className="pb-3 sm:pb-6">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg sm:text-xl">Редактиране на поръчка #{order.id.slice(-8)}</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <Label className="text-sm sm:text-base">Име *</Label>
              <Input
                value={formData.customer_first_name}
                onChange={(e) => setFormData({...formData, customer_first_name: e.target.value})}
                className="text-sm sm:text-base"
              />
            </div>
            <div>
              <Label className="text-sm sm:text-base">Презиме</Label>
              <Input
                value={formData.customer_middle_name}
                onChange={(e) => setFormData({...formData, customer_middle_name: e.target.value})}
                className="text-sm sm:text-base"
              />
            </div>
            <div>
              <Label className="text-sm sm:text-base">Фамилия *</Label>
              <Input
                value={formData.customer_last_name}
                onChange={(e) => setFormData({...formData, customer_last_name: e.target.value})}
                className="text-sm sm:text-base"
              />
            </div>
            <div>
              <Label className="text-sm sm:text-base">Телефон *</Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="text-sm sm:text-base"
              />
            </div>
          </div>

          <div>
            <Label className="text-sm sm:text-base">Адрес *</Label>
            <Textarea
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="text-sm sm:text-base"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <Label className="text-sm sm:text-base">Община *</Label>
              <Input
                value={formData.municipality}
                onChange={(e) => setFormData({...formData, municipality: e.target.value})}
                className="text-sm sm:text-base"
              />
            </div>
            <div>
              <Label className="text-sm sm:text-base">Град *</Label>
              <Input
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className="text-sm sm:text-base"
              />
            </div>
          </div>

          <div>
            <Label className="text-sm sm:text-base">Статус</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value as 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'})}>
              <SelectTrigger className="text-sm sm:text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ORDER_STATUSES.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={onClose} variant="outline" className="flex-1 text-sm sm:text-base">
              Отказ
            </Button>
            <Button onClick={handleSave} disabled={saving} className="flex-1 text-sm sm:text-base">
              {saving ? 'Запазване...' : 'Запази'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}