"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/i18n/language-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WalkerFilters from "@/components/walkers/walker-filters"
import WalkerResults from "@/components/walkers/walker-results"
import { Button } from "@/components/ui/button"
import { List, MapIcon } from "lucide-react"
import dynamic from "next/dynamic"

// Importar el componente de mapa dinámicamente para evitar errores de SSR
const DynamicWalkerMap = dynamic(() => import("@/components/walkers/walker-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
    </div>
  ),
})

// Tipos para los datos de paseadores
interface WalkerLocation {
  lat: number
  lng: number
}

export interface WalkerData {
  id: string
  name: string
  description: string
  location: WalkerLocation
  address: string
  pricePerWalk: number
  rating: number
  reviewCount: number
  avatar: string
  services: string[]
  experience: number
  available: boolean
  schedule: string[]
  specialties: string[]
  verified: boolean
}

export default function PaseadoresPage() {
  const { t, isLoaded } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [walkers, setWalkers] = useState<WalkerData[]>([])
  const [loading, setLoading] = useState(true)
  const [showMap, setShowMap] = useState(true)
  const [filters, setFilters] = useState({
    priceRange: [0, 2000],
    rating: 0,
    services: [] as string[],
    availability: "all",
    experience: 0,
  })

  // Simular la carga de datos de paseadores
  useEffect(() => {
    setMounted(true)

    const fetchWalkers = async () => {
      // Simulamos datos de paseadores para la demostración
      const mockWalkers: WalkerData[] = [
        {
          id: "w1",
          name: "María González",
          description:
            "Paseadora profesional con 5 años de experiencia. Especializada en perros grandes y entrenamiento básico.",
          location: { lat: -34.5833, lng: -58.4167 }, // Palermo
          address: "Palermo, Buenos Aires",
          pricePerWalk: 800,
          rating: 4.9,
          reviewCount: 127,
          avatar: "/paseadora.jpg",
          services: ["Paseos individuales", "Paseos grupales", "Entrenamiento básico", "Cuidado nocturno"],
          experience: 5,
          available: true,
          schedule: ["Lunes a Viernes: 8:00 - 18:00", "Sábados: 9:00 - 15:00"],
          specialties: ["Perros grandes", "Perros reactivos", "Cachorros"],
          verified: true,
        },
        {
          id: "w2",
          name: "Carlos Rodríguez",
          description:
            "Amante de los animales con experiencia en cuidado de perros pequeños y medianos. Disponible fines de semana.",
          location: { lat: -34.5875, lng: -58.3931 }, // Recoleta
          address: "Recoleta, Buenos Aires",
          pricePerWalk: 650,
          rating: 4.7,
          reviewCount: 89,
          avatar: "/paseador.jpg",
          services: ["Paseos individuales", "Visitas a domicilio", "Alimentación"],
          experience: 3,
          available: true,
          schedule: ["Todos los días: 7:00 - 20:00"],
          specialties: ["Perros pequeños", "Perros ancianos"],
          verified: true,
        },
        {
          id: "w3",
          name: "Ana Martínez",
          description:
            "Veterinaria y paseadora profesional. Especializada en perros con necesidades especiales y rehabilitación.",
          location: { lat: -34.6176, lng: -58.4371 }, // Caballito
          address: "Caballito, Buenos Aires",
          pricePerWalk: 1200,
          rating: 5.0,
          reviewCount: 156,
          avatar: "/placeholder.svg?height=80&width=80",
          services: [
            "Paseos terapéuticos",
            "Administración de medicamentos",
            "Primeros auxilios",
            "Entrenamiento avanzado",
          ],
          experience: 8,
          available: true,
          schedule: ["Lunes a Viernes: 9:00 - 17:00"],
          specialties: ["Perros con discapacidades", "Rehabilitación", "Perros agresivos"],
          verified: true,
        },
        {
          id: "w4",
          name: "Javier López",
          description:
            "Paseador joven y energético, perfecto para perros activos que necesitan mucho ejercicio y juego.",
          location: { lat: -34.5584, lng: -58.4633 }, // Belgrano
          address: "Belgrano, Buenos Aires",
          pricePerWalk: 700,
          rating: 4.6,
          reviewCount: 73,
          avatar: "/placeholder.svg?height=80&width=80",
          services: ["Paseos largos", "Ejercicio intensivo", "Juegos en parques", "Running con perros"],
          experience: 2,
          available: true,
          schedule: ["Martes a Domingo: 6:00 - 19:00"],
          specialties: ["Perros deportivos", "Razas activas", "Ejercicio intensivo"],
          verified: false,
        },
        {
          id: "w5",
          name: "Laura Fernández",
          description:
            "Especialista en comportamiento canino. Ideal para perros con problemas de conducta o socialización.",
          location: { lat: -34.5453, lng: -58.4627 }, // Núñez
          address: "Núñez, Buenos Aires",
          pricePerWalk: 1000,
          rating: 4.8,
          reviewCount: 94,
          avatar: "/placeholder.svg?height=80&width=80",
          services: ["Modificación de conducta", "Socialización", "Paseos educativos", "Consultas de comportamiento"],
          experience: 6,
          available: true,
          schedule: ["Lunes a Sábado: 8:00 - 16:00"],
          specialties: ["Problemas de conducta", "Socialización", "Ansiedad canina"],
          verified: true,
        },
        {
          id: "w6",
          name: "Roberto Silva",
          description:
            "Paseador experimentado con vehículo propio. Ofrece servicios de transporte y paseos en diferentes ubicaciones.",
          location: { lat: -34.6037, lng: -58.3816 }, // San Telmo
          address: "San Telmo, Buenos Aires",
          pricePerWalk: 900,
          rating: 4.5,
          reviewCount: 112,
          avatar: "/placeholder.svg?height=80&width=80",
          services: ["Transporte de mascotas", "Paseos en diferentes zonas", "Visitas veterinarias", "Emergencias"],
          experience: 7,
          available: true,
          schedule: ["Todos los días: 24 horas"],
          specialties: ["Transporte", "Emergencias", "Servicios nocturnos"],
          verified: true,
        },
        {
          id: "w7",
          name: "Sofía Morales",
          description:
            "Estudiante de veterinaria y paseadora de medio tiempo. Muy cariñosa con los animales y precios accesibles.",
          location: { lat: -34.6345, lng: -58.4793 }, // Flores
          address: "Flores, Buenos Aires",
          pricePerWalk: 500,
          rating: 4.4,
          reviewCount: 45,
          avatar: "/placeholder.svg?height=80&width=80",
          services: ["Paseos básicos", "Compañía", "Alimentación", "Cuidado básico"],
          experience: 1,
          available: true,
          schedule: ["Lunes, Miércoles, Viernes: 14:00 - 18:00", "Fines de semana: 10:00 - 16:00"],
          specialties: ["Cachorros", "Perros tímidos"],
          verified: false,
        },
      ]

      setWalkers(mockWalkers)
      setLoading(false)
    }

    fetchWalkers()
  }, [])

  // Filtrar paseadores según los criterios seleccionados
  const filteredWalkers = walkers.filter((walker) => {
    // Filtro por precio
    if (walker.pricePerWalk < filters.priceRange[0] || walker.pricePerWalk > filters.priceRange[1]) {
      return false
    }

    // Filtro por calificación
    if (walker.rating < filters.rating) {
      return false
    }

    // Filtro por servicios
    if (filters.services.length > 0) {
      const hasAllServices = filters.services.every((service) => walker.services.includes(service))
      if (!hasAllServices) {
        return false
      }
    }

    // Filtro por disponibilidad
    if (filters.availability === "available" && !walker.available) {
      return false
    }

    // Filtro por experiencia
    if (walker.experience < filters.experience) {
      return false
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
          <h1 className="text-3xl font-bold mb-6">{t("walkers.title") || "Buscar paseadores de perros"}</h1>

          <WalkerFilters filters={filters} setFilters={setFilters} />

          <div className="flex justify-between items-center my-4">
            <p className="text-gray-600">
              {filteredWalkers.length}{" "}
              {filteredWalkers.length === 1 ? t("walkers.result") || "paseador" : t("walkers.results") || "paseadores"}{" "}
              {t("walkers.found") || "encontrados"}
            </p>

            <div className="flex items-center gap-2">
              <Button
                variant={showMap ? "outline" : "default"}
                size="sm"
                onClick={() => setShowMap(false)}
                className="flex items-center gap-1"
              >
                <List size={16} />
                {t("walkers.listView") || "Lista"}
              </Button>
              <Button
                variant={!showMap ? "outline" : "default"}
                size="sm"
                onClick={() => setShowMap(true)}
                className="flex items-center gap-1"
              >
                <MapIcon size={16} />
                {t("walkers.mapView") || "Mapa"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {!showMap ? (
              <div className="col-span-2">
                <WalkerResults walkers={filteredWalkers} loading={loading} />
              </div>
            ) : (
              <>
                <div className="order-2 lg:order-1">
                  <WalkerResults walkers={filteredWalkers} loading={loading} />
                </div>
                <div className="order-1 lg:order-2 h-[calc(100vh-200px)] sticky top-20">
                  <DynamicWalkerMap walkers={filteredWalkers} />
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
