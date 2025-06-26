import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/DBConnection';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const orders = await db.query(`
        SELECT o.Order_ID, o.Customer_Name, o.Phone, o.Location, o.Order_Date,
               od.Product_ID, od.Quantity
        FROM Orders o
        JOIN Order_Details od ON o.Order_ID = od.Order_ID
        ORDER BY o.Order_Date DESC
      `);

      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching orders', error });
    }
  } 
  else {
    res.status(405).end();
  }
}
