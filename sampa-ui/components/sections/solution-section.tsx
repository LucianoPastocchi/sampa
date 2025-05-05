"use client"

import { InfoCard } from "@/components/ui/info-card"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n/language-context"

export default function SolutionSection() {
  const { t } = useLanguage()
  const solutionItems = t("solution.items")

  return (
    <section id="solucion" className="w-full py-12 md:py-24 lg:py-32 bg-rose-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("solution.title")}</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("solution.description")}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <div className="flex items-center justify-center order-2 lg:order-1">
            <Image
              src="/placeholder.svg?height=400&width=400"
              width={400}
              height={400}
              alt="Solución PetConnect"
              className="rounded-xl object-cover shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-center space-y-4 order-1 lg:order-2">
            <ul className="grid gap-6">
              {solutionItems.map((item: any, index: number) => (
                <InfoCard key={index} title={item.title} description={item.description} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
