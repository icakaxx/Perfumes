'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, RefreshCw, Package, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { PerfumeForm } from '@/components/admin/PerfumeForm';

interface Perfume {
  id: string;
  name: string;
  brand: string;
  description: string;
  image_url: string;
  concentration: string;
  top_notes: string[];
  heart_notes: string[];
  base_notes: string[];
  variants: any[];
  rating?: number;
  created_at: string;
  updated_at: string;
}

export default function PerfumesAdmin() {
  const [womenPerfumes, setWomenPerfumes] = useState<Perfume[]>([]);
  const [menPerfumes, setMenPerfumes] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingPerfume, setEditingPerfume] = useState<Perfume | null>(null);
  const [activeTab, setActiveTab] = useState<'women' | 'men'>('women');

  useEffect(() => {
    fetchPerfumes();
  }, []);

  const fetchPerfumes = async () => {
    try {
      setLoading(true);
      setError(null);

      const [womenResponse, menResponse] = await Promise.all([
        fetch('/api/women-perfumes'),
        fetch('/api/men-perfumes')
      ]);

      if (!womenResponse.ok || !menResponse.ok) {
        throw new Error('Failed to fetch perfumes');
      }

      const womenData = await womenResponse.json();
      const menData = await menResponse.json();

      setWomenPerfumes(womenData);
      setMenPerfumes(menData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, type: 'women' | 'men') => {
    if (!confirm('Are you sure you want to delete this perfume?')) {
      return;
    }

    try {
      const endpoint = type === 'women' ? '/api/women-perfumes' : '/api/men-perfumes';
      const response = await fetch(`${endpoint}?id=${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete perfume');
      }

      // Refresh the list
      await fetchPerfumes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete perfume');
    }
  };

  const handleEdit = (perfume: Perfume) => {
    setEditingPerfume(perfume);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingPerfume(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingPerfume(null);
    fetchPerfumes(); // Refresh the list
  };

  const currentPerfumes = activeTab === 'women' ? womenPerfumes : menPerfumes;

  if (loading) {
    return (
      <div className="container mx-auto p-3 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Админ Панел</h1>
        <div className="text-center text-sm sm:text-base">Зареждане на парфюми...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-3 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Админ Панел</h1>
        <div className="text-red-600 text-sm sm:text-base">Грешка: {error}</div>
        <Button onClick={fetchPerfumes} className="mt-3 sm:mt-4 text-sm sm:text-base">
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
          <h1 className="text-xl sm:text-2xl font-bold">Парфюми</h1>
          <Link href="/admin/orders">
            <Button variant="outline" size="sm" className="text-xs sm:text-sm">
              <Package className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Поръчки
            </Button>
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button onClick={fetchPerfumes} variant="outline" className="text-sm sm:text-base h-9 sm:h-10">
            <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            Обнови
          </Button>
          <Button onClick={handleAddNew} className="text-sm sm:text-base h-9 sm:h-10">
            <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            Добави Парфюм
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'women' | 'men')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="women" className="text-xs sm:text-sm">Женски ({womenPerfumes.length})</TabsTrigger>
          <TabsTrigger value="men" className="text-xs sm:text-sm">Мъжки ({menPerfumes.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="women" className="mt-4 sm:mt-6">
          <PerfumeGrid 
            perfumes={womenPerfumes} 
            type="women"
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </TabsContent>

        <TabsContent value="men" className="mt-4 sm:mt-6">
          <PerfumeGrid 
            perfumes={menPerfumes} 
            type="men"
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </TabsContent>
      </Tabs>

      {showForm && (
        <PerfumeForm
          perfume={editingPerfume}
          type={activeTab}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}

interface PerfumeGridProps {
  perfumes: Perfume[];
  type: 'women' | 'men';
  onEdit: (perfume: Perfume) => void;
  onDelete: (id: string, type: 'women' | 'men') => void;
}

function PerfumeGrid({ perfumes, type, onEdit, onDelete }: PerfumeGridProps) {
  if (perfumes.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-6 sm:py-8">
          <p className="text-gray-500 text-sm sm:text-base">
            Няма {type === 'women' ? 'женски' : 'мъжки'} парфюми. Добавете някои за да започнете!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {perfumes.map((perfume) => (
        <Card key={perfume.id} className="group">
          <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
            <div className="flex justify-between items-start">
              <div className="min-w-0 flex-1">
                <CardTitle className="text-sm sm:text-lg truncate">{perfume.name}</CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground truncate">{perfume.brand}</p>
              </div>
              <div className="flex gap-1 ml-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(perfume)}
                  className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity h-7 w-7 sm:h-8 sm:w-8 p-0"
                >
                  <Edit className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDelete(perfume.id, type)}
                  className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700 h-7 w-7 sm:h-8 sm:w-8 p-0"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="space-y-2">
              <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                <Badge variant="secondary" className="text-xs">{perfume.concentration}</Badge>
                {perfume.rating && (
                  <Badge variant="outline" className="text-xs">⭐ {perfume.rating}</Badge>
                )}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                {perfume.description}
              </p>
              <div className="text-xs sm:text-sm text-muted-foreground">
                <p><strong>Варианти:</strong> {perfume.variants.length}</p>
                <p><strong>Създаден:</strong> {new Date(perfume.created_at).toLocaleDateString('bg-BG')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
