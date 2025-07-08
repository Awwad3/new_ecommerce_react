
'use server';
import { SignupFormSchema, FormState } from '@/lib/definitions';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';

export async function signup(state: FormState, formData: FormData): Promise<FormState> {
  // استخراج البيانات
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  };

  // التحقق من الحقول
  const validatedFields = SignupFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;

  // التحقق إذا كان المستخدم موجودًا مسبقًا
  const existingUser = await prisma.users.findUnique({
    where: { email },
  });

  if (existingUser) {
    return {
      errors: {
        email: ['المستخدم موجود مسبقًا.'],
      },
    };
  }

  // تشفير كلمة المرور قبل التخزين
  const hashedPassword = await bcrypt.hash(password, 10);

  // إنشاء المستخدم
  await prisma.users.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role_id: 2, // اختر الدور المناسب مثل "مستخدم عادي"
    },
  });

  // إعادة توجيه بعد التسجيل (مثلاً إلى صفحة تسجيل الدخول)
  redirect('/login');
}
