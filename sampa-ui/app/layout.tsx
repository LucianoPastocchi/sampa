import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import LanguageProviderClient from "@/components/language-provider-client"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PetConnect",
  description: "Conectando dueños de mascotas con cuidadores profesionales",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LanguageProviderClient>{children}</LanguageProviderClient>
        </ThemeProvider>
      </body>
    </html>
  )
}
