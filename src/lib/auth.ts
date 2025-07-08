// src/lib/auth.ts
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';

import bcrypt from 'bcrypt';
import prisma from './prisma';

export const { handlers,auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // ✅ تحقق من صحة المدخلات
        const parsed = z
          .object({
            email: z.string().email(),
            password: z.string().min(8),
          })
          .safeParse(credentials);

        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        // ✅ جلب المستخدم من قاعدة البيانات
        const user = await prisma.users.findUnique({
          where: { email },
          include: {
          roles: true, // تأكد من وجود العلاقة في Prisma schema
          },
        });

        if (!user) return null;

        // ✅ التحقق من كلمة المرور
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          role: user.roles?.name || 'user', // تأكد من وجود القيمة أو وضع قيمة افتراضية
        };
      },
    }),
  ],

  callbacks: {
    ...authConfig.callbacks,

    // ✅ إضافة الدور إلى التوكن
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },

    // ✅ تضمين الدور في session
    async session({ session, token }) {
      if (session.user && token?.role) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});
