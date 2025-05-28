"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { LocateFixed } from "lucide-react"
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

    map.current.on("load", () => {
      // Marcador azul estándar para ubicación del usuario
      new mapboxgl.Marker({ color: "#1E90FF" })
        .setLngLat(userLocation)
        .setPopup(new mapboxgl.Popup().setText("Tu ubicación"))
        .addTo(map.current!)

      walkers.forEach((walker) => {
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

        const circle = turf.circle([walker.location.lng, walker.location.lat], 1, {
          steps: 64,
          units: "kilometers",
        })

        const sourceId = `walker-radius-${walker.id}`

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
            "fill-color": "#f43f5e",
            "fill-opacity": 0.2,
          },
        })
      })

      map.current!.addControl(new mapboxgl.NavigationControl())
    })
  }, [userLocation, walkers])

  const handleCenterOnUser = () => {
    if (map.current && userLocation) {
      map.current.flyTo({ center: userLocation, zoom: 14 })
    }
  }

  return (
    <div className="relative w-full h-[500px] rounded-lg border border-gray-200 overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />

      <button
        onClick={handleCenterOnUser}
        className="absolute top-24 right-1 bg-white border border-gray-300 shadow-md rounded-full p-2 text-black hover:bg-gray-100 z-10"
        aria-label="Centrar en mi ubicación"
      >
        <LocateFixed size={20} />
      </button>
    </div>
  )
}
