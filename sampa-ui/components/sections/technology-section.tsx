"use client"

import { TechCard } from "@/components/ui/tech-card"
import { BarChart, Shield } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export default function TechnologySection() {
  const { t } = useLanguage()
  const technologyItems = t("technology.items")

  return (
    <section id="tecnologia" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("technology.title")}</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("technology.description")}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {technologyItems.map((item: any, index: number) => (
            <TechCard
              key={index}
              title={item.title}
              icon={
                item.title.includes("Arquitectura") || item.title.includes("Metodología") ? (
                  <BarChart className="h-4 w-4 text-rose-500" />
                ) : (
                  <Shield className="h-4 w-4 text-rose-500" />
                )
              }
              technology={item.technology}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
