import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/DBConnection';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { User_ID, Customer_Name, Phone, Location, items } = req.body;

      // إدخال الطلب
      const result: any = await db.query(
        'INSERT INTO Orders (User_ID, Customer_Name, Phone, Location) VALUES (?, ?, ?, ?)',
        [User_ID || null, Customer_Name, Phone, Location]
      );

      const orderId = result.insertId;

      // إدخال تفاصيل الطلب
      for (const item of items) {
        await db.query(
          'INSERT INTO Order_Details (Order_ID, Product_ID, Quantity) VALUES (?, ?, ?)',
          [orderId, item.Product_ID, item.Quantity]
        );
      }

      res.status(201).json({ message: 'Order created successfully', orderId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating order', error });
    }
  } 
  else {
    res.status(405).end();
  }
}
