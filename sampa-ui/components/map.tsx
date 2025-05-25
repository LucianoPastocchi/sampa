"use client"

import { useRef, useEffect, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { LocateFixed } from "lucide-react"

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

interface HomeLocation {
  lat: number
  lng: number
}

interface HomeData {
  id: string
  name: string
  location: HomeLocation
  address: string
}

interface Props {
  homes: HomeData[]
}

export default function Map({ homes }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)

  // Obtener ubicación del usuario
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lng = position.coords.longitude
        const lat = position.coords.latitude
        setUserLocation([lng, lat])
      },
      () => {
        setUserLocation([-58.3816, -34.6037]) // Buenos Aires
      }
    )
  }, [])

  // Inicializar mapa y marcadores
  useEffect(() => {
    if (!userLocation || !mapContainer.current || map.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: userLocation,
      zoom: 12,
    })

    new mapboxgl.Marker({ color: "#1E90FF" })
      .setLngLat(userLocation)
      .setPopup(new mapboxgl.Popup().setText("Tu ubicación"))
      .addTo(map.current)

    homes.forEach((home) => {
      new mapboxgl.Marker()
        .setLngLat([home.location.lng, home.location.lat])
        .setPopup(new mapboxgl.Popup().setText(home.name))
        .addTo(map.current!)
    })

    map.current.addControl(new mapboxgl.NavigationControl())
  }, [userLocation, homes])

  // Función para centrar el mapa
  const handleCenterOnUser = () => {
    if (map.current && userLocation) {
      map.current.flyTo({ center: userLocation, zoom: 14 })
    }
  }

  return (
    <div className="relative w-full h-[500px] rounded-lg">
      <div ref={mapContainer} className="w-full h-full rounded-lg" />

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

