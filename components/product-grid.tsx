"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-provider"
import { useCart } from "@/components/cart-provider"
import Link from "next/link"

interface Filters {
  category: string
  search: string
  priceRange: number[]
  sizes: string[]
  colors: string[]
}

interface Product {
  Product_ID: number
  Name_Ar: string
  Name_En: string
  Price: number
  OriginalPrice?: number
  Image_URL: string
  Sizes: string[]
  Colors: string[]
  Category: string
}

interface ProductGridProps {
  filters: Filters
}

export default function ProductGrid({ filters }: ProductGridProps) {
  const { t } = useLanguage()
  const { addItem } = useCart()
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then((data) => setAllProducts(data))
      .catch((err) => console.error('Error fetching products:', err))
  }, [])

  useEffect(() => {
    let filtered = [...allProducts]

    if (filters.category) {
      filtered = filtered.filter(product => product.Category === filters.category)
    }

    if (filters.search) {
      const search = filters.search.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.Name_Ar.toLowerCase().includes(search) ||
          product.Name_En.toLowerCase().includes(search)
      )
    }

    filtered = filtered.filter(
      product => product.Price >= filters.priceRange[0] && product.Price <= filters.priceRange[1]
    )

    if (filters.sizes.length > 0) {
      filtered = filtered.filter(product =>
        product.Sizes.some(size => filters.sizes.includes(size))
      )
    }

    if (filters.colors.length > 0) {
      filtered = filtered.filter(product =>
        product.Colors.some(color => filters.colors.includes(color))
      )
    }

    setFilteredProducts(filtered)
  }, [filters, allProducts])

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.Product_ID,
      name: product.Name_Ar,
      price: product.Price,
      image: product.Image_URL,
      size: product.Sizes[0],
      color: product.Colors[0],
      quantity: 1,
    })
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-muted-foreground">
          {filteredProducts.length} {t("products")} {t("found")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <Card key={product.Product_ID} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={product.Image_URL || "/placeholder.svg"}
                  alt={product.Name_Ar}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.OriginalPrice && product.OriginalPrice > product.Price && (
                  <Badge className="absolute top-2 right-2 bg-red-500">
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
                  <p>{t("availableSizes")}: {product.Sizes.join(", ")}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex gap-2">
              <Link href={`/products/${product.Product_ID}`} className="flex-1">
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

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">{t("noProductsFound")}</p>
        </div>
      )}
    </div>
  )
}
