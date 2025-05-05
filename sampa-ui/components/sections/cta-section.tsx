import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-rose-500 text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              ¿Listo para revolucionar el cuidado de mascotas?
            </h2>
            <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Únete a nuestra plataforma y forma parte de la comunidad que está transformando el cuidado animal en
              Argentina
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button size="lg" className="bg-white text-rose-500 hover:bg-gray-100">
              Regístrate ahora
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-rose-600">
              Contactar
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
