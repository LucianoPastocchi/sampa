"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/i18n/language-context"
import { Star, MapPin, Heart } from "lucide-react"
import type { HomeData } from "@/app/buscar/page"

interface HomeCardProps {
  home: HomeData
}

export function HomeCard({ home }: HomeCardProps) {
  const { t } = useLanguage()
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  return (
    <Link href={`/hogar/${home.id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
        <div className="relative">
          <div className="aspect-[4/3] relative overflow-hidden">
            <Image
              src={home.images[0] || "/placeholder.svg"}
              alt={home.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          <button
            onClick={toggleFavorite}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
          >
            <Heart size={18} className={isFavorite ? "fill-rose-500 text-rose-500" : "text-gray-500"} />
          </button>
        </div>

        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-lg">{home.name}</h3>
              <div className="flex items-center text-gray-500 text-sm">
                <MapPin size={14} className="mr-1" />
                <span>{home.address}</span>
              </div>
            </div>
            <div className="flex items-center">
              <Star size={16} className="text-yellow-500 mr-1" />
              <span className="font-medium">{home.rating}</span>
              <span className="text-gray-500 text-sm ml-1">({home.reviewCount})</span>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{home.description}</p>

          <div className="flex flex-wrap gap-1 mb-3">
            {home.petTypes.map((type, index) => (
              <Badge key={index} variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">
                {type}
              </Badge>
            ))}
            {home.amenities.slice(0, 2).map((amenity, index) => (
              <Badge key={index} variant="outline" className="bg-gray-50">
                {amenity}
              </Badge>
            ))}
            {home.amenities.length > 2 && (
              <Badge variant="outline" className="bg-gray-50">
                +{home.amenities.length - 2}
              </Badge>
            )}
          </div>

          <div className="flex justify-between items-center">
            <div>
              <span className="font-semibold text-lg">${home.price}</span>
              <span className="text-gray-500 text-sm"> / noche</span>
            </div>
            <Button size="sm" className="bg-rose-500 hover:bg-rose-600">
              {t("search.viewDetails") || "Ver detalles"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
