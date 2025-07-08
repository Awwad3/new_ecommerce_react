// src/app/admin/roles/page.tsx
import { getAllRoles } from '@/actions/roles/getAll';

export default async function RolesListPage() {
  const roles = await getAllRoles();

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">جميع الأدوار</h1>
      <ul className="space-y-3">
        {roles.map((role) => (
          <li key={role.id} className="border p-3 rounded bg-gray-50">
            <strong>#{role.id}</strong>: {role.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
