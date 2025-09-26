'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, RefreshCw } from 'lucide-react';
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
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Perfumes Admin</h1>
        <div className="text-center">Loading perfumes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Perfumes Admin</h1>
        <div className="text-red-600">Error: {error}</div>
        <Button onClick={fetchPerfumes} className="mt-4">
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Perfumes Admin</h1>
        <div className="flex gap-2">
          <Button onClick={fetchPerfumes} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            Add Perfume
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'women' | 'men')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="women">Women's Perfumes ({womenPerfumes.length})</TabsTrigger>
          <TabsTrigger value="men">Men's Perfumes ({menPerfumes.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="women" className="mt-6">
          <PerfumeGrid 
            perfumes={womenPerfumes} 
            type="women"
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </TabsContent>

        <TabsContent value="men" className="mt-6">
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
        <CardContent className="text-center py-8">
          <p className="text-gray-500">No {type} perfumes found. Add some to get started!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {perfumes.map((perfume) => (
        <Card key={perfume.id} className="group">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{perfume.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{perfume.brand}</p>
              </div>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(perfume)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Edit className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDelete(perfume.id, type)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{perfume.concentration}</Badge>
                {perfume.rating && (
                  <Badge variant="outline">⭐ {perfume.rating}</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {perfume.description}
              </p>
              <div className="text-sm">
                <p><strong>Variants:</strong> {perfume.variants.length}</p>
                <p><strong>Created:</strong> {new Date(perfume.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
