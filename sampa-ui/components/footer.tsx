import { Heart } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-rose-500" />
            <span className="text-lg font-bold">PetConnect</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="#" className="text-gray-500 hover:text-gray-900">
              Términos
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900">
              Privacidad
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900">
              Contacto
            </Link>
          </div>
          <div className="md:ml-auto flex items-center gap-4">
            <p className="text-sm text-gray-500">© 2024 PetConnect. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
