"use client"

import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/language-context"
import LanguageSelector from "./language-selector"
import { useEffect, useState } from "react"

export default function Header() {
  const { t, isLoaded } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // No renderizar nada hasta que el componente esté montado y el idioma esté cargado
  if (!mounted || !isLoaded) {
    return (
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-rose-500" />
            <span className="text-xl font-bold">PetConnect</span>
          </div>
          <div></div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-rose-500" />
          <span className="text-xl font-bold">{t("common.appName")}</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="#problema" className="transition-colors hover:text-foreground/80">
            {t("navigation.problem")}
          </Link>
          <Link href="#solucion" className="transition-colors hover:text-foreground/80">
            {t("navigation.solution")}
          </Link>
          <Link href="#tecnologia" className="transition-colors hover:text-foreground/80">
            {t("navigation.technology")}
          </Link>
          <Link href="#funcionalidades" className="transition-colors hover:text-foreground/80">
            {t("navigation.features")}
          </Link>
          <Link href="#valor" className="transition-colors hover:text-foreground/80">
            {t("navigation.value")}
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <Button>{t("common.contactButton")}</Button>
        </div>
      </div>
    </header>
  )
}
