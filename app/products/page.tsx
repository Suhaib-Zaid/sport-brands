'use client';
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useState } from 'react';

import ProductGrid from '@/components/product-grid';
import ProductFilters from '@/components/product-filters';
type Filters = {
  category: string;
  search: string;
  priceRange: number[];
  sizes: string[];
  colors: string[];
};

export default function ProductsPage() {
  const [filters, setFilters] = useState<Filters>({
    category: '',
    search: '',
    priceRange: [0, 1000],
    sizes: [],
    colors: [],
  });

  return (
          <><Header />
          <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* الفلاتر الجانبية */}
      <aside className="w-full md:w-1/4">
        <ProductFilters filters={filters} onFiltersChange={setFilters} />
      </aside>

      {/* شبكة المنتجات */}
      <main className="w-full md:w-3/4">
        <h1 className="text-2xl font-bold mb-4">المنتجات</h1>
        <ProductGrid filters={filters} />
      </main>
    </div>
          <Footer />
</>
  );
}
