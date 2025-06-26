'use client'

import { useState } from 'react'
import { useCart } from '@/components/cart-provider'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Header from "@/components/header"
import Footer from "@/components/footer"
export default function CheckoutPage() {
  const { items, total } = useCart()
  const [customerName, setCustomerName] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Customer_Name: customerName,
        Phone: phone,
        Location: location,
        items,
      }),
    })

    if (res.ok) {
      setMessage('✅ تم الطلب بنجاح!')
    } else {
      setMessage('❌ حدث خطأ أثناء إرسال الطلب')
    }
  }

  return (
    <div className="container mx-auto py-10">
                      <Header />
      
      <h1 className="text-2xl font-bold text-right mb-6">الدفع</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Order Summary */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-right mb-4">ملخص الطلب</h2>
            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="flex flex-col items-end border-b pb-4"
              >
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  المقاس: {item.size}، اللون: {item.color}
                </p>
                <p className="text-sm text-muted-foreground">الكمية: {item.quantity}</p>
                <p className="text-sm font-bold">{item.price * item.quantity} ريال</p>
              </div>
            ))}
            <div className="text-right font-bold text-[#f4b03e]">المجموع: {total} ريال</div>
          </CardContent>
        </Card>

        {/* Order Form */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-right mb-4">تفاصيل الطلب</h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-right">
              <Input
                placeholder="الاسم"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
              <Input
                placeholder="رقم الهاتف"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <Input
                placeholder="الموقع"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
              <Button type="submit" className="w-full bg-[#f4b03e] hover:bg-[#e09f2d] text-black">
                تأكيد الطلب
              </Button>
              {message && <p>{message}</p>}
            </form>
          </CardContent>
        </Card>
      </div>
            <Footer />
      
    </div>
  )
}
