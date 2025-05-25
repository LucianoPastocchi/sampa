"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useLanguage } from "@/lib/i18n/language-context"

interface PetsData {
  types: string[]
  maxCount: number
  sizes: string[]
}

interface PetsStepProps {
  data: PetsData
  updateData: (data: Partial<PetsData>) => void
}

export default function PetsStep({ data, updateData }: PetsStepProps) {
  const { t } = useLanguage()

  const petTypes = [
    { id: "dogs", label: t("publish.pets.dogs") || "Perros" },
    { id: "cats", label: t("publish.pets.cats") || "Gatos" },
    { id: "birds", label: t("publish.pets.birds") || "Aves" },
    { id: "rodents", label: t("publish.pets.rodents") || "Roedores" },
    { id: "reptiles", label: t("publish.pets.reptiles") || "Reptiles" },
    { id: "fish", label: t("publish.pets.fish") || "Peces" },
  ]

  const petSizes = [
    { id: "small", label: t("publish.pets.small") || "Pequeños (< 10kg)" },
    { id: "medium", label: t("publish.pets.medium") || "Medianos (10-25kg)" },
    { id: "large", label: t("publish.pets.large") || "Grandes (> 25kg)" },
  ]

  const handlePetTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      updateData({ types: [...data.types, type] })
    } else {
      updateData({ types: data.types.filter((t) => t !== type) })
    }
  }

  const handlePetSizeChange = (size: string, checked: boolean) => {
    if (checked) {
      updateData({ sizes: [...data.sizes, size] })
    } else {
      updateData({ sizes: data.sizes.filter((s) => s !== size) })
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="font-medium">{t("publish.pets.typesTitle") || "¿Qué tipos de mascotas aceptas?"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {petTypes.map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <Checkbox
                id={type.id}
                checked={data.types.includes(type.label)}
                onCheckedChange={(checked) => handlePetTypeChange(type.label, checked === true)}
              />
              <Label htmlFor={type.id} className="cursor-pointer">
                {type.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">{t("publish.pets.sizesTitle") || "¿Qué tamaños de mascotas aceptas?"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {petSizes.map((size) => (
            <div key={size.id} className="flex items-center space-x-2">
              <Checkbox
                id={size.id}
                checked={data.sizes.includes(size.label)}
                onCheckedChange={(checked) => handlePetSizeChange(size.label, checked === true)}
              />
              <Label htmlFor={size.id} className="cursor-pointer">
                {size.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">{t("publish.pets.maxCount") || "Número máximo de mascotas"}</h3>
          <span className="font-medium text-rose-500">{data.maxCount}</span>
        </div>
        <Slider
          value={[data.maxCount]}
          min={1}
          max={10}
          step={1}
          onValueChange={(value) => updateData({ maxCount: value[0] })}
          className="py-4"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>1</span>
          <span>5</span>
          <span>10</span>
        </div>
      </div>

      <div className="bg-yellow-50 p-4 rounded-md">
        <h4 className="font-medium text-yellow-800 mb-2">{t("publish.pets.importantNote") || "Nota importante"}</h4>
        <p className="text-sm text-yellow-700">
          {t("publish.pets.noteContent") ||
            "Asegúrate de que tu espacio es adecuado para los tipos y tamaños de mascotas que has seleccionado. Considera el espacio disponible, las necesidades específicas de cada tipo de mascota y tu experiencia en su cuidado."}
        </p>
      </div>
    </div>
  )
}
