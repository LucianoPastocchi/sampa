"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { type SupportedLanguage, getTranslation, es } from "./translations"

type LanguageContextType = {
  language: SupportedLanguage
  setLanguage: (lang: SupportedLanguage) => void
  t: (key: string) => any
  isLoaded: boolean
}

// Crear el contexto con un valor por defecto para evitar el error durante la hidratación
const defaultContextValue: LanguageContextType = {
  language: "es",
  setLanguage: () => {},
  t: (key: string) => {
    // Función de fallback que devuelve el texto en español
    const keys = key.split(".")
    let result: any = es
    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k]
      } else {
        return undefined
      }
    }
    return result
  },
  isLoaded: false,
}

const LanguageContext = createContext<LanguageContextType>(defaultContextValue)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>("es")
  const [isLoaded, setIsLoaded] = useState(false)

  // Función para establecer el idioma y guardarlo en localStorage
  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang)
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("language", lang)
      } catch (error) {
        console.error("Error al guardar el idioma:", error)
      }
    }
  }

  // Función para obtener traducciones
  const t = (key: string) => {
    return getTranslation(language, key)
  }

  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === "undefined") return

    try {
      // Intentar obtener el idioma guardado en localStorage
      const savedLanguage = localStorage.getItem("language") as SupportedLanguage | null

      if (savedLanguage && (savedLanguage === "es" || savedLanguage === "en")) {
        setLanguageState(savedLanguage)
      } else {
        // Si no hay idioma guardado, detectar el idioma del navegador
        if (typeof navigator !== "undefined" && navigator.language) {
          const browserLanguage = navigator.language.split("-")[0]
          if (browserLanguage === "es" || browserLanguage === "en") {
            setLanguageState(browserLanguage as SupportedLanguage)
          }
        }
        // Si el idioma del navegador no es soportado, se mantiene el valor por defecto (es)
      }
    } catch (error) {
      console.error("Error al detectar el idioma:", error)
      // Mantener el idioma por defecto en caso de error
    } finally {
      // Marcar como cargado independientemente del resultado
      setIsLoaded(true)
    }
  }, [])

  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    t,
    isLoaded,
  }

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>
}

// Hook personalizado para usar el contexto de idioma
export function useLanguage() {
  const context = useContext(LanguageContext)
  return context
}
