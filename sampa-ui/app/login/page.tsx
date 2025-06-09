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
import {TEXTS} from "/constants.ts"

export default function LoginPage() {
  const { t, isLoaded } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  })

  useEffect(() => {
    setMounted(true)

    // Mostrar mensaje de éxito si viene de registro
    if (searchParams.get("registered") === "true") {
      setShowSuccessMessage(true)
      const timer = setTimeout(() => setShowSuccessMessage(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      // Preparar los datos para enviar a la API
      const loginData = {
        identifier: formData.identifier,
        password: formData.password,
      }

      // Hacer la solicitud a la API
      const response = await fetch("http://localhost:8080/api/sampa/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      })

      if (!response.ok) {
        // Si la respuesta no es exitosa, intentar obtener el mensaje de error
        const errorData = await response.json().catch(() => null)
        throw new Error(
          errorData?.message ||
            (response.status === 401 ? TEXTS.auth.login.invalidCredentials : `Error: ${response.status}`),
        )
      }

      // Inicio de sesión exitoso
      const data = await response.json()

      // Aquí podrías guardar el token o información de sesión si la API lo devuelve
      // Por ejemplo: localStorage.setItem('token', data.token)

      // Redirigir al usuario a la página principal o dashboard
      router.push("/")
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error)
      setError(error instanceof Error ? error.message : "Error durante el inicio de sesión")
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
          <span className="text-2xl font-bold text-rose-500">{TEXTS.common.appName}</span>
        </Link>
        <LanguageSelector />
      </div>

      {showSuccessMessage && (
        <Alert className="mb-4 bg-green-50 text-green-800 border-green-200 w-full max-w-md">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription>{TEXTS.auth.login.successMessage}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert className="mb-4 bg-red-50 text-red-800 border-red-200 w-full max-w-md">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">{TEXTS.auth.login.title}</CardTitle>
          <CardDescription className="text-center">{TEXTS.auth.login.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier">{TEXTS.auth.login.identifier}</Label>
              <Input
                id="identifier"
                name="identifier"
                type="identifier"
                value={formData.identifier}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{TEXTS.auth.login.password}</Label>
                <Link href="/forgot-password" className="text-xs text-rose-500 hover:underline">
                  {TEXTS.auth.login.forgotPassword}
                </Link>
              </div>
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
            <Button type="submit" className="w-full bg-rose-500 hover:bg-rose-600" disabled={isLoading}>
              {isLoading ? TEXTS.auth.login.loadingButton : TEXTS.auth.login.submitButton}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center text-sm">
            {TEXTS.auth.login.signupLink}{" "}
            <Link href="/signup" className="text-rose-500 hover:underline">
              {TEXTS.auth.login.signupLinkText}
            </Link>
          </div>
          <div className="text-center text-xs text-gray-500">{TEXTS.auth.login.termsFooter}</div>
        </CardFooter>
      </Card>
    </div>
  )
}
