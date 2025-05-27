"use client"

import { WalkerCard } from "./walker-card"
import type { WalkerData } from "@/app/paseadores/page"
import { useLanguage } from "@/lib/i18n/language-context"

interface WalkerResultsProps {
  walkers: WalkerData[]
  loading: boolean
}

export default function WalkerResults({ walkers, loading }: WalkerResultsProps) {
  const { t } = useLanguage()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    )
  }

  if (walkers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <h3 className="text-xl font-semibold mb-2">{t("walkers.noResults.title") || "No se encontraron paseadores"}</h3>
        <p className="text-gray-500 max-w-md">
          {t("walkers.noResults.description") ||
            "Intenta ajustar tus filtros o buscar en otra área para encontrar paseadores disponibles."}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {walkers.map((walker) => (
        <WalkerCard key={walker.id} walker={walker} />
      ))}
    </div>
  )
}
