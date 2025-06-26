"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "ar" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  ar: {
    // Navigation
    home: "الرئيسية",
    products: "المنتجات",
    about: "من نحن",
    contact: "تواصل معنا",

    // Hero Section
    heroTitle: "أفضل الماركات الرياضية العالمية",
    heroSubtitle: "اكتشف مجموعتنا الحصرية من الملابس والأحذية الرياضية من أشهر الماركات العالمية",
    shopNow: "تسوق الآن",
    learnMore: "اعرف المزيد",

    // Categories
    categories: "الفئات",
    categoriesSubtitle: "تصفح مجموعتنا المتنوعة من المنتجات الرياضية",
    sportsShoes: "بوات رياضية",
    shirts: "بلايز",
    sportswear: "أواعي رياضية",

    // Search
    searchPlaceholder: "ابحث عن المنتجات...",

    // Products
    featuredProducts: "المنتجات المميزة",
    featuredProductsSubtitle: "اكتشف أحدث وأفضل منتجاتنا",
    viewDetails: "عرض التفاصيل",
    addToCart: "أضف للسلة",
    viewAllProducts: "عرض جميع المنتجات",
    availableSizes: "المقاسات المتاحة",
    currency: "ريال",
    off: "خصم",

    // Footer
    footerDescription: "متجرك الأول للملابس الرياضية من أفضل الماركات العالمية. جودة عالية وأسعار منافسة.",
    quickLinks: "روابط سريعة",
    legal: "قانوني",
    privacyPolicy: "سياسة الخصوصية",
    termsOfUse: "شروط الاستخدام",
    allRightsReserved: "جميع الحقوق محفوظة",

    // Cart
    cart: "السلة",
    emptyCart: "السلة فارغة",
    total: "المجموع",
    checkout: "الدفع",

    // Product Details
    size: "المقاس",
    color: "اللون",
    quantity: "الكمية",
    description: "الوصف",

    // Filters
    category: "النوع",
    priceRange: "نطاق السعر",

    // Checkout
    name: "الاسم",
    phone: "رقم الهاتف",
    location: "الموقع",
    orderConfirmation: "تأكيد الطلب",

    // Common
    required: "مطلوب",
    submit: "إرسال",
    cancel: "إلغاء",
    save: "حفظ",
    edit: "تعديل",
    delete: "حذف",
    loading: "جاري التحميل...",
    error: "حدث خطأ",

    // New translations
    found: "موجود",
    noProductsFound: "لم يتم العثور على منتجات",
    orderSummary: "ملخص الطلب",
    subtotal: "المجموع الفرعي",
    shipping: "الشحن",
    free: "مجاني",
    orderDetails: "تفاصيل الطلب",
    notes: "ملاحظات",
    processing: "جاري المعالجة...",
    placeOrder: "تأكيد الطلب",
    orderConfirmed: "تم تأكيد طلبك!",
    orderConfirmationMessage: "شكراً لطلبك! سيتم توصيل طلبك خلال يومين",
    continueShopping: "متابعة التسوق",
    backToHome: "العودة للرئيسية",
    productDetails: "تفاصيل المنتج",
    selectSize: "اختر المقاس",
    selectColor: "اختر اللون",
    inStock: "متوفر",
    outOfStock: "غير متوفر",
    message: "الرسالة",
    sendMessage: "إرسال الرسالة",
    messageSent: "تم إرسال رسالتك بنجاح",
    pleaseSelectSizeAndColor: "يرجى اختيار المقاس واللون",
    addedToCart: "تم إضافة المنتج للسلة",
    reviews: "تقييم",
    contactDescription: "نحن هنا لمساعدتك! تواصل معنا لأي استفسار أو طلب خاص",
    enterName: "أدخل اسمك",
    enterPhone: "أدخل رقم هاتفك",
    enterLocation: "أدخل موقعك",
    enterMessage: "اكتب رسالتك هنا...",
    contactInfo: "معلومات التواصل",
    email: "البريد الإلكتروني",
    address: "رام الله - الإرسال، شارع بيرزيت القديم",
    followUs: "تابعنا على",
    workingHours: "ساعات العمل",
    sunday: "الأحد",
    thursday: "الخميس",
    friday: "الجمعة",
    saturday: "السبت",
    messageResponse: "سنتواصل معك قريباً",
  },
  en: {
    // Navigation
    home: "Home",
    products: "Products",
    about: "About",
    contact: "Contact",

    // Hero Section
    heroTitle: "Best Global Sports Brands",
    heroSubtitle: "Discover our exclusive collection of sportswear and shoes from the world's most famous brands",
    shopNow: "Shop Now",
    learnMore: "Learn More",

    // Categories
    categories: "Categories",
    categoriesSubtitle: "Browse our diverse collection of sports products",
    sportsShoes: "Sports Shoes",
    shirts: "Shirts",
    sportswear: "Sportswear",

    // Search
    searchPlaceholder: "Search for products...",

    // Products
    featuredProducts: "Featured Products",
    featuredProductsSubtitle: "Discover our latest and best products",
    viewDetails: "View Details",
    addToCart: "Add to Cart",
    viewAllProducts: "View All Products",
    availableSizes: "Available Sizes",
    currency: "SAR",
    off: "OFF",

    // Footer
    footerDescription:
      "Your first store for sportswear from the best global brands. High quality and competitive prices.",
    quickLinks: "Quick Links",
    legal: "Legal",
    privacyPolicy: "Privacy Policy",
    termsOfUse: "Terms of Use",
    allRightsReserved: "All Rights Reserved",

    // Cart
    cart: "Cart",
    emptyCart: "Cart is empty",
    total: "Total",
    checkout: "Checkout",

    // Product Details
    size: "Size",
    color: "Color",
    quantity: "Quantity",
    description: "Description",

    // Filters
    category: "Category",
    priceRange: "Price Range",

    // Checkout
    name: "Name",
    phone: "Phone",
    location: "Location",
    orderConfirmation: "Order Confirmation",

    // Common
    required: "Required",
    submit: "Submit",
    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    loading: "Loading...",
    error: "An error occurred",

    // New translations
    found: "found",
    noProductsFound: "No products found",
    orderSummary: "Order Summary",
    subtotal: "Subtotal",
    shipping: "Shipping",
    free: "Free",
    orderDetails: "Order Details",
    notes: "Notes",
    processing: "Processing...",
    placeOrder: "Place Order",
    orderConfirmed: "Order Confirmed!",
    orderConfirmationMessage: "Thank you for your order! Your items will be delivered within 2 days",
    continueShopping: "Continue Shopping",
    backToHome: "Back to Home",
    productDetails: "Product Details",
    selectSize: "Select Size",
    selectColor: "Select Color",
    inStock: "In Stock",
    outOfStock: "Out of Stock",
    message: "Message",
    sendMessage: "Send Message",
    messageSent: "Your message has been sent successfully",
    pleaseSelectSizeAndColor: "Please select size and color",
    addedToCart: "Product added to cart",
    reviews: "reviews",
    contactDescription: "We're here to help! Contact us for any inquiry or special request",
    enterName: "Enter your name",
    enterPhone: "Enter your phone number",
    enterLocation: "Enter your location",
    enterMessage: "Write your message here...",
    contactInfo: "Contact Information",
    email: "Email",
    address: "Riyadh, Saudi Arabia",
    followUs: "Follow Us",
    workingHours: "Working Hours",
    sunday: "Sunday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    messageResponse: "We will contact you soon",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("ar")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "ar" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
    document.documentElement.lang = language
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
  }, [language])

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
