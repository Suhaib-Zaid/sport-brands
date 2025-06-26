"use client"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"

export default function OrderConfirmationPage() {
  const { t } = useLanguage()
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <Card>
            <CardContent className="p-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-4 text-green-600">{t("orderConfirmed")}</h1>
              <p className="text-muted-foreground mb-6">{t("orderConfirmationMessage")}</p>
              <div className="space-y-4">
                <Link href="/products">
                  <Button className="w-full bg-[#f4b03e] hover:bg-[#e09f2d] text-black">{t("continueShopping")}</Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full">
                    {t("backToHome")}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
