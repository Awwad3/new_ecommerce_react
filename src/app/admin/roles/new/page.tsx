// src/app/admin/roles/new/page.tsx
'use client';

import { useActionState } from 'react';
import { createRole } from '@/actions/roles/create';
import { useRouter } from 'next/navigation';

export default function NewRolePage() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(createRole, { error: '' });

  if (state?.success) {
    router.push('/admin/roles');
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4 text-center">إضافة دور جديد</h1>

      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            اسم الدور
          </label>
          <input
            name="name"
            id="name"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
          />
        </div>

        {state?.error && (
          <p className="text-sm text-red-600">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded w-full"
        >
          {isPending ? 'جاري الحفظ...' : 'حفظ الدور'}
        </button>
      </form>
    </div>
  );
}
