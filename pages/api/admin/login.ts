import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/DBConnection';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    const users: any = await db.query('SELECT * FROM Users WHERE Username = ? AND Role = "admin"', [username]);

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.Password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // في مشروعك الفعلي: ارجع token حقيقي أو session
    res.status(200).json({ message: 'Login successful', user: { id: user.User_ID, username: user.Username } });
  }
  else {
    res.status(405).end();
  }
}
