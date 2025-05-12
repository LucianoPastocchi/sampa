"use client"

import { useRef, useEffect, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

export default function Map({ zoom = 12 }) {
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
      (error) => {
        console.error("No se pudo obtener la ubicación:", error)
        // Si falla, usar coordenadas por defecto (Buenos Aires)
        setUserLocation([-58.3816, -34.6037])
      }
    )
  }, [])

//     async function obtenerLatitudes() {
//
//
//     const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(userLocation)}.json?access_token=pk.eyJ1IjoiZGFuaXBhc3RvY2NoaSIsImEiOiJjbWFmeHM3OTgwN3E1Mm1xNWczaGM4YWhuIn0.MHW0X8pEoalzPRoIFB6cGw`)
//     const data = await response.json()
//     const [lng, lat] = data.features[0].center
//   }

  // Inicializar el mapa cuando tengamos la ubicación
  useEffect(() => {
    if (!userLocation || !mapContainer.current || map.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: userLocation,
      zoom,
    })

    new mapboxgl.Marker().setLngLat(userLocation).addTo(map.current)
  }, [userLocation, zoom])

  return (
    <div
      ref={mapContainer}
      className="w-full h-[500px] rounded-lg"
    />
  )
}
