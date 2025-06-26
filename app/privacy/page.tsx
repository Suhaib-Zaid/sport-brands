"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"

export default function PrivacyPage() {
  const { language } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">
            {language === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
          </h1>

          <Card>
            <CardHeader>
              <CardTitle>{language === "ar" ? "حماية بياناتك الشخصية" : "Protection of Your Personal Data"}</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none dark:prose-invert">
              {language === "ar" ? (
                <div className="space-y-4">
                  <p>
                    نحن في Sport Brands نلتزم بحماية خصوصيتك وبياناتك الشخصية. هذه السياسة توضح كيفية جمعنا واستخدامنا
                    وحماية معلوماتك.
                  </p>

                  <h3 className="text-lg font-semibold">المعلومات التي نجمعها</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>الاسم ورقم الهاتف عند إجراء الطلبات</li>
                    <li>عنوان التوصيل</li>
                    <li>تفضيلات التسوق لتحسين تجربتك</li>
                  </ul>

                  <h3 className="text-lg font-semibold">كيف نستخدم معلوماتك</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>معالجة وتوصيل طلباتك</li>
                    <li>التواصل معك بخصوص طلباتك</li>
                    <li>تحسين خدماتنا ومنتجاتنا</li>
                  </ul>

                  <h3 className="text-lg font-semibold">حماية البيانات</h3>
                  <p>نستخدم أحدث تقنيات الأمان لحماية بياناتك ولا نشاركها مع أطراف ثالثة دون موافقتك.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p>
                    At Sport Brands, we are committed to protecting your privacy and personal data. This policy explains
                    how we collect, use, and protect your information.
                  </p>

                  <h3 className="text-lg font-semibold">Information We Collect</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Name and phone number when placing orders</li>
                    <li>Delivery address</li>
                    <li>Shopping preferences to improve your experience</li>
                  </ul>

                  <h3 className="text-lg font-semibold">How We Use Your Information</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Process and deliver your orders</li>
                    <li>Communicate with you about your orders</li>
                    <li>Improve our services and products</li>
                  </ul>

                  <h3 className="text-lg font-semibold">Data Protection</h3>
                  <p>
                    We use the latest security technologies to protect your data and do not share it with third parties
                    without your consent.
                  </p>
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
