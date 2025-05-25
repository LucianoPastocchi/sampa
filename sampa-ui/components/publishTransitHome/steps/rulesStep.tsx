"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

interface RulesData {
  houseRules: string[]
  customRules: string[]
}

interface RulesStepProps {
  data: RulesData
  updateData: (data: Partial<RulesData>) => void
}

export default function RulesStep({ data, updateData }: RulesStepProps) {
  const { t } = useLanguage()
  const [customRule, setCustomRule] = useState("")

  const commonRules = [
    { id: "vaccinated", label: t("publish.rules.vaccinated") || "Mascotas deben estar vacunadas" },
    { id: "dewormed", label: t("publish.rules.dewormed") || "Mascotas deben estar desparasitadas" },
    { id: "friendly", label: t("publish.rules.friendly") || "Mascotas deben ser sociables" },
    { id: "trained", label: t("publish.rules.trained") || "Perros deben tener entrenamiento básico" },
    { id: "carrier", label: t("publish.rules.carrier") || "Traer transportadora para gatos/pequeños animales" },
    { id: "leash", label: t("publish.rules.leash") || "Traer correa y collar/arnés" },
    { id: "food", label: t("publish.rules.food") || "Traer alimento para la estadía" },
    { id: "toys", label: t("publish.rules.toys") || "Traer juguetes favoritos" },
  ]

  const handleRuleChange = (rule: string, checked: boolean) => {
    if (checked) {
      updateData({ houseRules: [...data.houseRules, rule] })
    } else {
      updateData({ houseRules: data.houseRules.filter((r) => r !== rule) })
    }
  }

  const addCustomRule = () => {
    if (customRule.trim() && !data.customRules.includes(customRule.trim())) {
      updateData({ customRules: [...data.customRules, customRule.trim()] })
      setCustomRule("")
    }
  }

  const removeCustomRule = (index: number) => {
    const newRules = [...data.customRules]
    newRules.splice(index, 1)
    updateData({ customRules: newRules })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium">{t("publish.rules.title") || "Reglas para los huéspedes"}</h3>
        <p className="text-sm text-gray-500">
          {t("publish.rules.description") ||
            "Establece reglas claras para asegurar una buena experiencia para ti y las mascotas."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {commonRules.map((rule) => (
          <div key={rule.id} className="flex items-center space-x-2">
            <Checkbox
              id={rule.id}
              checked={data.houseRules.includes(rule.label)}
              onCheckedChange={(checked) => handleRuleChange(rule.label, checked === true)}
            />
            <Label htmlFor={rule.id} className="cursor-pointer">
              {rule.label}
            </Label>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t">
        <h3 className="font-medium mb-3">{t("publish.rules.customTitle") || "Añadir regla personalizada"}</h3>

        <div className="flex space-x-2">
          <Input
            placeholder={t("publish.rules.customPlaceholder") || "Ej: No dejar mascotas solas en el hogar"}
            value={customRule}
            onChange={(e) => setCustomRule(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addCustomRule()
              }
            }}
          />
          <Button type="button" onClick={addCustomRule} className="flex-shrink-0">
            <Plus size={16} className="mr-1" />
            {t("publish.rules.add") || "Añadir"}
          </Button>
        </div>
      </div>

      {data.customRules.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium">{t("publish.rules.customAdded") || "Reglas personalizadas añadidas:"}</h4>
          <div className="space-y-2">
            {data.customRules.map((rule, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <span>{rule}</span>
                <button
                  type="button"
                  onClick={() => removeCustomRule(index)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-blue-50 p-4 rounded-md mt-4">
        <h4 className="font-medium text-blue-700 mb-2">
          {t("publish.rules.tips") || "Consejos para establecer reglas"}
        </h4>
        <ul className="text-sm text-blue-600 space-y-1 list-disc pl-5">
          <li>{t("publish.rules.tip1") || "Sé claro y específico sobre lo que esperas"}</li>
          <li>{t("publish.rules.tip2") || "Considera las necesidades de diferentes tipos de mascotas"}</li>
          <li>{t("publish.rules.tip3") || "Establece reglas que puedas hacer cumplir"}</li>
          <li>{t("publish.rules.tip4") || "Piensa en la seguridad de las mascotas y tu hogar"}</li>
        </ul>
      </div>
    </div>
  )
}
