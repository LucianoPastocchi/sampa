"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/language-context"
import { useEffect, useState } from "react"

export default function HeroSection() {
  const { t, isLoaded } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // No renderizar nada hasta que el componente esté montado y el idioma esté cargado
  if (!mounted || !isLoaded) {
    return <div className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-rose-50 to-white"></div>
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-rose-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">{t("hero.title")}</h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl">{t("hero.description")}</p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="bg-rose-500 hover:bg-rose-600">
                {t("hero.learnMoreButton")}
              </Button>
              <Link href="/signup">
                <Button size="lg" variant="outline">
                  {t("hero.signUpButton")}
                </Button>
              </Link>
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
