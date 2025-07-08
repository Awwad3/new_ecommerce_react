'use client';

import { useActionState, useEffect, useState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/button';
import { FormState } from '@/lib/definitions';
import { signup } from '@/actions/users/register';
import { getAllRoles } from '@/actions/roles/getAll';

export default function SignupForm() {
  const [formState, formAction, isPending] = useActionState<FormState, FormData>(signup, {});
  const [roles, setRoles] = useState<{ id: number; name: string }[]>([]);

  // 👇 تحميل الأدوار عند تحميل الصفحة
  useEffect(() => {
    (async () => {
      const data = await getAllRoles();
      setRoles(data);
    })();
  }, []);

  return (
    <form action={formAction} className="max-w-md mx-auto p-6 space-y-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold text-center">إنشاء حساب جديد</h1>

      {/* 🧍 الاسم */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">الاسم الكامل</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {formState?.errors?.name && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <ExclamationCircleIcon className="w-4 h-4" />
            {formState.errors.name[0]}
          </p>
        )}
      </div>

      {/* ✉️ البريد */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {formState?.errors?.email && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <ExclamationCircleIcon className="w-4 h-4" />
            {formState.errors.email[0]}
          </p>
        )}
      </div>

      {/* 🔒 كلمة المرور */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">كلمة المرور</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          minLength={6}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {formState?.errors?.password && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <ExclamationCircleIcon className="w-4 h-4" />
            {formState.errors.password[0]}
          </p>
        )}
      </div>

      {/* 🧩 اختيار الدور */}
      <div>
        <label htmlFor="role_id" className="block text-sm font-medium text-gray-700">اختر الدور</label>
        <select
          name="role_id"
          id="role_id"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="">-- اختر الدور --</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
        {formState?.errors?.role_id && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <ExclamationCircleIcon className="w-4 h-4" />
            {formState.errors.role_id[0]}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? 'جاري التسجيل...' : 'تسجيل'}
      </Button>
    </form>
  );
}
