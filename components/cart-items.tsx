"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Minus } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"

export default function CartItems() {
  const { items, removeItem, updateQuantity, total } = useCart()
  const { t } = useLanguage()

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg mb-4">{t("emptyCart")}</p>
        <Link href="/products">
          <Button className="bg-[#f4b03e] hover:bg-[#e09f2d] text-black">{t("shopNow")}</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {items.map((item) => (
          <Card key={`${item.id}-${item.size}-${item.color}`}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{item.name}</h3>
                  <div className="text-sm text-muted-foreground mb-2">
                    <p>
                      {t("size")}: {item.size}
                    </p>
                    <p>
                      {t("color")}: {item.color}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-[#f4b03e]">
                        {item.price * item.quantity} {t("currency")}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id, item.size, item.color)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">{t("orderSummary")}</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>{t("subtotal")}</span>
                <span>
                  {total} {t("currency")}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{t("shipping")}</span>
                <span>{t("free")}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>{t("total")}</span>
                  <span className="text-[#f4b03e]">
                    {total} {t("currency")}
                  </span>
                </div>
              </div>
            </div>
            <Link href="/checkout" className="w-full">
              <Button className="w-full bg-[#f4b03e] hover:bg-[#e09f2d] text-black">{t("checkout")}</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
