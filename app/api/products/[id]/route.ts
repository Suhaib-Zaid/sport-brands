import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/DBConnection';

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
