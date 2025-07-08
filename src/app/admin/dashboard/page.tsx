// src/app/admin/dashboard/page.tsx
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminDashboardPage() {
  const session = await auth();

  // حماية إضافية
  if (!session || session.user.role !== 'admin') {
    redirect('/login');
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">لوحة تحكم المسؤول</h1>
      <p>مرحبًا {session.user.name}، هذه لوحة التحكم الخاصة بك كمشرف.</p>
    </main>
  );
}
