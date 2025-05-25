"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, ImageIcon } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import Image from "next/image"

interface PhotosStepProps {
  data: string[]
  updateData: (photos: string[]) => void
}

export default function PhotosStep({ data, updateData }: PhotosStepProps) {
  const { t } = useLanguage()
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // En una implementación real, esto subiría las imágenes a un servidor
  const handleFileUpload = (files: FileList | null) => {
    if (!files) return

    setError(null)
    const newPhotos = [...data]

    Array.from(files).forEach((file) => {
      // Validar tipo de archivo
      if (!file.type.startsWith("image/")) {
        setError(t("publish.errors.invalidFileType") || "Solo se permiten archivos de imagen")
        return
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError(t("publish.errors.fileTooLarge") || "El archivo es demasiado grande (máximo 5MB)")
        return
      }

      // Crear URL para previsualización
      const photoUrl = URL.createObjectURL(file)
      newPhotos.push(photoUrl)
    })

    updateData(newPhotos)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files)
    }
  }

  const removePhoto = (index: number) => {
    const newPhotos = [...data]
    newPhotos.splice(index, 1)
    updateData(newPhotos)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium">{t("publish.photos.title") || "Fotos de tu espacio"}</h3>
        <p className="text-sm text-gray-500">
          {t("publish.photos.description") ||
            "Las fotos ayudan a los dueños de mascotas a visualizar cómo es tu espacio. Añade al menos 5 fotos."}
        </p>
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          dragActive ? "border-rose-500 bg-rose-50" : "border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-rose-100 rounded-full">
            <Upload size={24} className="text-rose-500" />
          </div>
          <div>
            <p className="font-medium">{t("publish.photos.dragAndDrop") || "Arrastra y suelta tus fotos aquí"}</p>
            <p className="text-sm text-gray-500">
              {t("publish.photos.orUpload") || "o selecciona archivos desde tu dispositivo"}
            </p>
          </div>
          <input
            id="file-upload"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files)}
          />
          <Button type="button" variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
            {t("publish.photos.selectFiles") || "Seleccionar archivos"}
          </Button>
        </div>
      </div>

      {error && <div className="text-sm text-red-500 mt-2">{error}</div>}

      {data.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium">
            {t("publish.photos.uploaded") || "Fotos subidas"} ({data.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.map((photo, index) => (
              <div key={index} className="relative group aspect-square">
                <Image
                  src={photo || "/placeholder.svg"}
                  alt={`Photo ${index + 1}`}
                  fill
                  className="object-cover rounded-md"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removePhoto(index)}
                >
                  <X size={16} className="text-gray-700" />
                </button>
                {index === 0 && (
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-rose-500 text-white text-xs rounded">
                    {t("publish.photos.mainPhoto") || "Foto principal"}
                  </div>
                )}
              </div>
            ))}

            {/* Placeholder para añadir más fotos */}
            <button
              type="button"
              className="border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center p-4 hover:bg-gray-50 aspect-square"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <ImageIcon size={24} className="text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">{t("publish.photos.addMore") || "Añadir más"}</span>
            </button>
          </div>
        </div>
      )}

      <div className="bg-blue-50 p-4 rounded-md mt-6">
        <h4 className="font-medium text-blue-700 mb-2">{t("publish.photos.tips") || "Consejos para mejores fotos"}</h4>
        <ul className="text-sm text-blue-600 space-y-1 list-disc pl-5">
          <li>{t("publish.photos.tip1") || "Usa luz natural para que tu espacio se vea más acogedor"}</li>
          <li>{t("publish.photos.tip2") || "Muestra las áreas donde las mascotas pasarán más tiempo"}</li>
          <li>{t("publish.photos.tip3") || "Incluye fotos del exterior si tienes jardín o patio"}</li>
          <li>{t("publish.photos.tip4") || "Asegúrate de que el espacio esté limpio y ordenado"}</li>
        </ul>
      </div>
    </div>
  )
}
