"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/home.jpg)",
          
          filter: "brightness(0.9)",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/5     0" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">{t("heroTitle")}</h1>
        <p className="text-lg md:text-xl mb-8 opacity-90">{t("heroSubtitle")}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <Button size="lg" className="bg-[#f4b03e] hover:bg-[#e09f2d] text-black font-semibold">
              {t("shopNow")}
            </Button>
          </Link>
<Link href="/about">
  <Button
    size="lg"
    className="text-black border-black hover:bg-black hover:text-white dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
  >
    {t("learnMore")}
  </Button>
</Link>

        </div>
      </div>
    </section>
  )
}
