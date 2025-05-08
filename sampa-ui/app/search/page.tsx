"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/i18n/language-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SearchFilters from "@/components/search/search-filters"
import SearchResults from "@/components/search/search-results"
import Map from "@/components/map"
import { Button } from "@/components/ui/button"
import { List, MapIcon } from "lucide-react"

const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

// Tipos para los datos
interface HomeLocation {
  lat: number
  lng: number
}

export interface HomeData {
  id: string
  name: string
  description: string
  location: HomeLocation
  address: string
  price: number
  rating: number
  reviewCount: number
  images: string[]
  amenities: string[]
  petTypes: string[]
  maxPets: number
  hostName: string
  hostImage: string
  available: boolean
}

export default function SearchPage() {
  const { t, isLoaded } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [homes, setHomes] = useState<HomeData[]>([])
  const [loading, setLoading] = useState(true)
  const [showMap, setShowMap] = useState(true)
  const [filters, setFilters] = useState({
    petType: "all",
    priceRange: [0, 5000],
    rating: 0,
    amenities: [] as string[],
  })

  // Simular la carga de datos desde una API
  useEffect(() => {

      console.log("entro a search");
    setMounted(true)

    const fetchHomes = async () => {
      // En una implementación real, esto sería una llamada a la API
      // await fetch('/api/sampa/homes')

      // Simulamos datos para la demostración
      const mockHomes: HomeData[] = [
        {
          id: "1",
          name: "Hogar acogedor con jardín",
          description: "Espacio amplio con jardín cercado, ideal para perros activos.",
          location: { lat: -34.603722, lng: -58.381592 },
          address: "Palermo, Buenos Aires",
          price: 1200,
          rating: 4.8,
          reviewCount: 24,
          images: ["/placeholder.svg?height=300&width=400"],
          amenities: ["Jardín", "Cercado", "Juguetes"],
          petTypes: ["Perros", "Gatos"],
          maxPets: 2,
          hostName: "María G.",
          hostImage: "/placeholder.svg?height=50&width=50",
          available: true,
        },
        {
          id: "2",
          name: "Apartamento pet-friendly",
          description: "Apartamento céntrico adaptado para mascotas, con áreas de juego.",
          location: { lat: -34.608333, lng: -58.371944 },
          address: "Recoleta, Buenos Aires",
          price: 950,
          rating: 4.6,
          reviewCount: 18,
          images: ["/placeholder.svg?height=300&width=400"],
          amenities: ["Climatizado", "Juguetes", "Camas para mascotas"],
          petTypes: ["Perros pequeños", "Gatos"],
          maxPets: 3,
          hostName: "Carlos L.",
          hostImage: "/placeholder.svg?height=50&width=50",
          available: true,
        },
        {
          id: "3",
          name: "Casa con patio grande",
          description: "Casa espaciosa con patio grande y seguro para mascotas de todos los tamaños.",
          location: { lat: -34.620833, lng: -58.445833 },
          address: "Caballito, Buenos Aires",
          price: 1500,
          rating: 4.9,
          reviewCount: 32,
          images: ["/placeholder.svg?height=300&width=400"],
          amenities: ["Patio grande", "Cercado", "Juguetes", "Cuidado 24h"],
          petTypes: ["Perros", "Gatos", "Aves"],
          maxPets: 4,
          hostName: "Laura M.",
          hostImage: "/placeholder.svg?height=50&width=50",
          available: true,
        },
        {
          id: "4",
          name: "Refugio tranquilo para mascotas",
          description: "Ambiente tranquilo ideal para mascotas que necesitan poco estrés y mucho cariño.",
          location: { lat: -34.590833, lng: -58.410833 },
          address: "Belgrano, Buenos Aires",
          price: 1100,
          rating: 4.7,
          reviewCount: 15,
          images: ["/placeholder.svg?height=300&width=400"],
          amenities: ["Tranquilo", "Climatizado", "Camas para mascotas"],
          petTypes: ["Perros pequeños", "Gatos", "Roedores"],
          maxPets: 2,
          hostName: "Javier P.",
          hostImage: "/placeholder.svg?height=50&width=50",
          available: true,
        },
        {
          id: "5",
          name: "Espacio verde para mascotas activas",
          description: "Gran espacio al aire libre para mascotas que necesitan ejercicio y actividad.",
          location: { lat: -34.570833, lng: -58.460833 },
          address: "Núñez, Buenos Aires",
          price: 1800,
          rating: 4.9,
          reviewCount: 27,
          images: ["/placeholder.svg?height=300&width=400"],
          amenities: ["Espacio grande", "Juegos", "Entrenamiento", "Paseos"],
          petTypes: ["Perros", "Gatos activos"],
          maxPets: 3,
          hostName: "Ana R.",
          hostImage: "/placeholder.svg?height=50&width=50",
          available: true,
        },
      ]

      setHomes(mockHomes)
      setLoading(false)
    }

    fetchHomes()
  }, [])

  // Filtrar hogares según los criterios seleccionados
  const filteredHomes = homes.filter((home) => {
    // Filtro por tipo de mascota
    if (filters.petType !== "all" && !home.petTypes.includes(filters.petType)) {
      return false
    }

    // Filtro por precio
    if (home.price < filters.priceRange[0] || home.price > filters.priceRange[1]) {
      return false
    }

    // Filtro por calificación
    if (home.rating < filters.rating) {
      return false
    }

    // Filtro por amenidades
    if (filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every((amenity) => home.amenities.includes(amenity))
      if (!hasAllAmenities) {
        return false
      }
    }

    return true
  })

  // No renderizar nada hasta que el componente esté montado y el idioma esté cargado
  if (!mounted || !isLoaded) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container px-4 py-6 mx-auto">
          <h1 className="text-3xl font-bold mb-6">{t("search.title") || "Buscar hogares de tránsito"}</h1>

          <SearchFilters filters={filters} setFilters={setFilters} />

          <div className="flex justify-between items-center my-4">
            <p className="text-gray-600">
              {filteredHomes.length}{" "}
              {filteredHomes.length === 1 ? t("search.result") || "resultado" : t("search.results") || "resultados"}
            </p>

            <div className="flex items-center gap-2">
              <Button
                variant={showMap ? "outline" : "default"}
                size="sm"
                onClick={() => setShowMap(false)}
                className="flex items-center gap-1"
              >
                <List size={16} />
                {t("search.listView") || "Lista"}
              </Button>
              <Button
                variant={!showMap ? "outline" : "default"}
                size="sm"
                onClick={() => setShowMap(true)}
                className="flex items-center gap-1"
              >
                <MapIcon size={16} />
                {t("search.mapView") || "Mapa"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {!showMap ? (
              <div className="col-span-2">
                <SearchResults homes={filteredHomes} loading={loading} />
              </div>
            ) : (
              <>
                <div className="order-2 lg:order-1">
                  <SearchResults homes={filteredHomes} loading={loading} />
                </div>
                <div className="order-1 lg:order-2 h-[calc(100vh-200px)] sticky top-20">
                  <Map homes={filteredHomes} />
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
