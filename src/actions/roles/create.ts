// src/actions/roles/create.ts
'use server';

import { prisma } from '@/lib/prisma';

export async function createRole(
  prevState: { error?: string; success?: boolean },
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const name = formData.get('name')?.toString().trim();

  if (!name) {
    return { error: 'اسم الدور مطلوب' };
  }

  try {
    await prisma.roles.create({
      data: { name },
    });

    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: 'حدث خطأ أثناء إنشاء الدور' };
  }
}
