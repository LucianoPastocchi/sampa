"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useLanguage } from "@/lib/i18n/language-context"
import LanguageSelector from "@/components/language-selector"

export default function SignupPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    // Aquí iría la lógica para enviar los datos al servidor
    // Por ejemplo, usando fetch o una librería como axios

    try {
      // Simulación de registro exitoso
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/login?registered=true")
    } catch (error) {
      console.error("Error durante el registro:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-rose-50 to-white p-4">
      <div className="flex items-center justify-between w-full max-w-md mb-8">
        <Link href="/" className="flex items-center gap-2">
          <Heart className="h-8 w-8 text-rose-500" />
          <span className="text-2xl text-black font-bold">{t("common.appName")}</span>
        </Link>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">{t("auth.signup.title")}</CardTitle>
          <CardDescription className="text-center">{t("auth.signup.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t("auth.signup.firstName")}</Label>
                <Input id="firstName" placeholder="Juan" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{t("auth.signup.lastName")}</Label>
                <Input id="lastName" placeholder="Pérez" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.signup.email")}</Label>
              <Input id="email" type="email" placeholder="tu@email.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("auth.signup.password")}</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t("auth.signup.confirmPassword")}</Label>
              <Input id="confirmPassword" type="password" required />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-sm">
                {t("auth.signup.terms")}{" "}
                <Link href="/terms" className="text-rose-500 hover:underline">
                  términos y condiciones
                </Link>
              </Label>
            </div>
            <Button type="submit" className="w-full bg-rose-500 hover:bg-rose-600" disabled={isLoading}>
              {isLoading ? t("auth.signup.loadingButton") : t("auth.signup.submitButton")}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center text-sm">
            {t("auth.signup.loginLink")}{" "}
            <Link href="/login" className="text-rose-500 hover:underline">
              {t("auth.signup.loginLinkText")}
            </Link>
          </div>
          <div className="text-center text-xs text-gray-500">{t("auth.signup.termsFooter")}</div>
        </CardFooter>
      </Card>
    </div>
  )
}
