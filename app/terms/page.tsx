"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"

export default function TermsPage() {
  const { language } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">
            {language === "ar" ? "شروط الاستخدام" : "Terms of Use"}
          </h1>

          <Card>
            <CardHeader>
              <CardTitle>{language === "ar" ? "الشروط والأحكام" : "Terms and Conditions"}</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none dark:prose-invert">
              {language === "ar" ? (
                <div className="space-y-4">
                  <p>مرحباً بك في متجر Sport Brands. باستخدامك لموقعنا، فإنك توافق على الشروط والأحكام التالية.</p>

                  <h3 className="text-lg font-semibold">الطلبات والدفع</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>جميع الأسعار بالريال السعودي وتشمل ضريبة القيمة المضافة</li>
                    <li>الدفع عند الاستلام متاح لجميع المناطق</li>
                    <li>يحق لنا إلغاء الطلب في حالة عدم توفر المنتج</li>
                  </ul>

                  <h3 className="text-lg font-semibold">التوصيل</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>التوصيل خلال 1-2 يوم عمل داخل المدن الرئيسية</li>
                    <li>التوصيل مجاني للطلبات أكثر من 200 ريال</li>
                    <li>رسوم التوصيل 15 ريال للطلبات الأقل من 200 ريال</li>
                  </ul>

                  <h3 className="text-lg font-semibold">الإرجاع والاستبدال</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>يمكن إرجاع المنتجات خلال 7 أيام من تاريخ الاستلام</li>
                    <li>يجب أن تكون المنتجات في حالتها الأصلية</li>
                    <li>لا يمكن إرجاع الملابس الداخلية لأسباب صحية</li>
                  </ul>

                  <h3 className="text-lg font-semibold">المسؤولية</h3>
                  <p>نحن غير مسؤولين عن أي أضرار قد تنتج عن سوء استخدام المنتجات.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p>
                    Welcome to Sport Brands store. By using our website, you agree to the following terms and
                    conditions.
                  </p>

                  <h3 className="text-lg font-semibold">Orders and Payment</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>All prices are in Saudi Riyals and include VAT</li>
                    <li>Cash on delivery is available for all areas</li>
                    <li>We reserve the right to cancel orders if products are unavailable</li>
                  </ul>

                  <h3 className="text-lg font-semibold">Delivery</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Delivery within 1-2 business days in major cities</li>
                    <li>Free delivery for orders over 200 SAR</li>
                    <li>Delivery fee of 15 SAR for orders under 200 SAR</li>
                  </ul>

                  <h3 className="text-lg font-semibold">Returns and Exchanges</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Products can be returned within 7 days of receipt</li>
                    <li>Products must be in their original condition</li>
                    <li>Underwear cannot be returned for health reasons</li>
                  </ul>

                  <h3 className="text-lg font-semibold">Liability</h3>
                  <p>We are not responsible for any damages that may result from misuse of products.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
