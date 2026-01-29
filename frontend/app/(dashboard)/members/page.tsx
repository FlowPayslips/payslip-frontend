"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import EmployeeCard from "@/components/EmployeeCard";
import InviteEmployeeForm from "@/components/InviteEmployeeForm";
import { useMe } from "@/hooks/useMe";

const fetchMembers = async () => {
  const res = await api.get("/api/employees/");
  return res.data;
};

export default function MembersPage() {
  const { data: me } = useMe();
  const isAdmin = me?.is_staff || me?.is_superuser;

  const { data, isPending, isError } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchMembers,
  });

  if (isPending) return <p className="p-6">Loading employees…</p>;
  if (isError) return <p className="p-6 text-red-600">Failed to load employees</p>;

  if (data.length === 0) {
    return <p className="p-6 text-gray-600">No employees yet</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Employees</h1>
      {isAdmin && (
        <div className="mb-6">
            <InviteEmployeeForm />
        </div>
        )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((employee: any) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  );
}
