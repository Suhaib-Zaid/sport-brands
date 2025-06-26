"use client"

import type React from "react"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/components/language-provider"
import { MapPin, Phone, Mail, MessageCircle, Instagram, Facebook } from "lucide-react"

export default function ContactPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", phone: "", location: "", message: "" })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4">{t("contact")}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("contactDescription") || "نحن هنا لمساعدتك! تواصل معنا لأي استفسار أو طلب خاص"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>{t("sendMessage")}</CardTitle>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-600 mb-2">{t("messageSent")}</h3>
                  <p className="text-muted-foreground">{t("messageResponse") || "سنتواصل معك قريباً"}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">{t("name")} *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                      placeholder={t("enterName") || "أدخل اسمك"}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">{t("phone")} *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                      placeholder={t("enterPhone") || "أدخل رقم هاتفك"}
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">{t("location")}</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="mt-1"
                      placeholder={t("enterLocation") || "أدخل موقعك"}
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">{t("message")} *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                      rows={5}
                      placeholder={t("enterMessage") || "اكتب رسالتك هنا..."}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#f4b03e] hover:bg-[#e09f2d] text-black font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t("processing") : t("sendMessage")}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("contactInfo") || "معلومات التواصل"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#f4b03e]/10 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#f4b03e]" />
                  </div>
                  <div>
                    <p className="font-medium">{t("phone")}</p>
                    <p className="text-muted-foreground">+970595168007</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#f4b03e]/10 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#f4b03e]" />
                  </div>
                  <div>
                    <p className="font-medium">{t("email") || "البريد الإلكتروني"}</p>
                    <p className="text-muted-foreground">sportbrands@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#f4b03e]/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#f4b03e]" />
                  </div>
                  <div>
                    <p className="font-medium">{t("location")}</p>
                    <p className="text-muted-foreground">{t("address") || "رام الله-الارسال، شارع بيرزيت القديم."}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("followUs") || "تابعنا على"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("workingHours") || "ساعات العمل"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>
                      {t("sunday") || "الأحد"} - {t("thursday") || "الخميس"}
                    </span>
                    <span>9:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("friday") || "الجمعة"}</span>
                    <span>2:00 PM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("saturday") || "السبت"}</span>
                    <span>9:00 AM - 11:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
