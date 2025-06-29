import mysql from 'mysql2/promise';

const connectionString = process.env.MYSQL_URL;

if (!connectionString) {
  throw new Error('MYSQL_URL is not defined in environment variables.');
}

export const pool = mysql.createPool(connectionString);
