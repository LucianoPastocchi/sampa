import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-rose-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Conectando dueños de mascotas con cuidadores profesionales
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl">
                Plataforma digital que conecta paseadores, cuidadores de perros y particulares con dueños de mascotas en
                entornos urbanos de Argentina.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="bg-rose-500 hover:bg-rose-600">
                Conocer más
              </Button>
              <Button size="lg" variant="outline">
                Registrarse
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=550&width=450"
              width={450}
              height={550}
              alt="Aplicación PetConnect"
              className="rounded-xl object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
