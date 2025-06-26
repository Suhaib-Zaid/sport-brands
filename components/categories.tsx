"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"

export default function Categories() {
  const { t } = useLanguage()

  const categories = [
    {
      id: "shoes",
      name: t("sportsShoes"),
      nameEn: "Sports Shoes",
image: "https://cdn.runrepeat.com/storage/gallery/product_content/38471/under-armour-charged-pursuit-3-22315817-main.jpg",
      href: "/products?category=shoes",
    },
    {
      id: "shirts",
      name: t("shirts"),
      nameEn: "Shirts",
      image: "https://images.asos-media.com/products/under-armour-training-heatgear-iso-chill-t-shirt-in-black-camo-print/202233700-1-black?$n_750w$&wid=750&hei=750&fit=crop",
      href: "/products?category=shirts",
    },
    {
      id: "sportswear",
      name: t("sportswear"),
      nameEn: "Sportswear",
      image: "https://i8.amplience.net/i/jpl/jd_711471_a?qlt=92&w=600&h=765&v=1&fmt=auto",
      href: "/products?category=sportswear",
    },
  ]

  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">{t("categories")}</h2>
        <p className="text-muted-foreground">{t("categoriesSubtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link key={category.id} href={category.href}>
            <Card className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                  <div className="absolute bottom-4 right-4 rtl:right-auto rtl:left-4">
                    <h3 className="text-white text-xl font-bold">{category.name}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
