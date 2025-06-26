'use client';
import CartItems from '@/components/cart-items';
import Header from "@/components/header"
import Footer from "@/components/footer"
export default function CartPage() {
  return (
    
    <div className="p-4">
                <Header />

      <h1 className="text-2xl font-bold mb-4">السلة</h1>
      <CartItems />
            <Footer />
      
    </div>
  );
}
