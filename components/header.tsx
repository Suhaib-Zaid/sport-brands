"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Menu, ShoppingCart, Sun, Moon, Globe } from "lucide-react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"
import { useCart } from "@/components/cart-provider"
import Logo from "@/components/logo"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const { items } = useCart()

  const navigation = [
    { name: t("home"), href: "/", nameEn: "Home" },
    { name: t("products"), href: "/products", nameEn: "Products" },
    { name: t("about"), href: "/about", nameEn: "About" },
    { name: t("contact"), href: "/contact", nameEn: "Contact" },
  ]

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/20">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-accent"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {/* Language Switcher */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
              className="hidden sm:flex"
            >
              <Globe className="h-4 w-4 ml-2 rtl:ml-0 rtl:mr-2" />
              {language === "ar" ? "EN" : "AR"}
            </Button>

            {/* Theme Toggle */}
            <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">{totalItems}</Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side={language === "ar" ? "right" : "left"}>
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-lg font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Button
                    variant="ghost"
                    onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
                    className="justify-start"
                  >
                    <Globe className="h-4 w-4 ml-2 rtl:ml-0 rtl:mr-2" />
                    {language === "ar" ? "English" : "العربية"}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
