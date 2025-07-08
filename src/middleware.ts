

// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './lib/auth';

const protectedPaths = [
  '/dashboard',
  '/admin/dashboard',
  '/merchant/dashboard',
  '/logout'
];

const roleBasedPaths = {
  admin: ['/admin/dashboard'],
  merchant: ['/merchant/dashboard'],
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // التحقق مما إذا كان المسار محميًا
  const isProtected = protectedPaths.some(path => 
    pathname.startsWith(path)
  );

  // التحقق مما إذا كان المسار خاصًا بدور معين
  const isRoleBased = Object.entries(roleBasedPaths).some(
    ([_, paths]) => paths.some(path => pathname.startsWith(path))
  );

  // إذا لم يكن المسار محميًا ولا خاصًا بدور
  if (!isProtected && !isRoleBased) return NextResponse.next();

  // جلب الجلسة
  const session = await auth();
  const userRole = session?.user?.role as string | undefined;

  // إذا لم يكن المستخدم مسجل الدخول
  if (!session?.user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // التحقق من الصلاحيات للأدوار
  if (isRoleBased && userRole) {
    const isAuthorized = Object.entries(roleBasedPaths).some(
      ([role, paths]) => 
        userRole === role && 
        paths.some(path => pathname.startsWith(path))
    );

    if (!isAuthorized) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};