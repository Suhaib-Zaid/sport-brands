import type React from "react"
import type { Metadata } from "next"
import { Inter, Cairo } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { CartProvider } from "@/components/cart-provider"

const inter = Inter({ subsets: ["latin"] })
const cairo = Cairo({ subsets: ["arabic", "latin"] })

export const metadata: Metadata = {
  title: "Sport Brands - ماركات رياضية عالمية",
  description: "متجر الملابس الرياضية الأول - أفضل الماركات العالمية",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${cairo.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <CartProvider>{children}</CartProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
