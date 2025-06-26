import { NextResponse } from 'next/server';
import productService from '@/lib/ProductService';
import db from '@/lib/DBConnection';

export const dynamic = 'force-dynamic';

export async function GET() {
  const products = await productService.getAllProducts();
  return Response.json(products);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name_ar,
      name_en,
      price,
      description,
      image,
      sizes = [],
      colors = [],
      category_id
    } = body;

    // إدخال المنتج
    const result: any = await db.query(
      `INSERT INTO Products (Name_Ar, Name_En, Price, Description, Image_URL, Category_ID)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name_ar, name_en, price, description, image, category_id]
    );

    const productId = result.insertId;

    // إدخال الألوان
    for (const color of colors) {
      await db.query(
        'INSERT INTO Product_Colors (Product_ID, Color) VALUES (?, ?)',
        [productId, color]
      );
    }

    // إدخال المقاسات
    for (const size of sizes) {
      await db.query(
        'INSERT INTO Product_Sizes (Product_ID, Size) VALUES (?, ?)',
        [productId, size]
      );
    }

    return NextResponse.json({ message: '✅ تمت الإضافة بنجاح' });

  } catch (error) {
    console.error('❌ Error inserting product:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء الإدخال' }, { status: 500 });
  }
}
