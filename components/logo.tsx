"use client"

import { useLanguage } from "@/components/language-provider"

export default function Logo() {
  const { language } = useLanguage()

  return (
    <div className="flex items-center space-x-3 rtl:space-x-reverse">
      {/* Logo Icon */}
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-[#f4b03e] to-[#e09f2d] rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
          </svg>
        </div>
      </div>

      {/* Logo Text */}
      <div className="flex flex-col">
        <span className="text-lg font-bold text-foreground">SPORT BRANDS</span>
        <span className="text-xs text-muted-foreground">{language === "ar" ? "ماركات عالمية" : "Global Brands"}</span>
      </div>
    </div>
  )
}
