import NextAuth from 'next-auth';
import { authConfig } from '@/lib/auth.config';

// إنشاء معالج الجلسات
const handler = NextAuth(authConfig);

// تصدير المعالج للطلبات GET و POST (ضروري لمزود Credentials)
export { handler as GET, handler as POST };
