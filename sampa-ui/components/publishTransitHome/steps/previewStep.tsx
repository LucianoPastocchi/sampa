"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, DollarSign, Check, AlertCircle, Home, PawPrintIcon as Paw, Sparkles, ScrollText } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

interface PreviewStepProps {
  data: any // Usamos any para simplificar, pero en una implementación real deberíamos definir un tipo completo
}

export default function PreviewStep({ data }: PreviewStepProps) {
  const { t } = useLanguage()

  // Verificar si hay datos faltantes importantes
  const missingFields = []
  if (!data.basicInfo.title) missingFields.push(t("publish.preview.missingTitle") || "Título")
  if (!data.basicInfo.description) missingFields.push(t("publish.preview.missingDescription") || "Descripción")
  if (!data.location.address) missingFields.push(t("publish.preview.missingAddress") || "Dirección")
  if (data.photos.length === 0) missingFields.push(t("publish.preview.missingPhotos") || "Fotos")
  if (data.pets.types.length === 0) missingFields.push(t("publish.preview.missingPetTypes") || "Tipos de mascotas")
  if (data.pricing.basePrice <= 0) missingFields.push(t("publish.preview.missingPrice") || "Precio base")

  return (
    <div className="space-y-6">
      {missingFields.length > 0 && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-start">
              <AlertCircle className="text-yellow-500 mr-3 mt-0.5" size={20} />
              <div>
                <h3 className="font-medium text-yellow-800 mb-2">
                  {t("publish.preview.missingInfo") || "Información faltante"}
                </h3>
                <p className="text-sm text-yellow-700 mb-2">
                  {t("publish.preview.completeFields") || "Por favor completa los siguientes campos antes de publicar:"}
                </p>
                <ul className="list-disc pl-5 text-sm text-yellow-700">
                  {missingFields.map((field, index) => (
                    <li key={index}>{field}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-6">
        <h3 className="text-xl font-semibold">
          {data.basicInfo.title || t("publish.preview.defaultTitle") || "Tu hogar de tránsito"}
        </h3>

        {/* Galería de fotos */}
        <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-gray-100">
          {data.photos.length > 0 ? (
            <Image
              src={data.photos[0] || "/placeholder.svg"}
              alt={data.basicInfo.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">{t("publish.preview.noPhotos") || "No hay fotos disponibles"}</p>
            </div>
          )}
        </div>

        {/* Miniaturas */}
        {data.photos.length > 1 && (
          <div className="grid grid-cols-5 gap-2">
            {data.photos.slice(1, 6).map((photo: string, index: number) => (
              <div key={index} className="relative aspect-square rounded-md overflow-hidden">
                <Image src={photo || "/placeholder.svg"} alt={`Photo ${index + 2}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        )}

        <Tabs defaultValue="details">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="details" className="flex items-center gap-2">
              <Home size={16} />
              {t("publish.preview.details") || "Detalles"}
            </TabsTrigger>
            <TabsTrigger value="pets" className="flex items-center gap-2">
              <Paw size={16} />
              {t("publish.preview.pets") || "Mascotas"}
            </TabsTrigger>
            <TabsTrigger value="amenities" className="flex items-center gap-2">
              <Sparkles size={16} />
              {t("publish.preview.amenities") || "Comodidades"}
            </TabsTrigger>
            <TabsTrigger value="rules" className="flex items-center gap-2">
              <ScrollText size={16} />
              {t("publish.preview.rules") || "Reglas"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">{t("publish.preview.description") || "Descripción"}</h4>
              <p className="text-gray-600">
                {data.basicInfo.description || t("publish.preview.noDescription") || "Sin descripción"}
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">{t("publish.preview.location") || "Ubicación"}</h4>
              <div className="flex items-start">
                <MapPin size={18} className="text-gray-500 mr-2 mt-0.5" />
                <div>
                  {data.location.address ? (
                    <>
                      <p>{data.location.address}</p>
                      <p>
                        {data.location.city}, {data.location.state} {data.location.zipCode}
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-500">{t("publish.preview.noLocation") || "Ubicación no especificada"}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">{t("publish.preview.spaceType") || "Tipo de espacio"}</h4>
              <div className="flex flex-wrap gap-2">
                {data.basicInfo.type ? (
                  <Badge variant="outline">
                    {data.basicInfo.type === "house"
                      ? t("publish.basicInfo.typeHouse") || "Casa"
                      : data.basicInfo.type === "apartment"
                        ? t("publish.basicInfo.typeApartment") || "Apartamento"
                        : t("publish.basicInfo.typeOther") || "Otro"}
                  </Badge>
                ) : null}
                {data.basicInfo.size ? (
                  <Badge variant="outline">
                    {data.basicInfo.size === "small"
                      ? t("publish.basicInfo.sizeSmall") || "Pequeño (< 50m²)"
                      : data.basicInfo.size === "medium"
                        ? t("publish.basicInfo.sizeMedium") || "Mediano (50-100m²)"
                        : t("publish.basicInfo.sizeLarge") || "Grande (> 100m²)"}
                  </Badge>
                ) : null}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">{t("publish.preview.pricing") || "Precios"}</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <DollarSign size={18} className="text-gray-500 mr-2" />
                  <span className="font-medium">${data.pricing.basePrice || 0}</span>
                  <span className="text-gray-500 ml-1">{t("publish.preview.perNight") || "por noche"}</span>
                </div>
                {data.pricing.cleaningFee > 0 && (
                  <div className="flex items-center">
                    <span className="text-gray-500 ml-6">
                      ${data.pricing.cleaningFee} {t("publish.preview.cleaningFee") || "tarifa de limpieza"}
                    </span>
                  </div>
                )}
                {data.pricing.discount.weekly > 0 && (
                  <div className="flex items-center">
                    <span className="text-gray-500 ml-6">
                      {data.pricing.discount.weekly}% {t("publish.preview.weeklyDiscount") || "descuento semanal"}
                    </span>
                  </div>
                )}
                {data.pricing.discount.monthly > 0 && (
                  <div className="flex items-center">
                    <span className="text-gray-500 ml-6">
                      {data.pricing.discount.monthly}% {t("publish.preview.monthlyDiscount") || "descuento mensual"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pets" className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">{t("publish.preview.acceptedPets") || "Mascotas aceptadas"}</h4>
              {data.pets.types.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {data.pets.types.map((type: string, index: number) => (
                    <Badge key={index} variant="outline" className="bg-rose-50 text-rose-700">
                      {type}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">
                  {t("publish.preview.noPetTypes") || "No se han especificado tipos de mascotas"}
                </p>
              )}
            </div>

            <div>
              <h4 className="font-medium mb-2">{t("publish.preview.petSizes") || "Tamaños aceptados"}</h4>
              {data.pets.sizes.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {data.pets.sizes.map((size: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {size}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">
                  {t("publish.preview.noPetSizes") || "No se han especificado tamaños de mascotas"}
                </p>
              )}
            </div>

            <div>
              <h4 className="font-medium mb-2">{t("publish.preview.maxPets") || "Número máximo de mascotas"}</h4>
              <p>{data.pets.maxCount}</p>
            </div>
          </TabsContent>

          <TabsContent value="amenities" className="space-y-4">
            {data.amenities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.amenities.map((amenity: string, index: number) => (
                  <div key={index} className="flex items-center">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">
                {t("publish.preview.noAmenities") || "No se han especificado comodidades"}
              </p>
            )}
          </TabsContent>

          <TabsContent value="rules" className="space-y-4">
            {data.rules.houseRules.length > 0 || data.rules.customRules.length > 0 ? (
              <div className="space-y-4">
                {data.rules.houseRules.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">{t("publish.preview.houseRules") || "Reglas de la casa"}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {data.rules.houseRules.map((rule: string, index: number) => (
                        <div key={index} className="flex items-center">
                          <Check size={16} className="text-blue-500 mr-2" />
                          <span>{rule}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {data.rules.customRules.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">{t("publish.preview.customRules") || "Reglas personalizadas"}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {data.rules.customRules.map((rule: string, index: number) => (
                        <div key={index} className="flex items-center">
                          <Check size={16} className="text-blue-500 mr-2" />
                          <span>{rule}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500">{t("publish.preview.noRules") || "No se han especificado reglas"}</p>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <h3 className="font-medium text-green-800 mb-2">
            {t("publish.preview.readyToPublish") || "¿Listo para publicar?"}
          </h3>
          <p className="text-sm text-green-700">
            {t("publish.preview.publishNote") ||
              "Revisa toda la información antes de publicar. Una vez publicado, tu hogar estará disponible para que los dueños de mascotas lo reserven."}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
