
'use client';

import { useActionState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { AtSymbolIcon, KeyIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { authenticate } from '@/actions/users/login';

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <form action={formAction} className="space-y-3 bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
      <h1 className="text-2xl font-bold text-center mb-4">تسجيل الدخول</h1>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
        <div className="relative mt-1">
          <input
            type="email"
            name="email"
            id="email"
            required
            className="peer w-full rounded-md border-gray-300 pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="example@mail.com"
          />
          <AtSymbolIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">كلمة المرور</label>
        <div className="relative mt-1">
          <input
            type="password"
            name="password"
            id="password"
            required
            minLength={6}
            className="peer w-full rounded-md border-gray-300 pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
          <KeyIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        disabled={isPending}
      >
        تسجيل الدخول
        <ArrowRightIcon className="w-5 h-5" />
      </button>

      {errorMessage && (
        <div className="flex items-center text-red-600 text-sm mt-2">
          <ExclamationCircleIcon className="w-5 h-5 mr-1" />
          {errorMessage}
        </div>
      )}
    </form>
  );
}
