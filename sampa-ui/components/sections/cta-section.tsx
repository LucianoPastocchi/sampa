"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/language-context"
import Link from "next/link"

export default function CTASection() {
  const { t } = useLanguage()

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-rose-500 text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("cta.title")}</h2>
            <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("cta.description")}
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-rose-500 hover:bg-gray-100">
                {t("cta.signUpButton")}
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-rose-600">
              {t("cta.contactButton")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
