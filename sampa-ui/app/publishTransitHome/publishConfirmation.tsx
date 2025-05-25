"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Home, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import Link from "next/link"

export default function PublishConfirmationPage() {
  const { t } = useLanguage()
  const router = useRouter()

  // Simular una redirección si el usuario accede directamente a esta página
  useEffect(() => {
    const hasPublished = sessionStorage.getItem("hasPublishedHome")
    if (!hasPublished) {
      // En una implementación real, verificaríamos si el usuario realmente publicó un hogar
      sessionStorage.setItem("hasPublishedHome", "true")
    }
  }, [router])

  return (
    <div className="container mx-auto py-16 px-4 text-center">
      <div className="max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle size={48} className="text-green-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4">
          {t("publish.confirmation.title") || "¡Tu hogar ha sido publicado con éxito!"}
        </h1>

        <p className="text-gray-600 mb-8">
          {t("publish.confirmation.description") ||
            "Tu hogar ya está disponible para que los dueños de mascotas lo encuentren y reserven."}
        </p>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="font-semibold mb-4">{t("publish.confirmation.nextSteps") || "Próximos pasos"}</h2>
            <ul className="text-left space-y-4">
              <li className="flex items-start">
                <div className="bg-rose-100 p-1 rounded-full mr-3 mt-0.5">
                  <span className="text-rose-600 text-xs font-bold">1</span>
                </div>
                <span>
                  {t("publish.confirmation.step1") ||
                    "Completa tu perfil para generar más confianza en los dueños de mascotas."}
                </span>
              </li>
              <li className="flex items-start">
                <div className="bg-rose-100 p-1 rounded-full mr-3 mt-0.5">
                  <span className="text-rose-600 text-xs font-bold">2</span>
                </div>
                <span>
                  {t("publish.confirmation.step2") ||
                    "Configura tu calendario de disponibilidad para recibir reservas."}
                </span>
              </li>
              <li className="flex items-start">
                <div className="bg-rose-100 p-1 rounded-full mr-3 mt-0.5">
                  <span className="text-rose-600 text-xs font-bold">3</span>
                </div>
                <span>
                  {t("publish.confirmation.step3") ||
                    "Responde rápidamente a las solicitudes para aumentar tus posibilidades de reserva."}
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" className="flex items-center gap-2">
            <Link href="/mi-hogar">
              <Home size={16} />
              {t("publish.confirmation.viewListing") || "Ver mi anuncio"}
            </Link>
          </Button>

          <Button asChild className="bg-rose-500 hover:bg-rose-600 flex items-center gap-2">
            <Link href="/">
              {t("publish.confirmation.backToHome") || "Volver al inicio"}
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
