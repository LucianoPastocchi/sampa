import { FeatureCard } from "@/components/ui/feature-card"
import { MapPin, Calendar, CreditCard, Star } from "lucide-react"

export default function FeaturesSection() {
  return (
    <section id="funcionalidades" className="w-full py-12 md:py-24 lg:py-32 bg-rose-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Funcionalidades principales</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Nuestra plataforma ofrece herramientas avanzadas para facilitar el cuidado de mascotas
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mt-12">
          <FeatureCard
            icon={<MapPin className="h-10 w-10 text-rose-500" />}
            title="Geolocalización"
            description="Encuentra servicios cercanos a tu ubicación con mapeo en tiempo real"
          />
          <FeatureCard
            icon={<Calendar className="h-10 w-10 text-rose-500" />}
            title="Reservas"
            description="Sistema de reservas flexible para programar servicios de cuidado"
          />
          <FeatureCard
            icon={<CreditCard className="h-10 w-10 text-rose-500" />}
            title="Pagos"
            description="Pasarela de pagos segura para transacciones sin complicaciones"
          />
          <FeatureCard
            icon={<Star className="h-10 w-10 text-rose-500" />}
            title="Calificaciones"
            description="Sistema de valoraciones para garantizar la calidad del servicio"
          />
        </div>
      </div>
    </section>
  )
}
