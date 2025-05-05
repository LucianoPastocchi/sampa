import { TechCard } from "@/components/ui/tech-card"
import { BarChart, Shield, Users } from "lucide-react"

export default function TechnologySection() {
  return (
    <section id="tecnologia" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Arquitectura tecnológica</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Implementamos una arquitectura moderna y escalable para garantizar la mejor experiencia
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <TechCard
            title="Arquitectura MVC"
            icon={<BarChart className="h-4 w-4 text-rose-500" />}
            technology="Spring Boot"
            description="Implementación de patrón MVC para una estructura clara y mantenible"
          />
          <TechCard
            title="Frontend"
            icon={<Users className="h-4 w-4 text-rose-500" />}
            technology="ReactJS"
            description="Interfaces dinámicas y responsivas para una experiencia de usuario óptima"
          />
          <TechCard
            title="Despliegue"
            icon={<Shield className="h-4 w-4 text-rose-500" />}
            technology="Docker"
            description="Contenerización para facilitar el despliegue y gestión de la aplicación"
          />
          <TechCard
            title="Arquitectura"
            icon={<Shield className="h-4 w-4 text-rose-500" />}
            technology="Microservicios"
            description="Arquitectura distribuida para mayor escalabilidad y mantenimiento"
          />
          <TechCard
            title="Metodología"
            icon={<BarChart className="h-4 w-4 text-rose-500" />}
            technology="DevOps"
            description="Implementación de principios DevOps para CI/CD y mejora continua"
          />
          <TechCard
            title="Almacenamiento"
            icon={<Users className="h-4 w-4 text-rose-500" />}
            technology="Base de datos"
            description="Sistema de persistencia segura y escalable para los datos"
          />
        </div>
      </div>
    </section>
  )
}
