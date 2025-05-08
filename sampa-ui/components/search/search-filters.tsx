"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/lib/i18n/language-context"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Filter, Star } from "lucide-react"

interface SearchFiltersProps {
  filters: {
    petType: string
    priceRange: number[]
    rating: number
    amenities: string[]
  }
  setFilters: React.Dispatch<
    React.SetStateAction<{
      petType: string
      priceRange: number[]
      rating: number
      amenities: string[]
    }>
  >
}

export default function SearchFilters({ filters, setFilters }: SearchFiltersProps) {
  const { t } = useLanguage()
  const [tempFilters, setTempFilters] = useState(filters)

  // Lista de tipos de mascotas
  const petTypes = [
    { value: "all", label: t("search.filters.allPets") || "Todas las mascotas" },
    { value: "Perros", label: t("search.filters.dogs") || "Perros" },
    { value: "Perros pequeños", label: t("search.filters.smallDogs") || "Perros pequeños" },
    { value: "Gatos", label: t("search.filters.cats") || "Gatos" },
    { value: "Aves", label: t("search.filters.birds") || "Aves" },
    { value: "Roedores", label: t("search.filters.rodents") || "Roedores" },
  ]

  // Lista de amenidades
  const amenitiesList = [
    { id: "garden", label: t("search.filters.garden") || "Jardín" },
    { id: "fenced", label: t("search.filters.fenced") || "Cercado" },
    { id: "toys", label: t("search.filters.toys") || "Juguetes" },
    { id: "climate", label: t("search.filters.climate") || "Climatizado" },
    { id: "beds", label: t("search.filters.beds") || "Camas para mascotas" },
    { id: "24h", label: t("search.filters.24h") || "Cuidado 24h" },
    { id: "training", label: t("search.filters.training") || "Entrenamiento" },
    { id: "walks", label: t("search.filters.walks") || "Paseos" },
  ]

  // Opciones de calificación
  const ratingOptions = [
    { value: 0, label: t("search.filters.anyRating") || "Cualquier calificación" },
    { value: 3, label: "3+" },
    { value: 4, label: "4+" },
    { value: 4.5, label: "4.5+" },
  ]

  // Manejar cambio de tipo de mascota
  const handlePetTypeChange = (value: string) => {
    setTempFilters((prev) => ({ ...prev, petType: value }))
  }

  // Manejar cambio de rango de precio
  const handlePriceChange = (value: number[]) => {
    setTempFilters((prev) => ({ ...prev, priceRange: value }))
  }

  // Manejar cambio de calificación
  const handleRatingChange = (value: string) => {
    setTempFilters((prev) => ({ ...prev, rating: Number.parseFloat(value) }))
  }

  // Manejar cambio de amenidades
  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setTempFilters((prev) => {
      if (checked) {
        return { ...prev, amenities: [...prev.amenities, amenity] }
      } else {
        return { ...prev, amenities: prev.amenities.filter((a) => a !== amenity) }
      }
    })
  }

  // Aplicar filtros
  const applyFilters = () => {
    setFilters(tempFilters)
  }

  // Resetear filtros
  const resetFilters = () => {
    const defaultFilters = {
      petType: "all",
      priceRange: [0, 5000],
      rating: 0,
      amenities: [] as string[],
    }
    setTempFilters(defaultFilters)
    setFilters(defaultFilters)
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Filtros para pantallas medianas y grandes */}
        <div className="hidden md:flex items-center gap-4 flex-wrap">
          <div className="w-48">
            <Select value={filters.petType} onValueChange={handlePetTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder={t("search.filters.petType") || "Tipo de mascota"} />
              </SelectTrigger>
              <SelectContent>
                {petTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-48">
            <Select value={filters.rating.toString()} onValueChange={handleRatingChange}>
              <SelectTrigger>
                <SelectValue placeholder={t("search.filters.rating") || "Calificación"} />
              </SelectTrigger>
              <SelectContent>
                {ratingOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-64 px-2">
            <Label className="text-xs text-gray-500 mb-1 block">
              {t("search.filters.priceRange") || "Rango de precio"}: ${filters.priceRange[0]} - ${filters.priceRange[1]}
            </Label>
            <Slider
              defaultValue={filters.priceRange}
              min={0}
              max={5000}
              step={100}
              onValueChange={handlePriceChange}
              className="my-2"
            />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter size={16} />
                {t("search.filters.moreFilters") || "Más filtros"}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{t("search.filters.moreFilters") || "Más filtros"}</SheetTitle>
                <SheetDescription>
                  {t("search.filters.selectAmenities") || "Selecciona las amenidades que necesitas"}
                </SheetDescription>
              </SheetHeader>

              <div className="grid gap-4 py-4">
                <div className="space-y-4">
                  <h3 className="font-medium">{t("search.filters.amenities") || "Amenidades"}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {amenitiesList.map((amenity) => (
                      <div key={amenity.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`amenity-${amenity.id}`}
                          checked={tempFilters.amenities.includes(amenity.label)}
                          onCheckedChange={(checked) => handleAmenityChange(amenity.label, checked === true)}
                        />
                        <Label htmlFor={`amenity-${amenity.id}`}>{amenity.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline" onClick={resetFilters}>
                    {t("search.filters.reset") || "Resetear"}
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button onClick={applyFilters}>{t("search.filters.apply") || "Aplicar"}</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* Botón de filtros para móviles */}
        <div className="md:hidden w-full">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <Filter size={16} />
                {t("search.filters.filters") || "Filtros"}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{t("search.filters.filters") || "Filtros"}</SheetTitle>
              </SheetHeader>

              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="mobile-pet-type">{t("search.filters.petType") || "Tipo de mascota"}</Label>
                  <Select value={tempFilters.petType} onValueChange={handlePetTypeChange}>
                    <SelectTrigger id="mobile-pet-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {petTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile-rating">{t("search.filters.rating") || "Calificación"}</Label>
                  <Select value={tempFilters.rating.toString()} onValueChange={handleRatingChange}>
                    <SelectTrigger id="mobile-rating">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ratingOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value.toString()}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>
                    {t("search.filters.priceRange") || "Rango de precio"}: ${tempFilters.priceRange[0]} - $
                    {tempFilters.priceRange[1]}
                  </Label>
                  <Slider
                    value={tempFilters.priceRange}
                    min={0}
                    max={5000}
                    step={100}
                    onValueChange={handlePriceChange}
                    className="my-2"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">{t("search.filters.amenities") || "Amenidades"}</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {amenitiesList.map((amenity) => (
                      <div key={amenity.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`mobile-amenity-${amenity.id}`}
                          checked={tempFilters.amenities.includes(amenity.label)}
                          onCheckedChange={(checked) => handleAmenityChange(amenity.label, checked === true)}
                        />
                        <Label htmlFor={`mobile-amenity-${amenity.id}`}>{amenity.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline" onClick={resetFilters}>
                    {t("search.filters.reset") || "Resetear"}
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button onClick={applyFilters}>{t("search.filters.apply") || "Aplicar"}</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* Botón para resetear filtros en pantallas medianas y grandes */}
        <div className="hidden md:block">
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            {t("search.filters.resetAll") || "Resetear todo"}
          </Button>
        </div>
      </div>

      {/* Chips de filtros activos */}
      {(filters.petType !== "all" ||
        filters.rating > 0 ||
        filters.amenities.length > 0 ||
        filters.priceRange[0] > 0 ||
        filters.priceRange[1] < 5000) && (
        <div className="flex flex-wrap gap-2 mt-4">
          {filters.petType !== "all" && (
            <div className="bg-gray-100 text-gray-800 text-xs rounded-full px-3 py-1 flex items-center">
              {petTypes.find((t) => t.value === filters.petType)?.label}
              <button
                className="ml-2 text-gray-500 hover:text-gray-700"
                onClick={() => setFilters((prev) => ({ ...prev, petType: "all" }))}
              >
                ×
              </button>
            </div>
          )}

          {filters.rating > 0 && (
            <div className="bg-gray-100 text-gray-800 text-xs rounded-full px-3 py-1 flex items-center">
              <Star size={12} className="mr-1 text-yellow-500" />
              {filters.rating}+
              <button
                className="ml-2 text-gray-500 hover:text-gray-700"
                onClick={() => setFilters((prev) => ({ ...prev, rating: 0 }))}
              >
                ×
              </button>
            </div>
          )}

          {(filters.priceRange[0] > 0 || filters.priceRange[1] < 5000) && (
            <div className="bg-gray-100 text-gray-800 text-xs rounded-full px-3 py-1 flex items-center">
              ${filters.priceRange[0]} - ${filters.priceRange[1]}
              <button
                className="ml-2 text-gray-500 hover:text-gray-700"
                onClick={() => setFilters((prev) => ({ ...prev, priceRange: [0, 5000] }))}
              >
                ×
              </button>
            </div>
          )}

          {filters.amenities.map((amenity) => (
            <div key={amenity} className="bg-gray-100 text-gray-800 text-xs rounded-full px-3 py-1 flex items-center">
              {amenity}
              <button
                className="ml-2 text-gray-500 hover:text-gray-700"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    amenities: prev.amenities.filter((a) => a !== amenity),
                  }))
                }
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
