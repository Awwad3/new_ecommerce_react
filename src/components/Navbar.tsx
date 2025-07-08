'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          المتجر
        </Link>
        <ul className="flex space-x-4 rtl:space-x-reverse">
          <li>
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              الرئيسية
            </Link>
          </li>
          <li>
            <Link href="/products" className="text-gray-700 hover:text-blue-600">
              المنتجات
            </Link>
          </li>
          <li>
            <Link href="/login" className="text-gray-700 hover:text-blue-600">
              تسجيل الدخول
            </Link>
          </li>
          <li>
            <Link href="/signup" className="text-gray-700 hover:text-blue-600">
              إنشاء حساب
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
