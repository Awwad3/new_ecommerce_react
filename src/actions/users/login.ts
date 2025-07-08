// src/actions/users/login.ts
'use server';

import { signIn ,signOut} from '@/lib/auth'; // الصواب وليس from 'next-auth/react'
import { AuthError } from 'next-auth';

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
        default:
          return 'حدث خطأ أثناء تسجيل الدخول';
      }
    }
    throw error;
  }
}
export async function logout() {
  'use server';
  await signOut({ redirect: false });
}