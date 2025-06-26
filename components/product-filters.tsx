"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useLanguage } from "@/components/language-provider"

interface Filters {
  category: string
  search: string
  priceRange: number[]
  sizes: string[]
  colors: string[]
}

interface ProductFiltersProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
}

export default function ProductFilters({ filters, onFiltersChange }: ProductFiltersProps) {
  const { t } = useLanguage()

  const categories = [
    { id: "shoes", name: t("sportsShoes") },
    { id: "shirts", name: t("shirts") },
    { id: "sportswear", name: t("sportswear") },
  ]

  const sizes = ["S", "M", "L", "XL", "40", "41", "42", "43", "44"]
  const colors = ["أسود", "أبيض", "أحمر", "أزرق", "أخضر", "رمادي"]

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    onFiltersChange({
      ...filters,
      category: checked ? categoryId : "",
    })
  }

  const handleSizeChange = (size: string, checked: boolean) => {
    const newSizes = checked ? [...filters.sizes, size] : filters.sizes.filter((s) => s !== size)

    onFiltersChange({
      ...filters,
      sizes: newSizes,
    })
  }

  const handleColorChange = (color: string, checked: boolean) => {
    const newColors = checked ? [...filters.colors, color] : filters.colors.filter((c) => c !== color)

    onFiltersChange({
      ...filters,
      colors: newColors,
    })
  }

  const handlePriceChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      priceRange: value,
    })
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <Card>
        <CardHeader>
          <CardTitle>{t("category")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2 rtl:space-x-reverse">
              <Checkbox
                id={category.id}
                checked={filters.category === category.id}
                onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
              />
              <Label htmlFor={category.id}>{category.name}</Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Range Filter */}
      <Card>
        <CardHeader>
          <CardTitle>{t("priceRange")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={filters.priceRange}
              onValueChange={handlePriceChange}
              max={1000}
              min={0}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                {filters.priceRange[0]} {t("currency")}
              </span>
              <span>
                {filters.priceRange[1]} {t("currency")}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Size Filter */}
      <Card>
        <CardHeader>
          <CardTitle>{t("size")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((size) => (
              <div key={size} className="flex items-center space-x-2 rtl:space-x-reverse">
                <Checkbox
                  id={`size-${size}`}
                  checked={filters.sizes.includes(size)}
                  onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
                />
                <Label htmlFor={`size-${size}`} className="text-sm">
                  {size}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Color Filter */}
      <Card>
        <CardHeader>
          <CardTitle>{t("color")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {colors.map((color) => (
            <div key={color} className="flex items-center space-x-2 rtl:space-x-reverse">
              <Checkbox
                id={`color-${color}`}
                checked={filters.colors.includes(color)}
                onCheckedChange={(checked) => handleColorChange(color, checked as boolean)}
              />
              <Label htmlFor={`color-${color}`}>{color}</Label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
