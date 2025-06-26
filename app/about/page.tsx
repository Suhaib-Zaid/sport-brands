"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import { Award, Users, Globe, Heart } from "lucide-react"

export default function AboutPage() {
  const { t, language } = useLanguage()

  const features = [
    {
      icon: Award,
      title: language === "ar" ? "جودة عالية" : "High Quality",
      description:
        language === "ar"
          ? "نقدم أفضل المنتجات الرياضية من الماركات العالمية المعروفة"
          : "We offer the best sports products from renowned global brands",
    },
    {
      icon: Users,
      title: language === "ar" ? "خدمة العملاء" : "Customer Service",
      description:
        language === "ar"
          ? "فريق خدمة عملاء متخصص لمساعدتك في أي وقت"
          : "Specialized customer service team to help you anytime",
    },
    {
      icon: Globe,
      title: language === "ar" ? "توصيل سريع" : "Fast Delivery",
      description:
        language === "ar" ? "توصيل سريع وآمن لجميع أنحاء المملكة" : "Fast and secure delivery throughout the Kingdom",
    },
    {
      icon: Heart,
      title: language === "ar" ? "رضا العملاء" : "Customer Satisfaction",
      description:
        language === "ar"
          ? "رضاكم هو هدفنا الأول ونسعى لتحقيقه دائماً"
          : "Your satisfaction is our primary goal and we always strive to achieve it",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">{t("about")}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {language === "ar"
              ? "نحن متجر Sport Brands، وجهتك الأولى للملابس والمعدات الرياضية من أفضل الماركات العالمية. نسعى لتوفير أحدث وأجود المنتجات الرياضية لعملائنا الكرام."
              : "We are Sport Brands store, your premier destination for sportswear and equipment from the best global brands. We strive to provide the latest and finest sports products to our valued customers."}
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">{language === "ar" ? "قصتنا" : "Our Story"}</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                {language === "ar"
                  ? "بدأت رحلتنا من شغفنا العميق بالرياضة والحياة الصحية. أردنا أن نوفر للرياضيين وعشاق الرياضة في فلسطين أفضل المنتجات الرياضية من الماركات العالمية المعروفة."
                  : "Our journey began from our deep passion for sports and healthy living. We wanted to provide athletes and sports enthusiasts in palestain with the best sports products from renowned global brands."}
              </p>
              <p>
                {language === "ar"
                  ? "منذ تأسيسنا، نحن ملتزمون بتقديم منتجات عالية الجودة وخدمة عملاء متميزة. نؤمن بأن الرياضة ليست مجرد نشاط، بل أسلوب حياة يستحق الأفضل."
                  : "Since our establishment, we have been committed to providing high-quality products and exceptional customer service. We believe that sports is not just an activity, but a lifestyle that deserves the best."}
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="/home.jpg"
              alt="About us"
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            {language === "ar" ? "لماذا تختارنا؟" : "Why Choose Us?"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-[#f4b03e]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-[#f4b03e]" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-4">{language === "ar" ? "رؤيتنا" : "Our Vision"}</h3>
              <p className="text-muted-foreground">
                {language === "ar"
                  ? "أن نكون المتجر الرائد في المملكة العربية السعودية لبيع المنتجات الرياضية، ونساهم في نشر ثقافة الرياضة والحياة الصحية في المجتمع."
                  : "To be the leading store in Saudi Arabia for selling sports products, and contribute to spreading the culture of sports and healthy living in society."}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-4">{language === "ar" ? "رسالتنا" : "Our Mission"}</h3>
              <p className="text-muted-foreground">
                {language === "ar"
                  ? "نسعى لتوفير أفضل المنتجات الرياضية بأسعار منافسة وخدمة عملاء متميزة، لنساعد عملاءنا على تحقيق أهدافهم الرياضية والصحية."
                  : "We strive to provide the best sports products at competitive prices and exceptional customer service, to help our customers achieve their sports and health goals."}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="bg-[#f4b03e]/5 rounded-lg p-8 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-[#f4b03e] mb-2">500+</div>
              <p className="text-muted-foreground">{language === "ar" ? "منتج متنوع" : "Diverse Products"}</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#f4b03e] mb-2">10,000+</div>
              <p className="text-muted-foreground">{language === "ar" ? "عميل راضي" : "Satisfied Customers"}</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#f4b03e] mb-2">50+</div>
              <p className="text-muted-foreground">{language === "ar" ? "ماركة عالمية" : "Global Brands"}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
