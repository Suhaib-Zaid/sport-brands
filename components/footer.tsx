"use client"

import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { Facebook, Instagram, MessageCircle } from "lucide-react"
import Logo from "@/components/logo"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 text-muted-foreground max-w-md">{t("footerDescription")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("products")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4">{t("legal")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("termsOfUse")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 rtl:space-x-reverse mb-4 md:mb-0">
            <a href="#" className="text-muted-foreground hover:text-[#f4b03e] transition-colors">
              <MessageCircle className="h-5 w-5" />
              <span className="sr-only">WhatsApp</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-[#f4b03e] transition-colors">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-[#f4b03e] transition-colors">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </a>
          </div>
          <p className="text-muted-foreground text-sm">© 2024 Sport Brands. {t("allRightsReserved")}</p>
        </div>
      </div>
    </footer>
  )
}
