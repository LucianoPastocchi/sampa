"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Heart, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useLanguage } from "@/lib/i18n/language-context"
import LanguageSelector from "@/components/language-selector"

export default function ForgotPasswordPage() {
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    // Aquí iría la lógica para enviar el correo de recuperación
    // Por ejemplo, usando fetch o una librería como axios

    try {
      // Simulación de envío exitoso
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error durante el envío:", error)
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

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">{t("auth.forgotPassword.title")}</CardTitle>
          <CardDescription className="text-center">{t("auth.forgotPassword.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className="space-y-4">
              <Alert className="bg-green-50 text-green-800 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription>{t("auth.forgotPassword.successMessage").replace("{email}", email)}</AlertDescription>
              </Alert>
              <Button asChild className="w-full">
                <Link href="/login">{t("auth.forgotPassword.loginLink")}</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("auth.forgotPassword.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full bg-rose-500 hover:bg-rose-600" disabled={isLoading}>
                {isLoading ? t("auth.forgotPassword.loadingButton") : t("auth.forgotPassword.submitButton")}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/login" className="text-sm text-rose-500 hover:underline">
            {t("auth.forgotPassword.loginLink")}
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
