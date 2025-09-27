"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { X } from "lucide-react";

export interface FilterState {
  priceRange: [number, number];
  concentrations: string[];
  genderProfiles: string[];
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  inStockOnly: boolean;
  sortBy: string;
}

interface FiltersSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  allNotes: {
    top: string[];
    heart: string[];
    base: string[];
  };
}

export function FiltersSheet({ 
  open, 
  onOpenChange, 
  filters, 
  onFiltersChange, 
  allNotes 
}: FiltersSheetProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  const concentrations = ["EDT", "EDP", "PARFUM"];
  const genderProfiles = ["Feminine", "Masculine", "Unisex"];
  const sortOptions = [
    { value: "featured", label: "Препоръчани" },
    { value: "price-asc", label: "Цена: Ниска към Висока" },
    { value: "price-desc", label: "Цена: Висока към Ниска" },
    { value: "rating", label: "Най-високо оценени" },
  ];

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = <K extends keyof FilterState>(
    key: K,
    value: string
  ) => {
    const currentArray = localFilters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray as FilterState[K]);
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    onOpenChange(false);
  };

  const resetFilters = () => {
    const defaultFilters: FilterState = {
      priceRange: [0, 1000],
      concentrations: [],
      genderProfiles: [],
      topNotes: [],
      heartNotes: [],
      baseNotes: [],
      inStockOnly: false,
      sortBy: "featured"
    };
    setLocalFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Филтри</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 mt-6">
          {/* Sort By */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Сортиране</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {sortOptions.map(option => (
                <label key={option.value} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="sortBy"
                    value={option.value}
                    checked={localFilters.sortBy === option.value}
                    onChange={() => updateFilter("sortBy", option.value)}
                    className="rounded"
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </CardContent>
          </Card>

          {/* Price Range */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Ценови диапазон</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={localFilters.priceRange[0]}
                    onChange={(e) => updateFilter("priceRange", [
                      Number(e.target.value) || 0,
                      localFilters.priceRange[1]
                    ])}
                    className="flex-1 px-3 py-2 border rounded-md text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={localFilters.priceRange[1]}
                    onChange={(e) => updateFilter("priceRange", [
                      localFilters.priceRange[0],
                      Number(e.target.value) || 1000
                    ])}
                    className="flex-1 px-3 py-2 border rounded-md text-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Concentration */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Концентрация</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {concentrations.map(conc => (
                  <Badge
                    key={conc}
                    variant={localFilters.concentrations.includes(conc) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleArrayFilter("concentrations", conc)}
                  >
                    {conc}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Gender Profile */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Пол</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {genderProfiles.map(gender => (
                  <Badge
                    key={gender}
                    variant={localFilters.genderProfiles.includes(gender) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleArrayFilter("genderProfiles", gender)}
                  >
                    {gender}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Notes */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Горни ноти</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {allNotes.top.map(note => (
                  <Badge
                    key={note}
                    variant={localFilters.topNotes.includes(note) ? "default" : "outline"}
                    className="cursor-pointer text-xs"
                    onClick={() => toggleArrayFilter("topNotes", note)}
                  >
                    {note}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Heart Notes */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Средни ноти</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {allNotes.heart.map(note => (
                  <Badge
                    key={note}
                    variant={localFilters.heartNotes.includes(note) ? "default" : "outline"}
                    className="cursor-pointer text-xs"
                    onClick={() => toggleArrayFilter("heartNotes", note)}
                  >
                    {note}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Base Notes */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Основни ноти</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {allNotes.base.map(note => (
                  <Badge
                    key={note}
                    variant={localFilters.baseNotes.includes(note) ? "default" : "outline"}
                    className="cursor-pointer text-xs"
                    onClick={() => toggleArrayFilter("baseNotes", note)}
                  >
                    {note}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* In Stock Only */}
          <Card>
            <CardContent className="pt-6">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={localFilters.inStockOnly}
                  onChange={(e) => updateFilter("inStockOnly", e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Само в наличност</span>
              </label>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button onClick={resetFilters} variant="outline" className="flex-1">
              Нулирай
            </Button>
            <Button onClick={applyFilters} className="flex-1 bg-accent hover:bg-accent/90 text-white">
              Приложи филтрите
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

