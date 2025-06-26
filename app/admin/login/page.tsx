'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = (e: any) => {
    e.preventDefault();

    const correctPassword = 'admin123'; // 🔒 كلمة المرور الثابتة

    if (password === correctPassword) {
      localStorage.setItem('adminUser', 'admin'); // تسجيل دخول بسيط
      router.push('/admin');
    } else {
      setMessage('❌ كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm text-right"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">دخول الأدمن</h1>

        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
        >
          دخول
        </button>

        {message && <p className="text-red-600 mt-2 text-center">{message}</p>}
      </form>
    </div>
  );
}
