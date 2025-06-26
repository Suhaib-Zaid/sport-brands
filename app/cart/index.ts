import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/lib/DBConnection';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { User_ID, Product_ID, Quantity } = req.body;

    try {
      await db.query(
        'INSERT INTO Cart (User_ID, Product_ID, Quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE Quantity = Quantity + ?',
        [User_ID, Product_ID, Quantity, Quantity]
      );
      res.status(201).json({ message: 'Item added to cart' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding to cart', error });
    }
  }
else if (req.method === 'GET') {
  const { User_ID } = req.query;

  try {
   const result = await db.query(
  'SELECT * FROM Cart WHERE User_ID = ?',
  [Number(User_ID)]
);

res.status(200).json(result);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching cart', error });
  }
}

  else {
    res.status(405).end();
  }
}
