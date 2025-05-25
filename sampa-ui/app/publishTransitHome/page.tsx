"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import PublishStepper from "@/components/publishTransitHome/publishStepper"
import BasicInfoStep from "@/components/publishTransitHome/steps/basicInfoStep"
import LocationStep from "@/components/publishTransitHome/steps/locationStep"
import PhotosStep from "@/components/publishTransitHome/steps/photosStep"
import AmenitiesStep from "@/components/publishTransitHome/steps/amenitiesStep"
import PetsStep from "@/components/publishTransitHome/steps/petsStep"
import PricingStep from "@/components/publishTransitHome/steps/pricingStep"
import RulesStep from "@/components/publishTransitHome/steps/rulesStep"
import PreviewStep from "@/components/publishTransitHome/steps/previewStep"
import { useLanguage } from "@/lib/i18n/language-context"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function PublishTransitHomePage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    basicInfo: {
      title: "",
      description: "",
      type: "",
      size: "",
    },
    location: {
      address: "",
      city: "",
      state: "",
      zipCode: "",
      coordinates: { lat: 0, lng: 0 },
    },
    photos: [] as string[],
    amenities: [] as string[],
    pets: {
      types: [] as string[],
      maxCount: 1,
      sizes: [] as string[],
    },
    pricing: {
      basePrice: 0,
      cleaningFee: 0,
      discount: {
        weekly: 0,
        monthly: 0,
      },
    },
    rules: {
      houseRules: [] as string[],
      customRules: [] as string[],
    },
  })

  const steps = [
    {
      id: "basic-info",
      title: t("publish.steps.basicInfo") || "Información básica",
      component: (
        <BasicInfoStep
          data={formData.basicInfo}
          updateData={(data) => setFormData({ ...formData, basicInfo: { ...formData.basicInfo, ...data } })}
        />
      ),
    },
    {
      id: "location",
      title: t("publish.steps.location") || "Ubicación",
      component: (
        <LocationStep
          data={formData.location}
          updateData={(data) => setFormData({ ...formData, location: { ...formData.location, ...data } })}
        />
      ),
    },
    {
      id: "photos",
      title: t("publish.steps.photos") || "Fotos",
      component: <PhotosStep data={formData.photos} updateData={(photos) => setFormData({ ...formData, photos })} />,
    },
    {
      id: "amenities",
      title: t("publish.steps.amenities") || "Comodidades",
      component: (
        <AmenitiesStep data={formData.amenities} updateData={(amenities) => setFormData({ ...formData, amenities })} />
      ),
    },
    {
      id: "pets",
      title: t("publish.steps.pets") || "Mascotas",
      component: (
        <PetsStep
          data={formData.pets}
          updateData={(pets) => setFormData({ ...formData, pets: { ...formData.pets, ...pets } })}
        />
      ),
    },
    {
      id: "pricing",
      title: t("publish.steps.pricing") || "Precios",
      component: (
        <PricingStep
          data={formData.pricing}
          updateData={(pricing) => setFormData({ ...formData, pricing: { ...formData.pricing, ...pricing } })}
        />
      ),
    },
    {
      id: "rules",
      title: t("publish.steps.rules") || "Reglas",
      component: (
        <RulesStep
          data={formData.rules}
          updateData={(rules) => setFormData({ ...formData, rules: { ...formData.rules, ...rules } })}
        />
      ),
    },
    {
      id: "preview",
      title: t("publish.steps.preview") || "Vista previa",
      component: <PreviewStep data={formData} />,
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = async () => {
    try {
      // Aquí iría la lógica para enviar los datos al backend
      console.log("Datos del formulario:", formData)

      // Simulamos una espera
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirigimos al usuario a una página de confirmación
      router.push("/publicar/confirmacion")
    } catch (error) {
      console.error("Error al publicar el hogar:", error)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2 text-white">{t("publish.title") || "Publicar tu hogar de tránsito"}</h1>
      <p className="text-gray-600 mb-8">
        {t("publish.subtitle") || "Comparte tu espacio y ayuda a mascotas que necesitan un hogar temporal"}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <PublishStepper steps={steps.map((s) => s.title)} currentStep={currentStep} />

            <Alert className="mt-6 bg-blue-50 border-blue-200">
              <AlertDescription>
                {t("publish.helpText") || "¿Necesitas ayuda? Contáctanos y te guiaremos en el proceso de publicación."}
              </AlertDescription>
            </Alert>
          </div>
        </div>

        <div className="lg:col-span-3">
          <Card className="p-6">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">{steps[currentStep].title}</h2>
              {steps[currentStep].component}
            </div>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                {t("common.previous") || "Anterior"}
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button onClick={handleNext} className="flex items-center gap-2">
                  {t("common.next") || "Siguiente"}
                  <ArrowRight size={16} />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="bg-rose-500 hover:bg-rose-600">
                  {t("publish.submit") || "Publicar hogar"}
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
