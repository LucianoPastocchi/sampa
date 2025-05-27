"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { Shield, Star } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n/language-context"
import * as turf from "@turf/turf"

import type { WalkerData } from "@/app/paseadores/page"

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

interface WalkerMapProps {
  walkers: WalkerData[]
}

export default function WalkerMap({ walkers }: WalkerMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const { t } = useLanguage()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.longitude, position.coords.latitude])
      },
      () => {
        setUserLocation([-58.3816, -34.6037]) // Buenos Aires por defecto
      }
    )
  }, [])

  useEffect(() => {
    if (!userLocation || !mapContainer.current || map.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: userLocation,
      zoom: 12,
    })

    // Esperar a que cargue el estilo del mapa
    map.current.on("load", () => {
      // Ubicación del usuario
      new mapboxgl.Marker({ color: "#1E90FF" })
        .setLngLat(userLocation)
        .setPopup(new mapboxgl.Popup().setText("Tu ubicación"))
        .addTo(map.current!)

      // Paseadores con círculo de radio
      walkers.forEach((walker, index) => {
        // Crear marcador personalizado
        const el = document.createElement("div")
        el.className = "w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md"
        el.style.backgroundImage = `url(${walker.avatar || "/placeholder.svg"})`
        el.style.backgroundSize = "cover"
        el.style.cursor = "pointer"

        new mapboxgl.Marker(el)
          .setLngLat([walker.location.lng, walker.location.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(`
              <div class="text-sm">
                <div class="flex gap-2 items-center mb-2">
                  <img src="${walker.avatar || "/placeholder.svg"}" alt="${walker.name}" class="w-8 h-8 rounded-full" />
                  <strong>${walker.name} ${walker.verified ? "✅" : ""}</strong>
                </div>
                <p class="mb-1 text-gray-600">${walker.address}</p>
                <p class="mb-1"><span class="text-yellow-500">★</span> ${walker.rating} (${walker.reviewCount})</p>
                <p class="text-rose-600 font-semibold">$${walker.pricePerWalk} / paseo</p>
              </div>
            `)
          )
          .addTo(map.current!)

        // Crear círculo con turf
        const circle = turf.circle([walker.location.lng, walker.location.lat], 1, {
          steps: 64,
          units: "kilometers",
        })

        const sourceId = `walker-radius-${walker.id}`

        // Agregar fuente y capa
        map.current!.addSource(sourceId, {
          type: "geojson",
          data: circle,
        })

        map.current!.addLayer({
          id: sourceId,
          type: "fill",
          source: sourceId,
          layout: {},
          paint: {
            "fill-color": "#f43f5e", // rosa
            "fill-opacity": 0.2,
          },
        })
      })

      map.current!.addControl(new mapboxgl.NavigationControl())
    })
  }, [userLocation, walkers])


  return (
    <div className="relative w-full h-[500px] rounded-lg border border-gray-200 overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  )
}
