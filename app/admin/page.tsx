'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

// ✅ استيراد مكونات الجدول من UI
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminPage() {
  const [orders, setOrders] = useState([]);
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    const user = localStorage.getItem('adminUser');
    if (!user) {
      router.push('/admin/login');
      return;
    }

    fetch('/api/admin/orders')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error('Error fetching orders:', err));
  }, []);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Header />

      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">لوحة التحكم - الطلبات</h1>
          <Link href="/admin/add-product">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
              ➕ إضافة منتج
            </button>
          </Link>
        </div>

        {/* 🔘 روابط إدارة */}
        <div className="space-y-4 mb-8">
          <Link href="/admin/products">
            <Button className="w-full">📦 إدارة المنتجات</Button>
          </Link>

          <Link href="/admin/orders">
            <Button className="w-full">📬 الطلبات</Button>
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center">📦 لوحة التحكم - الطلبات</h1>

        {orders.length === 0 ? (
          <p className="text-gray-500 text-center">لا يوجد طلبات حالياً.</p>
        ) : (
          <div className="rounded-md shadow border overflow-x-auto bg-white dark:bg-gray-900">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100 dark:bg-gray-800">
                  <TableHead className="text-right">رقم الطلب</TableHead>
                  <TableHead className="text-right">الاسم</TableHead>
                  <TableHead className="text-right">الهاتف</TableHead>
                  <TableHead className="text-right">العنوان</TableHead>
                  <TableHead className="text-right">المنتج</TableHead>
                  <TableHead className="text-right">الكمية</TableHead>
                  <TableHead className="text-right">التاريخ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order: any, index) => (
                  <TableRow key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <TableCell className="text-right">{order.Order_ID}</TableCell>
                    <TableCell className="text-right">{order.Customer_Name}</TableCell>
                    <TableCell className="text-right">{order.Phone}</TableCell>
                    <TableCell className="text-right">{order.Location}</TableCell>
                    <TableCell className="text-right">{order.Product_ID}</TableCell>
                    <TableCell className="text-right">{order.Quantity}</TableCell>
                    <TableCell className="text-right">
                      {new Date(order.Order_Date).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
