import db from './DBConnection';

class ProductService {
  // ✅ جلب كل المنتجات
  async getAllProducts() {
    const result: any = await db.query('SELECT * FROM products');
    const products = Array.isArray(result) ? result : [result]; // ✔ تأكد دايمًا إنها مصفوفة

    const enriched = await Promise.all(
      products.map(async (product: any) => {
        const sizes = await db.query('SELECT Size FROM product_sizes WHERE product_ID = ?', [product.Product_ID]);
        const colors = await db.query('SELECT Color FROM product_colors WHERE product_ID = ?', [product.Product_ID]);

        return {
          Product_ID: product.Product_ID,
          Name_Ar: product.Name_Ar,
          Name_En: product.Name_En,
          Description: product.Description,
          Price: product.Price,
          Quantity: product.Quantity,
          Image_URL: product.Image_URL,
          Sizes: sizes.map((s: any) => s.Size),
          Colors: colors.map((c: any) => c.Color),
          Category: product.Category_ID?.toString() || 'uncategorized',
        };
      })
    );

    return enriched;
  }

  // ✅ جلب منتج واحد
  async getProductById(id: number) {
    const rows: any = await db.query('SELECT * FROM products WHERE product_ID = ?', [id]);
    const product = Array.isArray(rows) ? rows[0] : rows;

    if (!product) return null;

    const sizes = await db.query('SELECT Size FROM product_sizes WHERE product_ID = ?', [id]);
    const colors = await db.query('SELECT Color FROM product_colors WHERE product_ID = ?', [id]);

    return {
      Product_ID: product.Product_ID,
      Name_Ar: product.Name_Ar,
      Name_En: product.Name_En,
      Description: product.Description,
      Price: product.Price,
      Quantity: product.Quantity,
      Image_URL: product.Image_URL,
      Sizes: sizes.map((s: any) => s.Size),
      Colors: colors.map((c: any) => c.Color),
      Category: product.Category_ID?.toString() || 'uncategorized',
    };
  }

  // ✅ إضافة منتج
  async addProduct(data: any) {
    const { Name_Ar, Name_En, Description, Price, Sizes, Colors, Quantity, Image_URL, Category_ID } = data;

    const [insertResult]: any = await db.query(
      'INSERT INTO products (Name_Ar, Name_En, Description, Price, Quantity, Image_URL, Category_ID) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [Name_Ar, Name_En, Description, Price, Quantity, Image_URL, Category_ID]
    );

    const productId = insertResult.insertId;

    for (const size of Sizes) {
      await db.query('INSERT INTO product_sizes (product_ID, Size) VALUES (?, ?)', [productId, size]);
    }

    for (const color of Colors) {
      await db.query('INSERT INTO product_colors (product_ID, Color) VALUES (?, ?)', [productId, color]);
    }

    return productId;
  }

  // ✅ تعديل منتج
  async updateProduct(id: number, data: any) {
    const { Name_Ar, Name_En, Description, Price, Sizes, Colors, Quantity, Image_URL, Category_ID } = data;

    await db.query(
      'UPDATE products SET Name_Ar=?, Name_En=?, Description=?, Price=?, Quantity=?, Image_URL=?, Category_ID=? WHERE Product_ID=?',
      [Name_Ar, Name_En, Description, Price, Quantity, Image_URL, Category_ID, id]
    );

    await db.query('DELETE FROM product_sizes WHERE product_ID=?', [id]);
    for (const size of Sizes) {
      await db.query('INSERT INTO product_sizes (product_ID, Size) VALUES (?, ?)', [id, size]);
    }

    await db.query('DELETE FROM product_Colors WHERE product_ID=?', [id]);
    for (const color of Colors) {
      await db.query('INSERT INTO product_Colors (product_ID, Color) VALUES (?, ?)', [id, color]);
    }

    return true;
  }

  // ✅ حذف منتج
  async deleteProduct(id: number) {
    await db.query('DELETE FROM product_sizes WHERE product_ID = ?', [id]);
    await db.query('DELETE FROM product_colors WHERE product_ID = ?', [id]);
    await db.query('DELETE FROM products WHERE product_ID = ?', [id]);

    return true;
  }
}

const productService = new ProductService();
export default productService;
