"use client"

import { type ReactNode, useEffect, useState } from "react"
import { LanguageProvider } from "@/lib/i18n/language-context"

// Este componente asegura que el LanguageProvider solo se renderice en el cliente
export default function LanguageProviderClient({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    // Renderizar un placeholder o nada mientras se monta el componente
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    )
  }

  return <LanguageProvider>{children}</LanguageProvider>
}
