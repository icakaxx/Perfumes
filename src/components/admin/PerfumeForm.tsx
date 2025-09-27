'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus, Trash2 } from 'lucide-react';

interface Perfume {
  id?: string;
  name: string;
  brand: string;
  description: string;
  image_url: string; // Keep for backward compatibility
  image_urls?: string[]; // New field for multiple images
  concentration: string;
  top_notes: string[];
  heart_notes: string[];
  base_notes: string[];
  variants: {
    id: string;
    volumeMl: number;
    price: number;
    inStock: boolean;
  }[];
  rating?: number;
}

interface PerfumeFormProps {
  perfume?: Perfume | null;
  type: 'women' | 'men' | 'gift-sets';
  onClose: () => void;
}

const CONCENTRATIONS = ['EDT', 'EDP', 'PARFUM', 'EDC'];
const COMMON_NOTES = [
  'Bergamot', 'Lemon', 'Orange', 'Grapefruit', 'Lavender', 'Rose', 'Jasmine',
  'Sandalwood', 'Vanilla', 'Musk', 'Cedar', 'Patchouli', 'Amber', 'Tonka Bean',
  'Black Pepper', 'Cardamom', 'Cinnamon', 'Ginger', 'Vetiver', 'Oakmoss'
];

export function PerfumeForm({ perfume, type, onClose }: PerfumeFormProps) {
  const [formData, setFormData] = useState<Perfume>({
    name: '',
    brand: '',
    description: '',
    image_url: '',
    image_urls: [],
    concentration: 'EDT',
    top_notes: [],
    heart_notes: [],
    base_notes: [],
    variants: [{ id: '', volumeMl: 50, price: 0, inStock: true }],
    rating: undefined
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (perfume) {
      setFormData(perfume);
    }
  }, [perfume]);

  const handleInputChange = useCallback((field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleTextInputChange = useCallback((field: string) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };
  }, []);

  const handleNoteAdd = useCallback((type: 'top_notes' | 'heart_notes' | 'base_notes', note: string) => {
    if (note.trim() && !formData[type].includes(note.trim())) {
      setFormData(prev => ({
        ...prev,
        [type]: [...prev[type], note.trim()]
      }));
    }
  }, [formData]);

  const handleNoteRemove = useCallback((type: 'top_notes' | 'heart_notes' | 'base_notes', note: string) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter(n => n !== note)
    }));
  }, []);

  const handleVariantAdd = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, { id: '', volumeMl: 50, price: 0, inStock: true }]
    }));
  }, []);

  const handleVariantRemove = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  }, []);

  const handleVariantChange = useCallback((index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.map((variant, i) => 
        i === index ? { ...variant, [field]: value } : variant
      )
    }));
  }, []);

  const handleVariantInputChange = useCallback((index: number, field: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = field === 'volumeMl' ? parseInt(e.target.value) || 0 : 
                    field === 'price' ? parseFloat(e.target.value) || 0 : 
                    e.target.value;
      handleVariantChange(index, field, value);
    };
  }, [handleVariantChange]);

  const handleImageAdd = useCallback((url: string) => {
    if (url.trim() && !formData.image_urls?.includes(url.trim())) {
      setFormData(prev => ({
        ...prev,
        image_urls: [...(prev.image_urls || []), url.trim()]
      }));
    }
  }, [formData.image_urls]);

  const handleImageRemove = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      image_urls: prev.image_urls?.filter((_, i) => i !== index) || []
    }));
  }, []);

  const handleImageReorder = useCallback((fromIndex: number, toIndex: number) => {
    setFormData(prev => {
      const newImages = [...(prev.image_urls || [])];
      const [removed] = newImages.splice(fromIndex, 1);
      newImages.splice(toIndex, 0, removed);
      return {
        ...prev,
        image_urls: newImages
      };
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const endpoint = type === 'women' ? '/api/women-perfumes' : 
                      type === 'men' ? '/api/men-perfumes' : '/api/gift-sets';
      const method = perfume ? 'PUT' : 'POST';
      
      const payload = perfume 
        ? { id: perfume.id, ...formData }
        : formData;

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save perfume');
      }

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save perfume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <CardHeader className="sticky top-0 bg-white z-10 border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg sm:text-xl">
              {perfume ? 
                (type === 'gift-sets' ? 'Редактиране на комплект' : 'Редактиране на парфюм') : 
                (type === 'gift-sets' ? 'Добавяне на нов комплект' : 'Добавяне на нов парфюм')
              }
            </CardTitle>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded text-sm">
                {error}
              </div>
            )}

            {/* Basic Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <Label htmlFor="name" className="text-sm sm:text-base">Име *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleTextInputChange('name')}
                  placeholder="Име на парфюма"
                  className="text-sm sm:text-base"
                  required
                />
              </div>
              <div>
                <Label htmlFor="brand" className="text-sm sm:text-base">Марка *</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={handleTextInputChange('brand')}
                  placeholder="Марка"
                  className="text-sm sm:text-base"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-sm sm:text-base">Описание *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={handleTextInputChange('description')}
                rows={3}
                placeholder="Описание на парфюма"
                className="text-sm sm:text-base"
                required
              />
            </div>

            {/* Multiple Images Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <Label>Product Images *</Label>
                <Button 
                  type="button" 
                  onClick={() => {
                    const url = prompt('Enter image URL:');
                    if (url) handleImageAdd(url);
                  }} 
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Image
                </Button>
              </div>
              
              {/* Image URLs List */}
              <div className="space-y-2">
                {(formData.image_urls || []).map((url, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 border rounded">
                    <div className="flex-1">
                      <Input
                        value={url}
                        onChange={(e) => {
                          const newUrls = [...(formData.image_urls || [])];
                          newUrls[index] = e.target.value;
                          setFormData(prev => ({ ...prev, image_urls: newUrls }));
                        }}
                        placeholder="Image URL"
                      />
                    </div>
                    <div className="flex gap-1">
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleImageReorder(index, index - 1)}
                        >
                          ↑
                        </Button>
                      )}
                      {index < (formData.image_urls?.length || 0) - 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleImageReorder(index, index + 1)}
                        >
                          ↓
                        </Button>
                      )}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleImageRemove(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Legacy single image URL for backward compatibility */}
              <div className="mt-4">
                <Label htmlFor="image_url">Primary Image URL (Legacy)</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={handleTextInputChange('image_url')}
                  placeholder="Primary image URL (for backward compatibility)"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="concentration">Concentration *</Label>
              <Select value={formData.concentration} onValueChange={(value) => handleInputChange('concentration', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CONCENTRATIONS.map(conc => (
                    <SelectItem key={conc} value={conc}>{conc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="rating">Rating (optional)</Label>
              <Input
                id="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  handleInputChange('rating', value ? parseFloat(value) : undefined);
                }}
              />
            </div>

            {/* Notes */}
            {(['top_notes', 'heart_notes', 'base_notes'] as const).map((noteType) => (
              <div key={noteType}>
                <Label>{noteType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData[noteType].map((note) => (
                    <span
                      key={note}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center gap-1"
                    >
                      {note}
                      <button
                        type="button"
                        onClick={() => handleNoteRemove(noteType, note)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Add note..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleNoteAdd(noteType, e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <Select onValueChange={(value) => handleNoteAdd(noteType, value)}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Common notes" />
                    </SelectTrigger>
                    <SelectContent>
                      {COMMON_NOTES.map(note => (
                        <SelectItem key={note} value={note}>{note}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}

            {/* Variants */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <Label>Variants *</Label>
                <Button type="button" onClick={handleVariantAdd} size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Variant
                </Button>
              </div>
              <div className="space-y-3">
                {formData.variants.map((variant, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 items-end">
                    <div>
                      <Label>Volume (ml)</Label>
                      <Input
                        type="number"
                        value={variant.volumeMl}
                        onChange={handleVariantInputChange(index, 'volumeMl')}
                        required
                      />
                    </div>
                    <div>
                      <Label>Price</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={variant.price}
                        onChange={handleVariantInputChange(index, 'price')}
                        required
                      />
                    </div>
                    <div>
                      <Label>In Stock</Label>
                      <Select
                        value={variant.inStock ? 'true' : 'false'}
                        onValueChange={(value) => handleVariantChange(index, 'inStock', value === 'true')}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Yes</SelectItem>
                          <SelectItem value="false">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleVariantRemove(index)}
                        disabled={formData.variants.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : (perfume ? 'Update' : 'Add')} {type === 'gift-sets' ? 'Gift Set' : 'Perfume'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
