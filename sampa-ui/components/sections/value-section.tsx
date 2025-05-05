"use client"

import { InfoCard } from "@/components/ui/info-card"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n/language-context"

export default function ValueSection() {
  const { t } = useLanguage()
  const valueItems = t("value.items")

  return (
    <section id="valor" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("value.title")}</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("value.description")}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <div className="flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=400&width=400"
              width={400}
              height={400}
              alt="Valor agregado"
              className="rounded-xl object-cover shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <ul className="grid gap-6">
              {valueItems.map((item: any, index: number) => (
                <InfoCard key={index} title={item.title} description={item.description} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
