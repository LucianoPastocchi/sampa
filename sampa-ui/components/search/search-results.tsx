"use client"

import { HomeCard } from "./home-card"
import type { HomeData } from "@/app/buscar/page"
import { useLanguage } from "@/lib/i18n/language-context"

interface SearchResultsProps {
  homes: HomeData[]
  loading: boolean
}

export default function SearchResults({ homes, loading }: SearchResultsProps) {
  const { t } = useLanguage()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    )
  }

  if (homes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <h3 className="text-xl font-semibold mb-2">{t("search.noResults.title") || "No se encontraron resultados"}</h3>
        <p className="text-gray-500 max-w-md">
          {t("search.noResults.description") ||
            "Intenta ajustar tus filtros o buscar en otra área para encontrar hogares de tránsito disponibles."}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {homes.map((home) => (
        <HomeCard key={home.id} home={home} />
      ))}
    </div>
  )
}
