"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useRouter } from "next/navigation"

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const { t } = useLanguage()
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query)}`)
    }
  }

  return (
    <section className="py-8">
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" className="bg-[#f4b03e] hover:bg-[#e09f2d] text-black">
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </section>
  )
}
