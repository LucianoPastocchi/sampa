import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import Link from "next/link"

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-rose-500" />
          <span className="text-xl font-bold">PetConnect</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="#problema" className="transition-colors hover:text-foreground/80">
            Problema
          </Link>
          <Link href="#solucion" className="transition-colors hover:text-foreground/80">
            Solución
          </Link>
          <Link href="#tecnologia" className="transition-colors hover:text-foreground/80">
            Tecnología
          </Link>
          <Link href="#funcionalidades" className="transition-colors hover:text-foreground/80">
            Funcionalidades
          </Link>
          <Link href="#valor" className="transition-colors hover:text-foreground/80">
            Valor agregado
          </Link>
        </nav>
        <Button>Contacto</Button>
      </div>
    </header>
  )
}
