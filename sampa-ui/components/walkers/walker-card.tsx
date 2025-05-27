"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/i18n/language-context"
import { Star, MapPin, Clock, Award, Shield, MessageCircle } from "lucide-react"
import type { WalkerData } from "@/app/paseadores/page"

interface WalkerCardProps {
  walker: WalkerData
}

export function WalkerCard({ walker }: WalkerCardProps) {
  const { t } = useLanguage()
  const [showDetails, setShowDetails] = useState(false)

  const handleContact = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Aquí iría la lógica para contactar al paseador
    console.log("Contactar a:", walker.name)
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Avatar y información básica */}
          <div className="flex items-start gap-4">
            <div className="relative">
              <Image
                src={walker.avatar || "/placeholder.svg"}
                alt={walker.name}
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
              {walker.verified && (
                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                  <Shield size={12} className="text-white" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg">{walker.name}</h3>
                {walker.verified && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <Shield size={12} className="mr-1" />
                    Verificado
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center">
                  <Star size={16} className="text-yellow-500 mr-1" />
                  <span className="font-medium">{walker.rating}</span>
                  <span className="text-gray-500 text-sm ml-1">({walker.reviewCount} reseñas)</span>
                </div>

                <div className="flex items-center text-gray-500">
                  <Award size={16} className="mr-1" />
                  <span className="text-sm">{walker.experience} años de experiencia</span>
                </div>
              </div>

              <div className="flex items-center text-gray-500 mb-3">
                <MapPin size={14} className="mr-1" />
                <span className="text-sm">{walker.address}</span>
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{walker.description}</p>

              {/* Servicios */}
              <div className="flex flex-wrap gap-1 mb-3">
                {walker.services.slice(0, 3).map((service, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                    {service}
                  </Badge>
                ))}
                {walker.services.length > 3 && (
                  <Badge variant="outline" className="bg-gray-50 text-xs">
                    +{walker.services.length - 3} más
                  </Badge>
                )}
              </div>

              {/* Especialidades */}
              <div className="flex flex-wrap gap-1 mb-3">
                {walker.specialties.slice(0, 2).map((specialty, index) => (
                  <Badge key={index} variant="outline" className="bg-rose-50 text-rose-700 border-rose-200 text-xs">
                    {specialty}
                  </Badge>
                ))}
                {walker.specialties.length > 2 && (
                  <Badge variant="outline" className="bg-gray-50 text-xs">
                    +{walker.specialties.length - 2} especialidades
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Precio y acciones */}
          <div className="md:w-48 flex flex-col justify-between">
            <div className="text-right mb-4">
              <div className="text-2xl font-bold text-rose-600">${walker.pricePerWalk}</div>
              <div className="text-sm text-gray-500">por paseo</div>
              <div className="flex items-center justify-end mt-1">
                <div className={`w-2 h-2 rounded-full mr-2 ${walker.available ? "bg-green-500" : "bg-gray-400"}`}></div>
                <span className="text-xs text-gray-500">{walker.available ? "Disponible" : "No disponible"}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Button onClick={() => setShowDetails(!showDetails)} variant="outline" className="w-full" size="sm">
                {showDetails ? "Ocultar detalles" : "Ver detalles"}
              </Button>
              <Button onClick={handleContact} className="w-full bg-rose-500 hover:bg-rose-600" size="sm">
                <MessageCircle size={14} className="mr-1" />
                Contactar
              </Button>
            </div>
          </div>
        </div>

        {/* Detalles expandidos */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t space-y-4">
            <div>
              <h4 className="font-medium mb-2 flex items-center">
                <Clock size={16} className="mr-2" />
                Horarios disponibles
              </h4>
              <div className="text-sm text-gray-600">
                {walker.schedule.map((time, index) => (
                  <div key={index}>{time}</div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Todos los servicios</h4>
              <div className="flex flex-wrap gap-1">
                {walker.services.map((service, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                    {service}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Especialidades</h4>
              <div className="flex flex-wrap gap-1">
                {walker.specialties.map((specialty, index) => (
                  <Badge key={index} variant="outline" className="bg-rose-50 text-rose-700 border-rose-200 text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
