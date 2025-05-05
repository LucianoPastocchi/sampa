"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SignupPage() {
  const { t, isLoaded } = useLanguage()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    userName: "",
    idCard: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    // Validación básica
    if (formData.password !== formData.confirmPassword) {
      setError(t("auth.signup.passwordMismatch") || "Las contraseñas no coinciden")
      return
    }

    if (formData.password.length < 6) {
      setError(t("auth.signup.passwordTooShort") || "La contraseña debe tener al menos 6 caracteres")
      return
    }

    setIsLoading(true)

    try {
      // Preparar los datos para enviar a la API
      const userData = {
        name: formData.name,
        lastName: formData.lastName,
        userName: formData.userName,
        idCard: formData.idCard,
        email: formData.email,
        password: formData.password,
      }

      // Hacer la solicitud a la API
      const response = await fetch("http://localhost:8080/api/sampa/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        // Si la respuesta no es exitosa, intentar obtener el mensaje de error
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || `Error: ${response.status}`)
      }

      // Registro exitoso, redirigir a la página de login
      router.push("/login?registered=true")
    } catch (error) {
      console.error("Error durante el registro:", error)
      setError(error instanceof Error ? error.message : "Error durante el registro")
    } finally {
      setIsLoading(false)
    }
  }

  // No renderizar nada hasta que el componente esté montado y el idioma esté cargado
  if (!mounted || !isLoaded) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-rose-50 to-white p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    )
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

      {error && (
        <Alert className="mb-4 bg-red-50 text-red-800 border-red-200 w-full max-w-md">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">{t("auth.signup.title")}</CardTitle>
          <CardDescription className="text-center">{t("auth.signup.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t("auth.signup.firstName")}</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Juan"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{t("auth.signup.lastName")}</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Pérez"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="userName">{t("auth.signup.userName")}</Label>
                <Input
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="Username"
                  required
                />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="idCard">{t("auth.signup.idCard")}</Label>
                  <Input
                    id="idCard"
                    name="idCard"
                    value={formData.idCard}
                    onChange={handleChange}
                    placeholder="DNI"
                    required
                  />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.signup.email")}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("auth.signup.password")}</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-eye-off"
                    >
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                      <line x1="2" x2="22" y1="2" y2="22"></line>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-eye"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t("auth.signup.confirmPassword")}</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-eye-off"
                    >
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                      <line x1="2" x2="22" y1="2" y2="22"></line>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-eye"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, acceptTerms: checked === true }))}
                required
              />
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
