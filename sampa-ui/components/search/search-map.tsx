"use client"

import { useState, useEffect, useRef } from "react"
import { useLanguage } from "@/lib/i18n/language-context"
import type { HomeData } from "@/app/buscar/page"

interface SearchMapProps {
  homes: HomeData[]
}

export default function SearchMap({ homes }: SearchMapProps) {
  const { t } = useLanguage()
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    // Esta es una implementación simulada para mostrar un mapa estático
    // En una implementación real, aquí se inicializaría Google Maps, Mapbox, etc.
    if (mapRef.current) {
      // Simular carga del mapa
      const timer = setTimeout(() => {
        setMapLoaded(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <div ref={mapRef} className="w-full h-full rounded-lg overflow-hidden border border-gray-200 relative">
      {!mapLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
        </div>
      ) : (
        <>
          {/* Mapa simulado - En una implementación real, aquí iría el componente de mapa */}
          <div className="w-full h-full bg-gray-200 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-4 bg-white rounded-lg shadow-md">
                <p className="font-medium mb-2">{t("search.map.placeholder") || "Mapa interactivo"}</p>
                <p className="text-sm text-gray-500">
                  {t("search.map.description") ||
                    "En una implementación real, aquí se mostraría un mapa con la ubicación de los hogares."}
                </p>
                <p className="text-sm mt-2">
                  {homes.length}{" "}
                  {homes.length === 1 ? t("search.result") || "resultado" : t("search.results") || "resultados"}
                </p>
              </div>
            </div>

            {/* Marcadores simulados */}
            {homes.map((home) => (
              <div
                key={home.id}
                className="absolute w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-md"
                style={{
                  // Posiciones aleatorias para la simulación
                  top: `${Math.random() * 70 + 10}%`,
                  left: `${Math.random() * 70 + 10}%`,
                }}
              >
                ${home.price.toString().substring(0, 1)}k
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
