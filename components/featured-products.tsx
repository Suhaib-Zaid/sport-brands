"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-provider"
import { useCart } from "@/components/cart-provider"
import Link from "next/link"
import { useEffect, useState } from "react"
import axios from "axios"

export default function FeaturedProducts() {
  const { t } = useLanguage()
  const { addItem } = useCart()
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    axios.get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("❌ Error fetching products:", err))
  }, [])

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.Product_ID,
      name: product.Name_Ar,
      price: product.Price,
      image: product.Image_URL,
      size: product.Sizes?.[0] || '',
      color: product.Colors?.[0] || '',
      quantity: 1,
    })
  }

  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">{t("featuredProducts")}</h2>
        <p className="text-muted-foreground">{t("featuredProductsSubtitle")}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.Product_ID} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={product.Image_URL || "/placeholder.svg"}
                  alt={product.Name_Ar}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.OriginalPrice && product.OriginalPrice > product.Price && (
                  <Badge className="absolute top-2 right-2 rtl:right-auto rtl:left-2 bg-red-500">
                    {Math.round(((product.OriginalPrice - product.Price) / product.OriginalPrice) * 100)}% {t("off")}
                  </Badge>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-2">{product.Name_Ar}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-[#f4b03e]">
                    {product.Price} {t("currency")}
                  </span>
                  {product.OriginalPrice && product.OriginalPrice > product.Price && (
                    <span className="text-sm text-muted-foreground line-through">
                      {product.OriginalPrice} {t("currency")}
                    </span>
                  )}
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  <p>
                    {t("availableSizes")}: {(product.Sizes || []).join(", ")}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex gap-2">
<Link href={`/products/${product.id || product.Product_ID}`} className="flex-1">
                <Button variant="outline" className="w-full">
                  {t("viewDetails")}
                </Button>
              </Link>
              <Button
                onClick={() => handleAddToCart(product)}
                className="flex-1 bg-[#f4b03e] hover:bg-[#e09f2d] text-black"
              >
                {t("addToCart")}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link href="/products">
          <Button variant="outline" size="lg">
            {t("viewAllProducts")}
          </Button>
        </Link>
      </div>
    </section>
  )
}
