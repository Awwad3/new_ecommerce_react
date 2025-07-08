// src/app/merchant/dashboard/page.tsx
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function MerchantDashboardPage() {
  const session = await auth();

  if (!session || session.user.role !== 'merchant') {
    redirect('/login');
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">لوحة تحكم التاجر</h1>
      <p>أهلاً {session.user.name}، يمكنك إدارة منتجاتك هنا.</p>
    </main>
  );
}
