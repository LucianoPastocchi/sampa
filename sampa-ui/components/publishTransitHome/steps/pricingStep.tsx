"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { useLanguage } from "@/lib/i18n/language-context"

interface PricingData {
  basePrice: number
  cleaningFee: number
  discount: {
    weekly: number
    monthly: number
  }
}

interface PricingStepProps {
  data: PricingData
  updateData: (data: Partial<PricingData>) => void
}

export default function PricingStep({ data, updateData }: PricingStepProps) {
  const { t } = useLanguage()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [enableWeeklyDiscount, setEnableWeeklyDiscount] = useState(data.discount.weekly > 0)
  const [enableMonthlyDiscount, setEnableMonthlyDiscount] = useState(data.discount.monthly > 0)

  const handlePriceChange = (field: keyof PricingData, value: string) => {
    const numValue = Number.parseFloat(value)

    if (isNaN(numValue) || numValue < 0) {
      setErrors({ ...errors, [field]: t("publish.errors.invalidPrice") || "Ingresa un precio válido" })
      return
    }

    updateData({ [field]: numValue })

    const newErrors = { ...errors }
    delete newErrors[field]
    setErrors(newErrors)
  }

  const handleDiscountChange = (field: "weekly" | "monthly", value: number[]) => {
    updateData({
      discount: {
        ...data.discount,
        [field]: value[0],
      },
    })
  }

  const toggleWeeklyDiscount = (checked: boolean) => {
    setEnableWeeklyDiscount(checked)
    if (!checked) {
      updateData({
        discount: {
          ...data.discount,
          weekly: 0,
        },
      })
    } else {
      updateData({
        discount: {
          ...data.discount,
          weekly: 5, // Valor por defecto
        },
      })
    }
  }

  const toggleMonthlyDiscount = (checked: boolean) => {
    setEnableMonthlyDiscount(checked)
    if (!checked) {
      updateData({
        discount: {
          ...data.discount,
          monthly: 0,
        },
      })
    } else {
      updateData({
        discount: {
          ...data.discount,
          monthly: 10, // Valor por defecto
        },
      })
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="font-medium">{t("publish.pricing.basePrice") || "Precio por noche"}</h3>
        <div className="flex items-center">
          <span className="text-lg mr-2">$</span>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={data.basePrice || ""}
            onChange={(e) => handlePriceChange("basePrice", e.target.value)}
            className="max-w-[200px]"
          />
          <span className="ml-2 text-gray-500">ARS</span>
        </div>
        {errors.basePrice && <p className="text-sm text-red-500">{errors.basePrice}</p>}
        <p className="text-sm text-gray-500">
          {t("publish.pricing.basePriceHelp") || "Este es el precio base por noche para una mascota."}
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">{t("publish.pricing.cleaningFee") || "Tarifa de limpieza (opcional)"}</h3>
        <div className="flex items-center">
          <span className="text-lg mr-2">$</span>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={data.cleaningFee || ""}
            onChange={(e) => handlePriceChange("cleaningFee", e.target.value)}
            className="max-w-[200px]"
          />
          <span className="ml-2 text-gray-500">ARS</span>
        </div>
        {errors.cleaningFee && <p className="text-sm text-red-500">{errors.cleaningFee}</p>}
        <p className="text-sm text-gray-500">
          {t("publish.pricing.cleaningFeeHelp") ||
            "Esta tarifa única cubre los costos adicionales de limpieza después de la estadía."}
        </p>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <h3 className="font-medium">{t("publish.pricing.discounts") || "Descuentos para estadías largas"}</h3>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="weekly-discount" className="font-medium">
                {t("publish.pricing.weeklyDiscount") || "Descuento semanal"}
              </Label>
              <p className="text-sm text-gray-500">
                {t("publish.pricing.weeklyDiscountHelp") || "Para estadías de 7 noches o más"}
              </p>
            </div>
            <Switch id="weekly-discount" checked={enableWeeklyDiscount} onCheckedChange={toggleWeeklyDiscount} />
          </div>

          {enableWeeklyDiscount && (
            <div className="pl-4 border-l-2 border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">{t("publish.pricing.discountPercentage") || "Porcentaje de descuento"}</span>
                <span className="font-medium text-rose-500">{data.discount.weekly}%</span>
              </div>
              <Slider
                value={[data.discount.weekly]}
                min={5}
                max={30}
                step={1}
                onValueChange={(value) => handleDiscountChange("weekly", value)}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>5%</span>
                <span>30%</span>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="monthly-discount" className="font-medium">
                {t("publish.pricing.monthlyDiscount") || "Descuento mensual"}
              </Label>
              <p className="text-sm text-gray-500">
                {t("publish.pricing.monthlyDiscountHelp") || "Para estadías de 28 noches o más"}
              </p>
            </div>
            <Switch id="monthly-discount" checked={enableMonthlyDiscount} onCheckedChange={toggleMonthlyDiscount} />
          </div>

          {enableMonthlyDiscount && (
            <div className="pl-4 border-l-2 border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">{t("publish.pricing.discountPercentage") || "Porcentaje de descuento"}</span>
                <span className="font-medium text-rose-500">{data.discount.monthly}%</span>
              </div>
              <Slider
                value={[data.discount.monthly]}
                min={10}
                max={40}
                step={1}
                onValueChange={(value) => handleDiscountChange("monthly", value)}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>10%</span>
                <span>40%</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded-md">
        <h4 className="font-medium text-green-800 mb-2">
          {t("publish.pricing.estimatedEarnings") || "Ganancias estimadas"}
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-green-800">
            <span>{t("publish.pricing.perNight") || "Por noche"}</span>
            <span className="font-medium">${data.basePrice} ARS</span>
          </div>
          <div className="flex justify-between text-sm text-green-800">
            <span>{t("publish.pricing.perWeek") || "Por semana"}</span>
            <span className="font-medium">
              ${calculateWeeklyPrice(data)} ARS
              {enableWeeklyDiscount && (
                <span className="text-green-600 font-bold ml-1">
                  ({data.discount.weekly}% {t("publish.pricing.off") || "desc."})
                </span>
              )}
            </span>
          </div>
          <div className="flex justify-between text-sm text-green-800">
            <span>{t("publish.pricing.perMonth") || "Por mes"}</span>
            <span className="font-medium">
              ${calculateMonthlyPrice(data)} ARS
              {enableMonthlyDiscount && (
                <span className=" ml-1">
                  ({data.discount.monthly}% {t("publish.pricing.off") || "desc."})
                </span>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Función para calcular el precio semanal con descuento
function calculateWeeklyPrice(data: PricingData): number {
  const weeklyBasePrice = data.basePrice * 7
  const discount = data.discount.weekly > 0 ? (weeklyBasePrice * data.discount.weekly) / 100 : 0
  return Math.round(weeklyBasePrice - discount + data.cleaningFee)
}

// Función para calcular el precio mensual con descuento
function calculateMonthlyPrice(data: PricingData): number {
  const monthlyBasePrice = data.basePrice * 28
  const discount = data.discount.monthly > 0 ? (monthlyBasePrice * data.discount.monthly) / 100 : 0
  return Math.round(monthlyBasePrice - discount + data.cleaningFee)
}
