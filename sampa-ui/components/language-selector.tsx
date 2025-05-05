"use client"

import { useLanguage } from "@/lib/i18n/language-context"
import type { SupportedLanguage } from "@/lib/i18n/translations"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { useEffect, useState } from "react"

export default function LanguageSelector() {
  const { language, setLanguage, t, isLoaded } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // No renderizar nada hasta que el componente esté montado y el idioma esté cargado
  if (!mounted || !isLoaded) {
    return null
  }

  const languages: { code: SupportedLanguage; name: string }[] = [
    { code: "es", name: t("languages.es") },
    { code: "en", name: t("languages.en") },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
          <Globe className="h-5 w-5" />
          <span className="sr-only">{t("common.languageSelector")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={language === lang.code ? "bg-muted" : ""}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
