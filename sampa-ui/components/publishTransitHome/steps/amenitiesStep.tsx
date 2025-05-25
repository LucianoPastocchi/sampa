"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/lib/i18n/language-context"

interface AmenitiesStepProps {
  data: string[]
  updateData: (amenities: string[]) => void
}

export default function AmenitiesStep({ data, updateData }: AmenitiesStepProps) {
  const { t } = useLanguage()
  const [customAmenity, setCustomAmenity] = useState("")

  const commonAmenities = [
    { id: "garden", label: t("publish.amenities.garden") || "Jardín" },
    { id: "fenced", label: t("publish.amenities.fenced") || "Área cercada" },
    { id: "toys", label: t("publish.amenities.toys") || "Juguetes para mascotas" },
    { id: "beds", label: t("publish.amenities.beds") || "Camas para mascotas" },
    { id: "climate", label: t("publish.amenities.climate") || "Climatización" },
    { id: "water", label: t("publish.amenities.water") || "Bebederos siempre disponibles" },
    { id: "firstAid", label: t("publish.amenities.firstAid") || "Kit de primeros auxilios" },
    { id: "camera", label: t("publish.amenities.camera") || "Cámara para monitoreo" },
    { id: "walks", label: t("publish.amenities.walks") || "Área para paseos" },
    { id: "training", label: t("publish.amenities.training") || "Área de entrenamiento" },
    { id: "grooming", label: t("publish.amenities.grooming") || "Elementos de aseo" },
    { id: "transport", label: t("publish.amenities.transport") || "Servicio de transporte" },
  ]

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      updateData([...data, amenity])
    } else {
      updateData(data.filter((a) => a !== amenity))
    }
  }

  const addCustomAmenity = () => {
    if (customAmenity.trim() && !data.includes(customAmenity.trim())) {
      updateData([...data, customAmenity.trim()])
      setCustomAmenity("")
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium">{t("publish.amenities.title") || "¿Qué ofreces a las mascotas?"}</h3>
        <p className="text-sm text-gray-500">
          {t("publish.amenities.description") ||
            "Selecciona todas las comodidades que ofrece tu espacio para las mascotas."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {commonAmenities.map((amenity) => (
          <div key={amenity.id} className="flex items-center space-x-2">
            <Checkbox
              id={amenity.id}
              checked={data.includes(amenity.label)}
              onCheckedChange={(checked) => handleAmenityChange(amenity.label, checked === true)}
            />
            <Label htmlFor={amenity.id} className="cursor-pointer">
              {amenity.label}
            </Label>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t">
        <h3 className="font-medium mb-3">{t("publish.amenities.custom") || "Añadir comodidad personalizada"}</h3>

        <div className="flex space-x-2">
          <Input
            placeholder={t("publish.amenities.customPlaceholder") || "Ej: Piscina para perros"}
            value={customAmenity}
            onChange={(e) => setCustomAmenity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addCustomAmenity()
              }
            }}
          />
          <Button type="button" onClick={addCustomAmenity} className="flex-shrink-0">
            <Plus size={16} className="mr-1" />
            {t("publish.amenities.add") || "Añadir"}
          </Button>
        </div>
      </div>

      {data.filter((a) => !commonAmenities.some((ca) => ca.label === a)).length > 0 && (
        <div className="pt-2">
          <h4 className="text-sm font-medium mb-2">
            {t("publish.amenities.customAdded") || "Comodidades personalizadas añadidas:"}
          </h4>
          <div className="flex flex-wrap gap-2">
            {data
              .filter((a) => !commonAmenities.some((ca) => ca.label === a))
              .map((amenity, index) => (
                <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center text-sm">
                  {amenity}
                  <button
                    type="button"
                    onClick={() => handleAmenityChange(amenity, false)}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
