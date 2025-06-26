'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function ProductDetailPage() {
  const [product, setProduct] = useState<any>(null)
  const { id } = useParams() as { id: string }

  useEffect(() => {
    if (id) {
      fetch(`/api/products/${id}`)
        .then(res => res.json())
        .then(data => setProduct(data))
        .catch(err => console.error('Error fetching product:', err))
    }
  }, [id])

  const addToCart = async () => {
    await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        User_ID: 1,
        Product_ID: product.Product_ID,
        Quantity: 1
      })
    })
    alert('✅ تمت الإضافة إلى السلة!')
  }

  if (!product) return <p className="text-center py-10">تحميل المنتج...</p>

  return (
    <div className="container mx-auto py-10">
                      <Header />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* صورة المنتج */}
        <Card>
          <CardContent className="p-4">
            <img
              src={product.Image_URL}
              alt={product.Name_Ar}
              className="w-full h-auto rounded"
            />
          </CardContent>
        </Card>

        {/* تفاصيل المنتج */}
        <div className="space-y-4 text-right">
          <h1 className="text-3xl font-bold">{product.Name_Ar}</h1>
          <p className="text-gray-700">{product.Description}</p>
          <p className="text-xl font-semibold text-[#f4b03e]">
            السعر: {product.Price} شيكل
          </p>

          <div>
            <p className="font-semibold">المقاسات:</p>
            <p>{product.Sizes?.join('، ')}</p>
          </div>

          <div>
            <p className="font-semibold">الألوان:</p>
            <p>{product.Colors?.join('، ')}</p>
          </div>

          <Button onClick={addToCart} className="bg-[#f4b03e] text-black hover:bg-[#e09f2d]">
            أضف إلى السلة
          </Button>
        </div>
      </div>
                  <Footer />
      
    </div>
  )
}
