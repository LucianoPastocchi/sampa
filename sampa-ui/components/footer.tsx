"use client"

import { Heart } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/language-context"
import { useEffect, useState } from "react"

export default function Footer() {
  const { t, isLoaded } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // No renderizar nada hasta que el componente esté montado y el idioma esté cargado
  if (!mounted || !isLoaded) {
    return (
      <footer className="w-full border-t bg-background py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-rose-500" />
              <span className="text-lg font-bold">PetConnect</span>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-rose-500" />
            <span className="text-lg font-bold">{t("common.appName")}</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="#" className="text-gray-500 hover:text-gray-900">
              {t("common.termsLink")}
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900">
              {t("common.privacyLink")}
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900">
              {t("common.contactLink")}
            </Link>
          </div>
          <div className="md:ml-auto flex items-center gap-4">
            <p className="text-sm text-gray-500">{t("common.copyright")}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
