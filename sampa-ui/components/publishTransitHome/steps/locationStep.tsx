"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

interface LocationData {
  address: string
  city: string
  state: string
  zipCode: string
  coordinates: {
    lat: number
    lng: number
  }
}

interface LocationStepProps {
  data: LocationData
  updateData: (data: Partial<LocationData>) => void
}

export default function LocationStep({ data, updateData }: LocationStepProps) {
  const { t } = useLanguage()
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: keyof LocationData, value: string) => {
    updateData({ [field]: value })

    // Validación básica
    if (field === "address" && !value) {
      setErrors({ ...errors, address: t("publish.errors.requiredField") || "Este campo es obligatorio" })
    } else if (field === "city" && !value) {
      setErrors({ ...errors, city: t("publish.errors.requiredField") || "Este campo es obligatorio" })
    } else if (field === "state" && !value) {
      setErrors({ ...errors, state: t("publish.errors.requiredField") || "Este campo es obligatorio" })
    } else if (field === "zipCode" && !value) {
      setErrors({ ...errors, zipCode: t("publish.errors.requiredField") || "Este campo es obligatorio" })
    } else {
      const newErrors = { ...errors }
      delete newErrors[field]
      setErrors(newErrors)
    }
  }

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          updateData({
            coordinates: {
              lat: latitude,
              lng: longitude,
            },
          })
          // En una implementación real, aquí se haría una llamada a una API de geocodificación inversa
          // para obtener la dirección a partir de las coordenadas
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="address">{t("publish.location.address") || "Dirección"} *</Label>
        <Input
          id="address"
          placeholder={t("publish.location.addressPlaceholder") || "Ej: Av. Corrientes 1234"}
          value={data.address}
          onChange={(e) => handleChange("address", e.target.value)}
        />
        {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">{t("publish.location.city") || "Ciudad"} *</Label>
          <Input
            id="city"
            placeholder={t("publish.location.cityPlaceholder") || "Ej: Buenos Aires"}
            value={data.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />
          {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">{t("publish.location.state") || "Provincia"} *</Label>
          <Input
            id="state"
            placeholder={t("publish.location.statePlaceholder") || "Ej: CABA"}
            value={data.state}
            onChange={(e) => handleChange("state", e.target.value)}
          />
          {errors.state && <p className="text-sm text-red-500">{errors.state}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="zipCode">{t("publish.location.zipCode") || "Código postal"} *</Label>
        <Input
          id="zipCode"
          placeholder={t("publish.location.zipCodePlaceholder") || "Ej: C1425"}
          value={data.zipCode}
          onChange={(e) => handleChange("zipCode", e.target.value)}
        />
        {errors.zipCode && <p className="text-sm text-red-500">{errors.zipCode}</p>}
      </div>

      <div className="pt-4">
        <Button type="button" variant="outline" onClick={handleGetCurrentLocation} className="flex items-center gap-2">
          <MapPin size={16} />
          {t("publish.location.useCurrentLocation") || "Usar mi ubicación actual"}
        </Button>

        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-500">
            {t("publish.location.privacyNote") ||
              "Tu dirección exacta no será visible públicamente hasta que confirmes una reserva."}
          </p>
        </div>
      </div>
    </div>
  )
}
