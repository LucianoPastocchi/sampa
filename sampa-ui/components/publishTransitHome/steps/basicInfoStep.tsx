"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useLanguage } from "@/lib/i18n/language-context"

interface BasicInfoData {
  title: string
  description: string
  type: string
  size: string
}

interface BasicInfoStepProps {
  data: BasicInfoData
  updateData: (data: Partial<BasicInfoData>) => void
}

export default function BasicInfoStep({ data, updateData }: BasicInfoStepProps) {
  const { t } = useLanguage()
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: keyof BasicInfoData, value: string) => {
    updateData({ [field]: value })

    // Validación básica
    if (field === "title" && value.length < 5) {
      setErrors({ ...errors, title: t("publish.errors.titleLength") || "El título debe tener al menos 5 caracteres" })
    } else if (field === "description" && value.length < 20) {
      setErrors({
        ...errors,
        description: t("publish.errors.descriptionLength") || "La descripción debe tener al menos 20 caracteres",
      })
    } else {
      const newErrors = { ...errors }
      delete newErrors[field]
      setErrors(newErrors)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">{t("publish.basicInfo.title") || "Título de tu anuncio"} *</Label>
        <Input
          id="title"
          placeholder={t("publish.basicInfo.titlePlaceholder") || "Ej: Acogedor hogar con jardín para mascotas"}
          value={data.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
        <p className="text-sm text-gray-500">
          {t("publish.basicInfo.titleHelp") || "Un buen título es claro y destaca las características principales"}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">{t("publish.basicInfo.description") || "Descripción"} *</Label>
        <Textarea
          id="description"
          placeholder={
            t("publish.basicInfo.descriptionPlaceholder") ||
            "Describe tu espacio, qué lo hace especial para las mascotas..."
          }
          value={data.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={5}
        />
        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
      </div>

      <div className="space-y-3">
        <Label>{t("publish.basicInfo.type") || "Tipo de espacio"} *</Label>
        <RadioGroup
          value={data.type}
          onValueChange={(value) => updateData({ type: value })}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer">
            <RadioGroupItem value="house" id="house" />
            <Label htmlFor="house" className="cursor-pointer">
              {t("publish.basicInfo.typeHouse") || "Casa"}
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer ">
            <RadioGroupItem value="apartment" id="apartment" />
            <Label htmlFor="apartment" className="cursor-pointer">
              {t("publish.basicInfo.typeApartment") || "Apartamento"}
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer ">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other" className="cursor-pointer">
              {t("publish.basicInfo.typeOther") || "Otro"}
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label>{t("publish.basicInfo.size") || "Tamaño del espacio"} *</Label>
        <RadioGroup
          value={data.size}
          onValueChange={(value) => updateData({ size: value })}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer">
            <RadioGroupItem value="small" id="small" />
            <Label htmlFor="small" className="cursor-pointer">
              {t("publish.basicInfo.sizeSmall") || "Pequeño (< 50m²)"}
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer">
            <RadioGroupItem value="medium" id="medium" />
            <Label htmlFor="medium" className="cursor-pointer">
              {t("publish.basicInfo.sizeMedium") || "Mediano (50-100m²)"}
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer">
            <RadioGroupItem value="large" id="large" />
            <Label htmlFor="large" className="cursor-pointer">
              {t("publish.basicInfo.sizeLarge") || "Grande (> 100m²)"}
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
