// src/actions/roles/getAll.ts
'use server';

import { prisma } from '@/lib/prisma';

export async function getAllRoles() {
  const roles = await prisma.roles.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: { id: 'asc' },
  });

  return roles;
}
