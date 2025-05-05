"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"

export default function LoginPage() {
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
      <Link href="/" className="mb-8 flex items-center gap-2">
        <Heart className="h-8 w-8 text-rose-500" />
        <span className="text-2xl font-bold">PetConnect</span>
      </Link>

      {showSuccessMessage && (
        <Alert className="mb-4 bg-green-50 text-green-800 border-green-200 w-full max-w-md">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription>¡Registro exitoso! Ahora puedes iniciar sesión con tus credenciales.</AlertDescription>
        </Alert>
      )}

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Iniciar sesión</CardTitle>
          <CardDescription className="text-center">
            Ingresa tus credenciales para acceder a la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="tu@email.com" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <Link href="/forgot-password" className="text-xs text-rose-500 hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full bg-rose-500 hover:bg-rose-600" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center text-sm">
            ¿No tienes una cuenta?{" "}
            <Link href="/signup" className="text-rose-500 hover:underline">
              Registrarse
            </Link>
          </div>
          <div className="text-center text-xs text-gray-500">
            Al iniciar sesión, aceptas nuestros términos de servicio y política de privacidad.
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
