import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/DBConnection';

// ✅ جلب منتج واحد
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const [rows]: any = await db.query('SELECT * FROM Products WHERE Product_ID = ?', [id]);
    if (!rows || rows.length === 0)
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });

    const product = rows[0];
    const [sizes]: any = await db.query('SELECT Size FROM Product_Sizes WHERE Product_ID = ?', [id]);
    const [colors]: any = await db.query('SELECT Color FROM Product_Colors WHERE Product_ID = ?', [id]);

    return NextResponse.json({
      ...product,
      Sizes: sizes.map((s: any) => s.Size),
      Colors: colors.map((c: any) => c.Color),
    });
  } catch (err) {
    console.error('❌ Error fetching product:', err);
    return NextResponse.json({ error: 'Error loading product' }, { status: 500 });
  }
}

// ✅ تعديل منتج
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const body = await req.json();
  const { Name_Ar, Name_En, Description, Price, Quantity, Image_URL, Category_ID, Sizes = [], Colors = [] } = body;

  try {
    await db.query(
      `UPDATE Products SET Name_Ar=?, Name_En=?, Description=?, Price=?, Quantity=?, Image_URL=?, Category_ID=? WHERE Product_ID=?`,
      [Name_Ar, Name_En, Description, Price, Quantity, Image_URL, Category_ID, id]
    );

    await db.query(`DELETE FROM Product_Sizes WHERE Product_ID=?`, [id]);
    for (const size of Sizes) {
      await db.query(`INSERT INTO Product_Sizes (Product_ID, Size) VALUES (?, ?)`, [id, size]);
    }

    await db.query(`DELETE FROM Product_Colors WHERE Product_ID=?`, [id]);
    for (const color of Colors) {
      await db.query(`INSERT INTO Product_Colors (Product_ID, Color) VALUES (?, ?)`, [id, color]);
    }

    return NextResponse.json({ message: '✅ Product updated successfully!' });
  } catch (error) {
    console.error('❌ Update error:', error);
    return NextResponse.json({ error: 'Error updating product' }, { status: 500 });
  }
}

// ✅ حذف منتج (ابقِ عليه كما هو)
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const productId = Number(params.id);
  if (isNaN(productId)) {
    return NextResponse.json({ error: 'رقم المنتج غير صالح' }, { status: 400 });
  }

  try {
    await db.query('DELETE FROM Product_Colors WHERE Product_ID = ?', [productId]);
    await db.query('DELETE FROM Product_Sizes WHERE Product_ID = ?', [productId]);
    await db.query('DELETE FROM Products WHERE Product_ID = ?', [productId]);

    return NextResponse.json({ message: '✅ تم حذف المنتج بنجاح' });
  } catch (error) {
    console.error('❌ خطأ في حذف المنتج:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء حذف المنتج' }, { status: 500 });
  }
}
