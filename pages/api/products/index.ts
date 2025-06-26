import { NextApiRequest, NextApiResponse } from 'next';
import productService from '../../../lib/ProductService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } 
  else if (req.method === 'POST') {
    try {
      await productService.addProduct(req.body);
      res.status(201).json({ message: 'Product added' });
    } catch (error) {
      res.status(500).json({ message: 'Error adding product', error });
    }
  } 
  else {
    res.status(405).end(); // Method not allowed
  }
}
