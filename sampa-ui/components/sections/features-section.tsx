"use client"

import { FeatureCard } from "@/components/ui/feature-card"
import { MapPin, Calendar, CreditCard, Star } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export default function FeaturesSection() {
  const { t } = useLanguage()
  const featuresItems = t("features.items")

  return (
    <section id="funcionalidades" className="w-full py-12 md:py-24 lg:py-32 bg-rose-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("features.title")}</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("features.description")}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mt-12">
          {featuresItems.map((item: any, index: number) => {
            let icon
            if (item.title === "Geolocalización" || item.title === "Geolocation")
              icon = <MapPin className="h-10 w-10 text-rose-500" />
            else if (item.title === "Reservas" || item.title === "Reservations")
              icon = <Calendar className="h-10 w-10 text-rose-500" />
            else if (item.title === "Pagos" || item.title === "Payments")
              icon = <CreditCard className="h-10 w-10 text-rose-500" />
            else if (item.title === "Calificaciones" || item.title === "Ratings")
              icon = <Star className="h-10 w-10 text-rose-500" />

            return <FeatureCard key={index} icon={icon} title={item.title} description={item.description} />
          })}
        </div>
      </div>
    </section>
  )
}
