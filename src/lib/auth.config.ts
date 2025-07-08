
import type { NextAuthConfig } from 'next-auth';
// src/lib/auth.config.ts
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  // الميدلوير فقط
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      const isProtectedPath =
        pathname.startsWith('/dashboard') ||
        pathname === '/logout' ||
        pathname.startsWith('/admin') ||
        pathname.startsWith('/merchant');

      if (isProtectedPath && !isLoggedIn) return false;

      // توجيه تلقائي حسب الدور بعد تسجيل الدخول
      if (isLoggedIn && pathname === '/login') {
        const role = auth.user?.role;
        if (role === 'admin') return Response.redirect(new URL('/admin/dashboard', nextUrl));
        if (role === 'merchant') return Response.redirect(new URL('/merchant/dashboard', nextUrl));
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
    },
  },
  providers: [], // سيتم ملؤها من auth.ts
} satisfies NextAuthConfig;
