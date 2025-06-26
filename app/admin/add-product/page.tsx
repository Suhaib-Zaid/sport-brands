'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function AddProductPage() {
  const router = useRouter();

  const [product, setProduct] = useState({
    name: '',
    name_ar: '',
    price: '',
    description: '',
    image: '',
    sizes: '',
    colors: '',
    brand: '',
    category: ''
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

   const res = await fetch('/api/admin/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name_ar: product.name_ar,
    name_en: product.name,
    description: product.description,
    image: product.image,
    price: parseFloat(product.price),
    sizes: product.sizes.split(',').map(s => s.trim()),
    colors: product.colors.split(',').map(c => c.trim()),
    category_id: parseInt(product.category) // لازم يكون رقم (ID)
  })
});

    if (res.ok) {
      alert('✅ تم إضافة المنتج بنجاح');
      router.push('/admin');
    } else {
      alert('❌ حدث خطأ أثناء الإضافة');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">➕ إضافة منتج جديد</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <Label>اسم المنتج (بالإنجليزي)</Label>
          <Input name="name" value={product.name} onChange={handleChange} required />
        </div>

        <div>
          <Label>اسم المنتج (بالعربي)</Label>
          <Input name="name_ar" value={product.name_ar} onChange={handleChange} required />
        </div>

        <div>
          <Label>السعر</Label>
          <Input type="number" name="price" value={product.price} onChange={handleChange} required />
        </div>

        <div>
          <Label>الوصف</Label>
          <Textarea name="description" value={product.description} onChange={handleChange} required />
        </div>

        <div>
          <Label>رابط الصورة</Label>
          <Input name="image" value={product.image} onChange={handleChange} required />
        </div>

        <div>
          <Label>المقاسات (افصل بينهم بفاصلة)</Label>
          <Input name="sizes" placeholder="S, M, L, XL" value={product.sizes} onChange={handleChange} />
        </div>

        <div>
          <Label>الألوان (افصل بينهم بفاصلة)</Label>
          <Input name="colors" placeholder="أحمر, أسود" value={product.colors} onChange={handleChange} />
        </div>

        <div>
          <Label>الماركة</Label>
          <Input name="brand" value={product.brand} onChange={handleChange} />
        </div>

        <div>
          <Label>التصنيف</Label>
          <Input name="category" value={product.category} onChange={handleChange} />
        </div>

        <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
          إضافة المنتج
        </Button>
      </form>
    </div>
  );
}
