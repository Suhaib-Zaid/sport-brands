'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Trash2, Pencil } from 'lucide-react';

interface Product {
  Product_ID: number;
  Name_Ar: string;
  Name_En: string;
  Price: number;
  Description: string;
  Image_URL: string;
  Sizes: string[];
  Colors: string[];
  Category: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

const fetchProducts = async () => {
  try {
const res = await axios.get('/api/products');
    console.log('📦 البيانات الراجعة:', res.data); // ⬅️ هون
    setProducts(res.data);
  } catch (error) {
    console.error('❌ Error fetching products:', error);
  }
};



 const handleDelete = async (id: number) => {
  if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;
  try {
    await axios.delete(`/api/admin/products/${id}`); // ✅ رابط الحذف الصحيح
    setProducts(products.filter((p) => p.Product_ID !== id)); // ✅ حذف من الواجهة
  } catch (error) {
    console.error('❌ Error deleting product:', error);
  }
};

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">📦 إدارة المنتجات</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.Product_ID}
            className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-4 border dark:border-gray-700"
          >
            <img
              src={product.Image_URL}
              alt="Product Image"
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h2 className="text-xl font-bold mb-1">
              {product.Name_Ar} / {product.Name_En}
            </h2>
            <p className="text-sm text-gray-500 mb-1 dark:text-gray-400">
              {product.Description}
            </p>
            <p className="text-sm mb-1">💰 السعر: {product.Price} ₪</p>
            <p className="text-sm mb-1">📏 المقاسات: {product.Sizes.join(', ')}</p>
            <p className="text-sm mb-2">🎨 الألوان: {product.Colors.join(', ')}</p>

            <div className="flex justify-between">
              <Link href={`/admin/products/edit/${product.Product_ID}`}>
                <button className="flex items-center gap-1 text-white bg-blue-600 px-3 py-1 rounded-xl hover:bg-blue-700">
                  <Pencil size={16} /> تعديل
                </button>
              </Link>
              
             <button
  onClick={() => {
    console.log('🔍 ID for delete:', product.Product_ID); // ⬅️ هون
    handleDelete(product.Product_ID);
  }}
  className="flex items-center gap-1 text-white bg-red-600 px-3 py-1 rounded-xl hover:bg-red-700"
>
  <Trash2 size={16} /> حذف
</button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
