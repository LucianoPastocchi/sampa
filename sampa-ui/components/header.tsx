"use client"

import { Button } from "@/components/ui/button"
import { Heart, Search } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/i18n/language-context"
import LanguageSelector from "./language-selector"
import { useEffect, useState } from "react"

export default function Header() {
  const { t, isLoaded } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSearchClick = () => {
    router.push("/buscar")
  }

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
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <Heart className="h-6 w-6 text-rose-500" />
              <span className="text-xl font-bold">{t("common.appName")}</span>
            </div>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/search" className="transition-colors hover:text-foreground/80">
            Hogares
          </Link>
          <Link href="/walkers" className="transition-colors hover:text-foreground/80">
            Encontrale su paseador
          </Link>
        </nav>
        <div className="flex items-center gap-2">
            <Link href="/publishTransitHome" className="transition-colors hover:text-foreground/80">
               Ofrecé tu hogar
            </Link>
          <LanguageSelector />
          <Link href="/login">
             <Button>Iniciar Sesión</Button>
          </Link>
          <Link href="/signup">
              <Button size="lg" className="bg-rose-500 hover:bg-rose-600">
                Registrarse
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
