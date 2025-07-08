'use client';

import { useActionState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

import { Button } from '@/components/ui/button'; // أو زر عادي
import { FormState } from '@/lib/definitions';
import { signup } from '@/actions/users/register';

export default function SignupForm() {
  const [formState, formAction, isPending] = useActionState<FormState, FormData>(signup, {});

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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        {formState?.errors?.name && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <ExclamationCircleIcon className="w-4 h-4" />
            {formState.errors.name[0]}
          </p>
        )}
      </div>

      {/* ✉️ البريد الإلكتروني */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        {formState?.errors?.password && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <ExclamationCircleIcon className="w-4 h-4" />
            {formState.errors.password[0]}
          </p>
        )}
      </div>

      {/* 🔘 زر الإرسال */}
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? 'جاري التسجيل...' : 'تسجيل'}
      </Button>
    </form>
  );
}
