// src/app/dashboard/page.tsx
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function UserDashboardPage() {
  const session = await auth();

  if (!session || session.user.role !== 'user') {
    redirect('/login');
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">لوحة تحكم المستخدم</h1>
      <p>مرحبًا {session.user.name}، يمكنك تصفح طلباتك أو تعديل ملفك الشخصي.</p>
    </main>
  );
}
