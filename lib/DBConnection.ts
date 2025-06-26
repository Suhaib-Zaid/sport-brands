import mysql from 'mysql2/promise';

class DBConnection {
  private pool;

  constructor() {
    this.pool = mysql.createPool({
      host: 'localhost',        // عدل حسب بيئة عملك لو مش لوكال
      user: 'root',             // اسم مستخدم قاعدة البيانات
      password: '7277', // كلمة مرور قاعدة البيانات
      database: 'SportBrandsWebApp',  // اسم قاعدة البيانات
    });
  }

  async query(sql: string, values?: any) {
    const [results] = await this.pool.query(sql, values);
    return results;
  }
}

const db = new DBConnection();
export default db;
