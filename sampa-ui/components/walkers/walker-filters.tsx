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

interface WalkerFiltersProps {
  filters: {
    priceRange: number[]
    rating: number
    services: string[]
    availability: string
    experience: number
  }
  setFilters: React.Dispatch<
    React.SetStateAction<{
      priceRange: number[]
      rating: number
      services: string[]
      availability: string
      experience: number
    }>
  >
}

export default function WalkerFilters({ filters, setFilters }: WalkerFiltersProps) {
  const { t } = useLanguage()
  const [tempFilters, setTempFilters] = useState(filters)

  // Lista de servicios disponibles
  const availableServices = [
    { id: "individual", label: t("walkers.filters.individualWalks") || "Paseos individuales" },
    { id: "group", label: t("walkers.filters.groupWalks") || "Paseos grupales" },
    { id: "training", label: t("walkers.filters.training") || "Entrenamiento" },
    { id: "overnight", label: t("walkers.filters.overnight") || "Cuidado nocturno" },
    { id: "home", label: t("walkers.filters.homeVisits") || "Visitas a domicilio" },
    { id: "feeding", label: t("walkers.filters.feeding") || "Alimentación" },
    { id: "transport", label: t("walkers.filters.transport") || "Transporte" },
    { id: "emergency", label: t("walkers.filters.emergency") || "Emergencias" },
  ]

  // Opciones de calificación
  const ratingOptions = [
    { value: 0, label: t("walkers.filters.anyRating") || "Cualquier calificación" },
    { value: 3, label: "3+" },
    { value: 4, label: "4+" },
    { value: 4.5, label: "4.5+" },
  ]

  // Opciones de disponibilidad
  const availabilityOptions = [
    { value: "all", label: t("walkers.filters.allWalkers") || "Todos los paseadores" },
    { value: "available", label: t("walkers.filters.availableNow") || "Disponibles ahora" },
  ]

  // Manejar cambio de rango de precio
  const handlePriceChange = (value: number[]) => {
    setTempFilters((prev) => ({ ...prev, priceRange: value }))
  }

  // Manejar cambio de calificación
  const handleRatingChange = (value: string) => {
    setTempFilters((prev) => ({ ...prev, rating: Number.parseFloat(value) }))
  }

  // Manejar cambio de disponibilidad
  const handleAvailabilityChange = (value: string) => {
    setTempFilters((prev) => ({ ...prev, availability: value }))
  }

  // Manejar cambio de experiencia
  const handleExperienceChange = (value: number[]) => {
    setTempFilters((prev) => ({ ...prev, experience: value[0] }))
  }

  // Manejar cambio de servicios
  const handleServiceChange = (service: string, checked: boolean) => {
    setTempFilters((prev) => {
      if (checked) {
        return { ...prev, services: [...prev.services, service] }
      } else {
        return { ...prev, services: prev.services.filter((s) => s !== service) }
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
      priceRange: [0, 2000],
      rating: 0,
      services: [] as string[],
      availability: "all",
      experience: 0,
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
            <Select value={filters.availability} onValueChange={handleAvailabilityChange}>
              <SelectTrigger>
                <SelectValue placeholder={t("walkers.filters.availability") || "Disponibilidad"} />
              </SelectTrigger>
              <SelectContent>
                {availabilityOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-48">
            <Select value={filters.rating.toString()} onValueChange={handleRatingChange}>
              <SelectTrigger>
                <SelectValue placeholder={t("walkers.filters.rating") || "Calificación"} />
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
              {t("walkers.filters.priceRange") || "Precio por paseo"}: ${filters.priceRange[0]} - $
              {filters.priceRange[1]}
            </Label>
            <Slider
              defaultValue={filters.priceRange}
              min={0}
              max={2000}
              step={50}
              onValueChange={handlePriceChange}
              className="my-2"
            />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter size={16} />
                {t("walkers.filters.moreFilters") || "Más filtros"}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{t("walkers.filters.moreFilters") || "Más filtros"}</SheetTitle>
                <SheetDescription>
                  {t("walkers.filters.selectServices") || "Selecciona los servicios que necesitas"}
                </SheetDescription>
              </SheetHeader>

              <div className="grid gap-4 py-4">
                <div className="space-y-4">
                  <h3 className="font-medium">{t("walkers.filters.services") || "Servicios"}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {availableServices.map((service) => (
                      <div key={service.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`service-${service.id}`}
                          checked={tempFilters.services.includes(service.label)}
                          onCheckedChange={(checked) => handleServiceChange(service.label, checked === true)}
                        />
                        <Label htmlFor={`service-${service.id}`}>{service.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">{t("walkers.filters.experience") || "Experiencia mínima"}</h3>
                  <div className="px-2">
                    <Label className="text-xs text-gray-500 mb-1 block">
                      {tempFilters.experience} {tempFilters.experience === 1 ? "año" : "años"}
                    </Label>
                    <Slider
                      value={[tempFilters.experience]}
                      min={0}
                      max={10}
                      step={1}
                      onValueChange={handleExperienceChange}
                      className="my-2"
                    />
                  </div>
                </div>
              </div>

              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline" onClick={resetFilters}>
                    {t("walkers.filters.reset") || "Resetear"}
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button onClick={applyFilters}>{t("walkers.filters.apply") || "Aplicar"}</Button>
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
                {t("walkers.filters.filters") || "Filtros"}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{t("walkers.filters.filters") || "Filtros"}</SheetTitle>
              </SheetHeader>

              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="mobile-availability">{t("walkers.filters.availability") || "Disponibilidad"}</Label>
                  <Select value={tempFilters.availability} onValueChange={handleAvailabilityChange}>
                    <SelectTrigger id="mobile-availability">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {availabilityOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile-rating">{t("walkers.filters.rating") || "Calificación"}</Label>
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
                    {t("walkers.filters.priceRange") || "Precio por paseo"}: ${tempFilters.priceRange[0]} - $
                    {tempFilters.priceRange[1]}
                  </Label>
                  <Slider
                    value={tempFilters.priceRange}
                    min={0}
                    max={2000}
                    step={50}
                    onValueChange={handlePriceChange}
                    className="my-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label>
                    {t("walkers.filters.experience") || "Experiencia mínima"}: {tempFilters.experience}{" "}
                    {tempFilters.experience === 1 ? "año" : "años"}
                  </Label>
                  <Slider
                    value={[tempFilters.experience]}
                    min={0}
                    max={10}
                    step={1}
                    onValueChange={handleExperienceChange}
                    className="my-2"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">{t("walkers.filters.services") || "Servicios"}</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {availableServices.map((service) => (
                      <div key={service.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`mobile-service-${service.id}`}
                          checked={tempFilters.services.includes(service.label)}
                          onCheckedChange={(checked) => handleServiceChange(service.label, checked === true)}
                        />
                        <Label htmlFor={`mobile-service-${service.id}`}>{service.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline" onClick={resetFilters}>
                    {t("walkers.filters.reset") || "Resetear"}
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button onClick={applyFilters}>{t("walkers.filters.apply") || "Aplicar"}</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* Botón para resetear filtros en pantallas medianas y grandes */}
        <div className="hidden md:block">
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            {t("walkers.filters.resetAll") || "Resetear todo"}
          </Button>
        </div>
      </div>

      {/* Chips de filtros activos */}
      {(filters.rating > 0 ||
        filters.services.length > 0 ||
        filters.availability !== "all" ||
        filters.experience > 0 ||
        filters.priceRange[0] > 0 ||
        filters.priceRange[1] < 2000) && (
        <div className="flex flex-wrap gap-2 mt-4">
          {filters.availability !== "all" && (
            <div className="bg-gray-100 text-gray-800 text-xs rounded-full px-3 py-1 flex items-center">
              {availabilityOptions.find((a) => a.value === filters.availability)?.label}
              <button
                className="ml-2 text-gray-500 hover:text-gray-700"
                onClick={() => setFilters((prev) => ({ ...prev, availability: "all" }))}
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

          {filters.experience > 0 && (
            <div className="bg-gray-100 text-gray-800 text-xs rounded-full px-3 py-1 flex items-center">
              {filters.experience}+ años experiencia
              <button
                className="ml-2 text-gray-500 hover:text-gray-700"
                onClick={() => setFilters((prev) => ({ ...prev, experience: 0 }))}
              >
                ×
              </button>
            </div>
          )}

          {(filters.priceRange[0] > 0 || filters.priceRange[1] < 2000) && (
            <div className="bg-gray-100 text-gray-800 text-xs rounded-full px-3 py-1 flex items-center">
              ${filters.priceRange[0]} - ${filters.priceRange[1]}
              <button
                className="ml-2 text-gray-500 hover:text-gray-700"
                onClick={() => setFilters((prev) => ({ ...prev, priceRange: [0, 2000] }))}
              >
                ×
              </button>
            </div>
          )}

          {filters.services.map((service) => (
            <div key={service} className="bg-gray-100 text-gray-800 text-xs rounded-full px-3 py-1 flex items-center">
              {service}
              <button
                className="ml-2 text-gray-500 hover:text-gray-700"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    services: prev.services.filter((s) => s !== service),
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
