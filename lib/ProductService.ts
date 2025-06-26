import { useEffect } from 'react';
import db from './DBConnection';
import axios from 'axios';

class ProductService {
  // جلب كل المنتجات مع المقاسات والألوان من جداول منفصلة
 async getAllProducts() {
const products: any = await db.query('SELECT * FROM Products');

  if (!Array.isArray(products)) {
    console.error('❌ Expected array from DB, got:', products);
    return [];
  }

  const results = await Promise.all(
    products.map(async (product: any) => {
        // @ts-ignore

      const [sizesRows] = await db.query('SELECT Size FROM Product_Sizes WHERE Product_ID = ?', [product.Product_ID]);
      // @ts-ignore

      const [colorsRows] = await db.query('SELECT Color FROM Product_Colors WHERE Product_ID = ?', [product.Product_ID]);
return {
  ID: product.ID,
  Name_Ar: product.Name_Ar,
  Name_En: product.Name_En,
  Price: product.Price,
  Description: product.Description,
  OriginalPrice: null,
    Quantity: product.Quantity, // ⬅️ ضيف هاد السطر

  Image_URL: product.Image_URL,
  Sizes: Array.isArray(sizesRows) ? sizesRows.map((s: any) => s.Size) : [],
  Colors: Array.isArray(colorsRows) ? colorsRows.map((c: any) => c.Color) : [],
  Category: product.Category_ID?.toString() || 'uncategorized',
};

    })
  );

  return results;
}


  // جلب منتج واحد
 async getProductById(id: number) {
  const [rows]: any = await db.query('SELECT * FROM Products WHERE Product_ID = ?', [id]);

  if (!Array.isArray(rows) || rows.length === 0) return null;

  const product = rows[0];
// @ts-ignore
  const [sizes] = await db.query('SELECT Size FROM Product_Sizes WHERE Product_ID = ?', [id]);
  // @ts-ignore

  const [colors] = await db.query('SELECT Color FROM Product_Colors WHERE Product_ID = ?', [id]);

  return {
    Product_ID: product.Product_ID,
    Name_Ar: product.Name_Ar,
    Name_En: product.Name_En,
    Description: product.Description,
    Price: product.Price,
    OriginalPrice: null,
      Quantity: product.Quantity, // ⬅️ ضيف هاد السطر

    Image_URL: product.Image_URL,
    Sizes: sizes.map((s: any) => s.Size),
    Colors: colors.map((c: any) => c.Color),
    Category: product.Category_ID?.toString() || 'uncategorized',
  };
}

  // إضافة منتج
  async addProduct(data: any) {
    const { Name_Ar, Name_En, Description, Price, Sizes, Colors, Quantity, Image_URL, Category_ID } = data;

    const [insertResult]: any = await db.query(
      'INSERT INTO Products (Name_Ar, Name_En, Description, Price, Quantity, Image_URL, Category_ID) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [Name_Ar, Name_En, Description, Price, Quantity, Image_URL, Category_ID]
    );

    const productId = insertResult.insertId;

    for (const size of Sizes) {
      await db.query('INSERT INTO Product_Sizes (Product_ID, Size) VALUES (?, ?)', [productId, size]);
    }

    for (const color of Colors) {
      await db.query('INSERT INTO Product_Colors (Product_ID, Color) VALUES (?, ?)', [productId, color]);
    }

    return productId;
  }

  // تعديل منتج
  async updateProduct(id: number, data: any) {
    const { Name_Ar, Name_En, Description, Price, Sizes, Colors, Quantity, Image_URL, Category_ID } = data;

    await db.query(
      'UPDATE Products SET Name_Ar=?, Name_En=?, Description=?, Price=?, Quantity=?, Image_URL=?, Category_ID=? WHERE Product_ID=?',
      [Name_Ar, Name_En, Description, Price, Quantity, Image_URL, Category_ID, id]
    );

    await db.query('DELETE FROM Product_Sizes WHERE Product_ID=?', [id]);
    for (const size of Sizes) {
      await db.query('INSERT INTO Product_Sizes (Product_ID, Size) VALUES (?, ?)', [id, size]);
    }

    await db.query('DELETE FROM Product_Colors WHERE Product_ID=?', [id]);
    for (const color of Colors) {
      await db.query('INSERT INTO Product_Colors (Product_ID, Color) VALUES (?, ?)', [id, color]);
    }



    return true;
  }
  // حذف منتج
  async deleteProduct(id: number) {
    // احذف المقاسات والألوان أولاً
    await db.query('DELETE FROM Product_Sizes WHERE Product_ID = ?', [id]);
    await db.query('DELETE FROM Product_Colors WHERE Product_ID = ?', [id]);

    // بعدها احذف المنتج نفسه
    await db.query('DELETE FROM Products WHERE Product_ID = ?', [id]);

    return true;
  }
  

}

const productService = new ProductService();
export default productService;
function setProducts(data: any) {
    throw new Error('Function not implemented.');
}

