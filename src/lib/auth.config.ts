
// src/lib/auth.config.ts
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      // المسارات المحمية
      const protectedPaths = [
        '/dashboard',
        '/logout',
        '/admin',
        '/merchant'
      ];

      const isProtected = protectedPaths.some(path => pathname.startsWith(path)
      );

      // إذا حاول المستخدم الوصول لصفحة محمية ولم يسجل الدخول
      if (isProtected && !isLoggedIn) {
        return false;
      }

      // إعادة توجيه المستخدم المسجل الدخول بعيدًا عن صفحات المصادقة
      if (isLoggedIn) {
        if (pathname === '/login' || pathname === '/signup') {
          const role = auth.user?.role || 'user';

          // إعادة التوجيه بناءً على الدور
          if (role === 'admin') {
            return Response.redirect(new URL('/admin/dashboard', nextUrl));
          } else if (role === 'merchant') {
            return Response.redirect(new URL('/merchant/dashboard', nextUrl));
          }
          return Response.redirect(new URL('/dashboard', nextUrl));
        }
      }

      return true;
    },
  },
  providers: []
} satisfies NextAuthConfig;