"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Heart, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useLanguage } from "@/lib/i18n/language-context"
import LanguageSelector from "@/components/language-selector"

export default function LoginPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  useEffect(() => {
    // Mostrar mensaje de éxito si viene de registro
    if (searchParams.get("registered") === "true") {
      setShowSuccessMessage(true)
      const timer = setTimeout(() => setShowSuccessMessage(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [searchParams])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    // Aquí iría la lógica para enviar los datos al servidor
    // Por ejemplo, usando fetch o una librería como axios

    try {
      // Simulación de inicio de sesión exitoso
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/")
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-rose-50 to-white p-4">
      <div className="flex items-center justify-between w-full max-w-md mb-8">
        <Link href="/" className="flex items-center gap-2">
          <Heart className="h-8 w-8 text-rose-500" />
          <span className="text-2xl font-bold">{t("common.appName")}</span>
        </Link>
        <LanguageSelector />
      </div>

      {showSuccessMessage && (
        <Alert className="mb-4 bg-green-50 text-green-800 border-green-200 w-full max-w-md">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription>{t("auth.login.successMessage")}</AlertDescription>
        </Alert>
      )}

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">{t("auth.login.title")}</CardTitle>
          <CardDescription className="text-center">{t("auth.login.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.login.email")}</Label>
              <Input id="email" type="email" placeholder="tu@email.com" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t("auth.login.password")}</Label>
                <Link href="/forgot-password" className="text-xs text-rose-500 hover:underline">
                  {t("auth.login.forgotPassword")}
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full bg-rose-500 hover:bg-rose-600" disabled={isLoading}>
              {isLoading ? t("auth.login.loadingButton") : t("auth.login.submitButton")}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center text-sm">
            {t("auth.login.signupLink")}{" "}
            <Link href="/signup" className="text-rose-500 hover:underline">
              {t("auth.login.signupLinkText")}
            </Link>
          </div>
          <div className="text-center text-xs text-gray-500">{t("auth.login.termsFooter")}</div>
        </CardFooter>
      </Card>
    </div>
  )
}
